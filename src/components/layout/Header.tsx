import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const routeInfo: Record<string, { title: string; subTitle: string }> = {
    "/dashboard": {
      title: "Dashboard",
      subTitle: "Welcome back! Here's your financial overview",
    },
    "/transactions": {
      title: "Transactions",
      subTitle: "Manage your income and expenses",
    },
    "/budgets": {
      title: "Budgets",
      subTitle: "Set and track your spending limits",
    },
    "/analytics": {
      title: "Analytics",
      subTitle: "Analyze your financial patterns and trends",
    },
    "/data": {
      title: "Data",
      subTitle: "Backup, restore, and manage your financial data",
    },
  };

  const { title, subTitle } = routeInfo[location.pathname] || {
    title: "Page Not Found",
    subTitle: "",
  };

  return (
    <div className="bg-card/50 border-b border-sidebar-border py-2 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <div className="text-sm text-muted-foreground">Current Balance</div>
            {/* net amount will be calculated based on user profit and loss */}
            <div className="font-semibold text-accent text-right">
              $3.443.81
            </div>
          </div>
          <div className="space-x-2">
            <button
              type="button"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
