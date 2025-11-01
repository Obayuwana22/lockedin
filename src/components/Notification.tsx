import { useState } from "react";
import { Bell } from "lucide-react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:rounded-lg px-3 py-2 cursor-pointer"
      >
        <Bell className="h-4 w-4" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          // onClick={() => setIsOpen(false)}
        >
          {/* You can put notification content here */}
          <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg p-4 w-full max-w-96 h-96 max-h-full">
            <p className="text-gray-700">Notifications</p>
            <p className="text-gray-500 text-center">No notifications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
