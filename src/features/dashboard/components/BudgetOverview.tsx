import { ArrowUpRight } from "lucide-react";
import React from "react";

const BudgetOverview = () => {
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 shadow">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between pl-5 pr-5 text-foreground">
          <div className="text-foreground font-semibold">Budget Overview</div>
          <div className="flex items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-2 py-1.5">
            <span className="text-sm font-medium">Manage Budgets</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center justify-between px-8">
          <div>
            <div className="text-foreground">Food $ Dinning</div>
            <input type="range" name="" id="" />
          </div>

          <div className="text-muted-foreground">$85.32 / $500.00</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
