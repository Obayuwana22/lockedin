import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  Budgets,
  Dashboard,
  Transactions,
  Analytics,
  Data,
} from "./components";
import Landing from "./pages/Landing";

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
