export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense";
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly" | "weekly" | "yearly";
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netIncome: number;
  savingsRate: number;
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface DateRange {
  from: Date
  to: Date
}
