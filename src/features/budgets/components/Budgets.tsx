import { useState } from "react";
import OutletNav from "../../../components/OutletNav";
import OutletHeaders from "../../../components/OutletHeaders";
import BudgetSummary from "./BudgetSummary";
import BudgetForm from "./BudgetForm";
import type { Budget } from "../../../types";

const Budgets = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleAddBudget = () => {
    setEditingBudget(null);
    setShowForm(true);
  };

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBudget(null);
  };
  return (
    <div>
      <OutletNav />
      <div>
        <OutletHeaders
          title="Budget Tracking"
          subtitle="Set spending limits and track your progress"
        />
      </div>
      {showForm && (
        <BudgetForm
          budget={editingBudget || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
      
      <BudgetSummary
        onAddBudget={handleAddBudget}
        onEditBudget={handleEditBudget}
      />
    </div>
  );
};

export default Budgets;
