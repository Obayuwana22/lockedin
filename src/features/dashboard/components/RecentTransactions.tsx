import { ArrowUpRight } from "lucide-react";
import { useAppSelector } from "../../../lib/redux/hooks";
import { formatCurrency } from "../../../utils/finance";
import { Link } from "react-router-dom";

const RecentTransactions = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const categories = useAppSelector((state) => state.categories.categories);

  // Get the 5 most recent transaction
  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getCategoryInfo = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: "Unknown",
        icon: "❓",
        color: "#gray",
      }
    );
  };
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 w-full shadow">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between pl-5 pr-5 ">
          <div className="text-foreground font-semibold">
            Recent Transactions
          </div>
          <Link to="/transactions" className="flex items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-2 py-1.5 transition-colors">
            <span className="text-sm font-medium">View All</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="px-5">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground">
                Add your first transaction to get started
              </p>
            </div>
          ) : (
            <div>
              {recentTransactions.map((transaction) => {
                const category = getCategoryInfo(transaction.category);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm">
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {category.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-medium ${
                          transaction.type === "income"
                            ? "text-accent"
                            : "text-destructive"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
