import type { Middleware } from "@reduxjs/toolkit"
import { storageManager } from "../../../utils/storage"

// Debounce utility
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout:ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
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
]

// Debounced save functions
const debouncedSaveTransactions = debounce((transactions: any[]) => {
  storageManager.saveTransactions(transactions)
}, 500)

const debouncedSaveBudgets = debounce((budgets: any[]) => {
  storageManager.saveBudgets(budgets)
}, 500)

const debouncedSaveCategories = debounce((categories: any[]) => {
  storageManager.saveCategories(categories)
}, 500)

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  // Only persist if action is in the persistable list
  if (PERSISTABLE_ACTIONS.some((prefix) => action.type.startsWith(prefix))) {
    const state = store.getState()

    // Save relevant state slices
    if (action.type.startsWith("transactions/")) {
      debouncedSaveTransactions(state.transactions.transactions)
    }

    if (action.type.startsWith("budgets/")) {
      debouncedSaveBudgets(state.budgets.budgets)
    }

    if (action.type.startsWith("categories/")) {
      debouncedSaveCategories(state.categories.categories)
    }
  }

  return result
}
