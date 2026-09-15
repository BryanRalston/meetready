import { Link, useRouterState } from "@tanstack/react-router";
import { Shell } from "@/components/ui";
import { packById } from "@/lib/packs";
import { useMeet } from "@/lib/store";
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
  const gymnasts = useMeet((s) => s.gymnasts);
  const activeId = useMeet((s) => s.activeId);
  const setActive = useMeet((s) => s.setActive);
  return (
    <Shell className="px-0 pb-0">
      <div className="quiz-scroll flex flex-1 flex-col px-5">{children}</div>
      {gymnasts.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-1">
          {gymnasts.map((g) => {
            const pack = packById(g.packId);
            const on = g.id === activeId || (!activeId && g.id === gymnasts[0]?.id);
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={cn(
                  "press min-h-12 shrink-0 rounded-md px-3 text-meta",
                  on ? "bg-fg text-bg" : "bg-navy text-muted shadow-border",
                )}
              >
                {g.name}
                {pack ? ` · ${pack.shortLabel}` : ""}
              </button>
            );
          })}
        </div>
      )}
      <nav className="tab-dock" aria-label="Season">
        {NAV.map((item) => {
          const active =
            pathname === item.to || (item.to === "/family" && pathname === "/features");
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn("tab-item", active ? "tab-item-on" : "tab-item-off")}
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
