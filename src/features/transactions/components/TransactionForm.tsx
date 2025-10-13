import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import * as z from "zod";
import type { Transaction } from "../../../types";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateId } from "../../../utils/finance";
import {
  addTransaction,
  updateTransaction,
} from "../../../lib/redux/slices/transactionsSlice";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
  }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  description: z
    .string()
    .min(1, "Description is required")
    .max(100, "Description must be less 100 characters"),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  transaction?: Transaction;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TransactionForm = ({
  transaction,
  onSuccess,
  onCancel,
}: TransactionFormProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: transaction?.amount.toString() || "",
      description: transaction?.description || "",
      category: transaction?.category || "",
      date: transaction?.date || new Date().toISOString().split("T")[0],
    },
  });
  const selectedCategory = watch("category");
  const watchedType = watch("type");
  const filteredCategories = categories.filter(
    (cat) => cat.type === watchedType
  );

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      const transactionData: Transaction = {
        id: transaction?.id || generateId(),
        type: data.type,
        amount: Number(data.amount),
        description: data.description,
        category: data.category,
        date: data.date,
        createdAt: transaction?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (transaction) {
        dispatch(updateTransaction(transactionData));
      } else {
        dispatch(addTransaction(transactionData));
      }
      onSuccess?.();
    } catch (error) {
      console.log("Error saving transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-sm border border-sidebar-border rounded-lg bg-sidebar py-6 px-5 w-full shadow mb-5">
      <div className="">
        <div className="text-foreground font-semibold">
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 mt-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type">Type</label>
              <Select
                value={watchedType}
                onValueChange={(value: "income" | "expense") => {
                  setValue("type", value);
                  setValue("category", ""); // Reset category when type changes
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
                className="px-3 py-2 shadow-border-bottom focus:outline-4 focus:outline-ring/50 "
              />
              {errors.amount && (
                <p className="text-sm text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              {...register("description")}
              placeholder="Enter transaction description"
              className="px-3 py-2 shadow-border-bottom  focus:outline-4 focus:outline-ring/50 "
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  {filteredCategories.map((category) => (
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

            <div className="flex flex-col gap-1">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                {...register("date")}
                className="px-3 py-2 shadow-border-bottom appearance-none focus:outline-4 focus:outline-ring/50"
              />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
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
                : transaction
                ? "Update Transaction"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
