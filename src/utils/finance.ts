import type { Budget, FinancialSummary, Transaction } from "../types";

export const calculateFinancialSummary = (
  transactions: Transaction[]
): FinancialSummary => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;
  const savingsRate =
    monthlyIncome > 0
      ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
      : 0;

  return {
    totalIncome,
    totalExpenses,
    monthlyIncome,
    monthlyExpenses,
    netIncome,
    savingsRate,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const calculateBudgetProgress = (budget: Budget): number => {
  return budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
};

export const getBudgetStatus = (
  budget: Budget
): "safe" | "warning" | "danger" => {
  const progress = calculateBudgetProgress(budget);
  if ((progress) >= 100) return "danger";
  if ((progress) >= 80) return "warning";
  return "safe";
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
