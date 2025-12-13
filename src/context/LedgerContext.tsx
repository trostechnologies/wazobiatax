import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { get, set } from "idb-keyval";

export type Entry = {
  id: string;
  date: string;
  amount: number;
  category: string;
  vendor: string;
  method: "manual" | "ocr" | "voice";
};

type LedgerContextType = {
  entries: Entry[];
  addEntry: (e: Omit<Entry, "id">) => Promise<void>;
  clearAll: () => Promise<void>;
};

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

export const LedgerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadEntries = useCallback(async () => {
    const saved = await get<Entry[]>("wazobia-entries");
    if (saved) setEntries(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // Save to IndexedDB only after initial load
  useEffect(() => {
    if (loaded) {
      set("wazobia-entries", entries);
    }
  }, [entries, loaded]);

  useEffect(() => {
    const handleOnline = () => {
      console.log("App is online. Simulating sync:", entries);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [entries]);

  const addEntry = async (e: Omit<Entry, "id">) => {
    const entry: Entry = { id: Date.now().toString(), ...e };
    setEntries(prev => [entry, ...prev]);
  };

  const clearAll = async () => {
    setEntries([]);
    await set("wazobia-entries", []);
  };

  // 🔵 SHOW LOADING SPINNER WHILE INDEXEDDB LOADS
  if (!loaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <LedgerContext.Provider value={{ entries, addEntry, clearAll }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = () => {
  const ctx = useContext(LedgerContext);
  if (!ctx) throw new Error("useLedger must be used inside LedgerProvider");
  return ctx;
};