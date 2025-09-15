import { nanoid } from "nanoid";
import {
  Home,
  CreditCard,
  Target,
  BarChart3,
  Database,
//   Menu,
//   TrendingUp,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface NavLink {
  id: string;
  name: string;
  path: string;
  description: string;
  icon?: LucideIcon; // Adjust the type based on your icon implementation
}

export const navLinks: NavLink[] = [
  {
    id: nanoid(),
    name: "Dashboard",
    path: "dashboard",
    description: "Overview of your finances",
    icon: Home,
  },
  {
    id: nanoid(),
    name: "Transactions",
    path: "transactions",
    description: "Manage income and expenses",
    icon: CreditCard,
  },
  {
    id: nanoid(),
    name: "Budgets",
    path: "budgets",
    description: "Set and track spending limit",
    icon: Target,
  },
  {
    id: nanoid(),
    name: "Analytics",
    path: "analytics",
    description: "Financial insights and reports",
    icon: BarChart3,
  },
  {
    id: nanoid(),
    name: "Data",
    path: "data",
    description: "Backup and manage your data",
    icon: Database,
  },
];
