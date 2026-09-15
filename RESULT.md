# MeetReady — first-session result

**Local URL:** http://localhost:8080/

Phone-first at 390×844. Desktop (≥540px) is a centered 390×844 device frame.

## What hit the Vech bar

| Beat | Status |
|---|---|
| Splash sells the bleachers, not chrome | Hit. Hero still of the parent watching beam. Outcome line: “She competes. You run the season.” |
| 13–18 step quiz as a sales conversation | Hit. **16 steps.** Pain/identity (freeze, packing, Saturday morning), then program/level, meet, chips from the pack. |
| Every JO level + every Xcel division | Hit. Full vs stub labeled on the picker. |
| Plan loading, several seconds, stacked proof | Hit. ~7.2s. JO+Xcel line, CSS “Today’s pick / Season OS” mark (not an App Store award), two composite parent quotes, live-ish counter. |
| Hard paywall, no account before cash | Hit. Yearly $49.99 as **$0.14/day BEST VALUE** (default). Season $29.99 / 4 months. Monthly $9.99 as the $0.33/day decoy. |
| Close → 7-day trial on yearly only | Hit. Close-path gift sheet. Hero stays paid. |
| Household key | Hit. Not a public free button. Tap Pip 5 times on splash or paywall, then enter the household key. |
| After unlock: four pack-driven cards | Hit. This week ≤12 min, no new skills. Requirement/SR map. Meet week. The number that matters. |
| L3 never calls 34.00 mobility | Hit. L3 34.10 → “Clean-meet benchmark — not mobility.” L4 34.00 → “mobility eligible.” Gold hero is **SRs**, not a fake 34.00. |
| Meet / Scores / Family | Hit. Packing + grandparent card. V/UB/BB/FX+AA. Second gymnast, one subscription. |
| Personality | Hit. Pip (chalk rabbit) jokes the forced quiz and warns the paywall. |

Walked **Level 4 Emma** (table vault, 11 days to Spring Classic) and **Xcel Gold Maya** end to end.

## Honest gaps

- Web/PWA prototype. **No App Store, no RevenueCat, no live IAP.** Paid unlock is local. A hidden household key exists for the builder (tap Pip 5×, then the key). It is not offered on the paywall.
- Proof quotes are **composite / pattern copy**, labeled that way — not fake ratings for this app.
- The “Today’s pick” badge is in-app CSS, not a real App of the Day award.
- The household counter is live-ish, not a census.
- L1–2 and all six Xcel divisions now ship full skill/SR maps. Pre-team is the remaining stub. L9–10 ship an SR checklist (2026-09-14 USAG pass).
- No myUSAG import, no state-qualifier overlay, no MAG.
- Building-screen screenshot file `18-building.png` captured the paywall (timer already advanced). Building was verified live in the L4 and Gold paths.

## Screenshot paths

All under `C:\Users\bryma\meetready\screenshots\`

- `01-splash-desktop.png` — device frame
- `02-splash-phone.png` / `03-outcome-1.png` / `04-outcome-2.png` — splash + outcomes
- `07-name.png` / `09-level.png` / `11-meet.png` / `12-events.png` / `17-goal.png` — quiz
- `19-paywall.png` — $0.14/day hero
- `20-trial-close.png` — 7-day yearly trial
- `21-home.png` — Emma L4, 11 days, 12-min cap
- `22-meet.png` — Spring Classic packing
- `25-score-l4.png` — 34.00 mobility eligible
- `28-l3-benchmark.png` — 34.10 not mobility
- `29-xcel-levels.png` — Gold full pack among stubs
- `30-gold-paywall.png` — Maya’s Xcel Gold plan is ready
- `31-gold-home-number.png` — SRs, not 34.00
- `33-desktop-frame.png` — desktop phone shell
- `34-l3-skill-map.png` — L3 RO-BHS rebound; not 34.00 mobility
- `35-l4-beam-half-turn.png` — L4 34.00 + two-36 skip note (beam 1/2 verified in skill map)
- Feature map — live at `/features` (390×844). CDP file write timed out; verified in-browser.
- Feature map — live at http://localhost:8080/features (390×844). CDP file capture timed out this pass; verified in the MeetReady tab.

## Quality verdict

I would put the first session next to a Vech teardown without flinching: splash → 16-step quiz → proof load → hard yearly paywall → close-path trial. It still is not an iOS binary. That is the remaining embarrassment, and it is named on the paywall.

---

## USAG DP L3–10 audit (2026-09-14)

Sources: `docs/usag/rulespolicies.pdf` (Ch. 9), `docs/usag/appendix8.pdf`, `docs/usag/appendix11.pdf`. Index: `src/data/RULES_SOURCES.md`.

### What was wrong

- **L3 bars** listed “Cast to horizontal.” Compulsory L3 has **no cast-angle requirement**. Pullover **or** kip both 10.0 SV.
- **L3 floor** listed an isolated “Back handspring to two feet.” The major element is **RO-BHS rebound stick**.
- **L3 beam** listed “Heel-snap 180” as if a 1/1. It is a **1/2 heel-snap in forward passé**.
- **L4 beam** listed a **1/1 passé turn**. That is **L5**. L4 is **1/2 passé**.
- **L5 beam** listed “side aerial.” Official acro choices are BWO / back extension roll to 3/4 HS / BHS step-out / BHS 2-feet / front walkover.
- **L5 floor** listed a whip line. Official last pass is **RO, BHS, back tuck stick**.
- **L5 mobility** omitted skip-L6 and L5↔L6 back-and-forth.
- **L6–8 floor SRs** said vague “acro passes” instead of appendix 8 wording. L7 missing the **stretched/layout** salto.
- **L8 beam/floor** said “SR + composition credit” with no checklist.
- **L9–10** were stubs with construction chips only — no appendix 11 SR lists.

### What changed

- Replaced L3–5 chip banks to the 2021–2029 major-element list.
- Replaced L6–10 `specialRequirements` with appendix 8 / 11 wording, including L8 CC, L7 layout SR, L9/L10 SR checklists. L9 (and L10) `ship` is now `full` for the SR map.
- L5 `mobility.note` now includes skip-L6 → L7 and L5↔L6 back-and-forth.
- Home drills no longer talk as if L3 hits a table or requires a kip / isolated BHS.
- Emma sample chips now flag L4 **1/2 turn**, not a 1/1.

### Remaining uncertainty (not guessed)

- L8–10 **allowed vault tables** are in the Code, not the cheat sheets. Packs say “coach owns vault choice.”
- Compulsory dance text beyond major elements is not fully encoded.

---

## USAG Xcel + L1–2 audit (2026-09-14, corrected same day)

Sources: `docs/usag/appendix1.pdf` **as images** (Aug 2026 event charts), `docs/usag/rulespolicies.pdf` Ch. 8 (printed pp. 50–56) and Ch. 7 V.B (IES), `docs/usag/SPLIT_ANGLE_NOTE.md`. Index: `src/data/RULES_SOURCES.md`.

Yellow highlight on USAG replacement charts = current text. Strikethrough = deleted old text.

### Known bug (fixed)

Diamond beam and Platinum/Diamond floor dance leaps were encoded as **150°**. Appendix 1 highlights **155°** and strikes **150°**. Packs, chips, helpers, proof lines, and the level picker now say **155°**. L5 compulsory 150° leaps were left alone (different code). DP L3–10 mobility numbers were not touched.

### Encoded fail-closed vs appendix 1 + R&P Ch.8

- All six Xcel divisions `ship: full` with SR checklists, VP/SV, restrictions, min ages.
- Mobility: Bronze 5 / none; Silver 6 / none; Gold 7 / none; Platinum 8 / **32.00 AA at Gold OR 8.5 IES**; Diamond 9 / **32.00 AA at Platinum OR 8.5 IES**; Sapphire 12 / **32.00 AA at Diamond OR 8.5 IES**. Live sanctioned only. DP entry requires AA at ≥1 sanctioned meet at that DP level.
- **Xcel cannot satisfy Development Program mobility** on every pack.
- IES = athletes who compete three events or less (R&P Ch.7 V.B). Charts write **8.5 IES**. Score journal does not average: if ≤3 events are logged, the highest event score is checked against 8.5.
- VP/SV: Bronze 4A SV10; Silver 5A SV10; Gold 6A SV10; Platinum 6A+1B SV10; Diamond 5A+2B SV10; Sapphire 3A+3B+1C SV 9.6 + up to 0.40 bonus. A 0.10 / B 0.30 / C 0.50.
- Missing SR −0.50 off SV. Restricted skill = no VP, −0.50 off SV. DP cast-angle deductions are not used in any Xcel division.
- Bronze/Silver vault options are named on appendix 1 (encoded). Gold+ vault **lists** stay “coach owns which one” — the free chart only names the division vault chart, not the vaults.
- L6–7 JO vaults still list the three official timers (FHS / Tsuk / Yurchenko).
- Floor time: Bronze 45s; Silver **1:00** (45s struck); Gold 1:00; Platinum **1:30** (1:15 struck); Diamond/Sapphire 1:30.
- Split SR/VP credit: within 20° (Bronze–Diamond floor / Silver–Diamond beam) or 45° (Sapphire).
- Long hang pullover = 360° circling only if preceded by a cast (Platinum & Diamond).

### Remaining uncertainty (not guessed)

- Gold/Platinum/Diamond/Sapphire **vault tables** (which vaults are on the chart) are not in appendix 1’s summary page. Not enumerated.
- Bound Xcel Code PDF (`cop_extended2028.pdf`) failed to download here; SRs were taken from appendix 1, not guessed from memory of the Code.
- Compulsory dance poses/text beyond the major-element list are not fully encoded.
- Whether IES mobility requires 8.5 on **every** competed event vs **any** event is not spelled out on the chart. We check the highest of ≤3 logged events against 8.5 and do not invent an average.

---

## Browser verification (390×844, 2026-09-14)

Local: http://localhost:8080/ · viewport 390×844 · Fraunces + Figtree · chalk/cream/gym-navy. Not USAG red-white-blue.

| Path | Verified |
|---|---|
| Splash | Tagline, Pip, cream CTA, no torch red. Peek + Build chips 48px. |
| L4 Emma (Peek) | 34.00 AA, table vault, beam **1/2** passé not 1/1, coach aid 2.00 not void, 11 min / cap 12, Spring Classic packing. Logged 34.00 → **34.00 AA — mobility eligible**. 33.10 mock has no badge. |
| Xcel Gold Maya (quiz → paywall → home) | 16-step quiz, one question per step, chips ≥48px. Yearly **$0.14/day BEST VALUE** is the hero. Home number is **SRs**, not 34.00. Floor dance 120°. Vault: coach owns which one. 32.00 AA at Gold OR 8.5 IES is the Platinum gate. Xcel cannot satisfy DP mobility. |
| Diamond Nora | Helper + beam SR2 + floor SR3 = **155°**. 150° only as struck old number. 32.00 AA or 8.5 IES to Sapphire. |
| Platinum Pia | Floor dance **155°**. Beam dance still **120°** (chart). Alt springboard VOID. |
| IES (Diamond) | Three events logged (vault blank): 8.60 / 8.50 / 8.40 → AA is —, badge **8.5 IES — mobility eligible**. No extra formula. |
| Feature map | `/features` after unlock. Family card + Home footer. 16 full packs, pre-team stub. Family tab stays on. No household key on the map. |
| Xcel 155° after Feature Map | Diamond Nora helper + beam SR 2 still **155°** (150 struck). Feature map card: Platinum/Diamond 155°, Gold 120°, Sapphire 180°. |

Quiz extras sit under the hours question (not a second form).

### Household key (hidden)

- Public paywall has **no free CTA**. Yearly $0.14/day stays the hero. Close path is still 7-day trial only.
- Door: tap **Pip five times** on splash or paywall → “If you have a key.” Key is `BLEACHERS` (not printed in the UI). Wrong key: “Nope.”
- Unlocks the household on this device (`planKind: free`, labeled “This device”).

---

## Feature map (2026-09-14)

Bryan standard: in-app overview of **current** capabilities, not a roadmap.

- **Route:** http://localhost:8080/features
- **Unlock gate:** redirects to splash if the household is not unlocked. Not in the converting funnel.
- **Entry:** Family card “What's in MeetReady” (above Add a gymnast). Home footer kicker after the disclaimer. Family tab stays lit on `/features`.
- **Contents (current only):** splash/outcomes, 16-step quiz, ~7s proof load, yearly $0.14/day + close-path 7-day trial, Home week/number/SR map, L3 vs L4 vs Gold wording, Meet packing, Scores V/UB/BB/FX+AA + 8.5 IES, second gymnast, Pip, named limits (no App Store / IAP / myUSAG / MAG). Live pack count: 16 full, stub = In-house / not sure.
- **Not listed:** household key. That is a builder door, not a parent-facing feature.
- **Xcel dance leaps (resumed after Feature Map):** Feature map now names Platinum floor + Diamond beam/floor **155°** (150 struck), Gold 120°, Sapphire 180°. Diamond home SR 2 re-verified 155° after Feature Map + household-key work. Gold+ vault tables still unverified / not enumerated.

---

## High-end polish program (2026-09-15) — waiting on Grok Bot

Queue was empty (Xcel leaps + Feature Map done). Bryan ordered a full-app evaluation and polish, with **approvals through the MeetReady Grok Bot**.

- START handoff: `.grok/handoffs/20260915T024115Z-meetready.md`
- Piper (live walk, read-only): `.grok/handoffs/20260915T024115Z-piper.md`
- Evals: `.grok/evals/product-ux.md` (Grok 4.6), `design.md` (Grok 4.6), `engineering.md` (Grok 4.5)
- Packet (APPROVE / HOLD / REJECT): `.grok/evals/approval-packet.md`

Bryan approved the recommended slice. Implemented 2026-09-15:

- Edit season after unlock (6-beat form). Past-meet CTA instead of “-1 days.”
- Score log: Live sanctioned / In-house / Not sure. Mobility badge only on sanctioned (Gold 32.00 AA verified on Maya). Home Gold hero stays **SRs**.
- Contrast lift on `--color-subtle`; focus ring visible on cream CTAs.
- Family cards: Open / Edit / Remove as siblings, not nested buttons. Shell switcher when 2+ gymnasts.
- Persist rehydrate before unlock redirect.
- SR map flags matching chip, not the whole event.
- Sheets: dialog, Escape, focus trap.
- Quiz copy-only week leads (hours/goal). Meet: human date, session time, share card, log this meet.
- Building: no fake App of the Day / census; shortened path for reduced-motion.
- Tests: `npx tsx --test src/lib/plan.test.ts` (IES/AA/mobility, SR flag, 12-min cap, 155°).

Peek Emma still a demo unlock. No public free CTA. No App Store / IAP.

---

## Next slice (2026-09-15): reset confirm + Gold+ vaults without guessing

**How we do not guess vault tables**

Appendix 1 only *names* “Xcel Gold Vault Chart.” The actual names and SVs live on **Appendix 2**. We fetched the official file:

`https://static.usagym.org/PDFs/Women/xcel/appendix2.pdf` → `docs/usag/appendix2.pdf` (values through August 2025).

Rule from that page, read as an image: **white / “Allowed” / a printed SV = on the chart. Black cell = not allowed at that division.** Gold Allowed = 10.0 (9.5 alt board). Platinum+ print SVs. Coach still *names* which chart vault she competes. Unlisted = VOID. We did not invent Tsuk on Gold (black). Diamond/Sapphire Tsuk and Yurchenko only where the column has a number.

**Also shipped:** Family **Reset this household?** sheet. Keep the household leaves Maya + Nora in place (verified 390px). Gold home SR vault now cites Appendix 2 + 1.101 Handspring list.

**DP L6–10 vault charts encoded (2026-09-15)** from official PDFs read as images:

- L6/L7: only **1.111 / 3.116 / 4.111** (10.0). L7 Tsuk/Yurchenko may land on the back. Any other vault VOID.
- L8: named Grp **1 / 3 / 4 / 5** list with SVs (`dp-appendix3-l678-vault.pdf`). **No Group 2 saltos** on that page.
- L9: SVs by group from `dp-appendix2-l9-vault.pdf`.
- L10: SVs by group from `dp-appendix1-l10-vault.pdf`, plus the printed +0.10 bonus on 10.0 except asterisks 2.302, 2.311, 3.407, 4.306, 4.309, 4.403, 4.407, 5.301, 5.408, 5.409.

Coach still names which chart vault she competes. Not on the page = VOID. 16 tests passing.

---

## Finish pass (E3 polish, 2026-09-15)

- Card/sheet radius **28px** (`--radius-card`) so chips at 12px + 16px pad sit concentric.
- Card titles use `--text-card` instead of Tailwind `text-xl`.
- Dropped unused IBM Plex Mono (Fraunces + Figtree only).
- Feature map named limits: no App Store, no MAG, compulsory dance not in free charts, vault not on the page = VOID.

**Left on purpose:** bound compulsory dance text; App Store / IAP; public free CTA; Peek Emma as demo unlock. Piper live walk still optional.
