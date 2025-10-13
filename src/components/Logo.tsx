import { DollarSign } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-2 rounded-lg">
        <DollarSign className="h-4 w-4 text-primary-foreground"/>
      </div>
      <div className="text-lg font-semibold text-sidebar-foreground">LockedIn</div>
    </div>
  );
};

export default Logo;
