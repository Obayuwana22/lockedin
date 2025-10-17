import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import transactionsReducer from "./slices/transactionsSlice";
import budgetsReducer from "./slices/budgetsSlice";
import { persistenceMiddleware } from "./middleware/persistenceMiddleware";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
    budgets: budgetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
