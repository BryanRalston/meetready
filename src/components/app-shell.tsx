import { Link, useRouterState } from "@tanstack/react-router";
import { Shell } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const NAV = [
  { to: "/home", label: "Plan", icon: PlanIcon },
  { to: "/meet", label: "Meet", icon: MeetIcon },
  { to: "/scores", label: "Scores", icon: ScoreIcon },
  { to: "/family", label: "Family", icon: FamilyIcon },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Shell className="px-0">
      <div className="flex flex-1 flex-col px-5">{children}</div>
      <nav className="mt-2 grid grid-cols-4 border-t border-border px-2 pt-1">
        {NAV.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] tracking-wide",
                active ? "text-fg" : "text-subtle",
              )}
            >
              <item.icon active={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </Shell>
  );
}

function PlanIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}
function MeetIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
function ScoreIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <path d="M4 16l4-4 3 3 9-9" />
      <path d="M14 6h6v6" />
    </svg>
  );
}
function FamilyIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.8 : 1.5}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M3.5 19c.8-3 3-5 5.5-5s4.7 2 5.5 5" />
      <path d="M14 14.5c2.2.3 4 2 4.8 4.5" />
    </svg>
  );
}
