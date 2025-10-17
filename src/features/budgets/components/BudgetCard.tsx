import { AlertTriangle, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
import { Progress } from "../../../components/ui/progress";
import type { Budget } from "../../../types";
import { useAppSelector } from "../../../lib/redux/hooks";
import {
  calculateBudgetProgress,
  formatCurrency,
  getBudgetStatus,
} from "../../../utils/finance";

interface BudgetCardProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
  onDelete?: (budgetId: string) => void;
}

const BudgetCard = ({ budget, onEdit, onDelete }: BudgetCardProps) => {
  const categories = useAppSelector((state) => state.categories.categories);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  const category = categories.find((cat) => cat.id === budget.category);
  const progress = calculateBudgetProgress(budget);
  const status = getBudgetStatus(budget);
  const remaining = budget.limit - budget.spent;

  // Calculate recent spending (last 7 days)
  const recentSpending = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return (
        t.category === budget.category &&
        t.type === "expense" &&
        transactionDate >= weekAgo
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusIcon = () => {
    switch (status) {
      case "danger":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-chart-3" />;
      default:
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "danger":
        return "bg-destructive";
      case "warning":
        return "bg-chart-3";
      default:
        return "bg-primary";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "danger":
        return "Over Budget";
      case "warning":
        return "Near Limit";
      default:
        return "On Track";
    }
  };

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
      <div className="pb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              {category?.icon || "❓"}
            </div>
            <div>
              <div className="text-lg font-semibold">
                {category?.name || "Unknown Category"}
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs border border-sidebar-border px-2 rounded-full">{budget.period}</div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon()}
                  <span className="text-xs text-muted-foreground">
                    {getStatusText()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mr-5">
            <button type="button" onClick={() => onEdit?.(budget)} className="cursor-pointer">
              <Edit className="h-4 w-4" />
            </button>
            <button
            type="button"
              onClick={() => onDelete?.(budget.id)}
              className="text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">
              {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
            </span>
          </div>
          <Progress
            value={Math.min(progress, 100)}
            className="h-3"
            indicatorClassName={getStatusColor()}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.toFixed(1)}% used</span>
            <span>
              {remaining >= 0
                ? `${formatCurrency(remaining)} remaining`
                : `${formatCurrency(Math.abs(remaining))} over`}
            </span>
          </div>
        </div>

        {/* Recent Activity */}
        {recentSpending > 0 && (
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last 7 days</span>
              <span className="text-sm font-medium text-destructive">
                -{formatCurrency(recentSpending)}
              </span>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {status === "danger" && (
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              Budget exceeded!
            </p>
            <p className="text-xs text-destructive/80">
              You've spent {formatCurrency(Math.abs(remaining))} more than your
              budget limit.
            </p>
          </div>
        )}

        {status === "warning" && (
          <div className="bg-chart-3/10 border border-chart-3/20 p-3 rounded-lg">
            <p className="text-sm text-chart-3 font-medium">
              Approaching limit
            </p>
            <p className="text-xs text-chart-3/80">
              You have {formatCurrency(remaining)} left in this budget.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
