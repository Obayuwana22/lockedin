import OutletHeaders from "../../../components/OutletHeaders";
import OutletNav from "../../../components/OutletNav";
import FinancialInsights from "./FinancialInsights";
import SpendingByCategoryChart from "./SpendingByCategoryChart";
import IncomeVsExpensesChart from "./IncomeVsExpenseChart";
import SpendingTrendChart from './SpendingTrendChart'

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <OutletNav />
      <OutletHeaders
        title="Data Management"
        subtitle="Backup, restore, and manage your financial data"
      />
      {/* Financial Insights */}
      <FinancialInsights />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingByCategoryChart />
        <IncomeVsExpensesChart />
      </div>

      {/* Full Width Chart */}
      <SpendingTrendChart />
    </div>
  );
};
export default Analytics;
