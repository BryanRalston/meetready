import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, Label } from "@/components/ui";
import { catalog, packById } from "@/lib/packs";
import { buildPlan, numberHero } from "@/lib/plan";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { cn, daysUntil, formatMeetDate, possessive } from "@/lib/utils";

export const Route = createFileRoute("/home")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const planKind = useMeet((s) => s.planKind);
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
      <header className="pb-6 pt-2">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <Label>Season plan</Label>
            <h1 className="mt-1 font-display text-title font-medium leading-none tracking-title">
              {possessive(g.name)} {pack.shortLabel}
            </h1>
            <p className="mt-2 text-small text-muted">{pack.helper}</p>
          </div>
          {days != null && days >= 0 && (
            <button
              type="button"
              onClick={() => navigate({ to: "/meet" })}
              className="press shrink-0 rounded-lg bg-navy px-3 py-2 text-right shadow-border"
            >
              <p className="num-hero text-2xl leading-none">{days}</p>
              <p className="mt-1 text-micro uppercase tracking-kicker text-subtle">
                {days === 1 ? "day" : "days"}
              </p>
            </button>
          )}
        </div>
        {days != null && days < 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-meta text-muted">That Saturday is done. Log it, then set the next one.</p>
            <button
              type="button"
              className="press min-h-12 rounded-md bg-accent text-center text-body font-medium text-accent-fg"
              onClick={() => navigate({ to: "/scores", hash: "log" })}
            >
              Log scores
            </button>
            <button
              type="button"
              className="press min-h-12 text-center text-meta text-muted"
              onClick={() => navigate({ to: "/family" })}
            >
              Set the next Saturday
            </button>
          </div>
        )}
        {plan.weekLead && <p className="mt-3 text-meta text-muted">{plan.weekLead}</p>}
        {plan.goalKicker && <p className="mt-2 text-meta text-subtle">Goal · {plan.goalKicker}</p>}
        {g.panicId === "arrive" && (
          <p className="mt-3 text-meta text-subtle">You flagged arrival. Meet week leads with the timeline.</p>
        )}
        {g.panicId === "scores_talk" && (
          <p className="mt-3 text-meta text-muted">Keep AA talk off the car ride. The number still lives here.</p>
        )}
        {planKind === "free" && (
          <p className="mt-3 text-meta text-subtle">This device.</p>
        )}
      </header>

      <div className="flex flex-col gap-8 pb-6">
        <section>
          <Label>The number that matters</Label>
          <p className="num-hero mt-2 text-display leading-none">{numberHero(pack)}</p>
          <p className="mt-2 text-body text-fg">{pack.numberThatMatters.label}</p>
          <p className="mt-2 text-small leading-relaxed text-muted">{plan.mobilityNote}</p>
          {pack.valueParts && (
            <p className="mt-3 font-sans text-meta tabular text-subtle">
              VP {pack.valueParts.A ?? 0}A
              {pack.valueParts.B ? `+${pack.valueParts.B}B` : ""}
              {pack.valueParts.C ? `+${pack.valueParts.C}C` : ""}
              {pack.valueParts.startValue ? ` · SV ${pack.valueParts.startValue}` : ""}
              {pack.valueParts.compositionCreditMax ? ` · CC ${pack.valueParts.compositionCreditMax}` : ""}
            </p>
          )}
        </section>

        <Card>
          <Label>This week · {plan.weekMinutes} min · cap 12</Label>
          <p className="mt-1 text-small text-subtle">
            Three home drills. No new skills. Coach owns technique.
            {g.hours === "16-20" || g.hours === "20+" ? " Heavy gym week — this is recovery." : ""}
          </p>
          <ul className="mt-5 space-y-5">
            {plan.drills.map((d, i) => (
              <li key={d.id} className={cn(i > 0 && "border-t border-border pt-5")}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-card font-medium tracking-title">{d.title}</h2>
                  <span className="font-sans text-meta tabular text-subtle">{d.minutes}m</span>
                </div>
                <p className="mt-1 text-small leading-relaxed text-muted">{d.why}</p>
                <p className="mt-1 text-small leading-relaxed text-fg/90">{d.how}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <Label>{plan.requirementTitle}</Label>
          <h2 className="mt-1 font-display text-card font-medium tracking-title">
            What {pack.shortLabel} actually asks
          </h2>
          <div className="mt-5 space-y-5">
            {plan.requirements.map((r) => (
              <div key={r.event}>
                <p className="text-kicker uppercase tracking-kicker text-subtle">{r.event}</p>
                <ul className="mt-2 space-y-2">
                  {r.items.map((it) => (
                    <li
                      key={it.label}
                      className={cn(
                        "flex gap-3 text-ui leading-relaxed",
                        it.flagged ? "text-fg" : "text-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 size-1.5 shrink-0 rounded-full",
                          it.flagged ? "bg-fg" : "bg-subtle/50",
                        )}
                      />
                      <span>{it.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {plan.meet && (
          <button type="button" onClick={() => navigate({ to: "/meet" })} className="press text-left">
            <Card className="overflow-hidden p-0">
              <img src="/art/packing.jpg" alt="" className="photo h-28 w-full object-cover" />
              <div className="p-4">
                <Label>Meet week</Label>
                <h2 className="mt-1 font-display text-card font-medium tracking-title">{plan.meet.name}</h2>
                <p className="mt-2 text-ui text-muted">
                  {formatMeetDate(plan.meet.date) || "Date TBD"}. Packing, arrival, grandparent card.
                </p>
              </div>
            </Card>
          </button>
        )}

        <Card className="bg-navy-2">
          <Label>Talk to coach</Label>
          <p className="mt-2 text-body leading-relaxed">{plan.coachPrompt}</p>
        </Card>

        <p className="px-1 pb-2 text-kicker leading-relaxed text-subtle">{catalog.disclaimer}</p>
        <button
          type="button"
          onClick={() => navigate({ to: "/features" })}
          className="press min-h-12 px-1 text-left text-kicker uppercase tracking-kicker text-subtle"
        >
          What's in MeetReady
        </button>
      </div>
    </AppShell>
  );
}
