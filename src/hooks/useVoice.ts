import { useEffect, useRef, useState } from "react";

// small helper to convert spoken number words to digits - simple mapping for common numbers
// WORD-TO-NUMBER dictionary
const WORD_NUMS: Record<string, number> = {
  "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
  "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
  "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
  "fifteen": 15, "twenty": 20, "thirty": 30, "forty": 40,
  "fifty": 50, "hundred": 100, "thousand": 1000, "million":1000000
};

// Convert words to numbers (e.g. "five thousand two hundred")
function wordsToNumber(str: string): number | null {
  const words = str.toLowerCase().split(/[\s-]+/);
  let current = 0;
  let total = 0;

  for (const w of words) {
    const val = WORD_NUMS[w];
    if (val !== undefined) {
      if (val >= 100) {
        current = (current || 1) * val;
      } else {
        current += val;
      }
    } else {
      const num = parseInt(w);
      if (!isNaN(num)) current += num;
    }
  }

  total += current;
  return total || null;
}

export function useVoice() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(()=> {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-NG";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;
    recognitionRef.current.onresult = (e: any) => {
      const txt = e.results[0][0].transcript;
      setTranscript(txt);
    };
    recognitionRef.current.onerror = (e:any) => {
      console.error("Speech error", e);
    };
  }, []);

  const start = () => {
    setTranscript("");
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (e){ console.warn(e) }
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const parseExpenseFromTranscript = (txt: string) => {
    // example: "Add expense five thousand naira for food"
    const lower = txt.toLowerCase();
    
    // Improved category matching: look for "for [category]" or just the category word
    let category = "misc"; // Default category
    const categoryKeywords = [
      "food",
      "transport",
      "airtime",
      "data",
      "rent",
      "utilities",
      "electricity",
      "water",
      "internet",
      "fuel",
      "maintenance",
      "repairs",
      "office",
      "supplies",
      "misc",
      "miscellaneous"
    ];    
    for (const keyword of categoryKeywords) {
      if (lower.includes(`for ${keyword}`) || lower.includes(keyword)) {
        category = keyword === "miscellaneous" ? "misc" : keyword;
        break;
      }
    }

    // Amount parsing remains similar, but ensure it's robust
    let amount: number | null = null;
    const digitMatch = lower.match(/(\d{1,3}(?:[\d,\.]*\d)?)\s*(naira|ngn)?/);
    if (digitMatch) amount = parseFloat(digitMatch[1].replace(/,/g,""));

    // (B) detect short forms like "2k", "5k", "3.5k"
    const shortK = lower.match(/(\d+(\.\d+)?)k/);
    if (shortK) amount = parseFloat(shortK[1]) * 1000;

    // (C) detect Nigerian word-number combos: "five thousand", "three hundred"
    const wordMatch = lower.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thousand|hundred|fifteen|twenty|thirty|forty|fifty|hundred|thousand)[\w\s-]*/);
    if (!amount && wordMatch) {
      amount = wordsToNumber(wordMatch[0]);
    }
    
    let vendor = "";
    const vendorMatch = lower.match(/(?:from|on|at)\s+([a-zA-Z\s]+?)(?:\s+(?:for|naira|ngn|today|yesterday|on|in|\d|$))/);

    if (vendorMatch && vendorMatch[1]) {
      vendor = vendorMatch[1].trim();
      // Remove common prepositions or articles if they appear at the end
      vendor = vendor.replace(/\s+(?:the|a|an)$/, "").trim();
    } else {
      // Fallback: try to extract a plausible vendor if amount and category are already found
      // This is a simpler approach; could be more sophisticated with NLP
      const expensePhraseMatch = lower.match(/(?:add|expense|spent)\s+(?:.*?)\s+(?:naira|ngn|for|on)\s+(.+)/);
      if (expensePhraseMatch && expensePhraseMatch[1]) {
        const potentialVendorPhrase = expensePhraseMatch[1]
  .replace(
    /\b(food|transport|airtime|data|rent|utilities|electricity|water|internet|fuel|maintenance|repairs|office|supplies|misc|miscellaneous)\b/g,
    ''
  )
  .trim();
        if (potentialVendorPhrase && potentialVendorPhrase.length > 2) { // Avoid very short or empty strings
          vendor = potentialVendorPhrase.split(' ')[0]; // Take the first word as a simple vendor name
        }
      }
    }

    return {
      amount,
      category,
      vendor
    };
  };

  return { listening, start, stop, transcript, parseExpenseFromTranscript };
}
