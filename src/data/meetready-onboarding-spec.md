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
| L5 | 7 | 32.00 AA; L5↔L6 back-and-forth allowed; 32.00 AA at L5 may skip L6 → L7 |
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

### DP L1–2 (2021–2029 major elements — The Gymnastics Guide / handbook list)
L1 vault: straight jump onto mat stack (min 16")
L1 bars: pullover, cast, back hip circle, straddle sole circle OR underswing dmt
L1 beam: jump to front support; tuck–pike–needle–tuck–straight series; arabesque 30° no hold; from kneel, cartwheel to partial HS dmt
L1 floor: forward-entry cartwheel 1/4 in; tucked backward roll; candlestick; chassé; stretch jump; tucked forward roll; min 3/4 HS
L2 vault: jump to HS, fall to flat back (mat min 16")
L2 bars: glide swing return to stand; pullover; two casts (no angle); back hip circle; underswing dmt
L2 beam: jump to front support; passé balance hold 2s; arabesque 30° hold 1s; pivot turn; cartwheel to side HS dmt
L2 floor: cartwheel step-in; straight-arm back roll to push-up; heel-snap 1/2; chassé + leap 60°; split jump 60°; HS; candlestick to sit; bridge back kickover
Plan tone: “Is she having fun and hitting shapes, not chasing 36 AA.”

### DP L3
Vault: handspring over sideways resi / raised mat (min 32"), run/hurdle/board punch, tight body stick
Bars: glide swing, pullover OR glide kip (both 10.0), cast with NO angle requirement, back hip circle, second back hip circle, front hip circle, squat/pike-on stretch jump dmt
Beam: fish-pose mount, cross HS mark (no hold), 1/2 heel-snap passé (not 1/1), stretch+stretch, arabesque 45°, leap 90°, CW to HS 1/4 dmt
Floor: HS forward roll straight arms, chassé split leap 90°, stretch+split 90°, HS-bridge-kickover, forward split, 1/2 passé, straight-arm back roll to push-up, RO-BHS rebound stick — not an isolated BHS

### DP L4
Vault: table handspring (coach aid = 2.00, not void)
Bars: straddle/pike glide kip, cast to horizontal return to support, squat/pike-on or sole circle to HB, long hang kip, HB cast to horizontal, back hip circle, underswing+counterswing 30° below, tap swing 1/2 dmt
Beam: fish-pose mount, cartwheel, 1/2 passé (NOT 1/1 — that is L5), stretch+split jump, cross HS hold 1 sec, scale horizontal, leap 120°, CW to HS 1/4 dmt hold 1 sec
Floor: BWO, FHS step-out + CW step-in + back extension roll, stretch jump 1/2, leap 120°, straddle 120°, split, 1/1 passé, RO + 2 BHS rebound
Goal math: 34.00 AA mobility; two 36.00 AA may skip to L6 (note, never a push)

### DP L5
Vault: table handspring (coach aid voids)
Bars: glide kip, cast above horizontal (straddle ok L5 only), clear hip / sole circle / stalder to clear support, squat/pike-on, long hang kip, long hang pullover, counterswing 15° below, tuck/pike/layout flyaway
Beam: mount no board; acro = BWO OR back ext. roll to 3/4 HS OR BHS step-out OR BHS 2-feet OR front walkover (not side aerial); 1/1 passé; split jump + sissonne; scale above horiz; leap 150° + stretch; CW + stretch jump; back salto dmt
Floor: front tuck OR front/side aerial; 2 FHS step-outs + CW step-in + back ext. roll; stretch jump 1/1; leap 150° or switch 150°; straddle 150°; split; 1/1 turn; RO BHS back tuck stick (not a whip line)
Goal math: 32.00 AA; may skip L6 → L7; L5↔L6 back-and-forth allowed

### DP L6 (first optional)
Vault: FHS / Tsuk / Yurchenko timer to stack ≥ underside of table. Pit pillow allowed at invitationals; required at State+.
Bars SRs (appendix 8): (1) cast min 45° above horiz (2) min one bar change (3) 360° clear circle Grp 3/6/7 no hips on bar (4) salto dmt min A · 4A+2B SV 10.0
Beam SRs: (1) non-flight acro series OR one acro flight excl mt/dmt (2) leap/jump 180° (3) min 360° Grp 3 turn (4) aerial/salto dmt min A
Floor SRs: (1) acro pass min 2 dir. conn. flight, one a salto (2) second pass DIFFERENT salto: min 2 dir. conn. flight OR iso B salto (3) dance passage 2 Grp 1, one LEAP 180° (4) min 360° turn
Goal math: 32.00 AA. Missing SR −0.50 off SV. Allowable C’s = B.

### DP L7
Vault: same three timers; L7 may land Tsuk/Yurchenko timers on the back
Bars: (1) cast to HS (45° fulfills) (2)(3) two 360° clear circles, one B, one Grp 3/6/7 (4) salto dmt min A · 4A+3B SV 10.0
Beam: same as L6 except #1 is BOTH acro series AND one acro flight
Floor: min two acro passes — one salto bwd (min 2 dir. conn. flight), one salto fwd; ONE salto stretched (layout)
Goal math: 32.00 AA or 8.50 IES

### DP L8
Vault: restricted optional table list — coach owns vault choice (do not invent a vault menu)
Bars: (1) cast to HS (2)(3) two B: flight (not dmt) OR LA turn (not mt/dmt) AND B 360° clear circle Grp 3/6/7 (4) salto dmt min A. CC max +0.20.
Beam: acro series min two elems one with flight; 180° leap/jump; 360° Grp 3 turn; aerial/salto dmt min A. CC +0.20.
Floor: acro pass with 2 saltos; 3 different saltos (no aerials); dance passage leap 180°; min A salto last pass initiated. CC +0.20.
Goal math: 34.00 AA or 8.50 IES. Allowable C’s = B.

### DP L9–10 (SR checklist from appendix 11 — not a full Code dump)
L9 3A+4B+1C SV 9.5 CC max +0.20. Allowable D/E = C. >1 restricted elem −0.50 off SV.
L10 3A+3B+2C SV 9.2 CC max +0.30 bonus cap 0.50. Extra +0.10 (not in SV) if 10.0 SV and ≥0.60 TB plus named E.
Bars L9: 2 bar changes; min B flight; 2nd different flight min C OR B with LA turn; salto dmt min B
Bars L10: min C flight; 2nd different flight min B; min C with LA turn; salto dmt min C
Beam L9: acro series 2 dir. conn. flight; 180° leap/jump; 360° turn; aerial/salto dmt min B
Beam L10: acro series 2 dir. conn. flight min 1 C OR E-flight + A non-flight; 180°; 360°; dmt min C (or connected B path)
Floor L9: same as L10 except last-pass salto min B
Floor L10: acro pass with 2 saltos; 3 different saltos (no aerials); dance passage leap 180°; min C salto last pass initiated
Mobility: L9 is 34.00 AA or 8.50 IES · L10 is terminal DP level

### Xcel — special-requirement chips, not JO skill clones

Bronze: 4A SV10. Vault: stretch jump + kick to HS flat back (SV 9.0) OR jump to HS flat back (SV 10.0), mat 16–48", alt springboard yes. Bars: LB mount; cast hips leave bar; 360 circle; LB dmt no saltos. Beam: ½ turn 1 or 2 feet; jump/leap no split angle; non-flight acro; dmt no saltos/aerials; no walkovers; 45s. Floor: 2 dir connected acro; 2nd pass min 1 acro (not same pass); dance leap 60°; ½ turn. No B+ except straddle jump & side leap 60–180=A. No saltos/aerials. Max 2 acro flight. Dive roll ≠ flight SR. RO rebound back roll IS a connection.
Silver: 5A SV10. Vault: HS over sideways stack SV10 OR ¼–½ on repulsion off (extra twist VOID), mat 24–48". Bars: mount; cast min 45° below horiz; 360 circle; LB or HB dmt no saltos. No B+ VP, no giants. Beam: ½ turn 1 foot; leap/jump 90°; non-flight acro; 50s. Floor: 2 connected acro one flight; 2nd pass 2 connected OR 1 flight (not same pass); dance leap 90°; 1/1 turn. Max one salto/aerial.
Gold: 6A SV10 (9.5 if alt springboard). Vault: Gold chart — coach owns which one. Bars: clear support min horizontal; two 360 circles as specified; HB dmt. No C+; B exceptions no giants, no release with bar change. Beam: 1/1; two different Grp 2 one min 120°; two acro one through inverted vertical; 1:00. Floor: 2 dir connected acro FLIGHT; 2nd pass 2 connected flight OR 1 aerial/salto (not same pass); dance leap 120°; 1/1. No B twisting saltos, no C+.
Platinum: 6A+1B SV10. Entry 32.00 AA at Gold OR 8.5 IES. Vault: Platinum chart, alt springboard VOIDS. Bars: clear support ABOVE horizontal; 360 circle; kip; HB dmt min A. Beam: 1/1; dance series AND leap/jump 120°; acro flight OR series through vertical; 1:15. Floor: 2 connected flight with A/B salto; 2nd pass (not same) 2 connected flight OR 1 B salto; dance leap **155°** (150 struck); 1/1; time 1:30. No C acro, no D+.
Diamond: 5A+2B SV10. Entry 32.00 AA at Platinum OR 8.5 IES. Beam/floor leap **155°** (150 struck). Bars: clear support 45° from vertical; min B 360; additional min B; salto/hecht HB dmt min A OR any HB dmt min B. Max 1 D no bonus. No E. Floor: two flight passes (or one + isolated C salto); two different saltos one min B; min B turn; time 1:30.
Sapphire: 3A+3B+1C SV 9.6 + 0.40 bonus. Min age 12. Entry 32.00 AA at Diamond OR 8.5 IES. No E. Bars: B clear support at vertical; B 360; B turn / 2nd different 360 / B release; min B dmt OR C connected to A salto dmt. Beam: 1/1; dance 180°; acro series min one flight; min B dmt OR flight to A salto/aerial dmt. Floor: pass with two saltos; three different saltos one min B; dance 180°; min B turn.

Every Xcel pack: Xcel CANNOT satisfy DP mobility. Missing SR −0.50 off SV. Restricted skill = no VP, −0.50 off SV. DP cast-angle deductions are not used in any Xcel division. Do not invent Gold+ vault charts.

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
