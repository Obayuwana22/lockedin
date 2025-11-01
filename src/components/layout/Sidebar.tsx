import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Menu, TrendingUp, X } from "lucide-react";
import { navLinks } from "../../data";
import Logo from "../Logo";
import { cn } from "../../utils/cn";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === `/${path}`;
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 right-5 z-50 md:hidden"
      >
        {isMobileOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed h-screen top-0 left-0 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out z-40",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:translate-x-0 md:z-0",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-5 py-4">
            <Logo />
          </div>
          <div className="flex-1 space-y-1 p-4 border-t border-b border-sidebar-border">
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
                      onClick={() => setIsMobileOpen(false)}
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
          <div className=" px-5 py-5 ">
            <div className="flex items-center gap-3 bg-sidebar-accent/80 p-3 rounded-lg">
              <TrendingUp className="h-4 w-4 text-sidebar-accent-foreground" />
              <div className="text-sidebar-accent-foreground text-sm">
                <div className="font-medium">Keep Growing💡</div>
                <div className="text-xs">Track. Budget. Grow.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
