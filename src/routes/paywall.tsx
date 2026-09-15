import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HouseholdKeySheet } from "@/components/household-key-sheet";
import { Button, IconButton, Sheet, Shell } from "@/components/ui";
import { PipAside } from "@/components/pip";
import { useSecretPipTaps } from "@/lib/household-key";
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
  const { tapPip, keyOpen, setKeyOpen } = useSecretPipTaps();

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
      <IconButton
        aria-label="Close"
        onClick={() => setClosing(true)}
        className="absolute right-3 top-[max(0.5rem,var(--phone-safe-top))] z-10 text-muted"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </IconButton>

      <div className="quiz-scroll flex flex-1 flex-col justify-end pt-12">
        <p className="text-kicker uppercase tracking-kicker text-subtle">Plan ready</p>
        <h1 className="mt-3 font-display text-title font-medium leading-title tracking-title">{title}</h1>
        <p className="mt-3 text-body leading-relaxed text-muted">
          One household. Every gymnast. Coach still owns technique. You own Saturday.
        </p>

        <button
          type="button"
          onClick={() => setKind("yearly")}
          className={cn(
            "press mt-6 rounded-card px-5 py-5 text-left",
            kind === "yearly" ? "bg-fg text-bg" : "bg-navy text-fg shadow-border",
          )}
        >
          <p
            className={cn(
              "flex items-center gap-2 text-kicker font-medium uppercase tracking-kicker",
              kind === "yearly" ? "text-bg/55" : "text-subtle",
            )}
          >
            Yearly · best value
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-micro tracking-kicker",
                kind === "yearly" ? "bg-bg text-fg" : "bg-accent text-accent-fg",
              )}
            >
              {sub.yearly.badge}
            </span>
          </p>
          <p
            className={cn(
              "mt-1 font-display text-price font-medium leading-none tracking-display tabular",
              kind === "yearly" ? "text-bg" : "text-fg",
            )}
          >
            $0.14
          </p>
          <p className={cn("mt-2 text-ui", kind === "yearly" ? "text-bg/70" : "text-muted")}>
            per day · ${sub.yearly.price.toFixed(2)} for the year
          </p>
        </button>

        <div className="mt-3 flex flex-col gap-2">
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

        <div className="mt-4">
          <PipAside pose="warn" onPipClick={tapPip}>
            Close is not a secret shop. 7-day trial on yearly — not this offer.
          </PipAside>
        </div>
      </div>

      <div className="quiz-dock">
        <Button className="w-full" onClick={() => start(kind)}>
          {cta}
        </Button>
        <p className="pb-1 text-center text-kicker leading-relaxed text-subtle">
          Preview purchase — no card. Not App Store IAP.
        </p>
      </div>

      {keyOpen && (
        <HouseholdKeySheet onClose={() => setKeyOpen(false)} onUnlock={() => start("free")} />
      )}

      {closing && !keyOpen && (
        <Sheet onClose={() => setClosing(false)} labelledBy="trial-title">
          <p className="text-kicker uppercase tracking-kicker text-subtle">Close-path gift</p>
          <h2 id="trial-title" className="mt-2 font-display text-2xl font-medium tracking-title">
            7 days on yearly
          </h2>
          <p className="mt-3 text-ui leading-relaxed text-muted">
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
  decoy,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  price: string;
  hint: string;
  decoy?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press flex min-h-16 items-center justify-between rounded-lg px-4 py-3 text-left",
        selected ? "bg-navy-2 text-fg shadow-border-strong" : "bg-navy text-fg shadow-border",
        decoy && "opacity-70",
        decoy && selected && "opacity-90",
      )}
    >
      <span>
        <span className="text-body font-medium">{title}</span>
        <span className="mt-0.5 block text-meta text-subtle">{hint}</span>
      </span>
      <span className="font-sans text-body tabular">{price}</span>
    </button>
  );
}
