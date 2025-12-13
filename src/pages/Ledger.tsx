import BottomNav from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLedger } from "@/context/LedgerContext";

const Ledger = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const { entries, clearAll } = useLedger();
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Transaction Ledger</h1>
            <Button size="sm" className="gap-2" onClick={() => {
              router("/expense-entry")
            }}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Income</p>
                  <p className="text-2xl font-bold text-success">₦0</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expenses</p>
                  <p className="text-2xl font-bold text-destructive">₦0</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <div className="flex justify-between items-center pr-6">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your income and expenses</CardDescription>
            </CardHeader>

            <button
              onClick={clearAll}
              aria-label={t("clear_all_entries")}
              className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {t("clear_all")}
            </button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pb-6 px-6" role="region" aria-label={t("expense_ledger_list")}>
            <AnimatePresence>
              {entries.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 py-8"
                >
                  <CardContent>
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">No transactions yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Start logging your income and expenses
                        </p>
                      </div>
                      <Button onClick={() => {
                        router("/expense-entry")
                      }}>Add Transaction</Button>
                    </div>
                  </CardContent>
                </motion.div>
              ) : (
                entries.map(e => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center border border-gray-100"
                    role="listitem"
                    aria-label={`${e.amount.toLocaleString()} ${t("naira")} for ${e.vendor || "Unknown"} on ${new Date(e.date).toLocaleDateString()} in ${e.category} via ${e.method}`}
                  >
                    <div>
                      <div className="font-bold text-lg text-[#3A8857]">₦{e.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{e.vendor || "—"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-700">{new Date(e.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500 capitalize">{e.category} • {e.method}</div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
};

export default Ledger;