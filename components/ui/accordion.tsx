"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/motion/reveal";

// Radix supplies the semantics and keyboard handling; Framer Motion animates the panel height.
// The open value is held here so each panel knows when to mount and unmount.
const OpenValueContext = React.createContext("");
const ItemValueContext = React.createContext("");

function Accordion({
  defaultValue = "",
  className,
  children,
}: {
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <OpenValueContext.Provider value={value}>
      <AccordionPrimitive.Root type="single" collapsible value={value} onValueChange={setValue} className={className}>
        {children}
      </AccordionPrimitive.Root>
    </OpenValueContext.Provider>
  );
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, value, ...props }, ref) => (
  <ItemValueContext.Provider value={value}>
    <AccordionPrimitive.Item
      ref={ref}
      value={value}
      className={cn("rounded-card bg-card-fade shadow-soft ring-1 ring-border/40", className)}
      {...props}
    />
  </ItemValueContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex min-h-14 flex-1 items-center justify-between gap-4 rounded-card px-5 py-4 text-left font-display text-[1.0625rem] font-semibold leading-snug text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-card shadow-chip ring-1 ring-border/50 transition-shadow duration-300 group-hover:shadow-pill">
        <Plus
          aria-hidden
          className="size-4 text-subtle transition-[transform,color] duration-300 group-hover:text-accent group-data-[state=open]:rotate-45 group-data-[state=open]:text-accent"
        />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

function AccordionContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const open = React.useContext(OpenValueContext) === React.useContext(ItemValueContext);
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <AccordionPrimitive.Content forceMount asChild>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className={cn("px-5 pb-5 text-body", className)}>
              {children}
            </div>
          </motion.div>
        </AccordionPrimitive.Content>
      ) : null}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
