/**
 * WazobiaTax Chatbot AI Service
 *
 * Dual-engine architecture:
 *   1. Primary: Claude API with RAG-style FAQ context injection
 *   2. Fallback: Advanced local NLP with TF-IDF, n-gram, synonym matching
 */

/* ================================================================
   TYPES
   ================================================================ */

export interface FaqEntry {
    question: string;
    answer: string;
}

export interface ChatHistoryMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface AIResponse {
    content: string;
    confidence: number; // 0–1
    source: 'claude' | 'local';
    matchedFaqQuestion?: string;
}

/* ================================================================
   CONFIGURATION
   ================================================================ */

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as
    | string
    | undefined;

const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 512;

/* ================================================================
   TAX-DOMAIN SYNONYM MAP
   ================================================================ */

const SYNONYM_GROUPS: string[][] = [
    ['tax', 'taxes', 'taxation', 'haraji', 'owó-ori', 'ụtụ', 'isi'],
    ['penalty', 'penalties', 'fine', 'fines', 'punishment', 'tara', 'hukunci', 'ìtanràn', 'ntaramahụhụ', 'late fee', 'charge'],
    ['tin', 'taxid', 'tax identification number', 'tax id', 'lambar shaidar', 'nọ́mbà idanimọ'],
    ['file', 'filing', 'submit', 'returns', 'return', 'rahoto', 'fọwọ́sí', 'iziga'],
    ['exempt', 'exemption', 'exemptions', 'relief', 'rangwame', 'àyọkúrò', 'nnwere onwe', 'free'],
    ['vat', 'value added tax'],
    ['cit', 'company income tax', 'corporate income tax', 'corporate tax'],
    ['cgt', 'capital gains tax', 'capital gain'],
    ['small business', 'small company', 'small businesses', 'sme', 'small enterprise', 'kékeré', 'karamin', 'obere'],
    ['register', 'registration', 'sign up', 'rijistar', 'forúkọsílẹ̀', 'ndebanye'],
    ['record', 'records', 'receipt', 'receipts', 'ledger', 'books', 'ìkọ̀wé', 'ndekọ'],
    ['pay', 'payment', 'paying', 'biya', 'san', 'kwụọ'],
    ['refund', 'overpay', 'overpayment'],
    ['tcc', 'tax clearance', 'tax clearance certificate'],
    ['ntaa', 'nigeria tax administration act', 'tax administration'],
    ['deadline', 'deadlines', 'due date'],
    ['turnover', 'revenue', 'sales', 'income', 'kudin shiga', 'owó-wọlé', 'ego mbata'],
    ['avoidance', 'evasion', 'avoid', 'fake', 'artificial', 'prohibited'],
    ['scan', 'ocr', 'camera', 'receipt scan', 'snap'],
    ['simplified', 'simple', 'easy', 'sauƙaƙa', 'rọrùn', 'mfe'],
];

/** Build a flattened lookup: word → group index */
const synonymLookup = new Map<string, number>();
SYNONYM_GROUPS.forEach((group, idx) => {
    group.forEach((term) => synonymLookup.set(term.toLowerCase(), idx));
});

/* ================================================================
   STOP WORDS (multi-language)
   ================================================================ */

const STOP_WORDS = new Set([
    // English
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
    'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
    'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
    'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
    'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
    'just', 'because', 'but', 'and', 'or', 'if', 'while', 'about', 'up',
    'that', 'this', 'these', 'those', 'am', 'it', 'its', 'my', 'your',
    'we', 'they', 'them', 'what', 'which', 'who', 'whom', 'me', 'him',
    'her', 'he', 'she', 'i',
    // Pidgin
    'na', 'dey', 'dem', 'wey', 'don', 'go', 'fit', 'make', 'say', 'e',
    'no', 'di', 'for', 'you', 'your', 'dis', 'dat', 'be',
    // Hausa
    'ne', 'ce', 'da', 'ta', 'ya', 'yi', 'za', 'ka', 'ki', 'zan',
    'shi', 'na', 'ko', 'ba', 'ga', 'kuma', 'amma',
    // Yoruba
    'ni', 'ti', 'ati', 'si', 'fi', 'fun', 'pe', 'ki', 'ma',
    'ko', 'je', 'se', 'lo', 'wa',
    // Igbo
    'na', 'ka', 'ma', 'n', 'ji', 'si', 'ga', 'di', 'bu',
]);

/* ================================================================
   TEXT PROCESSING UTILITIES
   ================================================================ */

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u1EF9'-]/g, ' ') // keep letters, accents, hyphens
        .split(/\s+/)
        .filter((w) => w.length > 0);
}

function removeStopWords(tokens: string[]): string[] {
    return tokens.filter((t) => !STOP_WORDS.has(t) && t.length > 1);
}

function getNgrams(tokens: string[], n: number): string[] {
    const ngrams: string[] = [];
    for (let i = 0; i <= tokens.length - n; i++) {
        ngrams.push(tokens.slice(i, i + n).join(' '));
    }
    return ngrams;
}

/** Expand tokens with synonym group IDs for overlap detection */
function getSynonymGroupIds(tokens: string[]): Set<number> {
    const ids = new Set<number>();
    // Check single tokens
    for (const token of tokens) {
        const id = synonymLookup.get(token);
        if (id !== undefined) ids.add(id);
    }
    // Check bi-grams (for multi-word synonyms like "small business")
    for (let i = 0; i < tokens.length - 1; i++) {
        const bigram = `${tokens[i]} ${tokens[i + 1]}`;
        const id = synonymLookup.get(bigram);
        if (id !== undefined) ids.add(id);
    }
    // Check tri-grams
    for (let i = 0; i < tokens.length - 2; i++) {
        const trigram = `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`;
        const id = synonymLookup.get(trigram);
        if (id !== undefined) ids.add(id);
    }
    return ids;
}

/* ================================================================
   LOCAL NLP ENGINE
   ================================================================ */

interface ScoredFaq {
    index: number;
    question: string;
    answer: string;
    score: number;
    confidence: number;
}

function computeIDF(faqs: FaqEntry[]): Map<string, number> {
    const docCount = faqs.length;
    const df = new Map<string, number>();

    for (const faq of faqs) {
        const tokens = new Set(removeStopWords(tokenize(faq.question)));
        for (const token of tokens) {
            df.set(token, (df.get(token) || 0) + 1);
        }
    }

    const idf = new Map<string, number>();
    for (const [term, count] of df) {
        idf.set(term, Math.log((docCount + 1) / (count + 1)) + 1);
    }
    return idf;
}

function localFuzzyMatch(
    query: string,
    faqs: FaqEntry[]
): ScoredFaq | null {
    if (faqs.length === 0) return null;

    const idf = computeIDF(faqs);
    const queryTokens = removeStopWords(tokenize(query));
    const queryBigrams = getNgrams(queryTokens, 2);
    const queryTrigrams = getNgrams(queryTokens, 3);
    const querySynonymIds = getSynonymGroupIds(tokenize(query));

    let best: ScoredFaq | null = null;

    for (let i = 0; i < faqs.length; i++) {
        const faq = faqs[i];
        const faqTokens = removeStopWords(tokenize(faq.question));
        const faqBigrams = getNgrams(faqTokens, 2);
        const faqTrigrams = getNgrams(faqTokens, 3);
        const faqSynonymIds = getSynonymGroupIds(tokenize(faq.question));
        const faqAllTokens = new Set(faqTokens);

        let score = 0;

        // === 1. TF-IDF weighted token overlap ===
        for (const token of queryTokens) {
            if (faqAllTokens.has(token)) {
                const weight = idf.get(token) || 1;
                score += weight;
            }
        }

        // === 2. Bigram overlap (phrase-level matching) ===
        const faqBigramSet = new Set(faqBigrams);
        for (const bg of queryBigrams) {
            if (faqBigramSet.has(bg)) {
                score += 3; // bigrams are strong signals
            }
        }

        // === 3. Trigram overlap ===
        const faqTrigramSet = new Set(faqTrigrams);
        for (const tg of queryTrigrams) {
            if (faqTrigramSet.has(tg)) {
                score += 5; // trigrams are very strong signals
            }
        }

        // === 4. Synonym group overlap ===
        for (const id of querySynonymIds) {
            if (faqSynonymIds.has(id)) {
                score += 2.5;
            }
        }

        // === 5. Substring containment boost ===
        const qLower = query.toLowerCase();
        const fLower = faq.question.toLowerCase();
        if (fLower.includes(qLower) || qLower.includes(fLower)) {
            score += 10;
        }

        // === 6. Also search the answer text for keyword matches ===
        const answerTokens = new Set(removeStopWords(tokenize(faq.answer)));
        let answerHits = 0;
        for (const token of queryTokens) {
            if (answerTokens.has(token)) answerHits++;
        }
        score += answerHits * 0.5; // weaker signal but still useful

        if (!best || score > best.score) {
            best = {
                index: i,
                question: faq.question,
                answer: faq.answer,
                score,
                confidence: 0, // computed below
            };
        }
    }

    if (!best) return null;

    // Normalize confidence: map score range to 0–1
    // Heuristic thresholds based on testing
    const maxExpected = Math.max(queryTokens.length * 3, 8);
    best.confidence = Math.min(best.score / maxExpected, 1);

    return best;
}

/* ================================================================
   CLAUDE API ENGINE
   ================================================================ */

async function callClaudeAPI(
    query: string,
    faqs: FaqEntry[],
    history: ChatHistoryMessage[]
): Promise<AIResponse | null> {
    if (!ANTHROPIC_API_KEY) return null;

    // Build FAQ context block
    const faqContext = faqs
        .map((f, i) => `Q${i + 1}: ${f.question}\nA${i + 1}: ${f.answer}`)
        .join('\n\n');

    const systemPrompt = `You are the WazobiaTax AI Assistant — a knowledgeable, friendly, and professional tax advisor helping Nigerian small business owners understand tax laws, obligations, and exemptions.

KNOWLEDGE BASE (use ONLY this data to answer; do NOT hallucinate):
${faqContext}

INSTRUCTIONS:
- Answer the user's question using ONLY the knowledge base above.
- If the question relates to multiple FAQ entries, synthesize a comprehensive answer from all relevant entries.
- If the question partially matches a FAQ topic, provide the relevant information and note which aspect you're addressing.
- Keep answers concise, clear, and helpful. Use plain language suitable for small business owners.
- If the user's question is truly unrelated to any FAQ content, honestly say you can only help with Nigerian tax topics and suggest relevant questions you CAN answer.
- When citing specific NTAA sections or thresholds mentioned in the knowledge base, include them for credibility.
- Respond in the same language the user writes in.
- Do NOT make up information that isn't in the knowledge base.`;

    const messages = [
        ...history.map((m) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
        })),
        { role: 'user' as const, content: query },
    ];

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true',
            },
            body: JSON.stringify({
                model: CLAUDE_MODEL,
                max_tokens: MAX_TOKENS,
                system: systemPrompt,
                messages,
            }),
        });

        if (!response.ok) {
            console.warn(
                `Claude API error: ${response.status} ${response.statusText}`
            );
            return null;
        }

        const data = await response.json();
        const text =
            data?.content?.[0]?.type === 'text' ? data.content[0].text : null;

        if (!text) return null;

        return {
            content: text,
            confidence: 0.95, // Claude responses are generally high-confidence
            source: 'claude',
        };
    } catch (err) {
        console.warn('Claude API call failed, falling back to local engine:', err);
        return null;
    }
}

/* ================================================================
   LOCAL RESPONSE FORMATTER (confidence-tiered)
   ================================================================ */

function formatLocalResponse(
    match: ScoredFaq,
    fallbackText: string
): AIResponse {
    const { confidence, answer, question } = match;

    // High confidence (>= 0.5): direct answer
    if (confidence >= 0.5) {
        return {
            content: answer,
            confidence,
            source: 'local',
            matchedFaqQuestion: question,
        };
    }

    // Medium confidence (>= 0.25): answer with caveat
    if (confidence >= 0.25) {
        return {
            content: `Based on your question, this might help:\n\n${answer}\n\nIf this doesn't fully answer your question, try asking more specifically or browse the FAQ section for more details.`,
            confidence,
            source: 'local',
            matchedFaqQuestion: question,
        };
    }

    // Low confidence (>= 0.1): suggest the closest FAQ
    if (confidence >= 0.1) {
        return {
            content: `I'm not entirely sure about that, but the closest topic I found is:\n\n**"${question}"**\n\n${answer}\n\nYou can also check the Guides tab for more FAQs, or try rephrasing your question.`,
            confidence,
            source: 'local',
            matchedFaqQuestion: question,
        };
    }

    // Very low confidence: graceful fallback
    return {
        content: fallbackText,
        confidence,
        source: 'local',
    };
}

/* ================================================================
   PUBLIC API — MAIN ORCHESTRATOR
   ================================================================ */

export async function generateResponse(
    query: string,
    faqs: FaqEntry[],
    history: ChatHistoryMessage[],
    fallbackText: string
): Promise<AIResponse> {
    // 1. Try Claude API first
    const claudeResponse = await callClaudeAPI(query, faqs, history);
    if (claudeResponse) return claudeResponse;

    // 2. Fall back to advanced local matching
    const match = localFuzzyMatch(query, faqs);
    if (!match) {
        return {
            content: fallbackText,
            confidence: 0,
            source: 'local',
        };
    }

    return formatLocalResponse(match, fallbackText);
}
