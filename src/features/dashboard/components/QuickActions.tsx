import { BarChart3, PlusCircle, Settings, Target } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Transaction",
      description: "Record a new income or expense",
      icon: PlusCircle,
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
      path: "/transactions",
    },
    {
      title: "Set Budget",
      description: "Create or update spending limits",
      icon: Target,
      color: "bg-accent text-accent-foreground hover:bg-accent/90",
      path: "/budgets",
    },
    {
      title: "View Analytics",
      description: "Analyze your spending patterns",
      icon: BarChart3,
      color: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      path: "/analytics",
    },
    {
      title: "Settings",
      description: "Manage categories and preferences",
      icon: Settings,
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      path: "",
    },
  ];
  return (
    <div className="border border-sidebar-border rounded-lg bg-sidebar p-5 shadow">
      <div className="space-y-5">
        <div className="text-foreground font-semibold">Quick Actions</div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                to={action.path}
                key={i}
                className={`flex flex-col items-center space-y-2 border border-sidebar-border rounded-lg p-4 w-full ${action.color}`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-center mt-2">
                  <div className="font-medium text-sm">{action.title}</div>
                  <p className="text-xs opacity-80">{action.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
