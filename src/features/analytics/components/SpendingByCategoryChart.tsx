"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "../../../lib/redux/hooks";
import { formatCurrency } from "../../../utils/finance";

const SpendingByCategoryChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const categories = useAppSelector((state) => state.categories.categories);

  // Calculate spending by category
  const categorySpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = categories.find(
        (cat) => cat.id === transaction.category
      );
      const categoryName = category?.name || "Unknown";
      const categoryColor = category?.color || "#gray";

      acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(categorySpending)
    .map(([name, value]) => {
      const category = categories.find((cat) => cat.name === name);
      return {
        name,
        value,
        color: category?.color || "#84cc16",
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 8); // Top 8 categories

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            Amount:{" "}
            <span className="font-medium text-destructive">
              {formatCurrency(data.value)}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Percentage:{" "}
            <span className="font-medium">
              {(
                (data.value /
                  chartData.reduce((sum, item) => sum + item.value, 0)) *
                100
              ).toFixed(1)}
              %
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
        <div className="font-medium mb-5">Spending by Category</div>
      </div>
      <div>
        {chartData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No expense data available</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
export default SpendingByCategoryChart;
