import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button, Card, Chip, Field, Label, Sheet } from "@/components/ui";
import { catalog, packById, packsForProgram } from "@/lib/packs";
import { useHydrated } from "@/lib/hydrated";
import { emptyDraft, useActiveGymnast, useMeet } from "@/lib/store";
import { possessive } from "@/lib/utils";
import type { Draft, ProgramId } from "@/lib/types";

export const Route = createFileRoute("/family")({ component: Family });

function Family() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const gymnasts = useMeet((s) => s.gymnasts);
  const active = useActiveGymnast();
  const setActive = useMeet((s) => s.setActive);
  const addGymnast = useMeet((s) => s.addGymnast);
  const removeGymnast = useMeet((s) => s.removeGymnast);
  const resetAll = useMeet((s) => s.resetAll);
  const planKind = useMeet((s) => s.planKind);
  const [adding, setAdding] = useState(false);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex-1" />
      </AppShell>
    );
  }
  if (!unlocked) return <Navigate to="/" />;

  return (
    <AppShell>
      <header className="pb-5 pt-3">
        <Label>Household</Label>
        <h1 className="mt-1 font-display text-[32px] font-medium tracking-[-0.03em] leading-none">
          Family
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          One subscription. A plan for each gymnast.
          {planKind ? ` · ${planKind}` : ""}
        </p>
      </header>

      <div className="flex flex-col gap-2 pb-4">
        {gymnasts.map((g) => {
          const pack = packById(g.packId);
          const on = active?.id === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                setActive(g.id);
                navigate({ to: "/home" });
              }}
              className="text-left"
            >
              <Card className={on ? "bg-fg text-bg" : ""}>
                <p className={`text-[11px] uppercase tracking-[0.14em] ${on ? "text-bg/60" : "text-subtle"}`}>
                  {pack?.label ?? g.packId}
                </p>
                <h2 className="mt-1 font-display text-[24px] font-medium tracking-[-0.02em]">
                  {possessive(g.name)} plan
                </h2>
                <p className={`mt-1 text-[13px] ${on ? "text-bg/70" : "text-muted"}`}>
                  {pack?.helper}
                </p>
                {gymnasts.length > 1 && (
                  <button
                    type="button"
                    className={`mt-3 text-[12px] ${on ? "text-bg/60" : "text-subtle"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeGymnast(g.id);
                    }}
                  >
                    Remove
                  </button>
                )}
              </Card>
            </button>
          );
        })}

        <Button variant="outline" className="mt-2 w-full" onClick={() => setAdding(true)}>
          Add a gymnast
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            resetAll();
            navigate({ to: "/" });
          }}
        >
          Reset this household
        </Button>
      </div>

      {adding && (
        <AddSheet
          onClose={() => setAdding(false)}
          onSave={(d) => {
            addGymnast(d);
            setAdding(false);
            navigate({ to: "/home" });
          }}
        />
      )}
    </AppShell>
  );
}

function AddSheet({ onClose, onSave }: { onClose: () => void; onSave: (d: Draft) => void }) {
  const [d, setD] = useState<Draft>({ ...emptyDraft(), role: "parent" });
  const packs = d.programId ? packsForProgram(d.programId) : [];
  const pack = packById(d.packId);
  const ready = d.name.trim() && d.programId && d.packId && d.goalId;

  return (
    <Sheet>
        <Label>Second plan</Label>
        <h2 className="mt-1 font-display text-[24px] font-medium tracking-[-0.03em]">Add a gymnast</h2>
        <div className="mt-4 flex flex-col gap-4">
          <Field label="First name" value={d.name} onChange={(name) => setD({ ...d, name })} placeholder="Maya" />
          <div>
            <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-subtle">Program</p>
            <div className="flex flex-col gap-2">
              {catalog.programs.map((p) => (
                <Chip
                  key={p.id}
                  selected={d.programId === p.id}
                  onClick={() => setD({ ...d, programId: p.id as ProgramId, packId: "", goalId: "" })}
                  className="w-full"
                >
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>
          {packs.length > 0 && (
            <div>
              <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-subtle">Level</p>
              <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                {packs.map((p) => (
                  <Chip
                    key={p.id}
                    selected={d.packId === p.id}
                    onClick={() => setD({ ...d, packId: p.id, goalId: "" })}
                    className="w-full"
                  >
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}
          {pack && (
            <div>
              <p className="mb-2 text-[12px] uppercase tracking-[0.14em] text-subtle">Goal</p>
              <div className="flex flex-col gap-2">
                {pack.goals.map((g) => (
                  <Chip
                    key={g.id}
                    selected={d.goalId === g.id}
                    onClick={() => setD({ ...d, goalId: g.id })}
                    className="w-full"
                  >
                    {g.label}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button className="mt-5 w-full" disabled={!ready} onClick={() => onSave(d)}>
          Add to household
        </Button>
        <Button variant="ghost" className="mt-1 w-full" onClick={onClose}>
          Cancel
        </Button>
    </Sheet>
  );
}
