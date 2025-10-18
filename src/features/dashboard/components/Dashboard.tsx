import SummaryCards from "./SummaryCards";
import RecentTransactions from "./RecentTransactions";
import BudgetOverview from "./BudgetOverview";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentTransactions />
          <BudgetOverview />
        </div>
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
