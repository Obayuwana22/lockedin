"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../../lib/redux/hooks";
import { formatCurrency } from "../../../utils/finance";

const IncomeVsExpensesChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        income: 0,
        expenses: 0,
        net: 0,
      };
    }

    if (transaction.type === "income") {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expenses += transaction.amount;
    }

    acc[monthKey].net = acc[monthKey].income - acc[monthKey].expenses;

    return acc;
  }, {} as Record<string, { month: string; income: number; expenses: number; net: number }>);

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6); // Last 6 months

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
          <p className="text-sm text-muted-foreground border-t pt-1 mt-1">
            Net:{" "}
            <span
              className={`font-medium ${
                payload[0].payload.net >= 0 ? "text-accent" : "text-destructive"
              }`}
            >
              {formatCurrency(payload[0].payload.net)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
      <div>
        <div className="font-medium mb-5">Income vs Expenses</div>
      </div>
      <div>
        {chartData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No transaction data available
            </p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="hsl(var(--chart-1))"
                  name="Income"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="hsl(var(--chart-4))"
                  name="Expenses"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeVsExpensesChart;
