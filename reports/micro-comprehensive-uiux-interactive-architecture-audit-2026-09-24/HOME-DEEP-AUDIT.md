# HOME DEEP AUDIT — «مشروعي الآن» 20-Region Review (Rendered + Interactive Evidence)

Audit: continuation of `COMPREHENSIVE-AUDIT.md` (2026-09-24) — visual/interactive evidence pass
Date: 2026-09-25 · Repo: Qays7753/Micro @ `c02fb458b1c97d30f67ca7f5a82de82bbc77325d` (live origin/main, VERIFIED at audit start and unchanged at audit end)
Evidence build: production bundle `assets/index-Cr7zSxsR.js` (raw 649,628 B — byte-identical to recorded baseline), served by `vite preview` from a disposable clone; no tracked file modified.
Browser: headless Chromium (Playwright 1.63), fresh disposable profile, `locale=ar`, `timezone=Asia/Amman`, widths 320/360/390/430 @ 760.
First-use state produced via the product's own minimal path: dummy activity name → «تخطَّ المحفظة الآن» (skip wallet — no wallet, no opening balance, no financial record). Storage census proves every financial store remained at 0 across the entire session.

Evidence classes: `VERIFIED` (observed rendered/interacted in browser) · `STATIC_CODE` (file evidence only, not rendered this session) · `NOT_RENDERED` (conditional region absent in first-use state) · `NOT_EXECUTED` (not performed, reason given).
Evidence kinds: `RENDERED` (screenshot/DOM measurement) · `INTERACTION` (probe with result) · `STATIC_CODE` · `DOCUMENT`.

---

## Region map (20 regions + 2 shell overlays)

| # | Region (file anchor) | Evidence class / kind | Rendered / interactive observation (this session) | Prior-audit status carried forward |
|---|---|---|---|---|
| 1 | **Header bar** — logo + wordmark + context label + truck/assistant (`AppHeader.tsx:195-257`) | VERIFIED / RENDERED | Height 61 px on all four surfaces; context label rendered and visible: «مشروعي الآن» on Home, «العمل» on Work, suppressed on Finance, «أدواتي» on Tools. On Home the context label duplicates the page overline and on Work it duplicates the page h1 (see VIS-001 in `VISUAL-FINDINGS.tsv`). | Structure PRESERVED; duplication finding upgraded (was AUD-009, Home-only) |
| 2 | **Logo menu overlay** (`AppHeader.tsx:261-289`) | VERIFIED / INTERACTION | P-01 open: 3 items («أكمل إعداد الحساب», «بيانات المشروع», «الإعدادات») + standing note «بياناتك محفوظة على هذا الجهاز». P-02 outside-click closes; P-03 Escape closes. No navigation side-effect. | PRESERVE (matches static finding) |
| 3 | **Boot & transition states** — W3 splash (`MicroRouter.tsx:107-112`) + route loading (`MicroRouter.tsx:251-257`) | VERIFIED / RENDERED (splash) · NOT_EXECUTED (route loading render) | Splash captured in early frame (`setup/splash-early_360.png`), settles and unmounts. Route-loading text («جارٍ…») could NOT be reproduced: the service worker precaches all chunks so no navigation ever waits on network — the loading state is code-verified only (`role=status`, aria-live polite). Honest, minimal (skeletons deferred by owner record D-11). | AUD-017 unchanged (DEFER) |
| 4 | **Page heading block** — overline + h1 + date (`Home.tsx:303-316`) | VERIFIED / RENDERED | Overline «مشروعي الآن», h1 = activity name at 24 px/700 (the project name, not a seat label — good), date row 25/09/2026. Overline duplicates header context (VIS-001). | PRESERVE structure; duplication finding upgraded |
| 5 | **Setup success banner** (`Home.tsx:329-336`) | VERIFIED / RENDERED | Rendered once after `?setup=1`: «تم إنشاء مشروعك «مشروع تدقيق بصري» — ابدأ الآن بتسجيل أول عمل…» with `role=status`. Long single sentence — mild copy-density cost, owner-recorded copy. | PRESERVE (P3 note stands) |
| 6 | **Background-refresh error banner** (`Home.tsx:319-327`) | NOT_RENDERED / STATIC_CODE | Requires a failing background refresh; not producible in a healthy local session. Static evidence: `role=alert` + in-place retry `Button action=save`, ready content stays. | PRESERVE |
| 7 | **Truth line** (`Home.tsx:337-344`) | NOT_RENDERED / STATIC_CODE | Conditional on `model.truthLine`; absent in first-use (correct — nothing to warn about). | PRESERVE |
| 8 | **Daily-status block «حالة اليوم»** (`Home.tsx:348-383`) | VERIFIED / RENDERED | First-use variant «يومك مفتوح» + guidance to quick buttons, 108 px tall, first content block under the heading. State-first composition confirmed rendered (decision before numbers). | PRESERVE (test-locked) |
| 9 | **Priority block CTA** (`Home.tsx:354-369`) | NOT_RENDERED / STATIC_CODE | Requires an actionable priority item; absent in first-use. Static: full-width `Button action=save` carrying the item's own verb; W4-recorded save-class-for-navigation tension. | PRESERVE (W4 record); VIS-005 relates |
| 10 | **«اليوم» items + «قادمة» line** (`Home.tsx:386-419`) | NOT_RENDERED / STATIC_CODE | Empty in first-use (no due items); dedup/priority-hoist logic test-locked. | PRESERVE |
| 11 | **«أثناء غيابك» away card** (`Home.tsx:421-511`) | NOT_RENDERED / STATIC_CODE | Requires ≥7 days absence (`homeControlCenterService.ts:481`); not producible in a fresh session. | PRESERVE (P3 note stands) |
| 12 | **Quick actions «سجّل بسرعة»** (`Home.tsx:515-547`) | VERIFIED / RENDERED + INTERACTION | Exactly 3 tiles at 76 px height, radius 16, padding 12: «سجّل بيعًا» (primary variant: brand-soft `#FBE9E2` bg + 1 px brand-border + ink text), «سجّل مصروفًا», «طلب من عميل» (white bg + hairline border). All three fully visible in the first viewport at 360 (y=255). P-05: sale opens the sheet directly in form mode. | PRESERVE; primary-tile semantics question → VIS-005 |
| 13 | **Secondary cluster** (`Home.tsx:550-587`) | VERIFIED / RENDERED | «منتجاتي وخدماتي» + «المزيد» in a second tile row (y=359), same 76 px tile style — lighter cluster below the fixed actions, as designed. | PRESERVE (test-locked) |
| 14 | **«أرقامك» period numbers** (`Home.tsx:589-607`) | VERIFIED / RENDERED | 2×2 grid: today/month panels, each with sales + result rows; values «0.00» in IBM Plex Mono inside `<bdi dir=ltr>` (isolation VERIFIED). Panels are square hairline-topped rows (radius 0, top border only) — a different container language from the rounded quick tiles. At 320 px the grid stays 2 columns `140px 140px` — the CSS comment's claimed narrow vertical wrap does not exist (AUD-008 rendered-confirmed; no overflow, panels fit). | AUD-008 confirmed MIXED (RENDERED+STATIC); FIX_NOW unchanged |
| 15 | **«أرقامك» fact rows** (`Home.tsx:609-613`) | VERIFIED / RENDERED | Standing facts render their honest not-recorded roads: «غير مسجل — سجّله» actions present in first-use; no fake zeros on facts. | PRESERVE (§2.7 contract) |
| 16 | **«ملحوظات تهمك» insights** (`Home.tsx:617-631`) | NOT_RENDERED / STATIC_CODE | Absent in first-use (month-over-month comparison needs data) — correct honest absence. | PRESERVE (narrow by design) |
| 17 | **«المالية» unit** (`Home.tsx:633-653`) | VERIFIED / RENDERED | 112 px section at y=999: «صفحة الأساس» text-action + `Button action=save` labeled by model action. Save-class-for-navigation (W4) visible rendered. | PRESERVE (W4 record) |
| 18 | **Optional modules «مسارات مرتبطة فقط»** (`Home.tsx:655-683`) | NOT_RENDERED / STATIC_CODE | Hidden entirely when state=empty (first-use) — honest gating. | PRESERVE |
| 19 | **«آخر ما حدث» recent changes** (`Home.tsx:684-732`) | NOT_RENDERED / STATIC_CODE | Absent in first-use; ≤5 items + «افتح السجل الكامل» when data exists. | PRESERVE; «عرض الكل» gap remains owner-deferred (D-11/OD-10) |
| 20 | **Locality trust line** (`Home.tsx:734-737`) | VERIFIED / RENDERED | «بياناتك محفوظة على هذا الجهاز» fixed last element at y=1131, `role=note`. Verbatim duplicate of logo-menu note — intentional standing repetition. | PRESERVE |
| O1 | **QuickActionSheet overlay** (`QuickActionSheet.tsx`) | VERIFIED / INTERACTION | Sale mode opened + typed «12.5» + X-close → `role=alertdialog` «في رقم مكتوب — تسجّله أو تتجاهله؟» with stay-default on repeated close; «تجاهل ما كتبت» discards and fully unmounts the sheet; no record, no success feedback (P-05..P-08). Expense mode identical (P-08 re-verified with longer settle). | PRESERVE (guard tests + rendered proof) |
| O2 | **Bottom navigation** (`BottomNav.tsx`) | VERIFIED / RENDERED + INTERACTION | 71 px bar, 5 buttons, all ≥44 px targets; active item: `aria-current=page`, `data-active=true`, action-ink `rgb(169,70,48)` + weight 600 vs unselected `rgb(83,97,106)`/500 — selected state distinguishable by color AND weight (non-color cue present). Items are `<button>` (not links) — see VIS-013. Hidden when keyboard open / on deep routes (static). | PRESERVE; swipe model remains owner-gated (AUD-019) |

**Composition summary (first viewport @360, light):** header 61 px → heading block (overline + h1 + date) → daily status («يومك مفتوح») → quick actions (3 tiles) → secondary cluster (2 tiles) → «أرقامك» begins at y=467 (partially in fold). Document height 1,430 px ≈ 1.9 viewports. Zero sub-44 px targets, zero horizontal overflow, dark mode geometry-identical (1,430 px).

**Region count:** 20 numbered standing/conditional regions + 2 shell overlays. 12 regions carry rendered or interactive evidence from this session; 8 are conditional and stand on prior static evidence (marked `NOT_RENDERED / STATIC_CODE` — their honesty logic is test-locked per the prior audit).

---

## Judgment questions (mission-mandated, answered with evidence class)

1. **Is the most important information recognizable before reading a paragraph?** — VERIFIED (RENDERED + VLM-assisted): the daily-status block answers «what needs me now» in one short line («يومك مفتوح») before any prose; the three recording actions sit immediately below, fully visible in the first viewport. VLM cross-check confirms state-first reading order but flagged that the status block (not an action) is the first dominant element — which is the deliberate decision-first IA (Z1.2), not a defect. Numbers sit below actions by design (decision before report, reference §3.4).
2. **Does Home distinguish result / record / alert / explanation / navigation / action?** — VERIFIED (RENDERED for the first-use subset; STATIC_CODE for conditional ones): period numbers (bordered panels + mono money) vs recent-changes rows vs priority/alert blocks vs insights vs text-actions/tiles — six distinct shapes confirmed in DOM + captures.
3. **Are Cards used because content is an independent unit, or only as a container?** — VERIFIED (RENDERED): Home uses NO generic card species; it uses semantic sections (`.micro-home-*`) with hairline-topped number rows, rounded action tiles, and (on other surfaces) bordered decision panels. Container language is mostly purpose-bound; the exceptions are cross-surface (VIS-003).
4. **Repeated Icon+Title+Description+Button recipes — false sameness?** — VERIFIED (RENDERED): the quick-actions rows (primary row + secondary cluster) share the tile recipe deliberately; they are all navigation/recording entries of the same class, so sameness is honest. Finance position cards are a separate parallel family (2×2) — appropriate parallelism (VLM: "visually parallel and scannable").
5. **Peach surfaces & side borders — stable meaning?** — VERIFIED (RENDERED) with a negative system answer: peach (brand-soft) currently marks primary quick action (Home), decision panels (Work priority, Finance cash decision) AND a warning/limits card (Tools), while the side-border accent appears in 4 parameter variants (3 px/4 px; `#C96442` pressed-brand vs `#D97757` brand; radius `0 16px 16px 0` vs `16px`; present/absent). See VIS-003 — DEFER + owner decision.
6. **Is the primary action visually and semantically distinct without forcing?** — VERIFIED (RENDERED) with tension: the primary quick tile is brand-soft + border (not filled action color); VLM read it as "selected/error" — semantic clarity is arguable (VIS-005, owner decision).
7. **Save/Create/Commit/Secondary/Quiet/Destructive match effect?** — INTERACTION PASS for everything reachable in first-use (sheet forms, guard dialogs); prior static audit covers the rest (AUD-005/006 remain standing on static evidence — their surfaces need data).
8. **Selected/pressed/hover/disabled/loading distinguishable without color alone?** — VERIFIED (RENDERED): nav selected = color + weight (600) + aria-current; focus ring `#305968` visible on Tab (P-14); pressed state captured (P-09). Suggest-chip color-only issue (AUD-004) NOT re-renderable in first-use — stands on static evidence.
9. **Header provides context without repeating page title?** — VERIFIED (RENDERED): FAILS on 3 of 4 surfaces (VIS-001) — the one composition defect class confirmed rendered this session.
10. **Bottom navigation clearly navigation, not action?** — VERIFIED (RENDERED + INTERACTION): 5 seats, seat names, no action verbs; buttons navigate (P-09/P-10/P-11).
11. **Horizontal scrolling owner & five-page swipe conflict?** — VERIFIED (RENDERED): exactly one horizontal scroller per surface (Home quick-actions row; dormant with 3 tiles at 320). Swipe model remains unrecorded (AUD-019 owner gate unchanged).
12. **First viewport useful at 320–430?** — VERIFIED (RENDERED): at 320 all three primary tiles + status + heading remain in the fold; no overflow at any width; numbers grid stays 2-col at 320 (fits, 140 px panels).
13. **Arabic readable and concise?** — VERIFIED (RENDERED): Alexandria rendering confirmed (font census in DOM metrics); h1 24/h2 18/h3 12 px scale compact but legible in captures; date and money isolated (`bdi dir=ltr`).
14. **Numbers/dates/currency isolated and aligned?** — VERIFIED (RENDERED): all money values in `<bdi dir=ltr>` with Plex Mono; date in `<time>` row.
15. **Empty/loading/error states honest?** — VERIFIED (RENDERED + INTERACTION): «غير مسجل» roads everywhere a value is unknown; computed-zero («نتيجة اليوم 0.00») only where a documented sum exists; corrections layer lazy-loads then shows the honest empty copy (P-18).
16. **Cancel/back/recover without losing typed input?** — VERIFIED (INTERACTION): dirty-dismissal asks before losing (P-06/07/08); guard dialog orders stay-first (P-12); browser back returns cleanly (P-11).
17. **Light mode satisfies direction without changing Dark?** — VERIFIED (RENDERED): light is the default and primary target (W5/D1); dark regression: geometry identical, palette rebinds verified, no dark-on-dark defects observed in captures + VLM pass.

---

## What this adds to the prior audit

- The promised 20-region Home review is now published with per-region evidence classes (the 2026-09-24 report referenced a Home deep-d audit that was prepared but not published — see `AUDIT-CORRIGENDUM-2026-09-25.md` §artifact status).
- AUD-008 (numbers-grid comment/code mismatch) is now **rendered-confirmed** at 320 px.
- AUD-009 (label duplication) is **upgraded and generalized**: 3 of 4 surfaces duplicate the seat name by two different mechanisms (VIS-001).
- The interaction claims of the prior report's §13 (state/feedback/recovery) are now **browser-executed** for the first-use-reachable subset: 18 probes, zero financial writes, zero console errors.

Full machine-readable register: `VISUAL-FINDINGS.tsv`. Cross-surface rules: `VISUAL-INTERACTION-REVIEW.md`.
