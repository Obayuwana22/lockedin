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
      <div className="flex items-center justify-between mb-5">
        <OutletHeaders
          title="Transactions"
          subtitle="Manage your income and expenses"
        />
        <button
          type="button"
          onClick={handleAddTransaction}
          className="flex items-center gap-5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 cursor-pointer"
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
