"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../lib/redux/hooks";
import { setTransactions } from "../lib/redux/slices/transactionsSlice";
import { setBudgets } from "../lib/redux/slices/budgetsSlice";
import { setCategories } from "../lib/redux/slices/categoriesSlice";
import { storageManager } from "../utils/storage";
// import { sampleTransactions, sampleBudgets } from "../sampleData";

export function useDataPersistence() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load data from localStorage on app start
    const loadPersistedData = () => {
      try {
        const transactions = storageManager.loadTransactions();
        const budgets = storageManager.loadBudgets();
        const categories = storageManager.loadCategories();

        dispatch(setTransactions(transactions));
        dispatch(setBudgets(budgets));

        // If no data exists, load sample data
        // if (transactions.length === 0 && budgets.length === 0) {
        //   dispatch(setTransactions(sampleTransactions))
        //   dispatch(setBudgets(sampleBudgets))
        // } else {
        //   dispatch(setTransactions(transactions))
        //   dispatch(setBudgets(budgets))
        // }

        // Always load categories (they include defaults)
        if (categories.length > 0) {
          dispatch(setCategories(categories));
        }
      } catch (error) {
        console.error("Failed to load persisted data:", error);
        // Fallback to sample data
        // dispatch(setTransactions(sampleTransactions))
        // dispatch(setBudgets(sampleBudgets))
      }
    };

    loadPersistedData();
  }, [dispatch]);
}
