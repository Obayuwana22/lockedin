import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
  // Home,
  // CreditCard,
  // Target,
  // BarChart3,
  // Database,
  // Menu,
  // X,
  // DollarSign,
  TrendingUp,
} from "lucide-react";
import { navLinks } from "../../data";
import Logo from "../Logo";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === `/${path}` || (path === "dashboard" && location.pathname === "/");
  };
  return (
    <div className="flex">
      <div className="flex flex-col bg-sidebar min-h-screen">
        <div className="border-b border-r border-sidebar-border px-5 py-4">
          <Logo />
        </div>
        <div className="flex-1 space-y-1 p-4 border-r border-sidebar-border">
          {navLinks.map((navLink) => {
            const active = isActive(navLink.path);
            return (
              <ul key={navLink.id} className="">
                <li>
                  <Link
                    to={navLink.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    {navLink.icon && <navLink.icon className="h-4 w-4" />}
                    <div>
                      <div>{navLink.name}</div>
                      <p className="text-xs opacity-70">
                        {navLink.description}
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="border-t border-r px-5 py-5 border-sidebar-border ">
          <div className="flex items-center gap-3 bg-sidebar-accent/50 p-3 rounded-lg">
            <TrendingUp className="h-4 w-4 text-sidebar-accent-foreground" />
            <div className="text-sidebar-accent-foreground text-sm">
              <div className="font-medium">Portfolio Ready</div>
              <div className="text-xs">React + Typescript</div>
            </div>
          </div>
        </div>
      </div>

      <main className="mt-20 absolute left-80">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
