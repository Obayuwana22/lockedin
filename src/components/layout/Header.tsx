import React from "react";
import { Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
// import Logo from "../Logo";

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
        {/* <div className="border-b border-sidebar-border">
          <Logo />
        </div> */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subTitle}</p>
        </div>

        <div className="flex gap-5">
          <button type="button">
            <Bell className="h-4 w-4" />
          </button>
          <button type="button">
            <Search className="h-4 w-4" />
          </button>
          <button type="button">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
