import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data";

const OutletNav = () => {
  const location = useLocation();

  const routeLinks: Record<string, { path: string }> = {
    "/transactions": { path: "transactions" },
    "/budgets": { path: "budgets" },
    "/analytics": { path: "analytics" },
    "/data": { path: "data" },
  };

  const routes = routeLinks[location.pathname];
  return (
    <div className="mb-5">
      <div className="text-muted-foreground flex items-center gap-2">
        <Home className="w-3 h-3 " />

        <Link to="dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <ChevronRight className="w-3 h-3 " />
        <div>
          {navLinks.map((navLink, i) => {
            return (
              <div key={i}>
                <div className="text-foreground">{routes.path === navLink.path && navLink.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OutletNav;
