import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import BudgetCard from "./BudgetCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import type { Budget } from "../../../types";
import { deleteBudget } from "../../../lib/redux/slices/budgetsSlice";
import { formatCurrency } from "../../../utils/finance";

interface BudgetListProps {
  onEditBudget: (budget: Budget) => void;
  onAddBudget: () => void;
}

const BudgetSummary = ({ onEditBudget, onAddBudget }: BudgetListProps) => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.budgets.budgets);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "safe" | "warning" | "danger"
  >("all");
  const [periodFilter, setPeriodFilter] = useState<
    "all" | "weekly" | "monthly" | "yearly"
  >("all");

  const getBudgetStatus = (budget: Budget): "safe" | "warning" | "danger" => {
    const progress = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
    if (progress >= 100) return "danger";
    if (progress >= 80) return "warning";
    return "safe";
  };

  const filteredBudgets = budgets.filter((budget) => {
    const status = getBudgetStatus(budget);
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesPeriod =
      periodFilter === "all" || budget.period === periodFilter;
    return matchesStatus && matchesPeriod;
  });

  const handleDeleteBudget = (budgetId: string) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      dispatch(deleteBudget(budgetId));
    }
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = budgets.filter(
    (budget) => getBudgetStatus(budget) === "danger"
  ).length;

  return (
    <div>
      <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
        <div className="flex items-center justify-between mb-10">
          <div>Budget Summary</div>
          <button
            type="button"
            onClick={onAddBudget}
            className="flex items-center gap-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 cursor-pointer text-sm lg:text-base lg:gap-5"
          >
            <PlusCircle className="w-4 h-4" />
            Add Budget
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(totalBudget)}
            </p>
            <p className="text-sm text-muted-foreground">Total Budget</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(totalSpent)}
            </p>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {formatCurrency(totalBudget - totalSpent)}
            </p>
            <p className="text-sm text-muted-foreground">Remaining</p>
          </div>
        </div>
        {overBudgetCount > 0 && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              {overBudgetCount} budget{overBudgetCount > 1 ? "s" : ""} over
              limit
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between my-5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs md:text-base">
            <label htmlFor="type" className="hidden md:block">Filter by status:</label>
            <Select
              value={statusFilter}
              onValueChange={(value: "all" | "safe" | "warning" | "danger") =>
                setStatusFilter(value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="safe">On Track</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="danger">Over Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-base">
            <label htmlFor="type" className="hidden md:block">Filter by periods:</label>
            <Select
              value={periodFilter}
              onValueChange={(value: "all" | "weekly" | "monthly" | "yearly") =>
                setPeriodFilter(value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className=" bg-sidebar px-3 py-1 rounded-full text-xs font-semibold">
          <span className="mr-1">{filteredBudgets.length}</span>
          <span>budgets</span>
        </div>
      </div>
      {filteredBudgets.length === 0 ? (
        <div className="flex flex-col items-center py-8"> 
          <p className="text-muted-foreground">No budgets found</p>
          <p className="text-sm text-muted-foreground">
            Create your first budget to start tracking your spending
          </p>
          <button
            type="button"
            onClick={onAddBudget}
            className="flex items-center gap-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 cursor-pointer mt-5 text-sm lg:text-base lg:gap-5"
          >
            <PlusCircle className="w-4 h-4" />
            Create Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBudgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onEdit={onEditBudget}
              onDelete={handleDeleteBudget}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;
