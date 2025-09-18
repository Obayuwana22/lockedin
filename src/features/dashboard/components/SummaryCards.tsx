import React from "react";
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";

const SummaryCards = () => {
  const cards = [
    {
      title: "Total Balance",
      value: "$3,443.81",
      change: "+2.5% from last month",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Total Balance",
      value: "$3,700.00",
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Total Balance",
      value: "$256.19",
      change: "-5% from last month",
      icon: TrendingDown,
      color: "text-destructive",
    },
    {
      title: "Total Balance",
      value: "93.1%",
      change: "+3% from last month",
      icon: PieChart,
      color: "text-primary",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-5">
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
