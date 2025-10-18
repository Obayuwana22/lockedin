import { useAppSelector } from "../../../lib/redux/hooks"
import { formatCurrency } from "../../../utils/finance"
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign } from "lucide-react"

const FinancialInsights = () => {
  const transactions = useAppSelector((state) => state.transactions.transactions)
  const budgets = useAppSelector((state) => state.budgets.budgets)
  const categories = useAppSelector((state) => state.categories.categories)

  // Calculate insights
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const lastMonthTransactions = transactions.filter((t) => {
    const date = new Date(t.date)
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
  })

  const currentMonthIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const currentMonthExpenses = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const lastMonthIncome = lastMonthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const lastMonthExpenses = lastMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const incomeChange = lastMonthIncome > 0 ? ((currentMonthIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0
  const expenseChange =
    lastMonthExpenses > 0 ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0

  // Find top spending category
  const categorySpending = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const topSpendingCategory = Object.entries(categorySpending).reduce(
    (max, [categoryId, amount]) => {
      if (amount > max.amount) {
        const category = categories.find((cat) => cat.id === categoryId)
        return { categoryId, amount, name: category?.name || "Unknown" }
      }
      return max
    },
    { categoryId: "", amount: 0, name: "" },
  )

  // Budget insights
  const overBudgetCategories = budgets.filter((budget) => budget.spent > budget.limit)
  const nearLimitBudgets = budgets.filter((budget) => {
    const progress = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0
    return progress >= 80 && progress < 100
  })

  const insights = [
    {
      title: "Monthly Income Trend",
      value: formatCurrency(currentMonthIncome),
      change: incomeChange,
      icon: incomeChange >= 0 ? TrendingUp : TrendingDown,
      color: incomeChange >= 0 ? "text-accent" : "text-destructive",
      description: `${incomeChange >= 0 ? "+" : ""}${incomeChange.toFixed(1)}% vs last month`,
    },
    {
      title: "Monthly Expenses Trend",
      value: formatCurrency(currentMonthExpenses),
      change: expenseChange,
      icon: expenseChange <= 0 ? TrendingDown : TrendingUp,
      color: expenseChange <= 0 ? "text-accent" : "text-destructive",
      description: `${expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(1)}% vs last month`,
    },
    {
      title: "Top Spending Category",
      value: formatCurrency(topSpendingCategory.amount),
      change: 0,
      icon: DollarSign,
      color: "text-primary",
      description: topSpendingCategory.name || "No expenses this month",
    },
    {
      title: "Budget Alerts",
      value: `${overBudgetCategories.length + nearLimitBudgets.length}`,
      change: 0,
      icon: AlertTriangle,
      color:
        overBudgetCategories.length > 0
          ? "text-destructive"
          : nearLimitBudgets.length > 0
            ? "text-chart-3"
            : "text-accent",
      description: `${overBudgetCategories.length} over, ${nearLimitBudgets.length} near limit`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow" >
        <div className="mb-5">
          <div className="font-medium">Financial Insights</div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${insight.color}`} />
                    {insight.change !== 0 && (
                      <div className={`text-xs ${insight.change >= 0 ? "default" : "destructive"}`}>
                        {insight.change >= 0 ? "+" : ""}
                        {insight.change.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.title}</p>
                  <p className="text-lg font-bold text-foreground">{insight.value}</p>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Status */}
        <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
          <div >
            <div className="flex items-center space-x-2 mb-5 font-medium">
              <Target className="h-5 w-5" />
              <span>Budget Status</span>
            </div>
          </div>
          <div>
            {budgets.length === 0 ? (
              <p className="text-muted-foreground">No budgets set up</p>
            ) : (
              <div className="space-y-3">
                {overBudgetCategories.length > 0 && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="font-medium text-destructive">Over Budget ({overBudgetCategories.length})</p>
                    <div className="mt-2 space-y-1">
                      {overBudgetCategories.slice(0, 3).map((budget) => {
                        const category = categories.find((cat) => cat.id === budget.category)
                        return (
                          <p key={budget.id} className="text-sm text-destructive/80">
                            {category?.name}: {formatCurrency(budget.spent - budget.limit)} over
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}

                {nearLimitBudgets.length > 0 && (
                  <div className="p-3 bg-chart-3/10 border border-chart-3/20 rounded-lg">
                    <p className="font-medium text-chart-3">Near Limit ({nearLimitBudgets.length})</p>
                    <div className="mt-2 space-y-1">
                      {nearLimitBudgets.slice(0, 3).map((budget) => {
                        const category = categories.find((cat) => cat.id === budget.category)
                        const remaining = budget.limit - budget.spent
                        return (
                          <p key={budget.id} className="text-sm text-chart-3/80">
                            {category?.name}: {formatCurrency(remaining)} remaining
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}

                {overBudgetCategories.length === 0 && nearLimitBudgets.length === 0 && (
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <p className="font-medium text-accent">All budgets on track!</p>
                    <p className="text-sm text-accent/80">Great job managing your spending</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Spending Patterns */}
        <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow">
          <div>
            <div className="flex items-center space-x-2 mb-5 font-medium">
              <TrendingUp className="h-5 w-5" />
              <span>Spending Patterns</span>
            </div>
          </div>
          <div>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-foreground">Average Daily Spending</p>
                <p className="text-lg font-bold text-destructive">
                  {formatCurrency(currentMonthExpenses / new Date().getDate())}
                </p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-foreground">Savings Rate</p>
                <p className="text-lg font-bold text-accent">
                  {currentMonthIncome > 0
                    ? (((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) * 100).toFixed(1)
                    : 0}
                  %
                </p>
                <p className="text-sm text-muted-foreground">Of monthly income</p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium text-foreground">Transaction Count</p>
                <p className="text-lg font-bold text-primary">{currentMonthTransactions.length}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FinancialInsights