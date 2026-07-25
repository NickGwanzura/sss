import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function cnFormat(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(prefix = ""): string {
  const id = Math.random().toString(36).substring(2, 10);
  return prefix ? `${prefix}-${id}` : id;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    ASSIGNED: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    EN_ROUTE: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    COLLECTED: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    DELIVERED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    CLOSED: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    IN_MAINTENANCE: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    OUT_OF_SERVICE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    RETIRED: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    OPEN: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    INVESTIGATING: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    RESOLVED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    PAID: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    OVERDUE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    LOW: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    MEDIUM: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    HIGH: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    CRITICAL: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return colors[status] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
}

export function getStatusDot(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-400",
    ASSIGNED: "bg-blue-400",
    EN_ROUTE: "bg-indigo-400",
    COLLECTED: "bg-purple-400",
    DELIVERED: "bg-green-400",
    CLOSED: "bg-gray-400",
    CANCELLED: "bg-red-400",
    ACTIVE: "bg-green-400",
    IN_MAINTENANCE: "bg-orange-400",
    OUT_OF_SERVICE: "bg-red-400",
    OPEN: "bg-red-400",
    INVESTIGATING: "bg-orange-400",
    RESOLVED: "bg-green-400",
    PAID: "bg-green-400",
    OVERDUE: "bg-red-400",
  };
  return colors[status] || "bg-gray-400";
}
