import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, Label } from "@/components/ui";
import { catalog, packById } from "@/lib/packs";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { daysUntil, possessive } from "@/lib/utils";

export const Route = createFileRoute("/meet")({ component: Meet });

function Meet() {
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const g = useActiveGymnast();
  const packing = useMeet((s) => s.packing);
  const setPacking = useMeet((s) => s.setPacking);
  const togglePacked = useMeet((s) => s.togglePacked);
  const pack = g ? packById(g.packId) : undefined;

  useEffect(() => {
    if (!packing.length) {
      setPacking(catalog.meetDayPacking.map((label) => ({ label, done: false })));
    }
  }, [packing.length, setPacking]);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex-1" />
      </AppShell>
    );
  }
  if (!unlocked) return <Navigate to="/" />;
  if (!g || !pack) return <Navigate to="/family" />;

  const days = daysUntil(g.meetDate);

  return (
    <AppShell>
      <header className="pb-5 pt-3">
        <img src="/art/packing.jpg" alt="" className="mb-4 h-36 w-full rounded-[22px] object-cover" />
        <Label>Meet week</Label>
        <h1 className="mt-1 font-display text-[32px] font-medium tracking-[-0.03em] leading-none">
          {g.meetName || "Next meet"}
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          {g.meetDate
            ? `${g.meetDate}${days != null ? ` · ${days} day${days === 1 ? "" : "s"}` : ""}`
            : "No date yet — packing still matters."}
        </p>
      </header>

      <div className="flex flex-col gap-3 pb-4">
        <Card>
          <Label>Night-before packing</Label>
          <ul className="mt-4 space-y-1">
            {packing.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => togglePacked(item.label)}
                  className="flex min-h-12 w-full items-start gap-3 py-2 text-left"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] ${
                      item.done ? "bg-fg text-bg" : "shadow-[0_0_0_1px_rgb(242_238_230/0.25)]"
                    }`}
                  >
                    {item.done && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={item.done ? "text-[14px] text-muted line-through" : "text-[14px] text-fg"}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <Label>Timeline</Label>
          <ol className="mt-4 space-y-4">
            {catalog.meetDayRules.map((rule, i) => (
              <li key={rule} className="flex gap-3">
                <span className="font-mono text-[12px] text-subtle">0{i + 1}</span>
                <p className="text-[15px] leading-relaxed">{rule}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <Label>Grandparent card</Label>
          <h2 className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em]">
            For whoever is sitting with you
          </h2>
          <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-muted">
            <li>Arrive for march-in, not open stretch, unless they have a gym pass.</li>
            <li>A session is often 3–4 hours. Bring a seat and a book.</li>
            <li>Do not talk scores in the car. {possessive(g.name)} last event gets one non-score sentence.</li>
            <li>{pack.shortLabel} is not a generic “gymnastics meet.” The number that matters is {pack.numberThatMatters.label.toLowerCase()}.</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
