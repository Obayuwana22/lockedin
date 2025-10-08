import { Select } from "@radix-ui/react-select";
import { DollarSign, Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/Select";
import { useAppSelector } from "../../../lib/redux/hooks";

const TransactionList = ({ onEditTransaction }: {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("date-desc");
  const categories = useAppSelector((state) => state.categories.categories);

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 w-full shadow">
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between">
          <div className="text-foreground font-semibold">
            Transactions <span>6</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium text-muted-foreground">Total:</span>
            <DollarSign className="h-3 w-3 text-accent" />
            <span className="text-accent">3,440.81</span>
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
            <Select value={dateFilter} onValueChange={setDateFilter}>
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

        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="w-10 h-10 bg-red-500 rounded-full flex justify-center items-center">
                <div>hi</div>
              </div>
              <div>
                <div className="font-medium">Parfait</div>
                <div className="text-muted-foreground text-sm">
                  <span>Shopping</span> <span>•</span> <span>Shopping</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-5">
                <div className="text-base text-destructive">-$5.00</div>
                <div className="text-xs font-medium">expense</div>
              </div>
              <div>
                <button
                  type="button"
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
