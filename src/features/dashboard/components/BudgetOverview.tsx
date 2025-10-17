import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Progress } from "../../../components/ui/progress";
import { calculateBudgetProgress, formatCurrency, getBudgetStatus } from "../../../utils/finance";
import { useAppSelector } from "../../../lib/redux/hooks";

const BudgetOverview = () => {
  const budgets = useAppSelector((state) => state.budgets.budgets);
  const categories = useAppSelector((state) => state.categories.categories);

  const getCategoryInfo = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: "Unknown",
        color: "#gray",
      }
    );
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "danger":
        return "bg-destructive";
      case "warning":
        return "bg-chart-3";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 shadow">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between px-5 text-foreground">
          <div className="text-foreground font-semibold">Budget Overview</div>
          <div className="flex items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-2 py-1.5">
            <span className="text-sm font-medium">Manage Budgets</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="px-5">
          {budgets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No budgets set</p>
              <p className="text-sm text-muted-foreground">
                Create budgets to track your spending
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {budgets.slice(0, 4).map((budget) => {
                const category = getCategoryInfo(budget.category);
                const progress = calculateBudgetProgress(budget);
                const status = getBudgetStatus(budget);

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{category.name}</span>
                      <span className="text-muted-foreground">
                        {formatCurrency(budget.spent)} /{" "}
                        {formatCurrency(budget.limit)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(progress, 100)}
                      className="h-2"
                      indicatorClassName={getProgressColor(status)}
                    />
                    {status === "danger" && (
                      <p className="text-xs text-destructive">
                        <span>Over budget by</span>
                        {formatCurrency(budget.spent - budget.limit)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
