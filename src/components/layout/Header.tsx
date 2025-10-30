import { Bell, Search, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../lib/redux/hooks";
import { calculateFinancialSummary, formatCurrency } from "../../utils/finance";
import { useEffect, useState } from "react";

const routeInfo: Record<string, { title: string; subTitle: string }> = {
  "/": {
    title: "Dashboard",
    subTitle: "Welcome back! Here's your financial overview",
  },
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

const Header = () => {
  const location = useLocation();
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const summary = calculateFinancialSummary(transactions);

  const { title, subTitle } = routeInfo[location.pathname] || {
    title: "Page Not Found",
    subTitle: "",
  };

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setIsBalanceVisible(false);
      } else {
        setIsBalanceVisible(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-card/50 border-b border-sidebar-border py-2 px-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
            {subTitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isBalanceVisible && (
            <div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Current Balance
              </div>
              {/* net amount will be calculated based on user profit and loss */}
              <div
                className={`font-semibold text-right text-xs sm:text-sm md:text-base lg:text-lg ${
                  summary.netIncome >= 0 ? "text-accent" : "text-destructive"
                }`}
              >
                {formatCurrency(summary.netIncome)}
              </div>
            </div>
          )}
          <div className="flex gap-0.5 md:gap-2">
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
            {/* <Link to="/sign-up"> */}
            <button
              type="button"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
            >
              <User className="h-4 w-4" />
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
