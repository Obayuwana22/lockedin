import { useState } from "react";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import OutletHeaders from "../../../components/OutletHeaders";
import { PlusCircle } from "lucide-react";
import OutletNav from "../../../components/OutletNav";
import type { Transaction } from "../../../types";

const Transactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };
  return (
    <div>
      <OutletNav />
      <div className="md:flex md:flex-row md:items-center md:justify-between">
        <OutletHeaders
          title="Transactions"
          subtitle="Manage your income and expenses"
        />
        <button
          type="button"
          onClick={handleAddTransaction}
          className="flex items-center gap-5 bg-primary text-sm text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 cursor-pointer mb-5 md:mb-0 md:text-base"
        >
          <PlusCircle className="w-4 h-4" />
          Add Transaction
        </button>
      </div>
      {showForm && (
        <TransactionForm
          transaction={editingTransaction || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
      <TransactionList onEditTransaction={handleEditTransaction} />
    </div>
  );
};

export default Transactions;
