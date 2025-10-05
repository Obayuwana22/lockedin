import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import { nanoid } from "nanoid";

const defaultCategories: Category[] = [
  { id: nanoid(), name: "Food & Dining", icon: "🍽️", type: "expense" },
  { id: nanoid(), name: "Transportation", icon: "🚗", type: "expense" },
  { id: nanoid(), name: "Shopping", icon: "🛍️", type: "expense" },
  { id: nanoid(), name: "Entertainment", icon: "🎬", type: "expense" },
  { id: nanoid(), name: "Bills & Utilities", icon: "⚡", type: "expense" },
  { id: nanoid(), name: "Healthcare", icon: "🏥", type: "expense" },
  { id: nanoid(), name: "Salary", icon: "💰", type: "income" },
  { id: nanoid(), name: "Freelance", icon: "💼", type: "income" },
  { id: nanoid(), name: "Investments", icon: "📈", type: "income" },
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
  },
});

export const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
console.log(categoriesSlice)