import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import type { LanguageKey } from '../translations/profile';
import {
    generateResponse,
    type FaqEntry,
    type ChatHistoryMessage,
} from '../services/chatbotAI';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    matchedFaq?: string;
    confidence?: number;
}

interface FaqItem {
    questionKey: string;
    answerKey: string;
}

interface ChatbotTranslations {
    chatbotTitle: string;
    chatbotWelcome: string;
    chatbotPlaceholder: string;
    chatbotSuggestion1: string;
    chatbotSuggestion2: string;
    chatbotSuggestion3: string;
    chatbotFallback: string;
    chatbotTyping: string;
    [key: string]: string;
}

interface AIChatbotProps {
    language: LanguageKey;
    translations: ChatbotTranslations;
    faqs: FaqItem[];
}

export function AIChatbot({ language, translations: t, faqs }: AIChatbotProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Resolve FAQ keys → actual translated text for the AI engine
    const resolvedFaqs: FaqEntry[] = useMemo(
        () =>
            faqs.map((f) => ({
                question: t[f.questionKey] || '',
                answer: t[f.answerKey] || '',
            })),
        [faqs, t]
    );

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = useCallback(
        async (text?: string) => {
            const messageText = (text || inputValue).trim();
            if (!messageText || isTyping) return;

            const userMsg: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: messageText,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setInputValue('');
            setIsTyping(true);

            // Build conversation history for context
            const history: ChatHistoryMessage[] = messages.map((m) => ({
                role: m.role,
                content: m.content,
            }));

            try {
                const response = await generateResponse(
                    messageText,
                    resolvedFaqs,
                    history,
                    t.chatbotFallback
                );

                const aiMsg: ChatMessage = {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: response.content,
                    timestamp: new Date(),
                    matchedFaq: response.matchedFaqQuestion,
                    confidence: response.confidence,
                };

                setMessages((prev) => [...prev, aiMsg]);
            } catch {
                // If everything fails, give a graceful error message
                const errorMsg: ChatMessage = {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: t.chatbotFallback,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMsg]);
            } finally {
                setIsTyping(false);
            }
        },
        [inputValue, isTyping, messages, resolvedFaqs, t.chatbotFallback]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestions = [
        t.chatbotSuggestion1,
        t.chatbotSuggestion2,
        t.chatbotSuggestion3,
    ];

    /** Render message text, handling bold **text** markers */
    const renderMessageContent = (content: string) => {
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={i} style={{ fontWeight: 600 }}>
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <>
            {/* Chat Bubble Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center cursor-pointer"
                        style={{
                            boxShadow:
                                '0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.15)',
                        }}
                        aria-label="Open AI chat assistant"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span
                            className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"
                            style={{ animation: 'chatbotPulse 2s infinite' }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Chat Panel */}
                        <motion.div
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl overflow-hidden flex flex-col"
                            style={{
                                height: '85vh',
                                maxHeight: '700px',
                                boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
                            }}
                        >
                            {/* Header */}
                            <div
                                className="flex items-center justify-between px-4 py-4 border-b border-gray-100"
                                style={{
                                    background:
                                        'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-white text-sm"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {t.chatbotTitle}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-2 h-2 rounded-full bg-emerald-300"
                                                style={{ animation: 'chatbotPulse 2s infinite' }}
                                            />
                                            <span
                                                className="text-emerald-100"
                                                style={{ fontSize: '0.7rem' }}
                                            >
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                className="flex-1 overflow-y-auto px-4 py-4"
                                style={{
                                    background:
                                        'linear-gradient(180deg, #f0fdf4 0%, #f8fafc 40%)',
                                }}
                            >
                                {/* Welcome Message */}
                                {messages.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6"
                                    >
                                        <div className="flex items-start gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4 text-emerald-700" />
                                            </div>
                                            <div
                                                className="bg-white rounded-2xl rounded-tl-md px-4 py-3 border border-gray-100 max-w-[85%]"
                                                style={{
                                                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                                }}
                                            >
                                                <p
                                                    className="text-gray-700"
                                                    style={{
                                                        fontSize: '0.84rem',
                                                        lineHeight: 1.55,
                                                    }}
                                                >
                                                    {t.chatbotWelcome}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quick Suggestions */}
                                        <div className="ml-10 flex flex-col gap-2">
                                            {suggestions.map((suggestion, i) => (
                                                <motion.button
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + i * 0.1 }}
                                                    onClick={() => handleSend(suggestion)}
                                                    className="text-left px-4 py-2 bg-white border border-emerald-200 rounded-xl text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer"
                                                    style={{ fontSize: '0.8rem' }}
                                                >
                                                    {suggestion}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Chat Messages */}
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, delay: 0.05 }}
                                        className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        {/* Avatar */}
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                                                    ? 'bg-emerald-600'
                                                    : 'bg-emerald-100'
                                                }`}
                                        >
                                            {msg.role === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-emerald-700" />
                                            )}
                                        </div>

                                        {/* Message Bubble */}
                                        <div
                                            className={`max-w-[80%] px-4 py-3 ${msg.role === 'user'
                                                    ? 'bg-emerald-600 text-white rounded-2xl rounded-br-md'
                                                    : 'bg-white text-gray-700 rounded-2xl rounded-bl-md border border-gray-100'
                                                }`}
                                            style={{
                                                boxShadow:
                                                    msg.role === 'assistant'
                                                        ? '0 1px 4px rgba(0,0,0,0.04)'
                                                        : '0 2px 8px rgba(16, 185, 129, 0.2)',
                                                fontSize: '0.84rem',
                                                lineHeight: 1.55,
                                                whiteSpace: 'pre-line',
                                            }}
                                        >
                                            {msg.role === 'assistant'
                                                ? renderMessageContent(msg.content)
                                                : msg.content}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-end gap-2 mb-3"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                            <Bot className="w-4 h-4 text-emerald-700" />
                                        </div>
                                        <div
                                            className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100 flex items-center gap-2"
                                            style={{
                                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                            }}
                                        >
                                            {[0, 1, 2].map((i) => (
                                                <motion.span
                                                    key={i}
                                                    className="w-2 h-2 bg-emerald-400 rounded-full inline-block"
                                                    animate={{ y: [0, -6, 0] }}
                                                    transition={{
                                                        duration: 0.6,
                                                        repeat: Infinity,
                                                        delay: i * 0.15,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Bar */}
                            <div
                                className="px-4 py-3 border-t border-gray-100 bg-white"
                                style={{
                                    paddingBottom:
                                        'max(0.75rem, env(safe-area-inset-bottom))',
                                }}
                            >
                                <div
                                    className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200"
                                    style={{ transition: 'border-color 0.2s' }}
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={t.chatbotPlaceholder}
                                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                                        style={{ fontSize: '0.875rem' }}
                                        disabled={isTyping}
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!inputValue.trim() || isTyping}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${inputValue.trim() && !isTyping
                                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                : 'bg-gray-200 text-gray-400'
                                            }`}
                                        style={{ flexShrink: 0 }}
                                        aria-label="Send message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Pulse animation keyframes */}
            <style>{`
        @keyframes chatbotPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </>
    );
}
