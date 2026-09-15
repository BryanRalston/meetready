import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Label } from "@/components/ui";
import { catalog, packById } from "@/lib/packs";
import { orderPacking } from "@/lib/plan";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { cn, daysUntil, formatMeetDate, possessive } from "@/lib/utils";

export const Route = createFileRoute("/meet")({ component: Meet });

function Meet() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const g = useActiveGymnast();
  const packing = useMeet((s) => s.packing);
  const setPacking = useMeet((s) => s.setPacking);
  const togglePacked = useMeet((s) => s.togglePacked);
  const pack = g ? packById(g.packId) : undefined;
  const [shared, setShared] = useState("");

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
  const past = days != null && days < 0;
  const numberLabel = pack.numberThatMatters.label;
  const shownPacking = orderPacking(
    packing.map((p) => p.label),
    g.panicId,
  ).map((label) => packing.find((p) => p.label === label) ?? { label, done: false });

  async function shareCard() {
    const lines = [
      `${g.meetName || "Meet day"} — ${formatMeetDate(g.meetDate) || "date TBD"}`,
      g.sessionTime ? `Session ${g.sessionTime}` : "A session is often 3–4 hours.",
      "Arrive for march-in, not open stretch, unless they have a gym pass.",
      `Do not talk scores in the car. ${possessive(g.name)} last event gets one non-score sentence.`,
      `The number that matters: ${numberLabel}.`,
    ];
    const text = lines.join("\n");
    try {
      if (navigator.share) await navigator.share({ title: "Meet day", text });
      else {
        await navigator.clipboard.writeText(text);
        setShared("Copied.");
      }
    } catch {
      setShared("");
    }
  }

  return (
    <AppShell>
      <header className="pb-6 pt-2">
        <img src="/art/packing.jpg" alt="" className="photo mb-4 h-36 w-full rounded-card object-cover" />
        <Label>Meet week</Label>
        <h1 className="mt-1 font-display text-title font-medium leading-none tracking-title">
          {g.meetName || "Next meet"}
        </h1>
        <p className="mt-2 text-ui text-muted">
          {g.meetDate
            ? `${formatMeetDate(g.meetDate)}${g.sessionTime ? ` · ${g.sessionTime}` : ""}${
                days != null && days >= 0 ? ` · ${days} day${days === 1 ? "" : "s"}` : past ? " · done" : ""
              }`
            : "No date yet — packing still matters."}
        </p>
        {past && (
          <button
            type="button"
            className="press mt-3 min-h-12 text-left text-meta text-muted"
            onClick={() => navigate({ to: "/scores", hash: "log" })}
          >
            Log this meet
          </button>
        )}
      </header>

      <div className="flex flex-col gap-4 pb-6">
        <Card>
          <Label>Night-before packing</Label>
          <ul className="mt-3">
            {shownPacking.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => togglePacked(item.label)}
                  className="press flex min-h-12 w-full items-start gap-3 py-2 text-left"
                >
                  <span className={cn("check mt-0.5", item.done ? "check-on" : "check-off")}>
                    {item.done && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={item.done ? "text-ui text-muted line-through" : "text-ui text-fg"}>
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
                <span className="w-6 shrink-0 font-sans text-meta tabular text-subtle">0{i + 1}</span>
                <p className="text-body leading-relaxed">{rule}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <Label>Grandparent card</Label>
          <h2 className="mt-1 font-display text-card font-medium tracking-title">
            For whoever is sitting with you
          </h2>
          <ul className="mt-4 space-y-3 text-ui leading-relaxed text-muted">
            <li>Arrive for march-in, not open stretch, unless they have a gym pass.</li>
            <li>A session is often 3–4 hours. Bring a seat and a book.</li>
            <li>Do not talk scores in the car. {possessive(g.name)} last event gets one non-score sentence.</li>
            <li>
              {pack.shortLabel} is not a generic “gymnastics meet.” The number that matters is{" "}
              {pack.numberThatMatters.label.toLowerCase()}.
            </li>
            {g.sessionTime && <li>Session time: {g.sessionTime}.</li>}
          </ul>
          <Button variant="outline" className="mt-4 w-full" onClick={shareCard}>
            Share this card
          </Button>
          {shared && <p className="mt-2 text-meta text-muted">{shared}</p>}
          <Button className="mt-2 w-full" onClick={() => navigate({ to: "/scores", hash: "log" })}>
            Log this meet
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
