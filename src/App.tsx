import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./features/dashboard";
import { Transactions } from "./features/transactions";
import { Budgets } from "./features/budgets";
import { Analytics } from "./features/analytics";
import { Data } from "./features/data";
import Landing from "./pages/Landing";
import { PersistentApp } from "./PersistentApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        // element: <Transactions />,
        element: <Transactions />,
      },
      {
        path: "budgets",
        element: <Budgets />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "data",
        element: <Data />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-sans">
      <PersistentApp router={router} />
    </div>
  );
}

export default App;
