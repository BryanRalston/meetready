import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Shell } from "@/components/ui";
import { Pip } from "@/components/pip";
import { useMeet } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Splash });

function Splash() {
  const navigate = useNavigate();
  const unlocked = useMeet((s) => s.unlocked);
  const loadSample = useMeet((s) => s.loadSample);
  const resetDraft = useMeet((s) => s.resetDraft);

  return (
    <Shell flush className="relative">
      <img
        src="/art/splash.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="relative z-10 flex min-h-full flex-1 flex-col justify-end px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
        <div className="mb-auto flex items-start justify-between pt-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-fg/70">JO + Xcel</p>
          <Pip pose="bag" size={52} className="shadow-[0_8px_24px_rgb(0_0_0/0.35)]" />
        </div>

        <p className="mb-3 text-[12px] uppercase tracking-[0.18em] text-fg/55">From the bleachers</p>
        <h1 className="font-display text-[48px] font-medium leading-[0.92] tracking-[-0.045em] text-fg">
          She competes.
          <span className="mt-1 block text-accent">You run the season.</span>
        </h1>
        <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-fg/80">
          Meet day panic, beam freeze, the bag, the number that actually matters for her level. Not a club OS. Not a video coach.
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
            className="min-h-11 text-center text-[12px] text-fg/55"
            onClick={() => {
              loadSample();
              navigate({ to: "/home" });
            }}
          >
            Peek at Emma · Level 4 · Spring Classic
          </button>
        </div>
      </div>
    </Shell>
  );
}
