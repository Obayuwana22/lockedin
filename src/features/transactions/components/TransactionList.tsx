import { DollarSign } from "lucide-react";
import React from "react";

const TransactionList = () => {
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar py-6 w-full shadow">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between pl-5 pr-5">
          <div className="text-foreground font-semibold">
            Transactions <span>6</span>
          </div>

          <div className="flex items-center text-sm">
            <span className="font-medium text-muted-foreground">Total:</span>
            <DollarSign className="h-3 w-3 text-accent" />
            <span className="text-accent">3,440.81</span>
          </div>
        </div>

        {/* <div className="flex justify-between px-8">
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
        </div> */}
      </div>
    </div>
  );
};

export default TransactionList;
