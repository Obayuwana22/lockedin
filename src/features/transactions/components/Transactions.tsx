import React from "react";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import OutletHeaders from "../../../components/OutletHeaders";
import { PlusCircle } from "lucide-react";
import OutletNav from "../../../components/OutletNav";

const Transactions = () => {
  return (
    <div>
      <OutletNav />
      <div className="flex items-center justify-between">
        <OutletHeaders
          title="Transactions"
          subtitle="Manage your income and expenses"
        />
        <button
          type="button"
          className="flex items-center gap-5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90"
        >
          <PlusCircle className="w-4 h-4" />
          Add Transaction
        </button>
      </div>
      {/* <TransactionForm/> */}
      <TransactionList />
    </div>
  );
};

export default Transactions;
