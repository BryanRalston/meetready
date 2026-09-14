import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button, Sheet, Shell } from "@/components/ui";
import { PipAside } from "@/components/pip";
import { catalog, packById } from "@/lib/packs";
import { useMeet } from "@/lib/store";
import { cn, possessive } from "@/lib/utils";
import type { PlanKind } from "@/lib/types";

export const Route = createFileRoute("/paywall")({ component: Paywall });

function Paywall() {
  const navigate = useNavigate();
  const draft = useMeet((s) => s.draft);
  const gymnasts = useMeet((s) => s.gymnasts);
  const unlock = useMeet((s) => s.unlock);
  const commitDraft = useMeet((s) => s.commitDraft);
  const [kind, setKind] = useState<PlanKind>("yearly");
  const [closing, setClosing] = useState(false);

  const pack = packById(draft.packId) ?? (gymnasts[0] ? packById(gymnasts[0].packId) : undefined);
  const name = draft.name || gymnasts[0]?.name || "Her";
  const title = useMemo(() => {
    if (!pack) return `${possessive(name)} season plan is ready`;
    return pack.paywallHeadline.replace("{name}", name.trim() || "Her");
  }, [pack, name]);

  function start(plan: PlanKind) {
    if (draft.packId && draft.name.trim()) commitDraft();
    unlock(plan);
    navigate({ to: "/home" });
  }

  const sub = catalog.subscription;
  const cta =
    kind === "yearly"
      ? `Unlock · $0.14/day`
      : kind === "season"
        ? `Unlock · $${sub.season.price.toFixed(2)}`
        : `Unlock · $${sub.monthly.price.toFixed(2)}/mo`;

  return (
    <Shell className="relative">
      <button
        type="button"
        aria-label="Close"
        onClick={() => setClosing(true)}
        className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full text-muted"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <div className="flex flex-1 flex-col justify-end pb-2 pt-14">
        <p className="text-[11px] uppercase tracking-[0.18em] text-subtle">Plan ready</p>
        <h1 className="mt-3 font-display text-[32px] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          One household. Every gymnast. Coach still owns technique. You own Saturday.
        </p>

        <div className="mt-5 rounded-[28px] bg-fg px-5 py-4 text-bg">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-bg/55">Yearly · best value</p>
          <p className="mt-1 font-display text-[52px] font-medium leading-none tracking-[-0.05em] tabular">$0.14</p>
          <p className="mt-2 text-[14px] text-bg/70">per day · ${sub.yearly.price.toFixed(2)} for the year</p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <PlanRow
            selected={kind === "yearly"}
            onClick={() => setKind("yearly")}
            title="Yearly"
            price={`$${sub.yearly.price.toFixed(2)}`}
            hint={`${sub.yearly.label} · less than one private`}
            badge={sub.yearly.badge}
          />
          <PlanRow
            selected={kind === "season"}
            onClick={() => setKind("season")}
            title="Season"
            price={`$${sub.season.price.toFixed(2)}`}
            hint={`${sub.season.months} months · middle seat`}
          />
          <PlanRow
            selected={kind === "monthly"}
            onClick={() => setKind("monthly")}
            title="Monthly"
            price={`$${sub.monthly.price.toFixed(2)}`}
            hint="$0.33/day · $119.88 if you stay a year"
            decoy
          />
        </div>

        <div className="mt-3">
          <PipAside pose="warn">Close is not a secret shop. 7-day trial on yearly — not this offer.</PipAside>
        </div>

        <Button className="mt-4 w-full" onClick={() => start(kind)}>
          {cta}
        </Button>
        <p className="mt-2 pb-1 text-center text-[11px] leading-relaxed text-subtle">
          Preview purchase — no card. Not App Store IAP.
        </p>
      </div>

      {closing && (
        <Sheet>
          <p className="text-[11px] uppercase tracking-[0.16em] text-subtle">Close-path gift</p>
          <h2 className="mt-2 font-display text-[26px] font-medium tracking-[-0.03em]">7 days on yearly</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Trial lives here, not on the $0.14 hero. The main screen stays a paid plan. Yearly only.
          </p>
          <Button className="mt-6 w-full" onClick={() => start("trial")}>
            Start 7-day trial
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => setClosing(false)}>
            Keep looking
          </Button>
        </Sheet>
      )}
    </Shell>
  );
}

function PlanRow({
  selected,
  onClick,
  title,
  price,
  hint,
  badge,
  decoy,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  hint: string;
  badge?: string;
  decoy?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press flex min-h-16 items-center justify-between rounded-[18px] px-4 py-3 text-left",
        selected ? "bg-fg text-bg" : "bg-surface-2 text-fg",
        decoy && !selected && "opacity-80",
      )}
    >
      <span>
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-medium">{title}</span>
          {badge && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]",
                selected ? "bg-bg text-fg" : "bg-accent text-accent-fg",
              )}
            >
              {badge}
            </span>
          )}
        </span>
        <span className={cn("mt-0.5 block text-[12px]", selected ? "text-bg/65" : "text-subtle")}>{hint}</span>
      </span>
      <span className="font-mono text-[15px] tabular">{price}</span>
    </button>
  );
}
