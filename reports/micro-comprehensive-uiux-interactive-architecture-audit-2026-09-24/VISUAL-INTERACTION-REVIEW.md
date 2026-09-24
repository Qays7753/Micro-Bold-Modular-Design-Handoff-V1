# VISUAL & INTERACTION REVIEW — Home · Work · Finance · Tools
### Micro rendered/interactive audit continuation (2026-09-25)

Baseline: Qays7753/Micro @ `c02fb458b1c97d30f67ca7f5a82de82bbc77325d` (VERIFIED = live origin/main; unchanged at audit close)
Build identity: production bundle `assets/index-Cr7zSxsR.js`, raw 649,628 B / gzip 154,067 B — **byte-identical to the recorded CI baseline** (budget PASS re-confirmed at build time).
Method: disposable clone + `vite preview` (no tracked file touched); headless Chromium via Playwright 1.63; fresh disposable profile (`locale=ar`, `timezone=Asia/Amman`); widths 320/360/390/430 @ 760; light primary + dark regression through the real `/settings` toggle; 33 phase-2 captures + 18 interaction probes + computed-style/DOM metric extraction + VLM (vision model) auxiliary reading cross-checked against DOM measurements.
No live URL was supplied (`LIVE_APP_URL` was a placeholder in the mission), so the sanctioned local-preview path was used. Every financial store remained at **0 records** across the entire session (IndexedDB census before/after, full store list in `storage-census-after-captures.json`). Zero console errors and zero page errors across all runs.

State caveat (applies to everything below): the disposable profile contains **no data**, so all rendered evidence describes **first-use / empty states**. Populated states, and any state requiring records (suggest chips, repayment sheets with typed history, priority blocks, away digests), are `NOT_EXECUTED` for rendered evidence and stand on the static evidence of the prior audit. See `AUDIT-CORRIGENDUM-2026-09-25.md`.

---

## 1. Method and evidence discipline

| Evidence kind | How produced | Count | Trust rule |
|---|---|---|---|
| RENDERED | Playwright screenshot (viewport/full-page) + DOM geometry + computed styles | 33 captures + 10 metric documents | Highest — pixel and computed-style truth |
| INTERACTION | Probes P-01..P-18 with route/viewport/action/expected/actual/side-effect record | 18 (16 PASS, 1 PARTIAL, 1 re-verified after timing artifact) | Highest — executed, reversible |
| VLM-assisted | Vision model reading of 6 key captures | 6 analyses | **Auxiliary only** — VLM misread several Arabic labels; every VLM claim used in findings was cross-verified against DOM/computed styles, and two VLM readings were rejected after cross-check |
| STATIC_CODE | Carried from the 2026-09-24 audit | prior register | Unchanged; re-verified only where contradicted |

Measurement-artifact lessons recorded during this session (both caught and corrected before publication): (a) a vaul drawer exit animation can outlast a 450 ms settle — a "sheet did not close" reading was disproven at 900 ms (P-08); (b) content inside a closed `<details>` reports **non-zero layout boxes** under `content-visibility` even though it is not painted — raw `getBoundingClientRect` visibility checks are unreliable; Playwright's rendered-visibility check and pixel captures are authoritative (P-18 pre-verification). This mirrors the 2026-09-24 lesson (bracket-m display artifact → 2 retractions): **every surprising claim gets a second, mechanism-different verification before it is published.**

---

## 2. Surface reviews (first-use state, light @360 unless noted)

### 2.1 Home «مشروعي الآن» (`/`)
- **Composition (RENDERED):** 1,430 px document ≈ 1.9 viewports. First viewport: header (61 px) → overline + h1 (activity name, 24 px/700) + date → daily status «يومك مفتوح» (108 px) → 3 quick-action tiles (76 px each, y=255) → secondary cluster (y=359) → «أرقامك» begins y=467. The decision-first order (state → actions → numbers, Z1.2) is confirmed rendered.
- **Hierarchy (RENDERED + VLM):** h1 24/700 → h2 18/600 → h3 12/700 labels → body 12–16 px; money in IBM Plex Mono 15–20 px inside `<bdi dir=ltr>`. Type scale is compact; VLM judged hierarchy "flat" between section headers and body — the 12 px h3 period labels («اليوم»/«هذا الشهر») read weakest; one VLM reading mistook them for "unfinished inputs". Not a defect (labels are correct), but the smallest tier is at the legibility floor — noted for the typography rule below.
- **Defect found (RENDERED):** seat-name duplication in the first ~150 px (header context label + page overline) — VIS-001 (systemic, see §4.1).
- **Numbers honesty (RENDERED):** sales/result show computed «0.00» (documented sums over zero events — honest per contract 05 §3.2.1 wording «نتيجة الفترة المسجلة»); standing facts show «غير مسجل — سجّله» roads. The unknown/computed-zero distinction is upheld in pixels.
- **Interaction (P-01..P-08, P-14, P-15):** all pass — logo menu (open/outside/Escape), soon-panel honesty, quick sheet with dirty-dismissal, stay-default on repeated close, discard → no record + no success feedback, focus ring visible, 125 % simulated text scale without overflow.

### 2.2 Work «العمل» (`/orders`)
- **Composition (RENDERED):** 1,488 px. Decision panel «الأولوية الآن» (peach `#FBE9E2` + 3 px right border `#C96442`, radius `0 16 16 0`, 200 px) → «مبيعات مباشرة» decision surface (cool tint `#E4EAEC` + 3 px right border `#D97757`) → «المواعيد» draft list → honest empty state «لا توجد سجلات عمل بعد / يومك مفتوح — سجّل أول بيع» (302 px, generous padding). VLM judged the empty state "honest and helpful… guides the user to create the first record" — cross-checked against DOM text: accurate.
- **Defect found (RENDERED):** header context «العمل» + h1 «العمل» — the same duplication class as Home, different mechanism (`/orders` absent from `CONTEXT_REPEATS_H1`) — VIS-001.
- **Typography observation (RENDERED):** two h2 scales on one page — «مبيعاتي» at 24 px/600 (inside `.micro-decision-surface h2 { font-size: 1.5rem }`) vs sibling section h2s at 18 px. Intentional component rule, but it makes a panel title out-rank sibling section titles of the same heading level — VIS-004 (DEFER, owner may adopt a documented two-tier convention).
- **Honesty (RENDERED):** the direct-sales block states «هذا لا ينشئ بيعًا تلقائيًا ولا يحوّل أي تحصيل مرتبط بطلب إلى مبيعات مباشرة» — truth copy rendered in first-use.

### 2.3 Finance «المالية» (`/finance`)
- **Composition (RENDERED):** the heavyweight — **3,825 px ≈ 5 viewports**, 2,846 chars of main text in first-use alone. Back-button to Home («مشروعي الآن», honors returnTo) → overline «الصورة العامة · المبالغ (د.أ)» → h1 «المالية» → financial pulse (417 px) → 2×2 position cards (145 px each) → obligations → cash decision (857 px) → owner card → truth block «ما نعرفه الآن» (578 px) → deposits list → actions → events → corrections layer. Header context label correctly suppressed (the model case for VIS-001's fix).
- **Position cards (RENDERED + VLM):** 4 parallel cards: «الكاش المسجل — غير مسجل», «لي عند العملاء — غير مسجل», «النتيجة المتاحة — 0.00», «مال المالك — غير مسجل». The number/unknown distinction is carried by value styling (mono money vs road text) and holds at a glance; VLM confirmed parallelism and scannability ("identical typography weights, alignment… quick to scan").
- **Density (RENDERED):** AUD-021's static density finding (Finance 332 at-rest strings, 11× target) is now rendered-confirmed: 5 viewports of first-use content before a single record exists. VLM: "moderate but not overwhelming; heaviest inside the cards". The copy is honest and contract-mandated; the density lever remains the owner's ratchet decision (VIS-010, DEFER).
- **Conditional layers:** corrections layer opens lazily → honest empty copy «لا تصحيحات موثقة بعد. هذا طبيعي…» (P-18 PASS). The events layer and error/retry blocks stand on static evidence (not producible safely).
- **Composition note (RENDERED):** Finance is the only one of the four surfaces with a back button on a level-1 tab (return-context affordance tied to Home's «المالية» unit). Consistent with its returnTo contract; documented as intentional (VIS-012, PRESERVE).

### 2.4 Tools «أدواتي» (`/tools`)
- **Composition (RENDERED):** 850 px — the only single-viewport surface. Task-first heading: overline «أدواتي» + h1 «احسب قبل أن تلتزم» (a job, not a section name — the best heading pattern of the four surfaces). Warning/limits card «قاعدة هذه الأداة — هذا حساب تقديري…» (peach, 175 px) precedes the tool rows; VLM: "limits communicated excellently… manages user trust".
- **Pattern reuse (RENDERED):** tool entries reuse the settings-list row pattern (`.micro-settings-list` / `.micro-setting-row`) — cross-surface reuse of the same list species; visually consistent, semantically acceptable (both are "open a focused page" rows).
- **Defect found (RENDERED):** header context «أدواتي» + overline «أدواتي» duplication — VIS-001.
- **Deep editor (INTERACTION):** `/tools/calculator` dirty-guard verified end-to-end (P-12, after selector correction): typed input + back → `role=dialog` «تعديلات غير محفوظة» with stay-first ordering («ابقَ في الصفحة» first), honest copy «لن يُحفظ شيء تلقائيًا…», «اخرج دون حفظ» exits to `/tools`, `cost-estimates` store unchanged (0).

---

## 3. Cross-surface interaction review (buttons, states, recovery)

| Question (mission) | Verdict | Evidence |
|---|---|---|
| Navigation visually resembling a data-changing action? | Tension stands, unchanged | W4 owner record: save-class on navigation CTAs (Home المالية unit, priority CTA); rendered confirmed. Not a defect; VIS-005 adds the primary-tile angle |
| Selected vs pressed vs hover distinguishable without color alone? | PASS for nav; one static finding stands | Nav: color + weight + aria-current (P-10). Suggest-chip (AUD-004) NOT re-renderable in first-use — remains static FIX_NOW |
| Loading / success / error / disabled / empty states honest? | PASS (first-use subset) | Empty states everywhere honest («غير مسجل» roads, «لا توجد…بعد» with reasons); loading = text status only (D-11 deferred skeletons); corrections layer resolves to honest empty copy (P-18) |
| Sheets: back / Escape / outside click / swipe / dirty guard | PASS | QuickActionSheet: Escape asks when dirty; repeated close = stay (least destructive); X asks; discard unmounts cleanly; no auto-save (P-06..P-08). Swipe-dismiss not probed (real-device gesture — NOT_EXECUTED) |
| Duplicate-submit protection | STATIC only | Not executable without a real submit (prohibited). Three-layer static evidence stands (Button in-flight + saveInFlightRef + store commit guards) |
| Success evidence ≠ panel closing | PASS | Discard produces no receipt/toast; the only status text on screen was the pre-existing setup banner (P-07 documented) |
| Row clickability & nested actions | PASS (rendered shapes) | Position cards, draft rows, tool rows all render as single-intent buttons with whole-row targets ≥44 px |
| Keyboard / focus | PASS | Focus ring `#305968` 3 px visible on first Tab stop (logo button, P-14); R2 suite freezes this |
| Android-back approximation | PASS | Browser history back returns surface-to-surface without data loss (P-11); real-device back NOT_EXECUTED |
| Offline | PASS (PWA) | With `setOffline(true)` the app renders and navigates from the service-worker precache — local-first honesty is also functional, not just copy (P-13) |

---

## 4. Visual rules that generalize safely (and where they break)

### 4.1 Rules that held under rendering (PRESERVE)
1. **Decision-first information order** (state → actions → numbers) renders as designed on Home; Tools generalizes it as warning-before-tools. V2's result-first deck remains a genuinely different IA (AUD-001 owner gate unchanged).
2. **Honest-value grammar**: unknown → «غير مسجل» + road action; computed sum → mono «0.00»; never a fake zero on unknowns. Rendered on Home facts, Finance position cards, Work lists, Tools estimates.
3. **Money isolation**: every rendered money value sits in `<bdi dir=ltr>` with Plex Mono — bidi safety is pixel-verified, not just contractual.
4. **Touch floors**: zero sub-44 px interactive targets across all four surfaces at all four widths; nav 71 px, tiles 76 px, guard buttons 48 px.
5. **Responsive containment**: no horizontal overflow at 320/360/390/430 on any surface; single horizontal scroller (Home quick-actions, dormant at 3 tiles); content column caps at 640 px.
6. **Dark mode is a rebind, not a re-layout**: document heights identical light vs dark (Home 1,430 px both; Finance 3,825 px both); palette flips verified (canvas `#f0f3f4`↔`#211d18`, focus `#305968`↔`#f2eee6`); no dark-on-dark defects in captures or VLM pass.
7. **Guard honesty**: unsaved-input dialogs order stay-first and say exactly what will be lost («لن يُحفظ شيء تلقائيًا…», «الإغلاق الآن يفقد ما كتبته…؛ لا يوجد حفظ تلقائي»).

### 4.2 Where the visual system drifts (findings — full detail in VISUAL-FINDINGS.tsv)
1. **VIS-001 (systemic, FIX_NOW):** seat-name duplicated in the first ~150 px on 3 of 4 surfaces via two different mechanisms — Home & Tools (header context = page overline) and Work (header context = h1). Finance is the model: context suppressed + task-descriptive overline. One minimal fix generalizes (extend the suppression logic), but the owner picks which element owns the seat name per surface.
2. **VIS-003 (DEFER + owner decision):** the peach/side-border emphasis grammar has ≥3 semantic roles (primary quick tile / decision panel / warning-limits card) and 4 parameter variants (3 px vs 4 px border; `#C96442` vs `#D97757`; `0 16 16 0` vs `16px` radius; border present vs absent). Each use is locally defensible; as a system it does not yet encode one stable meaning. Feeds AUD-014.
3. **VIS-005 (DEFER + owner decision):** the primary quick-action tile wears brand-soft + border rather than the filled action color; a VLM reader interpreted it as "selected" or "error" — evidence that its "this is the primary action" meaning is not self-evident. Related to the recorded W4 decision (verbs carry meaning, not color).
4. **VIS-004 (DEFER, minor):** two h2 tiers on Work (24 px decision-surface h2 vs 18 px sibling h2s) — heading-level semantics vs visual size mismatch.
5. **VIS-002 (FIX_NOW, cheap):** AUD-008 rendered-confirmed — `.micro-home-numbers` stays 2-col at 320 px; the CSS comment claiming narrow vertical wrap is false. Visual severity low (no overflow; panels fit at 140 px) — fix is comment correction or a ≤340 px collapse rule.
6. **VIS-010 (DEFER):** Finance density outlier rendered-confirmed (5 viewports first-use). Owner ratchet record required before any reduction (AUD-021).

### 4.3 What was NOT executed (honest gaps)
- Populated-state review on any surface (requires financial writes — prohibited). All "normal state" claims in this report are limited to first-use.
- Real devices, TalkBack/VoiceOver, physical gestures (swipe-dismiss, Android back button), iOS sheet physics — `NOT_EXECUTED` (DEVICE-001 external gate unchanged).
- Route-loading render (SW precache makes it unreachable in preview; static evidence stands), storage-error/recovery screens (require unhealthy storage), PIN gate (never enabled), external-user testing (UAT-001).
- The three data-dependent sheets of AUD-005 and the suggest-chip of AUD-004: not re-renderable in first-use; static findings stand unchanged.

---

## 5. Relation to approved V2 direction (no re-opening of decided questions)

- **Not reopened:** SnapshotDeck IA (AUD-001), five-page swipe (AUD-019), V2 shell (AUD-018/OD-10), skeletons (AUD-017/D-11), field convergence (AUD-015/D-08) — all remain owner-gated exactly as recorded. No V2 decision is presented as a new question and none is contradicted.
- **Rendered-confirmed as compatible:** cool light canvas `#f0f3f4` + warm dark `#211d18` (V2 temperature split), action ink `#A94630` on selected nav, focus contour, 16 px control radius, Alexandria + Plex Mono pairing — all render exactly as the token bridge specifies.
- **Adaptation specification gaps (stated precisely, not re-voted):** (a) if the SnapshotDeck is ever approved, Micro needs a written mapping of its card set to Micro's honest-value grammar (unknown vs computed-zero vs road actions) — V2's word-generating money components must NOT be copied (R-5 stands); (b) if page-swipe is approved, Micro needs a written gesture-ownership rule relative to the Home quick-actions scroller; (c) if the peach/border grammar is unified, Micro needs a one-line semantic rule per surface role (VIS-003) — these are missing **integration specifications**, not missing visual decisions.

## 6. Pilot readiness
This review does not claim, imply, or bring forward Pilot readiness. It closes the rendered-evidence gap for first-use states of four surfaces and sharpens the owner decision list. DEVICE-001 and UAT-001 remain the unexecuted external gates.
