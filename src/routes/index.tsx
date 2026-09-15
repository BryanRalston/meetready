import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HouseholdKeySheet } from "@/components/household-key-sheet";
import { Button, Shell } from "@/components/ui";
import { Pip } from "@/components/pip";
import { useSecretPipTaps } from "@/lib/household-key";
import { useMeet } from "@/lib/store";
import { asset } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();
  const unlocked = useMeet((s) => s.unlocked);
  const loadSample = useMeet((s) => s.loadSample);
  const resetDraft = useMeet((s) => s.resetDraft);
  const unlock = useMeet((s) => s.unlock);
  const draft = useMeet((s) => s.draft);
  const commitDraft = useMeet((s) => s.commitDraft);
  const { tapPip, keyOpen, setKeyOpen } = useSecretPipTaps();

  return (
    <Shell flush className="relative">
      <img src={asset("/art/splash.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-scrim absolute inset-0" />
      <div className="relative z-10 flex min-h-full flex-1 flex-col justify-end px-5 pb-[max(1.5rem,var(--phone-safe-bottom))] pt-8">
        <div className="mb-auto flex items-start justify-between pt-[max(1rem,var(--phone-safe-top))]">
          <p className="text-kicker uppercase tracking-kicker text-fg/70">JO + Xcel</p>
          <button type="button" aria-label="Pip" onClick={tapPip} className="press shrink-0 rounded-md">
            <Pip pose="bag" size={52} className="pip-float" />
          </button>
        </div>

        <p className="mb-3 text-meta uppercase tracking-kicker text-fg/55">From the bleachers</p>
        <h1 className="font-display text-display font-medium leading-display tracking-display text-fg">
          She competes.
          <span className="mt-1 block text-accent">You run the season.</span>
        </h1>
        <p className="mt-5 max-w-[32ch] text-body leading-relaxed text-fg/80">
          Meet day panic, beam freeze, the bag, the number that actually matters for her level. Not a club OS. Not a
          video coach.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {unlocked ? (
            <Button onClick={() => navigate({ to: "/home" })}>Open her plan</Button>
          ) : (
            <Button
              onClick={() => {
                resetDraft();
                navigate({ to: "/onboarding" });
              }}
            >
              Build her plan
            </Button>
          )}
          <button
            type="button"
            className="press min-h-12 text-center text-meta text-fg/55"
            onClick={() => {
              loadSample();
              navigate({ to: "/home" });
            }}
          >
            Peek at Emma · Level 4 · Spring Classic
          </button>
        </div>
      </div>
      {keyOpen && (
        <HouseholdKeySheet
          onClose={() => setKeyOpen(false)}
          onUnlock={() => {
            if (draft.packId && draft.name.trim()) commitDraft();
            unlock("free");
            navigate({ to: "/home" });
          }}
        />
      )}
    </Shell>
  );
}
