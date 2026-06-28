import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Sidebar = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.aside
      animate={{
        width: open ? "300px" : "60px",
      }}
      className="relative flex-shrink-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden"
    >
      {children}
    </motion.aside>
  );
};

export const SidebarBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full p-4 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SidebarLink = ({
  link,
}: {
  link: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
}) => {
  return (
    <a
      href={link.href || "#"}
      onClick={(e) => {
        e.preventDefault();
        link.onClick?.();
      }}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
    >
      {link.icon}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-neutral-700 dark:text-neutral-200 whitespace-pre"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
