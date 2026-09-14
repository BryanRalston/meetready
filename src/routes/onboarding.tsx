import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Chip, Field, Kicker, Progress, Shell, Title } from "@/components/ui";
import { PipAside } from "@/components/pip";
import {
  EVENTS,
  bodyOptions,
  catalog,
  chipKey,
  extrasOptions,
  hoursOptions,
  packById,
  packsForProgram,
  visibleMoments,
} from "@/lib/packs";
import { ROLES, useMeet } from "@/lib/store";
import { personalizedFacts, pipLineForStep, PANIC_OPTIONS } from "@/lib/voice";
import { cn, daysUntil, possessive } from "@/lib/utils";
import type { EventId, ProgramId, RoleId } from "@/lib/types";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const STEPS = [
  "outcome_require",
  "outcome_meet",
  "outcome_number",
  "role",
  "name",
  "program",
  "level",
  "moment",
  "meet",
  "events",
  "chips",
  "hours",
  "body",
  "panic",
  "goal",
  "building",
] as const;

const LAST = STEPS.length - 1;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const draft = useMeet((s) => s.draft);
  const setDraft = useMeet((s) => s.setDraft);
  const toggle = useMeet((s) => s.toggleDraftList);
  const pack = packById(draft.packId);
  const id = STEPS[step];
  const pip = pipLineForStep(id, draft);

  const canNext = useMemo(() => {
    switch (id) {
      case "role":
        return Boolean(draft.role);
      case "name":
        return draft.name.trim().length > 0;
      case "program":
        return Boolean(draft.programId);
      case "level":
        return Boolean(draft.packId);
      case "moment":
        return Boolean(draft.momentId);
      case "meet":
        return true;
      case "events":
        return draft.events.length > 0;
      case "chips":
        return draft.chips.length > 0;
      case "hours":
        return Boolean(draft.hours);
      case "body":
        return draft.body.length > 0;
      case "panic":
        return Boolean(draft.panicId);
      case "goal":
        return Boolean(draft.goalId);
      default:
        return true;
    }
  }, [id, draft]);

  function back() {
    if (step === 0) {
      navigate({ to: "/" });
      return;
    }
    setStep((s) => s - 1);
  }

  function next() {
    if (step >= LAST) {
      navigate({ to: "/paywall" });
      return;
    }
    setStep((s) => s + 1);
  }

  const flush = id.startsWith("outcome") || id === "building";

  return (
    <Shell flush={flush} className={flush ? "relative" : undefined}>
      {id !== "building" && (
        <header className={cn("flex items-center gap-3 py-2", flush && "absolute inset-x-0 top-0 z-20 px-5 pt-3")}>
          <button
            type="button"
            onClick={back}
            className="flex h-11 w-11 items-center justify-center rounded-[12px] text-fg/80"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>
          <Progress value={step + 1} max={STEPS.length} />
          <span className="w-10 text-right text-[11px] tabular text-subtle">{step + 1}/{STEPS.length}</span>
        </header>
      )}

      <div className={cn("flex flex-1 flex-col", flush ? "" : "pt-4")}>
        {id === "outcome_require" && (
          <Outcome
            n="01"
            img="/art/beam.jpg"
            title="You already know the freeze."
            body="She salutes. The beam is four inches. You cannot climb down there. This plan is for the parent in the bleachers."
          />
        )}
        {id === "outcome_meet" && (
          <Outcome
            n="02"
            img="/art/packing.jpg"
            title="The bag is the meet."
            body="Leo, grips, gel, the other leo. Pack it the night before so Saturday is not a hunt through the dryer."
          />
        )}
        {id === "outcome_number" && (
          <Outcome
            n="03"
            img="/art/splash.jpg"
            title="The number that actually matters."
            body="Not a 10. Not “try your best.” The real mobility number for her level — or the honest note that Levels 1–3 have none."
          />
        )}
        {id === "role" && (
          <Picker
            kicker="You"
            title="Who is running this season?"
            options={ROLES.map((r) => ({ id: r.id, label: r.label, hint: r.hint }))}
            value={draft.role}
            onChange={(v) => setDraft({ role: v as RoleId })}
          />
        )}
        {id === "name" && (
          <div className="rise">
            <Kicker>Gymnast</Kicker>
            <Title>What’s her first name?</Title>
            <p className="mt-2 mb-8 text-[15px] text-muted">It goes on the plan. Last name stays out of it.</p>
            <Field label="First name" value={draft.name} onChange={(name) => setDraft({ name })} placeholder="Emma" />
            {draft.name.trim() && (
              <p className="mt-4 font-display text-[22px] text-accent">{possessive(draft.name)} season plan</p>
            )}
          </div>
        )}
        {id === "program" && (
          <Picker
            kicker="Program"
            title="Which program is she in?"
            options={catalog.programs.map((p) => ({
              id: p.id,
              label: p.label,
              hint:
                p.id === "dp"
                  ? "Compulsory + optional, Levels 1–10"
                  : p.id === "xcel"
                    ? "Bronze through Sapphire — not a JO clone"
                    : "Figure out JO vs Xcel vs wait",
            }))}
            value={draft.programId}
            onChange={(v) => setDraft({ programId: v as ProgramId, packId: "", momentId: "", chips: [], goalId: "" })}
          />
        )}
        {id === "level" && draft.programId && (
          <LevelPicker
            programId={draft.programId}
            value={draft.packId}
            onChange={(packId) => setDraft({ packId, chips: [], goalId: "", momentId: "" })}
          />
        )}
        {id === "moment" && pack && (
          <Picker
            kicker="This season"
            title={`Where is ${draft.name.trim() || "she"} right now?`}
            options={visibleMoments(draft.programId, draft.packId).map((m) => ({ id: m.id, label: m.label }))}
            value={draft.momentId}
            onChange={(momentId) => setDraft({ momentId })}
          />
        )}
        {id === "meet" && (
          <div className="rise">
            <Kicker>The upcoming meet</Kicker>
            <Title>When is Saturday, really?</Title>
            <p className="mt-2 mb-6 text-[15px] text-muted">Name it if you have it. Skip the date if the club hasn’t posted yet.</p>
            <div className="flex flex-col gap-4">
              <Field
                label="Date"
                value={draft.meetDate}
                onChange={(meetDate) => setDraft({ meetDate })}
                placeholder="2026-09-25"
              />
              <Field
                label="Meet name"
                value={draft.meetName}
                onChange={(meetName) => setDraft({ meetName })}
                placeholder="Spring Classic"
              />
              <Chip selected={!draft.meetDate && !draft.meetName} onClick={() => setDraft({ meetDate: "", meetName: "" })}>
                No date yet — still build the bag
              </Chip>
            </div>
          </div>
        )}
        {id === "events" && (
          <div className="rise">
            <Kicker>Anxiety map</Kicker>
            <Title>What leaks sleep this week?</Title>
            <p className="mt-2 mb-6 text-[15px] text-muted">Not a form. This weights the plan. Pick every event that does it.</p>
            <div className="grid grid-cols-2 gap-2">
              {EVENTS.map((e) => (
                <Chip key={e.id} selected={draft.events.includes(e.id)} onClick={() => toggle("events", e.id)}>
                  <span className="block font-medium">{e.label}</span>
                  <span className={cn("mt-0.5 block text-[12px]", draft.events.includes(e.id) ? "text-bg/70" : "text-subtle")}>
                    {e.hint}
                  </span>
                </Chip>
              ))}
            </div>
          </div>
        )}
        {id === "chips" && pack && (
          <ChipAudit
            packId={pack.id}
            events={draft.events}
            selected={draft.chips}
            onToggle={(chip) => toggle("chips", chip)}
          />
        )}
        {id === "hours" && (
          <div className="rise">
            <Kicker>Week shape</Kicker>
            <Title>How heavy is the gym week?</Title>
            <p className="mt-2 mb-6 text-[15px] text-muted">Home drills stay under 12 minutes. We do not add skills in the living room.</p>
            <div className="flex flex-col gap-2">
              {hoursOptions().map((h) => (
                <Chip key={h.id} selected={draft.hours === h.id} onClick={() => setDraft({ hours: h.id })} className="w-full">
                  {h.label}
                </Chip>
              ))}
            </div>
            <p className="mt-6 mb-3 text-[12px] uppercase tracking-[0.14em] text-subtle">Also in the mix</p>
            <div className="flex flex-wrap gap-2">
              {extrasOptions().map((x) => (
                <Chip key={x.id} selected={draft.extras.includes(x.id)} onClick={() => toggle("extras", x.id)}>
                  {x.label}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {id === "body" && (
          <div className="rise">
            <Kicker>Body + brain</Kicker>
            <Title>Anything we should write around?</Title>
            <p className="mt-2 mb-6 text-[15px] text-muted">Never a diagnosis. It only changes the copy.</p>
            <div className="flex flex-col gap-2">
              {bodyOptions().map((b) => (
                <Chip key={b.id} selected={draft.body.includes(b.id)} onClick={() => toggle("body", b.id)} className="w-full">
                  {b.label}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {id === "panic" && (
          <div className="rise">
            <Kicker>Saturday</Kicker>
            <Title>What does meet morning actually look like?</Title>
            <p className="mt-2 mb-6 text-[15px] text-muted">Identity, not demographics. One true thing.</p>
            <div className="flex flex-col gap-2">
              {PANIC_OPTIONS.map((p) => (
                <Chip
                  key={p.id}
                  selected={draft.panicId === p.id}
                  onClick={() => setDraft({ panicId: p.id })}
                  className="w-full"
                >
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {id === "goal" && pack && (
          <Picker
            kicker="The season"
            title="One goal. That’s it."
            options={pack.goals}
            value={draft.goalId}
            onChange={(goalId) => setDraft({ goalId })}
          />
        )}
        {id === "building" && (
          <Building
            draftName={draft.name}
            facts={personalizedFacts(draft)}
            proof={pack?.proofLine ?? "Built around her level, not a generic season."}
            meetHint={meetHint(draft.meetDate, draft.meetName)}
            onDone={() => navigate({ to: "/paywall" })}
          />
        )}

        {pip && id !== "building" && !id.startsWith("outcome") && <PipAside pose={pip.pose}>{pip.text}</PipAside>}
      </div>

      {id !== "building" && (
        <div className={cn("pt-6", flush && "absolute inset-x-0 bottom-0 z-20 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]")}>
          <Button className="w-full" disabled={!canNext} onClick={next}>
            Continue
          </Button>
        </div>
      )}
    </Shell>
  );
}

function meetHint(date: string, name: string) {
  const days = daysUntil(date);
  if (days != null) return `${days} day${days === 1 ? "" : "s"}${name ? ` · ${name}` : ""}`;
  if (name) return name;
  return "No date yet";
}

function Outcome({ n, img, title, body }: { n: string; img: string; title: string; body: string }) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-scrim absolute inset-0" />
      <div className="relative z-10 mt-auto px-5 pb-28 pt-24">
        <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-fg/55">{n} · Built for JO + Xcel families</p>
        <h1 className="font-display text-[34px] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h1>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-fg/80">{body}</p>
      </div>
    </div>
  );
}

function Picker({
  kicker,
  title,
  options,
  value,
  onChange,
}: {
  kicker: string;
  title: string;
  options: { id: string; label: string; hint?: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="rise">
      <Kicker>{kicker}</Kicker>
      <Title>{title}</Title>
      <div className="mt-7 flex flex-col gap-2">
        {options.map((o) => (
          <Chip key={o.id} selected={value === o.id} onClick={() => onChange(o.id)} className="w-full">
            <span className="block font-medium">{o.label}</span>
            {o.hint && (
              <span className={cn("mt-0.5 block text-[12px] leading-snug", value === o.id ? "text-bg/70" : "text-subtle")}>
                {o.hint}
              </span>
            )}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function LevelPicker({
  programId,
  value,
  onChange,
}: {
  programId: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const packs = packsForProgram(programId);
  return (
    <div className="rise">
      <Kicker>Level</Kicker>
      <Title>Which level or division?</Title>
      <p className="mt-2 mb-5 text-[14px] text-muted">Every JO level and every Xcel division. Full packs and stubs are labeled honestly.</p>
      <div className="flex max-h-[52dvh] flex-col gap-2 overflow-y-auto pr-1">
        {packs.map((p) => (
          <Chip key={p.id} selected={value === p.id} onClick={() => onChange(p.id)} className="w-full">
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-medium">{p.label}</span>
              <span className={cn("font-mono text-[11px]", value === p.id ? "text-bg/60" : "text-subtle")}>
                {p.ship === "full" ? "full pack" : "stub pack"}
                {p.minAge ? ` · ${p.minAge}+` : ""}
              </span>
            </span>
            <span className={cn("mt-1 block text-[12px] leading-snug", value === p.id ? "text-bg/70" : "text-subtle")}>
              {p.helper}
            </span>
          </Chip>
        ))}
      </div>
    </div>
  );
}

function ChipAudit({
  packId,
  events,
  selected,
  onToggle,
}: {
  packId: string;
  events: EventId[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const pack = packById(packId);
  if (!pack) return null;
  const eventIds: EventId[] = events.filter((e) => ["vault", "bars", "beam", "floor"].includes(e)) as EventId[];
  const show = eventIds.length ? eventIds : (["vault", "bars", "beam", "floor"] as EventId[]);

  return (
    <div className="rise">
      <Kicker>Audit</Kicker>
      <Title>What’s leaking points — or sleep?</Title>
      <p className="mt-2 mb-5 text-[14px] text-muted">Chips from her {pack.shortLabel} pack. Tap what isn’t consistent.</p>
      <div className="flex flex-wrap gap-2">
        {catalog.sharedChips.map((c) => (
          <Chip key={c.id} selected={selected.includes(c.id)} onClick={() => onToggle(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>
      {show.map((ev) => (
        <div key={ev} className="mt-6">
          <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-subtle">{ev}</p>
          <div className="flex flex-wrap gap-2">
            {(pack.chips[ev] ?? []).map((label) => {
              const key = chipKey(ev, label);
              return (
                <Chip key={key} selected={selected.includes(key)} onClick={() => onToggle(key)}>
                  {label}
                </Chip>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const PROOF_QUOTES = [
  {
    q: "I used to google “what is a kip” in the parking lot while she was on bars.",
    a: "JO parent · composite",
  },
  {
    q: "Gold is not Level 5 with a different leo. I needed someone to say that out loud.",
    a: "Xcel parent · composite",
  },
];

function Building({
  draftName,
  facts,
  proof,
  meetHint: hint,
  onDone,
}: {
  draftName: string;
  facts: string;
  proof: string;
  meetHint: string;
  onDone: () => void;
}) {
  const [pct, setPct] = useState(6);
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(1847 + (Math.floor(Date.now() / 60000) % 90));
  const sent = useRef(false);
  function finish() {
    if (sent.current) return;
    sent.current = true;
    onDone();
  }

  useEffect(() => {
    const t0 = Date.now();
    const duration = 7200;
    const id = window.setInterval(() => {
      const e = Math.min(1, (Date.now() - t0) / duration);
      setPct(Math.round(6 + e * 94));
      if (e > 0.12) setPhase((p) => Math.max(p, 1));
      if (e > 0.28) setPhase((p) => Math.max(p, 2));
      if (e > 0.42) setPhase((p) => Math.max(p, 3));
      if (e > 0.56) setPhase((p) => Math.max(p, 4));
      if (e > 0.7) setPhase((p) => Math.max(p, 5));
      if (e >= 1) {
        window.clearInterval(id);
        window.setTimeout(finish, 600);
      }
    }, 50);
    const tick = window.setInterval(() => setCount((n) => n + 1), 1400);
    return () => {
      window.clearInterval(id);
      window.clearInterval(tick);
    };
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-end px-5 pb-10 pt-12">
      <PipAside pose="bag">Building the household plan. This part is supposed to take a minute. Breathe.</PipAside>
      <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-subtle">Writing her season</p>
      <h1 className="mt-3 font-display text-[34px] font-medium leading-tight tracking-[-0.03em]">
        {possessive(draftName || "Her")} plan
      </h1>
      <p className="mt-2 text-[14px] text-muted">{facts}</p>
      <p className="mt-1 text-[13px] text-subtle">{hint}</p>

      <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 h-[2px] overflow-hidden rounded-full">
        <div className="shimmer-bar h-full w-full" />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {phase >= 1 && (
          <div className="proof-in rounded-[22px] bg-surface px-4 py-3 shadow-[0_0_0_1px_rgb(242_238_230/0.08)]">
            <p className="text-[12px] uppercase tracking-[0.14em] text-subtle">Pattern</p>
            <p className="mt-1 text-[15px] text-fg">Built for JO + Xcel families — same quiz, different pack.</p>
          </div>
        )}
        {phase >= 2 && (
          <div className="proof-in flex items-center justify-between">
            <div className="editors-badge">
              <span>Today’s pick</span>
              <span>Season OS</span>
            </div>
            <p className="max-w-[18ch] text-right text-[12px] leading-snug text-subtle">In-app mark. Not an App Store award.</p>
          </div>
        )}
        {phase >= 3 && (
          <QuoteCard q={PROOF_QUOTES[0].q} a={PROOF_QUOTES[0].a} />
        )}
        {phase >= 4 && (
          <QuoteCard q={PROOF_QUOTES[1].q} a={PROOF_QUOTES[1].a} />
        )}
        {phase >= 5 && (
          <div className="proof-in rounded-[22px] bg-surface-2 px-4 py-3">
            <p className="font-mono text-[22px] tabular">{count.toLocaleString()}</p>
            <p className="mt-1 text-[12px] text-subtle">households building a plan in this prototype counter — live-ish, not a census.</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{proof}</p>
          </div>
        )}
      </div>
      {phase >= 5 && (
        <Button className="mt-6 w-full" onClick={finish}>
          See the offer
        </Button>
      )}
    </div>
  );
}

function QuoteCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="proof-in rounded-[22px] bg-surface px-4 py-3 shadow-[0_0_0_1px_rgb(242_238_230/0.08)]">
      <p className="font-display text-[18px] leading-snug tracking-[-0.02em]">“{q}”</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-subtle">{a}</p>
    </div>
  );
}
