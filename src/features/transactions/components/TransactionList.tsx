import { Select } from "@radix-ui/react-select";
import {Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { deleteTransaction } from "../../../lib/redux/slices/transactionsSlice";
import type { Transaction } from "../../../types";
import { formatCurrency } from "../../../utils/finance";

interface TransactionListProps {
  onEditTransaction?: (transaction: Transaction) => void;
}

const TransactionList = ({ onEditTransaction }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "description">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const dispatch = useAppDispatch();
  const transaction = useAppSelector(
    (state) => state.transactions.transactions
  );
  const categories = useAppSelector((state) => state.categories.categories);

  const getCategoryInfo = (categoryId: string) => {
    return (
      categories.find((cat) => cat.id === categoryId) || {
        name: "Unknown",
        icon: "❓",
        color: "#gray",
      }
    );
  };

  const filteredAndSortedTransactions = transaction
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "description":
          comparison = a.description.localeCompare(b.description);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const totalAmount = filteredAndSortedTransactions.reduce((sum, transaction) => {
    return transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount
  }, 0)

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 w-full shadow">
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between">
          <div className="text-foreground font-semibold">
            Transactions
            <span className="text-xs ml-5">
              {filteredAndSortedTransactions.length}
            </span>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Total:</span>
            <span className={`font-medium ${totalAmount >= 0 ? "text-accent" : "text-destructive"}`}>
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>

        {/* filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm ">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name=""
              id=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="pl-10 py-2 shadow-border-bottom focus:outline-4 focus:outline-ring/50 w-full"
            />
          </div>

          <div>
            <Select
              value={typeFilter}
              onValueChange={(value: "all" | "income" | "expense") => {
                setTypeFilter(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(value) => {
                const [field, order] = value.split("-");
                setSortBy(field as "date" | "amount" | "description");
                setSortOrder(order as "asc" | "desc");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="amount-desc">
                  Amount (High to Low)
                </SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                <SelectItem value="description-asc">
                  Description (A-Z)
                </SelectItem>
                <SelectItem value="description-desc">
                  Description (Z-A)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* transaction list */}
        {filteredAndSortedTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or add a new transaction
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredAndSortedTransactions.map((transaction) => {
              const category = getCategoryInfo(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex justify-center items-center">
                      <div>{category.icon}</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.description}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        <span>{category.name}</span> <span>•</span>{" "}
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div
                      className={`flex items-center ${
                        transaction.type === "income" ? "gap-3" : "gap-5"
                      }`}
                    >
                      <div
                        className={`font-medium ${
                          transaction.type === "income"
                            ? "text-accent"
                            : "text-destructive"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        $5
                      </div>
                      <div
                        className={`text-xs font-medium ${
                          transaction.type === "income"
                            ? "text-primary-foreground bg-primary rounded-full px-2 py-0.5"
                            : ""
                        }`}
                      >
                        {transaction.type}
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => onEditTransaction?.(transaction)}
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
