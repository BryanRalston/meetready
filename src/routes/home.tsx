import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, Label } from "@/components/ui";
import { catalog, packById } from "@/lib/packs";
import { buildPlan, numberHero } from "@/lib/plan";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { daysUntil, possessive } from "@/lib/utils";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const g = useActiveGymnast();
  const pack = g ? packById(g.packId) : undefined;

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex-1" />
      </AppShell>
    );
  }
  if (!unlocked) return <Navigate to="/" />;
  if (!g || !pack) return <Navigate to="/family" />;

  const plan = buildPlan(g, pack);
  const days = daysUntil(g.meetDate);

  return (
    <AppShell>
      <header className="flex items-end justify-between gap-4 pb-5 pt-3">
        <div>
          <Label>Season plan</Label>
          <h1 className="mt-1 font-display text-[32px] font-medium tracking-[-0.03em] leading-none">
            {possessive(g.name)} {pack.shortLabel}
          </h1>
          <p className="mt-2 text-[13px] text-muted">{pack.helper}</p>
          {g.panicId === "arrive" && (
            <p className="mt-2 text-[12px] text-subtle">You flagged arrival. Meet week leads with the timeline.</p>
          )}
        </div>
        {days != null && (
          <button
            type="button"
            onClick={() => navigate({ to: "/meet" })}
            className="rounded-[18px] bg-surface-2 px-3 py-2 text-right"
          >
            <p className="font-mono text-[22px] tabular leading-none">{days}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-subtle">
              {days === 1 ? "day" : "days"}
            </p>
          </button>
        )}
      </header>

      <div className="flex flex-col gap-3 pb-4">
        <Card>
          <Label>This week · {plan.weekMinutes} min · cap 12</Label>
          <p className="mt-1 text-[13px] text-subtle">Three home drills. No new skills. Coach owns technique.</p>
          <ul className="mt-4 space-y-4">
            {plan.drills.map((d) => (
              <li key={d.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-[20px] font-medium tracking-[-0.02em]">{d.title}</h2>
                  <span className="font-mono text-[12px] text-subtle">{d.minutes}m</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{d.why}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-fg/90">{d.how}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <Label>{plan.requirementTitle}</Label>
          <h2 className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em]">
            What {pack.shortLabel} actually asks
          </h2>
          <div className="mt-4 space-y-4">
            {plan.requirements.map((r) => (
              <div key={r.event}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">{r.event}</p>
                <ul className="mt-1.5 space-y-1">
                  {r.items.map((it) => (
                    <li
                      key={it.label}
                      className={
                        it.flagged
                          ? "text-[14px] text-fg"
                          : "text-[14px] text-muted"
                      }
                    >
                      {it.flagged ? "● " : "○ "}
                      {it.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {plan.meet && (
          <button type="button" onClick={() => navigate({ to: "/meet" })} className="text-left">
            <Card className="overflow-hidden p-0">
              <img src="/art/packing.jpg" alt="" className="h-28 w-full object-cover" />
              <div className="p-5">
                <Label>Meet week</Label>
                <h2 className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em]">
                  {plan.meet.name}
                </h2>
                <p className="mt-2 text-[14px] text-muted">
                  Packing, arrival, grandparent card. Tap to open.
                </p>
              </div>
            </Card>
          </button>
        )}

        <Card>
          <Label>The number that matters</Label>
          <p className="mt-2 font-display text-[40px] font-medium leading-none tracking-[-0.04em] tabular">
            {numberHero(pack)}
          </p>
          <p className="mt-2 text-[15px] text-fg">{pack.numberThatMatters.label}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">{plan.mobilityNote}</p>
          {pack.valueParts && (
            <p className="mt-3 font-mono text-[12px] text-subtle">
              VP {pack.valueParts.A ?? 0}A
              {pack.valueParts.B ? `+${pack.valueParts.B}B` : ""}
              {pack.valueParts.C ? `+${pack.valueParts.C}C` : ""}
              {pack.valueParts.startValue ? ` · SV ${pack.valueParts.startValue}` : ""}
              {pack.valueParts.compositionCreditMax
                ? ` · CC ${pack.valueParts.compositionCreditMax}`
                : ""}
            </p>
          )}
        </Card>

        <Card className="bg-surface-2">
          <Label>Talk to coach</Label>
          <p className="mt-2 text-[16px] leading-relaxed">{plan.coachPrompt}</p>
        </Card>

        <p className="px-1 pb-2 text-[11px] leading-relaxed text-subtle">{catalog.disclaimer}</p>
      </div>
    </AppShell>
  );
}
