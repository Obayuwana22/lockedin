"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/Select"
import { useState } from "react"
import { useAppSelector } from "../../../lib/redux/hooks"
import { formatCurrency } from "../../../utils/finance"

const SpendingTrendChart = () => {
  const transactions = useAppSelector((state) => state.transactions.transactions)
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d")

  const getDateRange = () => {
    const now = new Date()
    const days = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    }
    return new Date(now.getTime() - days[timeframe] * 24 * 60 * 60 * 1000)
  }

  const getGroupingKey = (date: Date) => {
    switch (timeframe) {
      case "7d":
        return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
      case "30d":
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      case "90d":
        // Group by week
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        return weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      case "1y":
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      default:
        return date.toLocaleDateString()
    }
  }

  const startDate = getDateRange()
  const filteredTransactions = transactions.filter((t) => new Date(t.date) >= startDate)

  // Group transactions by time period
  const trendData = filteredTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date)
      const key = getGroupingKey(date)

      if (!acc[key]) {
        acc[key] = {
          period: key,
          income: 0,
          expenses: 0,
          net: 0,
        }
      }

      if (transaction.type === "income") {
        acc[key].income += transaction.amount
      } else {
        acc[key].expenses += transaction.amount
      }

      acc[key].net = acc[key].income - acc[key].expenses

      return acc
    },
    {} as Record<string, { period: string; income: number; expenses: number; net: number }>,
  )

  const chartData = Object.values(trendData).sort((a, b) => {
    // Sort by date
    const dateA = new Date(a.period)
    const dateB = new Date(b.period)
    return dateA.getTime() - dateB.getTime()
  })

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar px-5 py-6 w-full shadow mb-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="font-medium">Spending Trends</div>
          <Select value={timeframe} onValueChange={(value: "7d" | "30d" | "90d" | "1y") => setTimeframe(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        {chartData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No data available for selected timeframe</p>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="1"
                  stroke="hsl(var(--chart-4))"
                  fill="hsl(var(--chart-4))"
                  fillOpacity={0.6}
                  name="Expenses"
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="2"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                  name="Income"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
 export default SpendingTrendChart