import React from "react";
import SummaryCards from "./SummaryCards";
import RecentTransactions from "./RecentTransactions";
import BudgetOverview from "./BudgetOverview";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <section>
        <SummaryCards />
      </section>
      <section className="flex gap-5">
        <RecentTransactions />
        <QuickActions />
      </section>
      <section>
        <BudgetOverview />
      </section>
    </div>
  );
};

export default Dashboard;
