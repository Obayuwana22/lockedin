import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../utils/cn";

// Root Select
const Select = SelectPrimitive.Root;

// Trigger (the button you click to open)
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      " px-3 py-1 shadow-border-bottom focus:outline-none flex items-center gap-2 mt-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="w-4 h-4 inline-block ml-auto text-muted-foreground" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Value (the text inside the trigger)
const SelectValue = SelectPrimitive.Value;

// Content (the dropdown menu)
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      side="bottom"           // 👈 Ensures dropdown appears *below* the trigger
      align="start"           // 👈 Aligns dropdown to start of trigger
      position="popper"       // 👈 Uses Radix popper for smart placement
      className={cn(
        "z-50 min-w-[var(--radix-select-trigger-width)] rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 mt-1",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Each item in the dropdown
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-10">
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="">
        <SelectPrimitive.ItemIndicator>
          <Check className="w-4 h-4 text-muted-foreground" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </div>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };

// import * as React from "react";
// import * as SelectPrimitive from "@radix-ui/react-select";
// import { Check, ChevronDown, ChevronUp } from "lucide-react";

// import { cn } from "../../utils/cn";

// // Root Select
// const Select = SelectPrimitive.Root;

// // Trigger (the button you click to open)
// const SelectTrigger = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
// >(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       " px-3 py-1 shadow-border-bottom focus:outline-none flex items-center gap-2 mt-1",
//       className
//     )}
//     {...props}
//   >
//     {children}
//     <SelectPrimitive.Icon asChild>
//       <ChevronDown className="w-4 h-4 inline-block ml-auto text-muted-foreground" />
//     </SelectPrimitive.Icon>
//   </SelectPrimitive.Trigger>
// ));
// SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// // Value (the text inside the trigger)
// const SelectValue = SelectPrimitive.Value;

// // Content (the dropdown menu)
// const SelectContent = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content
//       ref={ref}
//       className={cn(
//         "relative z-50 overflow-hidden rounded-md shadow-border shadow-md bg-popover text-popover-foreground animate-in fade-in-80",
//         className
//       )}
//       {...props}
//     >
//       <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
//         <ChevronUp className="w-4 h-4 inline-block ml-auto text-muted-foreground" />
//       </SelectPrimitive.ScrollUpButton>
//       <SelectPrimitive.Viewport className="p-1">
//         {children}
//       </SelectPrimitive.Viewport>
//       <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
//         <ChevronDown className="w-4 h-4 inline-block ml-auto text-muted-foreground" />
//       </SelectPrimitive.ScrollDownButton>
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ));
// SelectContent.displayName = SelectPrimitive.Content.displayName;

// // Each item in the dropdown
// const SelectItem = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
// >(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Item
//     ref={ref}
//     className={cn(
//       "relative flex items-center gap-20 cursor-default select-none rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
//       className
//     )}
//     {...props}
//   >
//     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//     <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
//       <SelectPrimitive.ItemIndicator>
//         <Check className="w-4 h-4 text-muted-foreground" />
//       </SelectPrimitive.ItemIndicator>
//     </span>
//   </SelectPrimitive.Item>
// ));
// SelectItem.displayName = SelectPrimitive.Item.displayName;

// export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
