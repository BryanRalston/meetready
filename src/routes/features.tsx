import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, Label } from "@/components/ui";
import { PipAside } from "@/components/pip";
import { catalog } from "@/lib/packs";
import { useHydrated } from "@/lib/hydrated";
import { useMeet } from "@/lib/store";

export const Route = createFileRoute("/features")({ component: Features });

const GROUPS: { kicker: string; items: { title: string; body: string }[] }[] = [
  {
    kicker: "How you get in",
    items: [
      {
        title: "Splash from the bleachers",
        body: "She competes. You run the season. JO + Xcel. Not a club OS. Not a video coach.",
      },
      {
        title: "16-step quiz",
        body: "One question per screen. Chips at 48px. The pack swaps after program and level. Hours extras stay on that same question.",
      },
      {
        title: "Plan loading",
        body: "~7 seconds of stacked proof. Composite parent quotes, labeled that way. Not a fake App of the Day.",
      },
      {
        title: "Hard yearly paywall",
        body: "$0.14/day is the hero. Season $29.99. Monthly is the $0.33/day decoy. Close gives a 7-day trial on yearly only.",
      },
    ],
  },
  {
    kicker: "Her plan",
    items: [
      {
        title: "This week",
        body: "Three home drills. 12-minute cap. No new skills. Coach owns technique.",
      },
      {
        title: "The number that matters",
        body: "L4 is 34.00 AA mobility. L3 is a clean-meet benchmark — never mobility. Gold’s hero is SRs, not a fake 34.00.",
      },
      {
        title: "Skill / SR map",
        body: "JO Levels 1–10 and Xcel Bronze–Sapphire ship checklists. Pre-team is the remaining stub. Vault lists: L6–7 timers and L8 names from DP Appendix 3; L9/L10 SVs from DP Appendix 1–2; Gold+ from Xcel Appendix 2. Not on the chart = VOID.",
      },
      {
        title: "Xcel dance leaps",
        body: "Platinum floor and Diamond beam/floor: 155° (chart highlights 155°, strikes 150°). Gold floor is 120°. Sapphire is 180°.",
      },
      {
        title: "Live sanctioned only",
        body: "Xcel cannot satisfy DP mobility. State qualifier scores are not national mobility.",
      },
    ],
  },
  {
    kicker: "Meet · Scores · Family",
    items: [
      {
        title: "Meet week",
        body: "Night-before packing, arrival timeline, grandparent card. No coaching from the bleachers.",
      },
      {
        title: "Score journal",
        body: "V / UB / BB / FX + AA. Mobility badges only on live sanctioned meets. IES is three events or less; charts write 8.5 — no extra formula.",
      },
      {
        title: "Household",
        body: "One plan per gymnast. Add a second gymnast on the same household.",
      },
      {
        title: "Pip",
        body: "Chalk rabbit. Jokes the quiz. Warns the paywall. Not a USAG mascot.",
      },
    ],
  },
];

function Features() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const unlocked = useMeet((s) => s.unlocked);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="flex-1" />
      </AppShell>
    );
  }
  if (!unlocked) return <Navigate to="/" />;

  const packs = Object.values(catalog.packs);
  const full = packs.filter((p) => p.ship === "full").length;
  const stubs = packs.filter((p) => p.ship === "stub").map((p) => p.label);

  return (
    <AppShell>
      <header className="pb-6 pt-2">
        <button
          type="button"
          onClick={() => navigate({ to: "/family" })}
          className="press mb-3 min-h-12 -ml-2 px-2 text-left text-kicker uppercase tracking-kicker text-subtle"
        >
          ← Family
        </button>
        <Label>Feature map</Label>
        <h1 className="mt-1 font-display text-title font-medium leading-none tracking-title">
          What's in MeetReady
        </h1>
        <p className="mt-3 text-ui leading-relaxed text-muted">
          Current capabilities. Not a roadmap. {full} full packs
          {stubs.length ? ` · stub: ${stubs.join(", ")}` : ""}.
        </p>
      </header>

      <div className="flex flex-col gap-8 pb-6">
        {GROUPS.map((group) => (
          <section key={group.kicker}>
            <Label>{group.kicker}</Label>
            <div className="mt-3 flex flex-col gap-2">
              {group.items.map((item) => (
                <Card key={item.title}>
                  <h2 className="font-display text-card font-medium tracking-title">{item.title}</h2>
                  <p className="mt-1 text-small leading-relaxed text-muted">{item.body}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <section>
          <Label>Named limits</Label>
          <Card className="mt-3">
            <h2 className="font-display text-card font-medium tracking-title">What this is not</h2>
            <p className="mt-1 text-small leading-relaxed text-muted">
              Web/PWA prototype. No App Store. No live IAP. No myUSAG import. No MAG. Compulsory
              dance text is not in the free charts. Vault not on the official page is VOID. Coach
              names which chart vault she competes.
            </p>
          </Card>
        </section>

        <PipAside pose="whisper">This is the house that exists. Not the house we wish we had.</PipAside>
      </div>
    </AppShell>
  );
}
