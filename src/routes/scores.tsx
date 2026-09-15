import { createFileRoute, Navigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Chip, Field, Label, Sheet } from "@/components/ui";
import { packById } from "@/lib/packs";
import { aaOf, iesOf, mobilityBadge, showIes } from "@/lib/plan";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { clampScore, formatMeetDate, formatScore } from "@/lib/utils";
import type { MeetKind } from "@/lib/types";

export const Route = createFileRoute("/scores")({ component: Scores });

function Scores() {
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const g = useActiveGymnast();
  const pack = g ? packById(g.packId) : undefined;
  const scores = useMeet((s) => s.scores);
  const addScore = useMeet((s) => s.addScore);
  const removeScore = useMeet((s) => s.removeScore);
  const hash = useRouterState({ select: (s) => s.location.hash });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hash === "log" || hash === "#log") setOpen(true);
  }, [hash]);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex-1" />
      </AppShell>
    );
  }
  if (!unlocked) return <Navigate to="/" />;
  if (!g || !pack) return <Navigate to="/family" />;

  const mine = scores.filter((s) => s.gymnastId === g.id);
  const chart = [...mine]
    .reverse()
    .map((s) => ({ aa: aaOf(s) ?? 0, name: s.name }))
    .filter((d) => d.aa > 0);

  return (
    <AppShell>
      <header className="flex items-end justify-between pb-6 pt-2">
        <div>
          <Label>Score journal</Label>
          <h1 className="mt-1 font-display text-title font-medium leading-none tracking-title">Meets</h1>
        </div>
        <Button className="min-h-12 px-4" onClick={() => setOpen(true)}>
          Log a meet
        </Button>
      </header>

      {chart.length > 1 && (
        <Card className="mb-4 overflow-hidden p-0">
          <div className="px-4 pt-4">
            <Label>All-around</Label>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <Area
                  type="monotone"
                  dataKey="aa"
                  stroke="var(--color-accent)"
                  fill="var(--color-accent)"
                  fillOpacity={0.12}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-3 pb-6">
        {mine.length === 0 && (
          <Card>
            <p className="text-body leading-relaxed text-muted">
              After the meet, log V / UB / BB / FX. If she hits a real rule, you’ll see a badge. A 34.1 at Level 3 is a
              clean-meet benchmark, not mobility.
            </p>
          </Card>
        )}
        {mine.map((s) => {
          const aa = aaOf(s);
          const ies = iesOf(s);
          const scorePack = packById(s.packId ?? g.packId) ?? pack;
          const badge = mobilityBadge(scorePack, aa, ies, s.meetKind);
          return (
            <Card key={s.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-meta text-subtle">{formatMeetDate(s.date) || s.date}</p>
                  <h2 className="font-display text-card font-medium tracking-title">{s.name}</h2>
                </div>
                <p className="num-hero shrink-0 text-3xl leading-none">{formatScore(aa)}</p>
              </div>
              <div className="score-row">
                {[
                  ["V", s.vault],
                  ["UB", s.bars],
                  ["BB", s.beam],
                  ["FX", s.floor],
                ].map(([k, v]) => (
                  <div key={k} className="score-cell">
                    <p className="text-micro uppercase tracking-kicker text-subtle">{k}</p>
                    <p className="mt-1 font-sans text-ui tabular">{formatScore(v as number | null)}</p>
                  </div>
                ))}
              </div>
              {badge && <p className="mt-3 text-small text-ok">{badge}</p>}
              {s.falls && <p className="mt-2 text-small text-muted">Falls: {s.falls}</p>}
              {s.notes && <p className="mt-2 text-small leading-relaxed text-muted">{s.notes}</p>}
              <button type="button" className="press mt-3 min-h-12 text-meta text-subtle" onClick={() => removeScore(s.id)}>
                Remove
              </button>
            </Card>
          );
        })}
      </div>

      {open && (
        <ScoreForm
          gymnastId={g.id}
          packId={g.packId}
          ies={showIes(pack)}
          onClose={() => setOpen(false)}
          onSave={(row) => {
            addScore(row);
            setOpen(false);
          }}
        />
      )}
    </AppShell>
  );
}

const MEET_KINDS: { id: MeetKind; label: string }[] = [
  { id: "sanctioned", label: "Live sanctioned" },
  { id: "in_house", label: "In-house / mock" },
  { id: "unsure", label: "Not sure" },
];

function ScoreForm({
  gymnastId,
  packId,
  ies,
  onClose,
  onSave,
}: {
  gymnastId: string;
  packId: string;
  ies: boolean;
  onClose: () => void;
  onSave: (row: {
    gymnastId: string;
    packId: string;
    date: string;
    name: string;
    meetKind: MeetKind;
    vault: number | null;
    bars: number | null;
    beam: number | null;
    floor: number | null;
    notes: string;
    falls: string;
    video: string;
  }) => void;
}) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState(today);
  const [name, setName] = useState("");
  const [meetKind, setMeetKind] = useState<MeetKind>("unsure");
  const [vault, setVault] = useState("");
  const [bars, setBars] = useState("");
  const [beam, setBeam] = useState("");
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [falls, setFalls] = useState("");

  function num(v: string) {
    if (!v.trim()) return null;
    const n = Number(v);
    return Number.isFinite(n) ? clampScore(n) : null;
  }

  return (
    <Sheet onClose={onClose} labelledBy="log-scores-title">
      <Label>New meet</Label>
      <h2 id="log-scores-title" className="mt-1 font-display text-2xl font-medium tracking-title">
        Log scores
      </h2>
      <div className="mt-4 flex flex-col gap-3">
        <Field label="Date" type="date" value={date} onChange={setDate} />
        <Field label="Meet name" value={name} onChange={setName} placeholder="Spring Classic" />
        <p className="text-meta uppercase tracking-kicker text-subtle">Meet type</p>
        <div className="flex flex-col gap-2">
          {MEET_KINDS.map((k) => (
            <Chip key={k.id} selected={meetKind === k.id} onClick={() => setMeetKind(k.id)} className="w-full">
              {k.label}
            </Chip>
          ))}
        </div>
        <p className="text-meta leading-relaxed text-muted">
          Mobility only counts at a live sanctioned meet. Not sure stays blank.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Vault" value={vault} onChange={setVault} placeholder="8.50" />
          <Field label="Bars" value={bars} onChange={setBars} placeholder="8.20" />
          <Field label="Beam" value={beam} onChange={setBeam} placeholder="8.10" />
          <Field label="Floor" value={floor} onChange={setFloor} placeholder="8.70" />
        </div>
        {ies && (
          <p className="text-meta leading-relaxed text-muted">
            IES = three events or less (R&P Ch.7). Chart writes 8.5 — no extra formula. Leave unused events blank.
          </p>
        )}
        <Field label="Falls" value={falls} onChange={setFalls} placeholder="Beam — after leap" />
        <Field label="Notes" value={notes} onChange={setNotes} placeholder="Ask coach about the kip" />
      </div>
      <Button
        className="mt-5 w-full"
        onClick={() =>
          onSave({
            gymnastId,
            packId,
            date,
            name: name.trim() || "Meet",
            meetKind,
            vault: num(vault),
            bars: num(bars),
            beam: num(beam),
            floor: num(floor),
            notes,
            falls,
            video: "",
          })
        }
      >
        Save meet
      </Button>
      <Button variant="ghost" className="mt-1 w-full" onClick={onClose}>
        Cancel
      </Button>
    </Sheet>
  );
}
