import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Field, Label, Sheet } from "@/components/ui";
import { packById } from "@/lib/packs";
import { aaOf, mobilityBadge, showIes } from "@/lib/plan";
import { useHydrated } from "@/lib/hydrated";
import { useActiveGymnast, useMeet } from "@/lib/store";
import { formatScore } from "@/lib/utils";

export const Route = createFileRoute("/scores")({ component: Scores });

function Scores() {
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const g = useActiveGymnast();
  const pack = g ? packById(g.packId) : undefined;
  const scores = useMeet((s) => s.scores);
  const addScore = useMeet((s) => s.addScore);
  const removeScore = useMeet((s) => s.removeScore);
  const [open, setOpen] = useState(false);

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
      <header className="flex items-end justify-between pb-5 pt-3">
        <div>
          <Label>Score journal</Label>
          <h1 className="mt-1 font-display text-[32px] font-medium tracking-[-0.03em] leading-none">
            Meets
          </h1>
        </div>
        <Button className="min-h-11 px-4" onClick={() => setOpen(true)}>
          Log a meet
        </Button>
      </header>

      {chart.length > 1 && (
        <Card className="mb-3 p-0 overflow-hidden">
          <div className="px-5 pt-4">
            <Label>All-around</Label>
          </div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <Area
                  type="monotone"
                  dataKey="aa"
                  stroke="#d8d2c6"
                  fill="#d8d2c6"
                  fillOpacity={0.12}
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-3 pb-4">
        {mine.length === 0 && (
          <Card>
            <p className="text-[15px] leading-relaxed text-muted">
              After the meet, log V / UB / BB / FX. If she hits a real rule, you’ll see a badge. A 34.1 at
              Level 3 is a clean-meet benchmark, not mobility.
            </p>
          </Card>
        )}
        {mine.map((s) => {
          const aa = aaOf(s);
          const badge = mobilityBadge(pack, aa);
          return (
            <Card key={s.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[12px] text-subtle">{s.date}</p>
                  <h2 className="font-display text-[22px] font-medium tracking-[-0.02em]">{s.name}</h2>
                </div>
                <p className="font-mono text-[22px] tabular">{formatScore(aa)}</p>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {[
                  ["V", s.vault],
                  ["UB", s.bars],
                  ["BB", s.beam],
                  ["FX", s.floor],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[12px] bg-surface-2 py-2">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-subtle">{k}</p>
                    <p className="mt-1 font-mono text-[14px] tabular">{formatScore(v as number | null)}</p>
                  </div>
                ))}
              </div>
              {badge && <p className="mt-3 text-[13px] text-ok">{badge}</p>}
              {s.falls && <p className="mt-2 text-[13px] text-muted">Falls: {s.falls}</p>}
              {s.notes && <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.notes}</p>}
              <button
                type="button"
                className="mt-3 text-[12px] text-subtle"
                onClick={() => removeScore(s.id)}
              >
                Remove
              </button>
            </Card>
          );
        })}
      </div>

      {open && (
        <ScoreForm
          gymnastId={g.id}
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

function ScoreForm({
  gymnastId,
  onClose,
  onSave,
}: {
  gymnastId: string;
  ies: boolean;
  onClose: () => void;
  onSave: (row: {
    gymnastId: string;
    date: string;
    name: string;
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
  const [vault, setVault] = useState("");
  const [bars, setBars] = useState("");
  const [beam, setBeam] = useState("");
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [falls, setFalls] = useState("");

  function num(v: string) {
    if (!v.trim()) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  return (
    <Sheet>
        <Label>New meet</Label>
        <h2 className="mt-1 font-display text-[24px] font-medium tracking-[-0.03em]">Log scores</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Field label="Date" type="date" value={date} onChange={setDate} />
          <Field label="Meet name" value={name} onChange={setName} placeholder="Spring Classic" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Vault" value={vault} onChange={setVault} placeholder="8.50" />
            <Field label="Bars" value={bars} onChange={setBars} placeholder="8.20" />
            <Field label="Beam" value={beam} onChange={setBeam} placeholder="8.10" />
            <Field label="Floor" value={floor} onChange={setFloor} placeholder="8.70" />
          </div>
          <Field label="Falls" value={falls} onChange={setFalls} placeholder="Beam — after leap" />
          <Field label="Notes" value={notes} onChange={setNotes} placeholder="Ask coach about the kip" />
        </div>
        <Button
          className="mt-5 w-full"
          onClick={() =>
            onSave({
              gymnastId,
              date,
              name: name.trim() || "Meet",
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
