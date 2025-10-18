import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { useAppSelector } from "../../../lib/redux/hooks";
import {
  calculateFinancialSummary,
  formatCurrency,
} from "../../../utils/finance";

const SummaryCards = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const summary = calculateFinancialSummary(transactions);
  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(summary.netIncome),
      change:
        summary.netIncome > 0
          ? "+2.5% from last month"
          : "-1.2% from last month",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Total Balance",
      value: formatCurrency(summary.monthlyIncome),
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Total Balance",
      value: formatCurrency(summary.monthlyExpenses),
      change: "-5% from last month",
      icon: TrendingDown,
      color: "text-destructive",
    },
    {
      title: "Total Balance",
      value: `${summary.savingsRate.toFixed(1)}%`,
      change: "+3% from last month",
      icon: PieChart,
      color: "text-primary",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="flex flex-col gap-10 border border-sidebar-border rounded-lg p-5 bg-sidebar shadow"
          >
            <div className="flex justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                {card.title}
              </div>

              <Icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {card.value}
              </div>
              <div className="text-xs text-muted-foreground">{card.change}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
