// src/PersistentApp.tsx
import { useDataPersistence } from "./hooks/use-data-persistence";
import { RouterProvider, type RouterProviderProps } from "react-router-dom";

export function PersistentApp({ router }: RouterProviderProps) {
  useDataPersistence(); // loads data once on mount

  return <RouterProvider router={router} />;
}
