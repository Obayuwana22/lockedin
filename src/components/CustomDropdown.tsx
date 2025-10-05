import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useAppSelector } from "../lib/redux/hooks";

type DropdownOption = string | { name: string; icon: string };

interface CustomDropdownProps {
  selection: DropdownOption[];
}

export default function CustomDropdown({ selection }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(selection[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const cat = useAppSelector((state) => state.category)
  console.log(cat)

  const getDisplayValue = (option: DropdownOption) => {
    if (typeof option === "string") {
      return option;
    }
    return option.name;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Selected Option */}
      <div
        className="px-3 py-1 shadow-border-bottom focus:outline-none flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        {typeof selected === "object" && (
          <span className="text-lg">{selected.icon}</span>
        )}
        <span>{getDisplayValue(selected)}</span>
        <ChevronDown className="w-4 h-4 inline-block ml-auto text-muted-foreground" />
      </div>

      {/* Dropdown Options */}
      {open && (
        <ul className="absolute left-0 right-0 mt-1 shadow-border bg-white shadow-md z-10 min-w-[12rem] px-1 py-1">
          {selection.map((option, index) => (
            <li
              key={index}
              className="flex items-center gap-2 px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {typeof option === "object" && (
                <span className="text-lg">{option.icon}</span>
              )}
              <span className="flex-grow">{getDisplayValue(option)}</span>
              {selected === option && (
                <Check className="w-4 h-4 text-muted-foreground" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
