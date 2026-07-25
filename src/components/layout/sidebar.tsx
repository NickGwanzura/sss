"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardList,
  Route,
  Truck,
  Users2,
  Radio,
  MapPin,
  Banknote,
  Monitor,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Building,
  Receipt,
  BarChart3,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  Bell,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    title: "Clients",
    href: "/clients",
    icon: Building,
    children: [
      { title: "All Clients", href: "/clients" },
      { title: "Branches", href: "/branches" },
    ],
  },
  { title: "Collections", href: "/collections", icon: ClipboardList },
  { title: "Routes", href: "/routes", icon: Route },
  { title: "Fleet", href: "/fleet", icon: Truck },
  { title: "Crew", href: "/crew", icon: Users2 },
  { title: "Dispatch", href: "/dispatch", icon: Radio },
  { title: "Trips", href: "/trips", icon: MapPin },
  { title: "Vault", href: "/vault", icon: Banknote },
  { title: "ATMs", href: "/atms", icon: Monitor },
  { title: "Incidents", href: "/incidents", icon: AlertTriangle },
  { title: "Panic", href: "/panic", icon: ShieldAlert },
  { title: "Documents", href: "/documents", icon: FileText },
  { title: "Finance", href: "/finance", icon: Receipt },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Portal", href: "/portal", icon: Users },
  { title: "Mobile", href: "/mobile", icon: SmartphoneIcon },
];

function SmartphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isChildActive = (children: { href: string }[]) => {
    return children.some((child) => pathname === child.href);
  };

  return (
    <aside className="flex h-full flex-col bg-sidebar-background text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <ShieldAlert className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">Suburban Security</h1>
          <p className="text-[10px] text-sidebar-foreground/60">CIT Operations Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemExpanded = expandedItems.includes(item.title);
            const hasChildren = item.children && item.children.length > 0;
            const active = hasChildren ? isChildActive(item.children!) : isActive(item.href);

            return (
              <div key={item.title}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleExpand(item.title);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-sidebar-primary/20 text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isItemExpanded && "rotate-180"
                      )}
                    />
                  )}
                  {!hasChildren && (
                    <Link href={item.href} className="absolute inset-0" />
                  )}
                </button>
                {hasChildren && isItemExpanded && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all duration-200",
                          pathname === child.href
                            ? "bg-sidebar-primary/15 text-sidebar-primary-foreground font-medium"
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        )}
                      >
                        <div className="h-1 w-1 rounded-full bg-current" />
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all">
          <UserCircle className="h-4 w-4" />
          <span className="flex-1">Admin User</span>
          <LogOut className="h-3.5 w-3.5" />
        </div>
      </div>
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-72 animate-slide-in">
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
