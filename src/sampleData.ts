// import type { Transaction, Budget } from "./types"
// import { generateId } from "./utils/finance"

// // Sample transactions for demonstration
// export const sampleTransactions: Transaction[] = [
//   {
//     id: generateId(),
//     amount: 3500,
//     description: "Salary Deposit",
//     category: "7", // Salary
//     date: new Date().toISOString().split("T")[0],
//     type: "income",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     amount: 85.32,
//     description: "Grocery Store",
//     category: "1", // Food & Dining
//     date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // Yesterday
//     type: "expense",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     amount: 125.67,
//     description: "Electric Bill",
//     category: "5", // Bills & Utilities
//     date: new Date(Date.now() - 172800000).toISOString().split("T")[0], // 2 days ago
//     type: "expense",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     amount: 45.2,
//     description: "Gas Station",
//     category: "2", // Transportation
//     date: new Date(Date.now() - 259200000).toISOString().split("T")[0], // 3 days ago
//     type: "expense",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     amount: 200,
//     description: "Freelance Project",
//     category: "8", // Freelance
//     date: new Date(Date.now() - 345600000).toISOString().split("T")[0], // 4 days ago
//     type: "income",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ]

// // Sample budgets for demonstration
// export const sampleBudgets: Budget[] = [
//   {
//     id: generateId(),
//     category: "1", // Food & Dining
//     limit: 500,
//     spent: 320,
//     period: "monthly",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     category: "2", // Transportation
//     limit: 300,
//     spent: 180,
//     period: "monthly",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     category: "4", // Entertainment
//     limit: 200,
//     spent: 95,
//     period: "monthly",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: generateId(),
//     category: "3", // Shopping
//     limit: 400,
//     spent: 450,
//     period: "monthly",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ]
