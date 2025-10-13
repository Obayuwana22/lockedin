import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types";

const defaultCategories: Category[] = [
  { id: "1", name: "Food & Dining", color: "#f59e0b", icon: "🍽️", type: "expense" },
  { id: "2", name: "Transportation", color: "#3b82f6", icon: "🚗", type: "expense" },
  { id: "3", name: "Shopping", color: "#ec4899", icon: "🛍️", type: "expense" },
  { id: "4", name: "Entertainment", color: "#8b5cf6", icon: "🎬", type: "expense" },
  { id: "5", name: "Bills & Utilities", color: "#ef4444", icon: "⚡", type: "expense" },
  { id: "6", name: "Healthcare", color: "#06b6d4", icon: "🏥", type: "expense" },
  { id: "7", name: "Salary", color: "#22c55e", icon: "💰", type: "income" },
  { id: "8", name: "Freelance", color: "#84cc16", icon: "💼", type: "income" },
  { id: "9", name: "Investments", color: "#15803d", icon: "📈", type: "income" },
];

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: defaultCategories,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: () => {}
  },
});

export const {addCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;