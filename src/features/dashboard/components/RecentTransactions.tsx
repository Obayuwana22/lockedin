import React from "react";
import { ArrowUpRight } from "lucide-react";

const RecentTransactions = () => {
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 w-full shadow">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between pl-5 pr-5 ">
          <div className="text-foreground font-semibold">Recent Transactions</div>
          <div className="flex items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-2 py-1.5">
            <span className="text-sm font-medium">View All</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex justify-between px-8">
          <div className="flex items-center gap-3">
            <ArrowUpRight className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm" />
            <div>
              <div className="font-medium text-foreground">Salary Deposit</div>
              <div className="text-sm text-muted-foreground">Salary</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-accent">+$3,500.00</div>
            <div className="text-xs text-muted-foreground">15/09/2025</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
