import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../../types";

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    type: "all" | "income" | "expense";
    dateRange: {
      from: string;
      to: string;
    };
  };
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  filters: {
    category: "all",
    type: "all",
    dateRange: {
      from: "",
      to: "",
    },
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
