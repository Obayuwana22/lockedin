import type { Middleware } from "@reduxjs/toolkit";
import { storageManager } from "../../../utils/storage";
import type { Transaction, Budget, Category } from "../../../types";

// Debounce utility
function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Actions that should trigger persistence
const PERSISTABLE_ACTIONS = [
  "transactions/addTransaction",
  "transactions/updateTransaction",
  "transactions/deleteTransaction",
  "transactions/setTransactions",
  "budgets/addBudget",
  "budgets/updateBudget",
  "budgets/deleteBudget",
  "budgets/setBudgets",
  "budgets/updateBudgetSpent",
  "categories/addCategory",
  "categories/updateCategory",
  "categories/deleteCategory",
  "categories/setCategories",
] as const;

// Debounced save functions
const debouncedSaveTransactions = debounce((transactions: Transaction[]) => {
  storageManager.saveTransactions(transactions);
}, 500);

const debouncedSaveBudgets = debounce((budgets: Budget[]) => {
  storageManager.saveBudgets(budgets);
}, 500);

const debouncedSaveCategories = debounce((categories: Category[]) => {
  storageManager.saveCategories(categories);
}, 500);

export const persistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Only persist if action is in the persistable list and has a type property
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof (action as { type: string }).type === "string" &&
      PERSISTABLE_ACTIONS.some((prefix) =>
        (action as { type: string }).type.startsWith(prefix)
      )
    ) {
      const state = store.getState();

      // Save relevant state slices
      if ((action as { type: string }).type.startsWith("transactions/")) {
        debouncedSaveTransactions(state.transactions.transactions);
      }

      if ((action as { type: string }).type.startsWith("budgets/")) {
        debouncedSaveBudgets(state.budgets.budgets);
      }

      if ((action as { type: string }).type.startsWith("categories/")) {
        debouncedSaveCategories(state.categories.categories);
      }
    }

    return result;
  };
