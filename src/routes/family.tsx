import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { GymnastForm } from "@/components/gymnast-form";
import { Button, Card, Label, Sheet } from "@/components/ui";
import { packById } from "@/lib/packs";
import { useHydrated } from "@/lib/hydrated";
import { planKindLabel, useActiveGymnast, useMeet } from "@/lib/store";
import { cn, possessive } from "@/lib/utils";
import type { Draft, Gymnast } from "@/lib/types";

export const Route = createFileRoute("/family")({ component: Family });

function Family() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);
  const gymnasts = useMeet((s) => s.gymnasts);
  const active = useActiveGymnast();
  const setActive = useMeet((s) => s.setActive);
  const addGymnast = useMeet((s) => s.addGymnast);
  const updateGymnast = useMeet((s) => s.updateGymnast);
  const removeGymnast = useMeet((s) => s.removeGymnast);
  const resetAll = useMeet((s) => s.resetAll);
  const planKind = useMeet((s) => s.planKind);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Gymnast | null>(null);
  const [resetting, setResetting] = useState(false);

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
      <header className="pb-6 pt-2">
        <Label>Household</Label>
        <h1 className="mt-1 font-display text-title font-medium leading-none tracking-title">Family</h1>
        <p className="mt-2 text-ui text-muted">
          One household. A plan for each gymnast.
          {planKindLabel(planKind) ? ` · ${planKindLabel(planKind)}` : ""}
        </p>

      </header>

      <div className="flex flex-col gap-2 pb-6">
        {gymnasts.map((g) => {
          const pack = packById(g.packId);
          const on = active?.id === g.id;
          return (
            <Card key={g.id} className={on ? "bg-fg text-bg" : ""}>
              <p className={cn("text-kicker uppercase tracking-kicker", on ? "text-bg/70" : "text-subtle")}>
                {pack?.label ?? g.packId}
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-title">{possessive(g.name)} plan</h2>
              <p className={cn("mt-1 text-small", on ? "text-bg/70" : "text-muted")}>{pack?.helper}</p>
              <div className="mt-3 flex flex-col gap-1">
                <button
                  type="button"
                  className={cn("press min-h-12 text-left text-meta", on ? "text-bg/70" : "text-muted")}
                  onClick={() => {
                    setActive(g.id);
                    navigate({ to: "/home" });
                  }}
                >
                  Open plan
                </button>
                <button
                  type="button"
                  className={cn("press min-h-12 text-left text-meta", on ? "text-bg/70" : "text-muted")}
                  onClick={() => setEditing(g)}
                >
                  Edit season
                </button>
                {gymnasts.length > 1 && (
                  <button
                    type="button"
                    className={cn("press min-h-12 text-left text-meta", on ? "text-bg/70" : "text-subtle")}
                    onClick={() => removeGymnast(g.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </Card>
          );
        })}

        <button
          type="button"
          onClick={() => navigate({ to: "/features" })}
          className="press mt-4 text-left"
        >
          <Card>
            <Label>Feature map</Label>
            <h2 className="mt-1 font-display text-card font-medium tracking-title">What's in MeetReady</h2>
            <p className="mt-1 text-small text-muted">Current capabilities. Not a roadmap.</p>
          </Card>
        </button>

        <Button variant="outline" className="mt-2 w-full" onClick={() => setAdding(true)}>
          Add a gymnast
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => setResetting(true)}>
          Reset this household
        </Button>
      </div>

      {adding && (
        <GymnastForm
          kicker="Second plan"
          title="Add a gymnast"
          onClose={() => setAdding(false)}
          onSave={(d: Draft) => {
            addGymnast(d);
            setAdding(false);
            navigate({ to: "/home" });
          }}
        />
      )}
      {resetting && (
        <Sheet onClose={() => setResetting(false)} labelledBy="reset-title">
          <Label>Household</Label>
          <h2 id="reset-title" className="mt-1 font-display text-2xl font-medium tracking-title">
            Reset this household?
          </h2>
          <p className="mt-3 text-ui leading-relaxed text-muted">
            Plans, scores, and packing on this phone go away. This cannot be undone.
          </p>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              resetAll();
              navigate({ to: "/" });
            }}
          >
            Reset
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => setResetting(false)}>
            Keep the household
          </Button>
        </Sheet>
      )}
      {editing && (
        <GymnastForm
          kicker="Season"
          title={`Edit ${editing.name}`}
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={(d: Draft) => {
            updateGymnast(editing.id, d);
            setEditing(null);
            setActive(editing.id);
            navigate({ to: "/home" });
          }}
        />
      )}
    </AppShell>
  );
}
