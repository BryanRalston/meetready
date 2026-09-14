# MeetReady — product spec (full program, not Level 3 only)

Positioning: household season OS for competitive women’s gymnastics parents.
Not a club OS. Not a video-AI coach. Not a Level 3 toy.

Supported on day one:
- USAG Development Program Levels 1–10
- USAG Xcel Bronze, Silver, Gold, Platinum, Diamond, Sapphire
- In-house / not sure (maps to a “pre-team” track)

Rulesets to encode, not invent:
- DP Levels 1–5: 2021–2029 compulsories
- DP Levels 6–10: 2026–2030 Optional Code (effective 8/1/26)
- Xcel: 2022–2028 Code (extended through 7/31/28), plus 2026–27 Rules & Policies
- Mobility: 2026–27 Women’s Rules & Policies. Live sanctioned meets only.

Disclaimer everywhere skills appear:
“Coach owns technique and level placement. MeetReady tracks the household plan.”

---

## Product architecture

Three layers share one app.

1. Identity — gymnast profile: program, level/division, goal, meet calendar
2. Level pack — skill chips, special-requirement checklist, mobility rule, plan templates
3. Household layer — packing, countdown, bleacher etiquette, score log, sibling profiles

Quiz is identical. Only the chip bank and plan copy swap after Screen 5.

A family can add a second gymnast after paywall (Level 3 sister + Gold sister). One subscription, two plans.

---

## Tracks

| Track | Who | What the plan emphasizes |
|---|---|---|
| DP Developmental (L1–3) | First competition, no mobility score | Consistency, shapes, first-meet calm |
| DP Compulsory (L4–5) | Standardized routines + first real mobility math | Hit the AA number, clean compulsory deductions |
| DP Optional (L6–10) | Individual routines + special requirements | SR checklist, start value, composition/bonus |
| Xcel (Bronze–Sapphire) | Flexible routines, lower hours | Special requirements + allowed skills, not JO clones |
| Pre-team | In-house only | “Is she ready to compete, and in which program?” |

---

## Official mobility (encode exactly)

Development Program (2026–27 R&P):

| Current | Min age | To advance |
|---|---|---|
| L1 | 4 | none — coach call |
| L2 | 5 | none — coach call |
| L3 | 6 | none — coach call |
| L4 | 7 | 34.00 AA → L5 (two 36.00 AA at L4 can skip toward L6 — show as note, not a push) |
| L5 | 7 | 32.00 AA |
| L6 | 7 | 32.00 AA → L7 |
| L7 | 7 | 32.00 AA or 8.50 IES |
| L8 | 8 | 34.00 AA or 8.50 IES |
| L9 | 8 | 34.00 AA or 8.50 IES |
| L10 | 9 | no higher DP level |

Xcel entry / mobility (typical national chart — still confirm against current R&P in code comments):

| Division | Min age | Typical gate |
|---|---|---|
| Bronze | 5 | none |
| Silver | 6 | none |
| Gold | 7 | none |
| Platinum | 8 | 32.00 AA at Gold or 8.50 IES |
| Diamond | 9 | 32.00 AA at Platinum or 8.50 IES |
| Sapphire | 12 | 32.00 AA at Diamond or 8.50 IES |

State qualifier scores are NOT national mobility. Store them as optional “my state” overlays later. Never mix “state qualifying 32 AA” with “mobility 34 AA.”

---

## Onboarding (same 16 beats for every level)

### 0 Splash
MeetReady
She competes. You run the season.

### 1 Outcome carousel
1. Know what this level actually requires
2. Walk into meet day with a bag and a timeline
3. Track scores against the real number for *her* level

Proof: Built for JO + Xcel families

### 2 Role
Parent / guardian (default) · Gymnast · Coach (tag only)

### 3 Name
First name → “Emma’s season plan”

### 4 Program
- Development Program (JO / DP)
- Xcel
- Not sure / in-house only

### 5 Level or division
DP: 1–10, each with a one-line helper
- L1–2: developmental, often in-house
- L3: first real competitive look at many gyms; no mobility score
- L4: first compulsory table vault; 34.00 AA to move to L5
- L5: last compulsory; 32.00 AA toward optionals
- L6: first optional; timers on vault; 32.00 AA
- L7: more SRs; 32.00 AA or 8.50 IES
- L8: 9.8 SV + composition credit; 34.00 AA or 8.50 IES
- L9–10: bonus + composition; college-track language only if they pick it

Xcel: Bronze → Sapphire with min-age under each

### 6 Season moment
- First meet
- Mid-season, scores bouncing
- Chasing state / regional
- Deciding whether to move up
- Optional: college / recruiting (only show if L8+)

### 7 Next meet
Date + optional name · or “no date yet”

### 8 Events that scare you
Vault / Bars / Beam / Floor / Awards / The wait
Same for every level. This weights the plan.

### 9 Skill / requirement audit
Multi-select chips from the **level pack** below.
Always include:
- She’s consistent on the required stuff
- I’m not sure — coach hasn’t broken it down
- Fear / freeze after a fall (event toggle)

### 10 Week shape
Hours: 4–6 / 7–10 / 11–15 / 16–20 / 20+
Toggles: privates, extra kip/stretch, home beam, open gym, second gym

### 11 Body + brain
Ankles / wrists / back · fear after a fall · shuts down if we talk scores · growth-spurt flexibility drop · none
Never diagnose. Changes copy only.

### 12 Season goal (single)
Options swap by track:

L1–3: first meet without chaos · enjoy it · look ready for the next compulsory
L4–5: hit mobility AA · clean deductions · decide L5 vs optional
L6–10: hit SRs every meet · raise start value · mobility / IES · recruiting card (L8+)
Xcel: hit special requirements · stay in this division happily · move up when the hours make sense

### 13 Building plan + proof
Level-specific fact, not generic hype.
Examples:
- L3: “No USAG mobility score at Levels 1–3. Readiness is skills + coach call.”
- L4: “National mobility L4 → L5 is 34.00 AA at a live sanctioned meet.”
- L8: “L8 starts at 9.8 plus up to 0.20 composition credit under the 2026–30 code.”
- Xcel Gold: “Gold is 6 A value parts + special requirements, not a JO Level 5 clone.”

Then hard paywall.

---

## Paywall (unchanged by level)

Yearly $49.99 · $0.14/day · BEST VALUE
Monthly $9.99
Season $29.99 / 4 months

Headline uses her name + her level:
“Emma’s Level 4 season plan is ready”
“Maya’s Xcel Gold plan is ready”

Close path only: 7-day trial on yearly.
No spin wheel in v1.

One subscription covers every gymnast in the household.

---

## Level packs — chip banks for Screen 9

Do not list every dance pose. List the things that actually move scores and parent anxiety.

### DP L1–2 (keep short)
Vault run/hurdle · stretch jump or HS fall-to-back · pullover · cast · beam holds · cartwheel · forward roll · split shapes
Plan tone: “Is she having fun and hitting shapes, not chasing 36 AA.”

### DP L3
Vault: run/hurdle, board punch, tight handspring over 32–48" stack, stick
Bars: glide, pullover or kip, cast to horizontal, back hip circle, front hip circle, squat-on + stretch jump
Beam: cross handstand vertical, 90° leap, heel-snap 180, jump series, cartwheel to side HS ¼-turn dismount, freeze
Floor: HS forward roll vertical, HS–bridge–kickover, 90° leap + stretch-to-split connection, forward split, back roll to push-up, round-off, BHS to two feet

### DP L4
Vault: first table handspring (coach aid = 2.00, not void)
Bars: glide kip, cast to horizontal, squat-on / pike-on, long-hang kip, tap swing + ½-turn dismount
Beam: vertical HS, 120° jumps, 1/1 passé turn, jump series, cartwheel side-HS dismount
Floor: back walkover, front HS step-out, RO + 2 BHS, 120° leap/straddle, 1/1 turn
Goal math: 34.00 AA mobility

### DP L5
Vault: table handspring, higher standard (coach aid voids)
Bars: cast above horizontal, clear hip, long-hang work, flyaway
Beam: BHS or back walkover or side aerial, 1/1 turn, flight, back tuck dismount
Floor: punch front / aerial option, 2 front HS, RO + whip/tuck line, 150° leap or switch, 1/1 jump
Goal math: 32.00 AA mobility

### DP L6 (first optional)
Vault: FHS timer / Tsuk timer / Yurchenko timer to mat stack
Bars SRs: cast 45° above horizontal, bar change, 360° clear circle (grp 3/6/7), A salto dmt · VP 4A+2B
Beam SRs: non-flight acro series OR one flight, 180° leap/jump, 1/1 turn, salto/aerial-class dismount
Floor: acro passes + dance passage + turn (use SR checklist, not a fixed routine)
Goal math: 32.00 AA

### DP L7
Vault: same timer family; L7 may land Tsuk/Yurchenko timers on the back
Bars: cast to HS (45° still fulfills SR), two 360° clear circles (one B, one grp 3/6/7), A salto dmt · VP 4A+3B
Beam: acro series AND flight, dance, turn, dismount
Floor: forward + backward salto work across passes
Goal math: 32.00 AA or 8.50 IES

### DP L8
Vault: restricted optional table list (HS twisters, Tsuk tuck/pike, Yurchenko tuck, etc.)
Bars: cast HS, two B elements with flight OR LA turn + B clear circle, A+ salto dmt · SV 9.8 + up to 0.20 CC · VP 4A+4B
Beam / floor: SR + composition credit
Goal math: 34.00 AA or 8.50 IES
Extra chips: missing composition credit · start value leaving tenths · event specialist path

### DP L9–10
Do not enumerate the Code. Chips are construction problems:
- Missing a special requirement
- Start value too low
- Bonus not connecting
- Composition credit left on the table
- One event carrying the AA
- IES vs all-around decision
- Recruiting video / score card (opt-in)

VP reminder in the plan footer:
L9: 3A+4B+1C · L10: 3A+3B+2C
Mobility: L9 is 34.00 AA or 8.50 IES · L10 is terminal DP level

### Xcel — special-requirement chips, not JO skill clones

Bronze: 4 A · beginner vault / pullover-class bars / ½ turn + jump + non-flight acro on beam · no salto dismounts
Silver: 5 A · circling skill + cast depth · more beam acro
Gold: 6 A · clear support to horizontal on bars · 1/1 beam turn · 120° dance
Platinum: 6A+1B · 32.00 AA from Gold to enter · first real B-skill hunt
Diamond: 5A+2B · 32.00 from Platinum
Sapphire: 3A+3B+1C · 9.6 SV + 0.40 bonus · min age 12

Xcel plan copy must say: “This is not the JO routine. Judges want special requirements and allowed skills for this division.”

---

## Plan engine

Inputs: program, level, scary events, flagged chips, hours, goal, next meet date.

Output, always 4 cards:

1. This week (max 3 home drills, 12 minutes, never new skills)
2. Requirement map (compulsory skill list OR optional/Xcel SR checklist)
3. Meet week (if a date exists) — packing is shared; warm-up language is shared
4. Number that matters
   - L1–3: consistency / coach-ready, no fake 34.00 mobility
   - L4: 34.00 AA
   - L5–7: 32.00 AA
   - L8–9: 34.00 AA or 8.50 IES
   - L10: execution + composition, no next-level mobility
   - Xcel Platinum+: 32.00 from previous division if they said “move up”

Home drills stay generic shapes unless you hire a coach later:
handstand line, snap-downs, hollow/arch, calf/shoulder mobility, visualization of the wait.

Never: “Here’s how to teach a kip.”

---

## Score log (all levels)

Per meet: V / UB / BB / FX / AA · notes · video link · falls
Sparkline by event
Badge only when a *real* rule is hit (“34.00 AA — L4 mobility eligible”)
If they log 34.1 at L3, label it “clean-meet benchmark,” not mobility.

IES toggle from L7 up and Xcel Platinum up.

---

## Meet-day layer (shared)

Night-before packing, 30 min before open stretch, no bleacher coaching, one non-score sentence after the last event.
Session times manual in v1.
Grandparent card: when to arrive (march-in), how long it lasts, no talking scores in the car.

---

## What changes in the App Store screenshots

Do not show only a Level 3 beam. Show a level picker and two plan cards:
“Level 4 · 34.00 AA target”
“Xcel Gold · special requirements this week”
That is how you tell the store this is the family OS, not a compulsory-3 pamphlet.

---

## Ship order (still one app)

v1 must include every level in the picker and a working pack for:
- DP L3, L4, L5 (compulsories you can list)
- DP L6–8 as SR checklists
- Xcel Gold + Platinum (highest parent volume after JO 3–5)

Stubs allowed on day one:
- L1–2 short pack
- L9–10 construction chips
- Xcel Bronze / Silver / Diamond / Sapphire thin packs

Do not ship a Level-3-only binary and promise the rest. Parents will bounce when the picker lies.

v1.1 MeetScores / myUSAG import
v1.2 State qualifier overlay
v1.3 Boys / MAG if demand shows up in waitlist

---

## First 20 users

Recruit across levels at one gym, not only L3.
Watch whether L7 parents ignore the SR checklist (too thin) and whether Xcel parents feel talked-to like JO.
If Xcel churns, the copy is wrong, not the paywall.
