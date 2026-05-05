"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icons";

interface NavItem {
  href: string;
  icon: IconName;
  label: string;
  count?: string;
}

const TOP_NAV: NavItem[] = [
  { href: "/dashboard/today", icon: "today", label: "Today" },
  { href: "/dashboard/diary", icon: "weave", label: "Diary", count: "217" },
  { href: "/dashboard/reports", icon: "reports", label: "Reports" },
  { href: "/dashboard/ask", icon: "ask", label: "Ask" },
];

const CONNECTIONS_NAV: NavItem[] = [
  { href: "/dashboard/threads", icon: "threads", label: "Threads", count: "6" },
  { href: "/dashboard/goals", icon: "goals", label: "Goals", count: "4" },
];

const BOTTOM_NAV: NavItem[] = [
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link href={item.href} className={active ? "active" : ""}>
      <Icon name={item.icon} />
      <span>{item.label}</span>
      {item.count != null && <span className="count">{item.count}</span>}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="wd-sidebar">
      <Link href="/" className="brand" style={{ textDecoration: "none" }}>
        <Image src="/brand/logo-mark.svg" alt="" width={28} height={28} />
        <span className="brand-name">WeaveDiary</span>
      </Link>

      <div className="wd-nav">
        {TOP_NAV.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </div>

      <div className="group">Connections</div>

      <div className="wd-nav">
        {CONNECTIONS_NAV.map((item) => (
          <NavLink key={item.href} item={item} active={isActive(item.href)} />
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <div className="wd-nav">
          {BOTTOM_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </div>
      </div>
    </aside>
  );
}
