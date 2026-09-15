import { useState } from "react";
import { Button, Chip, Field, Label, Sheet } from "@/components/ui";
import { catalog, chipKey, EVENTS, packById, packsForProgram } from "@/lib/packs";
import { emptyDraft } from "@/lib/store";
import type { Draft, EventId, Gymnast, ProgramId } from "@/lib/types";

const STEPS = ["name", "program", "events", "chips", "meet", "goal"] as const;

export function GymnastForm({
  title,
  kicker,
  initial,
  onClose,
  onSave,
}: {
  title: string;
  kicker: string;
  initial?: Gymnast;
  onClose: () => void;
  onSave: (d: Draft) => void;
}) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>(() => ({ ...emptyDraft(), ...initial, role: "parent" }));
  const packs = d.programId ? packsForProgram(d.programId) : [];
  const pack = packById(d.packId);
  const id = STEPS[step];
  const last = step === STEPS.length - 1;
  const canNext =
    id === "name"
      ? Boolean(d.name.trim())
      : id === "program"
        ? Boolean(d.programId && d.packId)
        : id === "goal"
          ? Boolean(d.goalId)
          : true;

  function toggleEvent(id: EventId) {
    const events = d.events.includes(id) ? d.events.filter((v) => v !== id) : [...d.events, id];
    setD({ ...d, events });
  }
  function toggleChip(id: string) {
    const chips = d.chips.includes(id) ? d.chips.filter((v) => v !== id) : [...d.chips, id];
    setD({ ...d, chips });
  }

  return (
    <Sheet onClose={onClose} labelledBy="gymnast-form-title">
      <Label>{kicker}</Label>
      <h2 id="gymnast-form-title" className="mt-1 font-display text-2xl font-medium tracking-title">
        {title}
      </h2>
      <p className="mt-1 text-meta text-muted">
        {step + 1}/{STEPS.length}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {id === "name" && (
          <Field label="First name" value={d.name} onChange={(name) => setD({ ...d, name })} placeholder="Maya" />
        )}
        {id === "program" && (
          <>
            <p className="text-meta uppercase tracking-kicker text-subtle">Program</p>
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
            {packs.length > 0 && (
              <>
                <p className="mt-2 text-meta uppercase tracking-kicker text-subtle">Level</p>
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
              </>
            )}
          </>
        )}
        {id === "events" && (
          <div className="grid grid-cols-2 gap-2">
            {EVENTS.filter((e) => e.id === "vault" || e.id === "bars" || e.id === "beam" || e.id === "floor" || e.id === "wait").map(
              (e) => (
                <Chip
                  key={e.id}
                  selected={d.events.includes(e.id)}
                  onClick={() => toggleEvent(e.id)}
                >
                  {e.label}
                </Chip>
              ),
            )}
          </div>
        )}
        {id === "chips" && pack && (
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
            {catalog.sharedChips.map((c) => (
              <Chip key={c.id} selected={d.chips.includes(c.id)} onClick={() => toggleChip(c.id)} className="w-full">
                {c.label}
              </Chip>
            ))}
            {(d.events.filter((e) => ["vault", "bars", "beam", "floor"].includes(e)) as EventId[]).map((ev) =>
              (pack.chips[ev] ?? []).map((label) => {
                const key = chipKey(ev, label);
                return (
                  <Chip key={key} selected={d.chips.includes(key)} onClick={() => toggleChip(key)} className="w-full">
                    {label}
                  </Chip>
                );
              }),
            )}
          </div>
        )}
        {id === "chips" && !pack && <p className="text-small text-muted">Pick a level first. Back one step.</p>}
        {id === "meet" && (
          <>
            <Field label="Date" type="date" value={d.meetDate} onChange={(meetDate) => setD({ ...d, meetDate })} />
            <Field label="Meet name" value={d.meetName} onChange={(meetName) => setD({ ...d, meetName })} placeholder="Spring Classic" />
            <Field
              label="Session time"
              value={d.sessionTime}
              onChange={(sessionTime) => setD({ ...d, sessionTime })}
              placeholder="Optional — 9:00 am"
            />
            <Chip selected={!d.meetDate && !d.meetName} onClick={() => setD({ ...d, meetDate: "", meetName: "" })} className="w-full">
              No date yet
            </Chip>
          </>
        )}
        {id === "goal" && pack && (
          <div className="flex flex-col gap-2">
            {pack.goals.map((g) => (
              <Chip key={g.id} selected={d.goalId === g.id} onClick={() => setD({ ...d, goalId: g.id })} className="w-full">
                {g.label}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {last ? (
          <Button className="w-full" disabled={!canNext} onClick={() => onSave(d)}>
            Save
          </Button>
        ) : (
          <Button className="w-full" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
            Continue
          </Button>
        )}
        {step > 0 && (
          <Button variant="ghost" className="w-full" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        )}
        <Button variant="ghost" className="w-full" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Sheet>
  );
}
