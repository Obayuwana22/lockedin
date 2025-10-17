import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import * as z from "zod";
import type { Budget } from "../../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addBudget,
  updateBudget,
} from "../../../lib/redux/slices/budgetsSlice";
import { generateId } from "../../../utils/finance";

const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  limit: z
    .string()
    .min(1, "Budget limit is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Budget limit must be a positive number",
    }),
  period: z.enum(["weekly", "monthly", "yearly"], {
    required_error: "Period is required",
  }),
});

type BudgetFormData = z.infer<typeof budgetSchema>;

interface BudgetFormProps {
  budget?: Budget;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BudgetForm = ({ budget, onSuccess, onCancel }: BudgetFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const budgets = useAppSelector((state) => state.budgets.budgets);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter out categories that already have budgets (unless editing)
  const availableCategories = categories.filter((cat) => {
    if (cat.type !== "expense") return false;
    if (budget && cat.id === budget.category) return true;
    return !budgets.some((b) => b.category === cat.id);
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: budget?.category || "",
      limit: budget?.limit.toString() || "",
      period: budget?.period || "monthly",
    },
  });

  const onSubmit = async (data: BudgetFormData) => {
    setIsSubmitting(true);
    try {
      const budgetData: Budget = {
        id: budget?.id || generateId(),
        category: data.category,
        limit: Number(data.limit),
        spent: budget?.spent || 0,
        period: data.period,
        createdAt: budget?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (budget) {
        dispatch(updateBudget(budgetData));
      } else {
        dispatch(addBudget(budgetData));
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving budget:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = watch("category");

  return (
    <div className="text-sm border border-sidebar-border rounded-lg bg-sidebar py-6 px-5 w-full shadow mb-5">
      <div className="">
        <div className="text-foreground font-semibold">
          {budget ? "Edit Budget" : "Create New Budget"}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 mt-5"
        >
          <div>
            <label htmlFor="category">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger
                className={`mt-1 ${
                  selectedCategory ? "" : "text-muted-foreground"
                }`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="limit">Budget Limit ($)</label>
              <input
                type="number"
                id="limit"
                step="0.01"
                placeholder="0.00"
                {...register("limit")}
                className="px-3 py-2 shadow-border-bottom focus:outline-4 focus:outline-ring/50 "
              />
              {errors.limit && (
                <p className="text-sm text-destructive">
                  {errors.limit.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="period">Period</label>
              <Select
                value={watch("period")}
                onValueChange={(value: "weekly" | "monthly" | "yearly") =>
                  setValue("period", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {errors.period && (
                <p className="text-sm text-destructive">
                  {errors.period.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end text-base">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-background hover:text-background hover:bg-accent px-5 py-1.5 rounded-lg cursor-pointer hover-transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground px-5 py-1.5 rounded-lg hover:opacity-90 cursor-pointer"
            >
              {isSubmitting
                ? "Saving..."
                : budget
                ? "Update Budget"
                : "Create Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
