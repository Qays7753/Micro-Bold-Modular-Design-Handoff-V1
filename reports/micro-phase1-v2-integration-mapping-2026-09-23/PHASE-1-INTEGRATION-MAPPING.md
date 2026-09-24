# Phase 1 — V2-to-Micro Integration Mapping (Read-Only Audit)

**Report ID:** `micro-phase1-v2-integration-mapping-2026-09-23`
**Phase:** 1 of the UI/UX V2 program (mapping only — no implementation)
**Prepared by:** Z AI (execution role), per `UX-001.next_action` and `current-state.md` §70
**Audit window:** 2026-09-23, ~20:15 UTC → 2026-09-24 (Asia/Amman local)
**Classification scheme:** every material assertion is labeled `VERIFIED` (directly observed in the live tree), `INFERRED` (reasoned from evidence, basis stated), `UNVERIFIED` (could not be confirmed), `NOT_EXECUTED` (deliberately not run in this phase), `DEFERRED`, or `BLOCKER`.

---

## 1. Executive summary

This Phase 1 audit mapped the approved Bold Modular V2 visual direction (`Qays7753/Micro-Bold-Modular-Design-Handoff-V1` @ `026541d`) onto the live Micro product repository (`Qays7753/Micro` @ `4e1bab9`) using five read-only specialist passes (architecture; tokens; UI/screens/RTL/a11y/performance; data/financial safety; tests/security/CI/docs) plus main-agent verification of every load-bearing claim. Nothing was modified in either repository; this report is published to a dedicated report branch in the V2 repository only.

**The headline conclusions:**

1. **The identity anchor is shared and safe.** `#D97757` is byte-identical as the approved lead brand in both systems (Micro `--vf-clay`, V2 `--p-brand`), with the same "never a profit/loss/collection signal" guardrail on both sides. `VERIFIED`
2. **The migration is NOT a value swap — it is a role-system reconciliation.** Micro's current runtime is a warm-paper palette (canvas `#FAF9F5`, ink `#141413`, IBM Plex Sans Arabic, blue `#2C84DB` for attention/pending); V2 is a cool system (canvas `#F0F3F4`, ink `#1D2930`, Alexandria, blue-gray `#305968` Information, amber `#95590C` Attention, gray `#5B6770` Partial/Unknown, and a distinct solid Action `#A94630`+white). Only 2 of V2's color values (`#D97757`, `#FFFFFF`) exist in Micro's approved 18-value palette today. `VERIFIED`
3. **A semantic remap is unavoidable and is the highest-risk area.** Micro currently renders *pending*, *reversed*, and *partial* states in blue (`--vf-info` `#2C84DB`, test-frozen); V2 renders partial/unknown in gray and reserves amber for actionable attention. Transferring V2 roles without a deliberate `stateAdapter` tone-vocabulary change would silently change what users infer about money states. `VERIFIED`
4. **Micro is far ahead of the V2 ledger.** Of the 46 coverage entries, 32 have a live Micro counterpart route, 8 are partial, 5 are not started in either repo, and 1 (GLB-LOGOUT) is not applicable to local-first Micro. V2 has actually designed only 3 product screens (21 states) plus shell/error patterns; ~24 screens Micro already runs are *not designed* in V2 and must stay on the current design until later, individually authorized waves. `VERIFIED`
5. **Financial meaning is heavily guarded but has 10 specific stop conditions.** Micro's financial display truth is concentrated in `presentation/formatters.ts`, `presentation/stateAdapter.ts`, and the word dictionaries — all test-frozen. The sharpest conflicts: V2's result-card verdict word «ربح» (contract 05 §3.2.1 forbids renaming «نتيجة الفترة المسجلة» or calling it final net profit), V2 amber for *due-today* (Micro freezes due as neutral; only overdue may escalate), V2 danger-red for losses (Micro renders negatives in amber attention), V2's `pending-send`/offline states (Micro is `local_only` — no sync target exists), and V2's «دخل/خرج» direction words («دخل» reads as *income* next to collections Micro deliberately labels «نقدي داخل»). `VERIFIED`
6. **The guard apparatus is strong and wave-ready, but three Wave-1 collisions are mechanical:** Micro's `design-token-guards.py` freezes spacing/radius/type/z scales that V2's values (radii 14/18/22/24, spacing 6/10/14/18/28, type 34px) violate; `vf-tokens.test.ts` freezes the current 18 hexes byte-for-byte (the test rewrite itself is the authorization artifact); and the bundle budget headroom is **`RECORDED_HISTORICAL_EVIDENCE — NOT_CURRENTLY_REMEASURED`**: 1,228 raw bytes at the last recorded CI-parity measurement (fonts as delivered by V2 add ~1.12MB unsubsetted). `VERIFIED` for the recorded report, not a current Phase-2 guarantee.
7. **Dark Mode is safe by construction but will go *stale*, not break.** `theme-dark.css` rebinds all 59 color-material `--vf-*` tokens independently — a light value change cannot silently alter dark; instead dark retains old values until edited in the same change. Every Wave-1 token change needs a parallel dark binding plus an 82-pair contrast-guard pass in both themes. `VERIFIED`
8. **Two pre-existing hygiene findings surfaced (recommended for a small later wave, not Phase 1):** 13 live SVG brand assets in `public/brand/` (favicon, PWA icons, splash, launch-motion layers) still carry the *retired v0* palette (`#CC785C`, `#079FA0`, and retired dark values) that the runtime guard bans — the guard does not scan `public/`; and Micro's entry documents carry stale numeric authority (code = schema 38/export 30; `AGENTS.md` §10 says 36/28; §11.3 says 35/27; `context.md` says 35/27 and a stale main SHA). `VERIFIED`
9. **Recommended wave order:** Closeout (this report correction, source reconciliation, and owner-direction record) → Wave 0 Micro documentation/Tracker alignment → Wave 1 foundations (token bridge, state semantics, typography, action roles, guards, and budget measurement) → Wave 2 OVR-NOW/Home slice → Wave 3 shell and reference screens with any Finance structural work gated separately → later route-by-route waves → real-device/UAT gates. No implementation is claimed or started in this phase.

**Finding counts:** 66 consolidated findings — 13 `FIX_NOW` (for later authorized waves), 21 `PRESERVE`, 12 `DEFER`, 8 `OUT_OF_SCOPE`, 12 `OWNER_DECISION_REQUIRED`. The owner has now supplied direction for OD-01..OD-12; remaining gates are implementation verification and any genuinely new conflict, not a second identity vote.

---

## 2. Scope, write boundary, and credentials mode

**Phase 1 scope (executed):** read-only integration mapping between the two repositories; verification of baselines; evidence-based analysis of tokens, consumers, components, screens, Dark Mode, financial safety, RTL/accessibility/device/performance, tests/CI/security/docs; production of this report and two small machine-readable tables beside it.

**Write boundary honored:**

| Repository | Boundary | Status |
|---|---|---|
| Micro (`Qays7753/Micro`) | `READ_ONLY` | `VERIFIED` — no file created/edited/deleted/moved; no branch/commit/PR; no Tracker/UX-001/current-state/contracts updates; no `vf-tokens.css`/Dark Mode/component/screen/route/test/dependency changes; no destructive git operations; no installs; no lockfile changes. The only Micro-side git operations were read-only (`clone`, `rev-parse`, `log`, `show`, `ls-remote`, `status`, `worktree` inspection of the analysis clone). |
| V2 design repo | `REPORT_BRANCH_AND_PR_ONLY` | `VERIFIED` — the report branch contains only the report artifacts. No V2 source design file, token, component, catalog, decision document, or application code was modified. The closeout PR is created from the report branch and is intentionally not merged. |

**Credentials mode:** the V2 fine-grained PAT was used exclusively through a local credential helper file (mode 0600, outside both repositories, removed after publication) for: (a) a read-only open-PR state check on the V2 repository, (b) the report branch push, (c) PR creation. The token does not appear in this report, in any committed file, in any command echoed to logs, in the PR body, or in shell arguments (it was referenced via the credential store and a file-derived environment variable only). No Micro credential was requested or used; Micro was accessed anonymously and read-only. `VERIFIED`

**Specialist execution:** five read-only specialists were used as required (architecture 2-a; tokens 2-b; UI/screens/RTL/a11y/performance 2-c; data/financial meaning 2-d; tests/security/CI/docs 2-e). Specialist 2-a required one relaunch after an environment context-deadline on its first pass; the retry completed. No specialist wrote to either repository; all findings were returned in-process and verified/logged by the main agent.

---

## 3. Exact repository, branch, revision, baseline, and timestamp

| Item | Value | Status |
|---|---|---|
| Micro repository | `https://github.com/Qays7753/Micro` | `VERIFIED` (anonymous clone) |
| Micro branch | `main` | `VERIFIED` |
| Micro baseline (expected) | `4e1bab9198023cf76bf1ebd5e9481d898a95700e` | — |
| Micro baseline (live `origin/main`) | `4e1bab9198023cf76bf1ebd5e9481d898a95700e` | `VERIFIED` — exact match; clean worktree; commit subject `docs: reconcile Bold Modular V2 Phase 0 authority (#231)` (squash-merge of PR #231, single parent `389afd5`, author date 2026-09-23 23:00 +0300) |
| V2 repository | `https://github.com/Qays7753/Micro-Bold-Modular-Design-Handoff-V1` | `VERIFIED` |
| V2 branch | `main` | `VERIFIED` |
| V2 revision (expected) | `026541d9ac10c8d8df9999c4cd85653c4231ff43` | — |
| V2 revision (live `origin/main`) | `026541d9ac10c8d8df9999c4cd85653c4231ff43` | `VERIFIED` — exact match; clean worktree; commit subject `chore(design): consolidate approved Micro V2 into one canonical handoff` |
| V2 side branches | `win`, `exec/interactive-design-studio-zed-20260923` — both point at `026541d` (ancestors of `main`, no divergence) | `VERIFIED` |
| Micro open PRs | max PR ref = #231 = the baseline commit itself; no PR opened after the baseline; `generated/ACTIVE-WORK.md` = "no active workstream" | `VERIFIED` (via git refs + control docs; anonymous GitHub API was rate-limited — see Section 18) |
| Operations-control validator | `Operations Control valid: 64 items, 23 workstreams, 0 active claims, origin/main=4e1bab9198023cf76bf1ebd5e9481d898a95700e` | `VERIFIED` (executed) |
| Phase 0 evidence baseline | Micro `f05b45e` at Phase 0 start; current `main` is the Phase 0 docs merge itself — consistent with `docs/operations/control/evidence/ui-v2-phase0-baseline-2026-09-23.md` | `VERIFIED` |
| Audit start (UTC) | 2026-09-23T20:15:47Z | `VERIFIED` |
| Report publication (UTC) | recorded in Section 19 / PR | — |

**No state drift.** All expected values matched live values exactly. The Phase 0 baseline, the UX-001 gate language, and the V2 revision are mutually consistent.

---

## 4. Work performed and work explicitly not performed

### Performed
1. Anonymous read-only clones of both repositories; SHA/branch/worktree/PR-ref verification; `AGENTS.md` read in both repositories first. `VERIFIED`
2. Read of Micro's operations-control layer (`control/README.md`, `context.md`, `generated/AGENT-BRIEF.md`, `generated/ACTIVE-WORK.md`, `items/UX-001.json`, `evidence/ui-v2-phase0-baseline-2026-09-23.md`) and `current-state.md` (header, §59–§60, §70 and targeted greps). `VERIFIED`
3. Read of Micro's architecture contracts (`SOURCE_OF_TRUTH`, `MIGRATION_STATUS`, `CHANGE_PROTOCOL`, `COMPONENT_CONTRACTS`, `UI_AUX_ARCHITECTURE`, `EXTENSION_PLAYBOOK`, `SURFACE_TONE_SYNTAX`, ADR-007, ADR-009). `VERIFIED`
4. Read of V2's authority documents (`README`, `AGENTS`, `COLOR-STANDARD-V2`, `TRANSFER-READINESS-V2`, `SCREEN-COVERAGE-V2.csv`, `DESIGN-DECISIONS-V2` structural outline + targeted sections, studio foundations, catalogs, and reports). `VERIFIED`
5. Execution of the one mandated lightweight control check: `python3 scripts/operations-control/validate.py` → PASS. `VERIFIED`
6. Five read-only specialist audits (architecture; tokens/consumers; UI/screens/RTL/a11y/performance; data/financial safety; tests/security/CI/docs), each returning evidence-cited findings. `VERIFIED`
7. Main-agent spot-verification of the highest-load claims (schema versions 38/30; 13 retired-palette SVGs; bundle headroom 1,228 B; Group 11 final gate language; contract 05 §3.2.1 verdict-word freeze; V2 token file light-only declaration + derived values; V2 font asset sizes). `VERIFIED`
8. Synthesis of this mapping report plus machine-readable `TOKEN-MAPPING.tsv` and `FINDINGS.tsv`. `VERIFIED`

### Explicitly not performed (by design)
- No Micro modification of any kind; no Micro branch, commit, PR, Tracker/UX-001/current-state update; no workstream claim created in Micro (claims are required *before modifying*; Phase 1 modifies nothing, per `UX-001.next_action` and §70). `VERIFIED`
- No full application build, no full test suite run, no browser test suite, no dependency install, no deployment, no workflow rerun, no `pnpm check`, no `npm` command in the studio, no visual rendering of any screen, no image rendering of V2 evidence screenshots. All marked `NOT_EXECUTED` in Section 18.
- No V2 source modification; no merge of the report PR; no cleanup, reset, rebase, force-push, or deletion anywhere.
- No implementation was performed. The owner-direction addendum was recorded after the original audit; it constrains later planning but does not authorize Phase 2 code changes.

---

## 5. Evidence index (exact paths, symbols, commands, SHAs)

**Baseline/identity commands run (all read-only):**
- `git clone https://github.com/Qays7753/Micro.git` → analysis clone at `4e1bab9`
- `git clone https://github.com/Qays7753/Micro-Bold-Modular-Design-Handoff-V1.git` → analysis clone at `026541d`
- `git rev-parse origin/main` (both repos) → expected SHAs confirmed
- `git status --porcelain` (both) → clean
- `git log --oneline -5`, `git log -1 --format=%P` on `4e1bab9` → single parent `389afd5` (squash-merge of PR #231)
- `git ls-remote --heads origin` + `git ls-remote origin 'refs/pull/*'` (Micro) → 11 remote branches (historical/keep/agent branches), max PR ref 231
- `git branch -a` + `git merge-base --is-ancestor` (V2) → `win`, `exec/...` at `026541d`, ancestors of `main`
- `python3 scripts/operations-control/validate.py` → **PASS** (64 items, 23 workstreams, 0 active claims; warnings: WS-170 historical base_sha; gh CLI unavailable)

**Primary Micro evidence (all paths relative to repo root, at `4e1bab9`):**
- Governance: `AGENTS.md` (§2 reading order, §6 financial rules, §10 non-negotiables incl. stale "36/28" at line ~130, §11 Post-Group-6 gate, §14 operations control); `docs/operations/current-state.md` (1,465 lines; §40 Group 11 final gate; §70 Phase 0 baseline); `docs/operations/control/{README,context}.md`; `docs/operations/control/generated/{AGENT-BRIEF,ACTIVE-WORK}.md`; `docs/operations/control/items/UX-001.json`; `docs/operations/control/evidence/ui-v2-phase0-baseline-2026-09-23.md`
- Architecture: `docs/architecture/SOURCE_OF_TRUTH.md`; `MIGRATION_STATUS.md`; `CHANGE_PROTOCOL.md`; `COMPONENT_CONTRACTS.md`; `UI_AUX_ARCHITECTURE.md`; `EXTENSION_PLAYBOOK.md`; `SURFACE_TONE_SYNTAX.md`; `ADRs/ADR-007-dark-mode-boundary.md`; `ADRs/ADR-009-permanent-dark-mode.md`
- Tokens/styles: `apps/prototype-web/client/src/styles/vf-tokens.css` (167 lines; 18 approved light hexes; action contracts; geometry; type scale; motion; the stale light-only/dark-pending header comment at lines 16–17); `styles/theme-dark.css` (150 lines; 59 color-material rebinds for `:root.dark`); `styles/primitives.css` (484); `styles/index.css` (6,983 lines; `:root` legacy alias layer; ~137 `.micro-*` prefix families); `styles/brand-launch-splash.css` (182); `styles/vf-tokens.test.ts` (272; APPROVED_18 freeze)
- Numeric guards: `apps/prototype-web/client/src/storage/local/types.ts:55,71` (`localSchemaVersion = 38`, `localExportVersion = 30`); `apps/prototype-web/scripts/check-bundle-budget.mjs:32-33` (650,000/155,000); root `package.json` lint `--max-warnings 37`
- Presentation truth: `client/src/presentation/formatters.ts` (`formatMoneyMinor` :77, 2-decimal lock); `presentation/stateAdapter.ts` (tone/word/marker mapping; `partial→"info"`; `due→neutral`); `presentation/{activityLabels,financialEventLabels,orderAgreementPresentation}.ts`; `components/presentation/DisplayValue.tsx` (`MoneyValue` :15, `MoneyWithUnit` :30)
- Financial contract: `docs/contracts/05-financial-p0-policies.md` §3.2.1 («نتيجة الفترة المسجلة»; "لا يطلق عليه «صافي ربح نهائي»"); `docs/contracts/04-limited-sync-contract.md` (`local_only`)
- Brand assets: `apps/prototype-web/client/public/brand/**` — 13 SVG files containing `#CC785C`/`#079FA0` (favicon/micro-favicon-field.svg, mark/micro-quad{,-compact}.svg, pwa/{micro-adaptive-foreground,micro-maskable,micro-appicon-quad}.svg, splash/{ios-1179x2556,ios-1290x2796,ipad-2048x2732,android-960x960-icon}.svg, motion/{light/2-right-turquoise,light/4-left-terracotta,micro-mark-layered}.svg)
- Latest recorded bundle: `reports/agent-report/2026-09-23_fin-roadmap-wave-6-fin-001/report.md` (CI-parity raw 648,772/650,000 → headroom 1,228; gzip 153,862/155,000; local 648,660)
- Guards/CI: `scripts/design-token-guards.py` (retired list :41-48; scale sets :52-65; scans `client/src` only); `scripts/theme-contrast-guard.py` (41 pairs × 2 themes = 82 checks); `scripts/check-runtime-cycles.mjs`; `eslint.config.js` boundary rules; `.stylelintrc.json`; `client/src/legacyClassCensus.test.ts`; `client/src/exact-values.characterization.test.ts` + `exact-values.cross-surface.test.ts` (pins 38/30); `R2.renderSmoke.test.tsx` (56 routes, both themes); `.github/workflows/ci.yml`
- Docs-staleness anchors: `docs/00-document-index.md` (no `docs/architecture/` entries); `docs/operations/control/context.md:10,13` (stale SHA `81fa524`, 35/27)

**Primary V2 evidence (relative to repo root, at `026541d`):**
- Authority: `README.md`; `AGENTS.md`; `COLOR-STANDARD-V2.md` (role table + 11 checked pairs; pressed/disabled "derived and documented by ZAI"); `TRANSFER-READINESS-V2.md` (transfer order; exclusions; 47/47 browser script never delivered; 200% fix unverified); `DESIGN-DECISIONS-V2.md` (198KB; §6 shape, §7 typography incl. "no separate mono", §8 color, §10 components, §11 navigation, §12 forms, §13 financial UI incl. 13.11 result/completeness, 13.20 state language)
- Foundations: `interactive-design-studio/src/foundations/tokens.css` (208 lines; 163 tokens; `--p-*`/`--c-*`/component layers; "Light Mode فقط — لا Dark Tokens"; derived pressed/disabled documented); `tokens.ts` (currency, `MINUS_SIGN='\u2212'`, `formatAmount` 2–3 decimals, APPROVED_COLOR_PAIRS, SEMANTIC_STATE_COLORS); `typography.css` (Alexandria + Noto Sans Arabic local VF @font-face); `motion.css`; `TOKEN-DICTIONARY.{md,json}` (generator `scripts/export-tokens.mjs` outside the repo)
- Components/screens: `src/components/core/{Button,Field,OpenRow,Overlays,SegmentedControl,Skeleton}.tsx` + `core.css` (622 lines); `src/components/financial/{MoneyValue,SnapshotDeck,TruthNote,ResultBlock,ImpactPreview,TransactionRow}.tsx` + `financial.css` (556); `src/components/contextual/*` + `contextual.css` (327); `src/navigation/{AppHeader,BottomNav}.tsx`; `src/screens/{OvrNow,OpsSaleCreate,FinOverview,OvrSnapshotAll,DeferredScreen}.tsx` + `screens.css`; `src/states/types.ts`; `src/studio/studio.css` (second `--studio-*` namespace — never transfers)
- Ledger/reports: `SCREEN-COVERAGE-V2.csv` (46 entries: 9 Visual Approved, 1 Visual Pattern Approved, 36 NotStarted); `interactive-design-studio/{COMPONENT-CATALOG,SCREEN-CATALOG,STATE-MATRIX,RTL-ACCESSIBILITY,NAVIGATION-MAP,MOTION-MAP,ASSET-MANIFEST,DESIGN-TO-DEVELOPMENT,FIXTURE-CATALOG}.md`; `reports/{CONTRAST-REPORT,QA-SUMMARY,OPEN-ISSUES,IMPLEMENTED-COVERAGE-V2}.md`; `evidence/` (57 screenshots); `JORDANIAN-FIXTURES.md`; `fixtures/ops-sale-create.json` (impact values fixture-tagged, GAP-004)
- Fonts: `assets/fonts/Alexandria-VF.ttf` (332,488 B) + `NotoSansArabic-VF.ttf` (844,676 B) + OFL licenses

---
## 6. Source-of-truth map

### 6.1 Authority reconciliation (what governs what)

| Domain | Authoritative source | Status / notes |
|---|---|---|
| **V2 visual direction (target)** | V2 repo @ `026541d`: `DESIGN-DECISIONS-V2.md` (direction), `COLOR-STANDARD-V2.md` (color roles), `interactive-design-studio/src/foundations/` (live token values), studio catalogs (component/screen/state references) | `VERIFIED`. Covers visual identity, composition, typography, shape, components, visible interaction and states. Explicitly does **not** declare Micro migrated. |
| **Micro runtime token authority (current)** | `apps/prototype-web/client/src/styles/vf-tokens.css` — "the ONE place where Standard hex values live in Micro" — reconciled against `Documents/micro-standard-v2/design-tokens.css` at Documents `main` `2396ff09fa52bb7872ae40c10adfc86ee7a0808d` during closeout | `VERIFIED`. Per Phase 0 (PR #231), this file **remains the single implementation bridge** until an explicit mapping is accepted; no second token source may be created. Documents is a visual-contract source, not Micro implementation. |
| **Micro financial/domain/storage/export authority** | `docs/contracts/` (esp. 01, 02, 03, 04, 05), `src/domain/`, `client/src/application/`, `client/src/storage/` | `VERIFIED`. All out of UI/UX scope per Phase 0 decision 4. |
| **Micro state words & display grammar** | `presentation/stateAdapter.ts` + `presentation/{activityLabels,financialEventLabels,orderAgreementPresentation}.ts` + `docs/architecture/SURFACE_TONE_SYNTAX.md`; words frozen by tests | `VERIFIED`. The adapter and components never generate words. |
| **Micro UI/AUX architecture & change protocol** | `docs/architecture/{UI_AUX_ARCHITECTURE,SOURCE_OF_TRUTH,CHANGE_PROTOCOL,COMPONENT_CONTRACTS,EXTENSION_PLAYBOOK,MIGRATION_STATUS}.md` + `ADRs/` | `VERIFIED`. These govern how any V2 change must enter Micro. |
| **Dark Mode current authority** | ADR-009 (accepted; supersedes ADR-007) + `styles/theme-dark.css` | `VERIFIED`. Explicit, persisted, production surface. `DARK_MODE_BOUNDARY.md` and ADR-007 are historical. |
| **Operational state/gates** | `docs/operations/current-state.md` (§70 = Phase 0 record), operations-control system (64 items, 23 workstreams, 0 active claims), `UX-001` (DEFERRED, `next_action` = this Phase 1) | `VERIFIED`. |
| **Legacy / retired values** | Retired v0 identity: `#CC785C`, `#964E33`, `#5F3120`, `#079FA0` + 12 retired v0 dark values — banned by `scripts/design-token-guards.py:41-48` | `VERIFIED` in runtime CSS/TS. **Exception found:** still present in 13 `public/brand/**` SVG assets (unguarded zone) — see F-01 and R-06. |
| **Retired-document traps** | `context.md` (stale SHA + 35/27), `AGENTS.md` §10/§11.3 (36/28 vs 35/27 vs code 38/30), `current-state.md` header (stale "last update"), `vf-tokens.css` header (dark described as pending gate), `docs/00-document-index.md` (missing the entire architecture set) | `VERIFIED` — full register in Section 13. |

#### External Documents Standard cross-check — closeout evidence

The external `Documents/micro-standard-v2/` package was read at Documents `main` revision `2396ff09fa52bb7872ae40c10adfc86ee7a0808d`. `MANIFEST.json` marks the package final (29 core files plus 2 metadata records); `README.md` defines it as the official visual foundation, not Micro product implementation; `color-system.md` confirms the current warm Micro palette and action classes; and `data-display-system.md` confirms honest-void and no-data rules. `VERIFIED`

The cross-check confirms the authority ladder rather than replacing it: V2 is the approved visual direction; Micro runtime and Micro contracts own implementation, data, and financial meaning; Documents is a visual-contract source reviewed by topic and revision. The owner-approved `#A94630` solid-action direction is recorded as a **new future Micro direction** that supersedes the current Standard role for the relevant action class, but it is not implemented here and Documents is not modified. Any implementation change remains blocked until its Micro-side documentation/Tracker record and Phase 2 acceptance exist. `VERIFIED`

No claim is made that Documents contains Micro runtime implementation. `NOT_APPLICABLE` for implementation search; `NO_DOCUMENTS_WRITES_PERFORMED`.

### 6.2 The three questions (per `SOURCE_OF_TRUTH.md`) applied to this mapping
- *Where is each concept authoritatively defined?* Answered per row in Sections 7–9.
- *Consumed or redefined?* Phase 2+ must consume Micro primitives through `--vf-*`; V2 studio code is never copied (Phase 0 hard rule, reinforced by `studio.css` second namespace and fixtures isolation).
- *Which consumers must be inventoried before changing it?* Section 8 inventories them (definition → alias chain → direct consumers → page consumers → test consumers → dark consumers).

---

## 7. V2-to-Micro token mapping table

V2 inventory: 163 tokens in `foundations/tokens.css` (Core `--p-*` primitives → Semantic `--c-*` → Component `--btn-*/--field-*/--nav-*/--signal-*`; non-color tokens unprefixed), mirrored 1:1 into `TOKEN-DICTIONARY.{md,json}` (zero deltas at `026541d`). `VERIFIED`
Micro inventory: `--vf-*` namespace in `styles/vf-tokens.css` (light) + `theme-dark.css` (dark rebinds) + legacy `--color-*`/shadcn-style alias layer in `index.css :root`. `VERIFIED`

**Δ column:** ✅ identical value · ≠ different value · ➕ V2-only (would be a NEW Micro value) · ➖ Micro-only (no V2 counterpart).

| Group | V2 token + value | Micro token + value | Δ | Semantic fit & migration note | Risk |
|---|---|---|---|---|---|
| **Brand (identity)** | `--p-brand` `#D97757` | `--vf-clay` `#D97757` | ✅ | Identity anchor. Micro: identity/create/FAB, "never a financial value". V2: brand lead, may frame large sections, ink-on-brand (`--c-on-brand: var(--p-ink)`). Both put dark ink text on it. | LOW — carry the Micro "never financial" rule into every V2 brand-block application |
| Brand deep (pressed brand) | `--p-brand-deep` `#C4663F` (non-text only) | `--vf-clay-interactive` `#C96442` (pressed/chosen edge; frozen by U09 test) | ≠ | Both are "darker clay for pressed/edge", different hexes. Owner picks one; Micro's is test-frozen. | MED |
| Brand soft | `--p-brand-soft` `#FBE9E2` | none (Micro `--color-brand-soft` aliases `--vf-tint` `#E8E6DC`, warm, not clay-tinted) | ➕ | V2 has a real clay-tinted support field; Micro deliberately does not. New palette value → owner gate. | MED |
| **Action / on-action** | `--p-action`/`--p-on-action` `#A94630`/`#FFFFFF` (5.82:1); pressed `--p-action-pressed` `#8F3B27` | create = `--vf-action-create`→clay `#D97757` + ink text; commit = `--vf-btn-primary-bg`→ink `#141413` + white; save = ground + ink + clay-interactive pressed edge | ≠≠ | **Core divergence.** V2 separates Brand from Action (solid terracotta action, white text); Micro fuses primary/create/brand into Clay (ink text) and reserves dark-ink fill for high-consequence commit. `SOURCE_OF_TRUTH.md` already mandates "Action is distinct from Brand" for the mapping — adopting V2 means re-classifying Micro's primary/create/FAB surfaces and updating `--primary` alias, Button classes, `primitives.test.tsx`. | **HIGH — owner decision** |
| **Canvas / Surface** | `--p-canvas` `#F0F3F4` (cool), `--p-white` `#FFFFFF`, `--p-surface-2` `#E4EAEC` (derived pressed/secondary) | `--vf-canvas` `#FAF9F5` (warm paper), `--vf-surface` `#FFFFFF`, ground `#F5F4ED`, recessed `#F0EEE6`, tint `#E8E6DC`, soft `#D1CFC5` | ≠ | Whole-page temperature flip (warm→cool). Micro's 6-step warm ladder collapses toward V2's 3-step cool ladder; 44 `--color-bg-well` + 12 `--vf-tint` consumers need explicit targets. | **HIGH** |
| **Ink (text)** | `--p-ink` `#1D2930` / `--p-ink-2` `#53616A` / `--p-ink-disabled` `#8A959C` (derived) / `--p-muted` `#A6AEB4` (skeleton) | `--vf-ink` `#141413` / secondary `#4D4C48` / tertiary `#6B6962`; disabled-surface `#F0EEE6` + disabled-ink `#55524A` (**both dead — 0 consumers; disabled is done via `opacity: 0.5`**) | ≠ | Blue-black vs warm-black ink. ~295 text-alias consumers — mechanical swap via vf-tokens.css but changes every text pixel. V2 bans opacity-disabled; Micro's disabled tokens are dead — adopting V2 disabled is real a11y work. | HIGH (visual) / LOW (mechanics) |
| **Information** | `--p-info`/`--p-info-surface` `#305968`/`#DFEDF1` (blue-gray; also focus + local/offline role) | `--vf-info` `#2C84DB` (BLUE — colors *attention/pending mark*, and via stateAdapter also *reversed* and *partial*) | ≠≠ | **Semantic remap required.** Micro "info" tone today covers pending+partial+reversed; V2 info = neutral explanation/focus. Cannot 1:1 swap: each `--vf-info` consumer (chip tone, notice marker, row stripe) must be re-classified to V2 info / attention / partial first. | **HIGH — owner decision** |
| Reviewed/current | none | `--vf-status` `#1490FF` (1 consumer: chip tone "status") | ➖ | V2 has no "reviewed" role. Map to V2 info or keep Micro-local role — owner call. | MED |
| **Attention** | `--p-attention`/`--p-attention-surface` `#95590C`/`#FFF0D7` | no dedicated token; knowledge surfaces use Micro-owned pair `--color-warning-text/bg` `#7A5C20`/`#F6ECCF` (85 consumers, all inside index.css `data-tone=warning` rules) | ≈ | Role-compatible, value-different. Note: Micro's *status* semantics put overdue→error and due→neutral; V2 reserves amber for actionable attention incl. near-term due — semantic conflict resolved separately (Section 11). | MED |
| **Success** | `--p-success`/`--p-success-surface` `#16765A`/`#DFF3E9` (text-safe 4.81:1) | `--vf-success` `#629987` (non-text mark, 3.27:1) + Micro-owned text pair `#256B4A`/`#E4F2EA` | ≠ | V2 merges Micro's mark+text-pair into one fg+surface pair. Value change breaks the frozen `vf-tokens.test.ts` (must be re-baselined in the authorized wave). | MED |
| **Danger** | `--p-danger`/`--p-danger-surface` `#B0324F`/`#FFE7EB` | `--vf-error` `#B53333` (text-safe); `--color-danger-bg`→`--vf-ground` (neutral ground, NOT a red tint) | ≠ | Both "error/destructive text-safe". V2 adds a red surface Micro deliberately lacks; Micro renders *losses* amber, V2 renders them danger — the semantic half is an owner decision (Section 11). | MED |
| **Partial / Unknown** | `--p-partial`/`--p-unknown` + surfaces `#5B6770`/`#EDF1F2` | none dedicated — partial marker = ink-secondary CSS shapes; chip tone for partial = "info" (BLUE) | ➕ | V2 makes partial/unknown a first-class neutral gray role. Micro currently renders partial BLUE. Requires stateAdapter tone split (add `partial` tone) + new token. | **HIGH (semantic)** |
| Local/offline | `--p-local` = info `#305968`/`#DFEDF1` | none (PWA notices use `data-tone=offline/update`) | ➕ | V2 documents Local=Information. Low consumer count today; tied to the deferred sync states. | LOW |
| **Focus** | `--c-focus` `#305968` (2px ring) + `--c-focus-ring` `#DFEDF1` (halo); switches to Ink over brand | `--vf-focus` `#141413` (ink outline) + `--vf-field-border-focus` `#87867F` (dead — 0 consumers) | ≠ | Global focus re-style; V2 adds a focus-ring token Micro lacks. | MED |
| Control boundary | `--p-boundary` `#78868D` | `--vf-border-interactive` `#87867F` | ≠ | Same role, cool vs warm gray. 2 direct consumers + outline button border. | LOW |
| Decorative divider | `--p-border` `#DCE3E5` | `--vf-border` `#D1CFC5` (0 direct; aliases serve 133+16 consumers) | ≠ | Same role, cool vs warm. Mechanical. | LOW |
| **Pressed (secondary)** | `--p-surface-2` `#E4EAEC` (rows, secondary pressed, menus) | `--vf-btn-secondary-bg-pressed`→soft `#D1CFC5` (1 consumer); `--vf-ink-pressed` `#3D3D3A` | ≠ | Low consumer count. | LOW |
| **Chart current/prior** | `--p-chart-current/prior` `#305968`/`#5B6770` (defined, unused — FIN-CHARTS conditional) | none — confirmed: no charts exist in the live product | ➕ | Carry as contract-only when the first chart lands (U-16 floors). | LOW / DEFER |
| **Typography family** | Alexandria VF (100–900) + Noto Sans Arabic VF fallback, local TTF; **no mono font** (V2 §7 rejects a separate numeric mono); tabular-nums on money classes | `--font-arabic` IBM Plex Sans Arabic + `--font-numeric` IBM Plex Mono (10 subsetted woff2, 312KB, local, PWA-precached; `--vf-font-sans/mono` tokens exist but are unused duplicates of index.css definitions) | ≠≠ | Family swap + numeric-slot contract decision + payload strategy (V2 as-delivered = 1,177,164 B unsubsetted TTF vs Micro 312KB woff2) + rem-ladder re-freeze. | **HIGH — owner decision** |
| Typography scale | px × `--text-scale` (1/1.5/2 review multiplier); sizes 12–34px incl. money-hero 34px | rem ladder 0.6875–1.9375rem (11–31px) frozen by guard + stylelint; 376 rem font-sizes, 0 px | ≠≠ | V2 hero (34px) exceeds Micro's frozen max (31px); V2 px-based tokens fail Micro's rem ladder unless converted; `--text-scale` mechanism has no Micro equivalent. | **HIGH (guard collision)** |
| Numeric/currency presentation | `formatAmount` en-US, **2–3 fraction digits**, U+2212 minus `−`, `Intl` grouping; `CURRENCY_UNIT='د.أ'`; `aria-label` spoken «دينار أردني» | `formatMoneyMinor` en-US, **exactly 2 decimals** (sub-qirsh rejected at input), ASCII `-` minus, `د.أ` appended outside the LTR island; `—` for null | ≈ | Same digits/unit philosophy; 4 concrete divergences (minus glyph, 3rd decimal, unit placement, spoken label) — formatter changes propagate into share text and statement markdown exports. | MED–HIGH (owner decision) |
| **Spacing** | 15 tokens incl. 6/10/14/18/28px | `--space-1..6` = 4/8/12/16/20/24 + guard set `{2,4,8,12,16,20,24,32,0}px`; consumers: space-2 ×228, space-3 ×225, space-1 ×120, space-4 ×88 | ≠ | V2's 6/10/14/18/28 are off Micro's 4px-rhythm scale. Either re-map V2 spacing onto Micro's scale (visual change) or extend the guard scale (process change, owner). | MED (guard collision) |
| **Radii** | 12/14/16/20/22/24px (`--radius-*` incl. sheet 24, dialog 20, button 16, field 14) | 12/16/18/20/999px (`--vf-radius-control/card/segment/sheet/full`; guard set `{0,12,16,20,999px,50%}`; segment 18px is dead — 0 consumers) | ≠ | Only 12/16/20 overlap; V2 14/22/24 and Micro 18 are off each other's scales. Alias consumers: radius-control ×59, radius-card ×46. | MED (guard collision) |
| **Motion** | press 100, local 150, expand 200, screen 280, result 280, sheet 240, dialog 190, dropdown 200, selection 160, crossfade 180, reduced 120ms; `--ease-standard (0.2,0,0,1)`; `[data-motion='reduced']` attribute switch | press 80, fast 120, normal 200, sheet-in 240, sheet-out 180, dialog-in 160, dialog-out 120, scrim 200, skeleton 1.5s, snackbar-hold 5000ms; `--ease-standard (0.4,0,0.2,1)`; most motion tokens have 0 var() consumers (timings live inline; legacy `--motion-out` ×24) | ≠ | Comparable taxonomy, different values/curves. V2's attribute-based reduced-motion switch is a new mechanism. Low consumer friction because Micro's motion tokens are mostly unconsumed. | LOW–MED |
| Elevation | cool `rgba(29,41,48,…)` layer/menu | warm `rgba(60,50,40,…)` e1–e3 (alias consumers: e1 ×16, e2 ×2, e3 ×4) | ≠ | Shadow tone flip accompanies the canvas flip. | MED |
| Scrim | `--p-overlay` `rgba(29,41,48,0.55)` | `--vf-scrim` `rgba(20,20,19,0.45)` (exact string test-frozen) | ≠ | Trivial; re-baseline with the wave. | LOW |
| Control sizes | touch 44 / touch-lg 48 / button 48 / button-compact 44 / field **54** / row 56 / row-tx 68 / tabbar **70** / header 56 | control-height 48 (×8), touch-target 44 (×2), topbar 56 (×1), nav-min **64**, fab 56 (dead) | ≈ | Compatible except field (54 vs 48) and tabbar (70 vs 64) — both honor the 44px touch floor. | LOW |
| Z-ladder | 1/20/30/40/50/60/70/**90** (90 = studio-drawer only) | 0/1/20/30/40/50/60/70 — guard-frozen, documented deliberate divergence | ≈ | Keep Micro's ladder; never import z-90 (studio chrome). | LOW |
| Signal geometry | `--signal-*` 7/3/2.5/9/4px (MicroSignal quad) | none (markers: dot 8px, partial 12px) | ➕ | Component-level adoption decision, not a token. | DEFER |

**Pressed/disabled documentation note:** `COLOR-STANDARD-V2.md` §2 still says Pressed/Disabled are "Derived and documented by ZAI", while `foundations/tokens.css` and `TOKEN-DICTIONARY` already freeze the derived values (`#8F3B27`, `#C4663F`, `#E4EAEC`, `#8A959C`, `#A6AEB4`). This is documentation lag inside V2, not a value conflict; the live tokens are the source. `VERIFIED`

The same table is provided machine-readable in `TOKEN-MAPPING.tsv` beside this report.

---
## 8. Token consumer and component inventory

### 8.1 Consumer inventory (Micro side — definition → alias chain → consumers)

Micro's color consumption funnels through `index.css`: pages/components use `micro-*` classes and `data-tone`/`data-status` attributes; only one Tailwind color utility (`bg-muted`) exists in the codebase. `primitives.css` is the only shared component CSS and consumes `--vf-*` directly. `VERIFIED`

**Material semantic tokens (direct `var(--vf-*)` consumers):**

| Token | Light def | Dark def (`theme-dark.css`) | Direct consumers (examples) | Notes |
|---|---|---|---|---|
| `--vf-clay` | vf-tokens.css:48 | preserved `#D97757` | index.css:73 (`--color-brand-primary`), theme-dark, tests (6 total) | identity anchor |
| `--vf-clay-interactive` | :49 | preserved `#C96442` | primitives.css:244,252 (ChoiceRow edge/dot), index.css:588 (`aria-pressed` underline), index.css:905 (FAB hover) — 17 total | pressed/chosen contract, frozen by U09 test |
| `--vf-info` | :50 `#2C84DB` | `#6AA6EC` | **all in primitives.css**: 70 (chip tone info), 271 (notice marker), 322 (row stripe) | the semantic-remap hot spot (pending/partial/reversed) |
| `--vf-status` | :51 `#1490FF` | `#55A4FF` | primitives.css:73 (chip tone status) — 1 consumer | "reviewed/current"; no V2 counterpart |
| `--vf-success` | :52 `#629987` | `#7CB8A1` | primitives.css:64, 316; primitives.test.tsx:368 | mark + stripe |
| `--vf-error` | :53 `#B53333` | `#E0796F` | index.css:84 (danger-text alias), primitives.css:67,275,278,319,401,408 (chip/notice/stripe/field), destructive button bindings — 13 total | |
| `--vf-ink` / `-secondary` / `-tertiary` | :36–38 | `#F2EEE6`/`#C8C1B2`/`#A59E8F` | index.css aliases :70–83; primitives.css (9 sites) — 27/16/2 | ~295 text-alias consumers total |
| Surfaces (canvas/ground/recessed/surface/tint/soft) | :25–30 | all rebound | index.css aliases + primitives (recessed notices/row lead, tint spinner/empty, surface chips/fields) — 4/4/5/6/12/4 | |
| `--vf-focus` | :44 | `#F2EEE6` | index.css:112 (`--ring`), primitives.css:395 (field focus) — 5 | global focus ring |
| `--vf-disabled-surface/-ink`, `--vf-field-border-focus`, `--vf-border`, `--vf-border-soft` | :31–45 | (dark equivalents) | **0 / 0 / 0 / 0 direct consumers — dead tokens** | disabled is opacity-based today |
| Action contracts + button bindings | :56–85 | all rebound (commit inverted to `#F2EEE6` fill — the single sanctioned inversion) | primitives.css `.micro-prim-button--*` (22 refs) + index.css aliases + theme-dark | 8 action classes |
| Type tokens | :105–133 | not rebound (theme-independent) | label ×14, body ×5, amount ×2 …; dead: title/section/kpi/kpi-hero/amount-input | rem ladder guard-frozen |
| Fonts | `--vf-font-sans/mono` :134–135 (dead) | — | actual contract = index.css:47–48 `--font-arabic`/`--font-numeric` (`--font-numeric` ≈35 slots incl. `NUMERIC_SLOT_CONTRACT` in stateAdapter.ts) | duplicate definitions — consolidation candidate |
| Radii / geometry | :88–102 | not rebound | control ×8, full ×9, card ×2, sheet ×1; dead: segment, fab-size/offset, nav-min, progress-track, compact | alias consumers: radius-control ×59, radius-card ×46 |
| Motion | :138–150 | not rebound | press ×2, fast ×3, normal ×1; all others 0 var() consumers (timings live inline; legacy `--motion-out` ×24) | mostly unconsumed |
| `--vf-scrim` | :159 | `rgba(12,11,9,0.62)` | index.css dialog overlay — exact string test-frozen | |

**Legacy alias layer (`index.css :root` lines 65–112):** `--color-text-secondary` ×198, `--color-border` ×133, `--color-text-primary` ×95, `--color-accent-text` ×72, `--color-surface` ×66, `--color-warning-text` ×65, `--color-accent-primary` ×45, `--color-bg-well` ×44, `--color-accent-soft` ×26, `--color-divider` ×16, `--color-success-text` ×16, `--color-danger-text` ×14 … plus the shadcn-style `--background/--primary/--ring/...` set (1 consumer each via `@theme inline`), `--elevation-1/2/3` ×16/2/4, `--radius-control/card/sheet` ×59/46/2, `--motion-out` ×24. **Critical shape fact:** 100% of `--color-warning-*`, ~99% of `--color-accent-*`, ~99% of `--color-text-*` and most `--color-border` consumers live *inside index.css itself* — the blast radius of value changes is contained in the alias layer + primitives.css, not scattered across components. `VERIFIED`

**`data-tone`/`data-status` bindings (SURFACE_TONE_SYNTAX):** defined in index.css `:root` (light) and theme-dark.css (dark) — accent → clay-interactive/ink/tint; warning → Micro-owned `#7A5C20`/`#F6ECCF` (dark `#D9B978`/`#33301F`); success pair `#256B4A`/`#E4F2EA`; danger-bg → ground. Consumed by `.micro-info-card[data-tone]`, `.micro-decision-panel[data-tone]`, `.micro-g5-card[data-tone]`, `.micro-schedule-section[data-tone]`, `.micro-runtime-card[data-tone=offline]` etc.; TSX emitters: InfoCard, DecisionPanel, G5DeclarationPanel, ActualTimePanel, FormDraftRestoreBanner, Statement, Orders, DirectSaleEditor, PwaRuntimeNotice, StatusChip (via adapter tone). `VERIFIED`

**Dark Mode coupling (single-owner rule):** `theme-dark.css` rebinds **all 59 color-material `--vf-*` tokens** (plus 43 alias re-declarations); geometry/type/motion are theme-independent; `--vf-border-soft` cascades via the rebound tint. Consequence: a light value change can never silently alter dark — **dark goes stale instead**. Every Wave-1 color change therefore requires: parallel `theme-dark.css` edit + `theme-contrast-guard.py` pass (82 pairs, both themes) in the same change. `VERIFIED`

**Test consumers that freeze the current state:** `vf-tokens.test.ts` (18 approved hexes byte-for-byte + scrim string + dark identity + retired-list absence + binding spot-checks); `primitives.test.tsx` + `U09.css.test.ts` (CSS strings incl. `#C96442` underline); `exact-values.characterization/cross-surface.test.ts` (money/quantity/percentage display values + schema 38/30); `stateAdapter.test.ts` (tone/word/marker mappings incl. `partial→info`, `due→neutral`); `R2.renderSmoke.test.tsx` (56 routes × both themes); `R3.themeBehavior.test.ts` (light default, dark explicit + persisted). `VERIFIED`

### 8.2 Component mapping (V2 intent → Micro implementation → verdict)

Phase 0 hard rule: studio JSX/CSS is never copied; adaptation happens through Micro's own primitives. Verdicts: `PRESERVE` (keep Micro as-is), `ADAPT` (Micro component survives, visual adaptation in an authorized wave), `REPLACE` (replace Micro implementation in a later wave), `DEFER`, `OUT_OF_SCOPE`. (For the final five-way classification of the *finding*, see Section 15 — most ADAPT/REPLACE rows are scheduled as `FIX_NOW` in a specific wave, or gated as `OWNER_DECISION_REQUIRED`.)

| V2 component (contract) | Micro counterpart | Verdict | Rationale / evidence |
|---|---|---|---|
| `Button` — 5 roles (primary=Action `#A94630`+white / accent=BrandSoft+ink / secondary / tertiary / destructive), 7 states incl. in-button success/error-recovery | `components/primitives/Button.tsx` — 8 owner-approved action classes (create/save/commit/secondary/outline/ghost/quiet/destructive), 48px, `aria-busy` loading, duplicate-submit protection | **ADAPT** | Micro's ladder is richer and semantically load-bearing (quiet = documented corrections; commit = independent confirmation). V2's in-button success/error states map to Micro's Notice/QuietCompletion feedback regime instead. Skin (solid action) depends on OD-01. Evidence: `core/Button.tsx`; `primitives/Button.tsx`; `primitives.css:122–187`. |
| `IconButton` (active = BrandSoft + Action) | `micro-icon-button` class (AppHeader transport/assistant/close) | **ADAPT** | Exists; add V2 active treatment through Micro tokens if adopted. |
| `Field/TextField/AmountField` (unit inside amount box, clear button, focus=Information, height 54) | `components/primitives/Field.tsx` + `components/forms/EnglishNumberInput/EnglishQuantityInput/LocalDateField` (exact-value guards, `aria-invalid`/`aria-describedby` wiring, 13px label floor) | **ADAPT (visual only)** | Micro's contract is behaviorally a superset. V2 adds: fixed unit slot, clear-value button, tel/ID LTR isolation, focus color (token decision). Amount-unit placement must respect Micro's unit-outside-island contract (OD-04). |
| `SegmentedControl` (radiogroup) | `components/primitives/ChoiceRow.tsx`/`ChoiceButton` (2px clay-interactive edge + weight, `aria-pressed`) | **ADAPT** | Same neutral-selection philosophy. Optional radiogroup semantics upgrade. |
| `OpenRow/RowGroup` (icon right, trailing value/state left, `unavailable` state with reason, whole-row target, 200% restructure) | `components/primitives/Row.tsx`/`RowList` (lead/title/caption/state/trailing slots, ≤3px stripe only with state slot, inset dividers) | **ADAPT** | Structural twins. V2 adds `unavailable`-with-reason state and full-row target — both addable without breaking 60+ consumers. The `[data-text-scale='200']` grid restructure is a transferable CSS technique. |
| `Sheet` (bottom, radius 24, title-right/close-left, dismissible-guard) | `components/ui/drawer.tsx` (vaul, focus-trapped) + `layout/QuickActionSheet.tsx` (351 lines, discard-confirm guard) | **PRESERVE (Micro) + ADAPT visuals** | Micro's sheet stack is stronger on data-safety (focus trap, unsaved-changes). V2 Sheet has initial-focus + Escape only. Keep Micro behavior; optionally adopt V2 visual metrics. |
| `Dialog` (decision-only, two explicit actions, destructive `#B0324F`) | confirm patterns across editors (`micro-confirm-warning`), soon-panels with focus trap + Tab cycling | **PRESERVE (Micro) + ADAPT visuals** | Micro already has explicit-action confirmations + focus management (P-4.4-1). |
| `AnchoredMenu` (period listbox) | **no direct primitive** — inline `select`s + page-embedded period presets | **ADAPT (net-new pattern)** | Implement with Micro primitives if the FIN period picker moves to header. |
| Filter panel (GLB-FILTER-PANEL) | distributed inline filters (Catalog search, Orders groups, period presets) | **DEFER** | Neither repo has a unified filter panel; V2 itself defers it. |
| `Skeleton/StructuralLoad` (content-mimicking rhythms, one calm shimmer, reduced-motion static) | **none** — Micro uses `micro-route-loading` text status + full-page gates + spinner | **ADAPT (net-new capability)** | Genuine upgrade candidate; implement inside Micro's `primitives.css`. |
| Status signal (`MicroSignal` quad mark, 4-unit CSS, `SIGNAL_STATE_TEXT`) | `components/primitives/markers.tsx` (7 marker roles) driven by `stateAdapter.ts` | **PRESERVE (Micro grammar) / quad glyph = owner decision** | Quad mark is a *candidate asset* (GAP-002) pending logo review. Micro's marker semantics already exist and are guard-tested. V2's in-component state-word generation must be stripped (word ownership). |
| Money display (`MoneyValue` — 9 value states, in-component words, spoken aria, U+2212, 3 decimals) | `components/presentation/DisplayValue.tsx` (`MoneyValue`/`MoneyWithUnit`, bdi-isolated, `data-negative`) + `formatters.ts` + honest-void contract | **ADAPT with grammar correction** | Keep Micro's thin renderer + dictionary-owned words; compose V2's rich state *presentation* at screen level from Micro's own words. Formatter divergences are OD-04. |
| `TransactionRow` (partial أصل/مدفوع/متبقي line, save-state, direction word) | Row/RowList + `MoneyWithUnit` + StatusChip across FinanceActivity/Orders/Home (effect-word contract: one effect word per row + source link) | **ADAPT** | V2's visual maps onto Micro's Row slots. Micro's effect words (`نقدي داخل/خارج`) must survive; V2's «دخل/خرج» pair must not transfer (S4 stop). |
| `SnapshotDeck` (pointer drag, accessible arrows, 1-of-4, strong=result card) | **none** — Home financial facts as RowList | **ADAPT (net-new capability)** | The OVR-NOW centerpiece; must be built with Micro primitives + Micro readers. Brand-strong variant only with the §13.11 guardrails (OD-06). |
| `TruthNote` (what it is / what it is not / period / data-state disclosure) | partial analogues: `RestatementNote.tsx`, `InfoCard.tsx`, FIN-003 collapsed "why does profit differ from cash" details | **ADAPT** | Standardizing Micro's honesty notes onto one primitive is low-risk; watch text-density caps. |
| `ResultBlock` (verdict word + semantic container + detail sheet) | `components/finance/FinancePeriodResultSection.tsx` + Statement result sections (canonical `recordedPeriodResult` math) | **ADAPT (visual only) — gated by OD-06** | Micro's math and frozen names stay; V2 contributes container visuals only. The «ربح»/«خسارة» verdict words are a contract-05 conflict — owner decision required. |
| `ImpactPreview` (before/after rows, unknown row, fixture-tagged) | `components/presentation/EventEffectPreview.tsx` (domain dry-run via `createFinancialEvent` preview-id) + QuickSaleForm/QuickExpenseForm live previews | **PRESERVE (Micro) + ADAPT layout** | Micro already computes real impact through the domain — the studio's values are fixtures (GAP-004). No UI-side equation may ever be introduced (S4-05). |
| `ContextTrace` / `ContextSeam` / `SystemRibbon` | `Notice` family (4 tones) + PwaRuntimeNotice; FinanceObligationsCard strips | **ADAPT (trace/seam) / DEFER (ribbon)** | SystemRibbon + pending-send presume sync infrastructure Micro doesn't have. |
| `RecoveryStage` (region-isolated error + retry) | retry buttons on 20 surfaces (P-4.4-4 matrix 57 routes × 5 + 13 recovery scenarios); Home refreshError-over-ready-content | **PRESERVE (Micro) + optional visual container** | Micro's error-recovery semantics already exceed V2's. |
| `EmptyState` (5 kinds) | `components/primitives/EmptyState.tsx` (symbol/state/title/description/action; no-data ≠ no-results) | **ADAPT (taxonomy only)** | V2's 5-kind taxonomy (first-move/continuation/search-reset/period-gap/clear-state) can be encoded as Micro screen-level compositions using existing props; document in the contract. V2's hardcoded hints must be replaced by Micro words. |
| `Insight` (Evidence→Action, completeness line) | Home «الأهم الآن» (`HomeInsight[]`, max 4) | **ADAPT** | Presentation upgrade on an existing Micro model. |
| Navigation (`BottomNav` 5 tabs adaptive ≥70px, quad selection; `AppHeader` no-logo + account panel + page swipe) | `components/layout/BottomNav.tsx` (5 seats, `aria-current`, min 64px) + `AppHeader.tsx` (logo+wordmark menu, accountComplete, soon-panels, focus trap) + `MicroAppShell.tsx` (keyboard chrome, route classification) | **ADAPT (visual deltas) / DEFER (page swipe)** | Same IA (same 5 tabs, order, names — `app/navigation.ts` = V2 NAVIGATION-MAP §1). Divergences: header philosophy (OD-10), nav height, page-swipe (net-new; defer). QuickActionSheet stays Home-owned (NAV-001) — V2's central-FAB assumption must not re-centralize it. |
| Icons (Phosphor inline registry) | `lucide-react` ^0.453 (tree-shaken) | **PRESERVE (Micro) + name mapping** | Never import `phosphor.generated.ts` (duplicate system, `dangerouslySetInnerHTML`). Map names at adaptation time. |
| StatusChip / badges | `components/primitives/StatusChip.tsx` (word-as-children, adapter presentation, 13px floor, 3:1 surface marks) | **PRESERVE (Micro)** | Micro's chip contract covers V2's badge/selection uses. |
| Studio chrome (`StudioShell`, `ReviewControls`, `StudioComponents`, `DeferredScreen`, fixtures, simulated status bar) | none | **OUT_OF_SCOPE** | Contractually non-transferable (V2 §21.2; TRANSFER-READINESS step 5). |

---
## 9. Screen and route mapping — including the 46-entry coverage interpretation

**Ledger interpretation (canonical):** `SCREEN-COVERAGE-V2.csv` contains **46 entries, not 46 completed screens**. At `026541d`: 9 entries are `Visual Approved`, 1 is `Visual Pattern Approved`, and 36 are `NotStarted` (2 of those `ConditionalVerify`). The three principal product screens carry 21 designed states (OVR-NOW ×6, OPS-SALE-CREATE ×9, FIN-OVERVIEW ×6). Every row's `Product_Existence` value is `Validate` (or `ConditionalVerify`) — i.e., the ledger itself demands exactly the Micro-reality check below. `VERIFIED`

**Micro route inventory:** `app/MicroRouter.tsx` registers 65 `path=` entries (66 mounted routes incl. NotFound; 2 redirects), ~61 page components; `R2.renderSmoke.test.tsx` exercises 56 routes in both themes. Route-count terminology from `MIGRATION_STATUS.md` remains: 52 = historical migration/action inventory; 55/56 = render-smoke route registrations; 35 = route families with Sept-15 visual captures — the counts are not interchangeable. `VERIFIED`

**Full 46-entry mapping** (Micro route/file → status vs the V2 ledger):

| # | Ledger ID | Micro route / file | Status | Notes |
|---|---|---|---|---|
| 1 | GLB-SHELL | `MicroAppShell.tsx` + `AppHeader.tsx` + `BottomNav.tsx` | **IMPLEMENTED** | Same 5 tabs/order/names. V2 deltas: page-swipe (defer), quad-mark selection, adaptive ≥70px nav, no-logo header (OD-10). Micro keeps logo header, context label, keyboard-chrome hiding, route-depth chrome rules. |
| 2 | GLB-ACCOUNT-PANEL | `AppHeader.tsx` logo menu (groups: الحساب/بيانات المشروع/الإعدادات; `accountComplete` state) | **PARTIAL** | Menu ≈ panel equivalent; no in-panel logout dialog (no session); no completion action row (lives in Foundation/Profile). |
| 3 | GLB-ACCOUNT | `/profile` → `Profile.tsx` | **IMPLEMENTED** | V2 NotStarted; Micro ahead. |
| 4 | GLB-PROJECT | `/foundation` → `Foundation.tsx` | **IMPLEMENTED** | V2 NotStarted; Micro ahead. |
| 5 | GLB-SETTINGS | `/settings` → `Settings.tsx` | **IMPLEMENTED** | V2 NotStarted; Micro ahead. |
| 6 | GLB-LOGOUT | — | **NOT_APPLICABLE** | Local-first, single owner, no account session to log out from. Revisit if cloud auth ever arrives (deferred with auth). |
| 7 | GLB-ASK | AppHeader assistant button → soon-panel «اسأل Micro — قريبًا» | **IMPLEMENTED (entry)** | Matches V2's honest-deferred intent; underlying screen deferred in both (V2 GAP-006). |
| 8 | GLB-DELIVERY | AppHeader transport button → soon-panel «النقل والتوصيل — قريبًا» | **IMPLEMENTED (entry)** | Same honest-deferred pattern. |
| 9 | OVR-NOW | `/` → `Home.tsx` (الأهم الآن → أرقام اليوم/الشهر → سجّل بسرعة → ملحوظات → المالية → اليوم → آخر ما حدث) | **IMPLEMENTED** (composition differs from approved V2 design) | Principal Wave-2 adaptation target: V2 reorders to result-first SnapshotDeck + cash secondary card. Micro's quick-record buttons (NAV-001) have no V2 equivalent and must survive adaptation. |
| 10 | OVR-SNAPSHOT | — (Home shows facts as rows) | **NOT_STARTED in Micro** | Net-new SnapshotDeck capability; OVR-NOW prerequisite. |
| 11 | OVR-SNAPSHOT-ALL | nearest: `/finance` + `/finance/more` | **NOT_STARTED in Micro** | V2 itself defers product-screen decisions to owner (ISS-005 → OD-12). |
| 12 | OVR-INSIGHTS | Home «الأهم الآن» | **IMPLEMENTED** | V2 single-actionable-insight w/ evidence + completeness = presentation upgrade. |
| 13 | OVR-INSIGHT-DETAIL | — | **NOT_STARTED (both)** | Micro insights link directly to targets. |
| 14 | OPS-HOME | `/orders` → `Orders.tsx` (العمل tab) | **IMPLEMENTED** | V2 OPS-HOME is a deferred doc card; Micro's real work center supersedes; V2 design for it: none. |
| 15 | OPS-ENTRY | `QuickActionSheet.tsx` (5 actions) + `/orders/new` | **PARTIAL** | Entry points distributed by owner decision (NAV-001); no single entry screen — intentional. |
| 16 | OPS-SALE-CREATE | `/direct-sales/new`, `/direct-sales/:id` → `DirectSaleEditor.tsx`; quick path `QuickSaleForm.tsx` (cash/credit, wallet, date, cost-known) | **IMPLEMENTED** | V2's 9-state design targets the *quick* sale shape. Micro's deep editor has stronger semantics (X-06 price-reduction documentation). Wave-3 candidate: re-skin QuickSaleForm (+ optionally DirectSaleEditor). |
| 17 | OPS-EXPENSE-CREATE | `QuickExpenseForm.tsx` + `/finance/new/:type` → `FinancialEventEditor.tsx` + `/orders/draft/:id/cost` → `CostEditor.tsx` | **IMPLEMENTED** | V2 defers; Micro has three real entry surfaces. |
| 18 | OPS-COLLECTION | `/collect` → `Collect.tsx` (source-aware, remaining cap, explicit wallet, no revenue) | **IMPLEMENTED** | V2 NotStarted — defers a screen Micro already runs well. |
| 19 | OPS-SUPPLIER-PAY | `/suppliers/purchase/:id/payment` → `SupplierPurchaseEditor.tsx` | **IMPLEMENTED** | V2 NotStarted. |
| 20 | OPS-PURCHASE | `/suppliers/purchase/:id` → `SupplierPurchaseEditor.tsx` | **IMPLEMENTED** | V2 NotStarted. |
| 21 | OPS-OWNER-MONEY | `/finance/withdraw` → `OwnerWithdrawalEditor.tsx`; `/finance/owner-entitlement` → `OwnerEntitlement.tsx` | **IMPLEMENTED** | V2 NotStarted. |
| 22 | OPS-ORDERS-LIST | `/orders` → `Orders.tsx` | **IMPLEMENTED** | Stays on current design until a later authorized wave. |
| 23 | OPS-ORDER-DETAIL | `/orders/:id` → `OrderDetail.tsx` | **IMPLEMENTED** | V2 defers. |
| 24 | OPS-ORDER-EDIT | `/orders/new`, `/orders/draft/:id`, `.../agreement`, `.../cost` → staged editors | **IMPLEMENTED** | Micro's staged editors are stronger than V2's single-screen assumption. |
| 25 | CAT-ITEMS-LIST | `/catalog` → `Catalog.tsx` | **IMPLEMENTED** | V2 explicitly "not tab six; deferred". |
| 26 | CAT-ITEM-DETAIL | in-page disclosures inside Catalog | **PARTIAL** | Detail is a disclosure, not a route. |
| 27 | CAT-ITEM-EDIT | inline defaults editor in `CatalogItemsSection.tsx` + deep-links | **PARTIAL** | Editing exists inline; no dedicated route. |
| 28 | REL-CUSTOMERS | `/parties` → `Parties.tsx` (دفتر الناس, name-level aggregation) | **IMPLEMENTED** | Micro unifies customers+suppliers in one ledger; V2 splits them. |
| 29 | REL-CUSTOMER-DETAIL | no route; rows → `/collect?source=…` etc. | **PARTIAL** | Drill-down via actions/links, not a detail screen. |
| 30 | REL-SUPPLIERS | `/suppliers` → `Suppliers.tsx` | **IMPLEMENTED** | V2 defers. |
| 31 | REL-SUPPLIER-DETAIL | purchase records; no supplier-profile route | **PARTIAL** | Same pattern as customers. |
| 32 | FIN-OVERVIEW | `/finance` → `Finance.tsx` (G5, obligations, budgets, period result, safe-withdrawal, short-cash horizon, profit-to-cash bridge) | **IMPLEMENTED** | V2's 6-state design is the approved visual target; Micro's data layers are far richer than V2 fixtures — adaptation is presentation-only. Finance is named in the AGENTS §11 no-split list → structural recomposition needs the Group-11 gate (OD-09). |
| 33 | FIN-WALLETS | `/cash` → `CashWallets.tsx` | **IMPLEMENTED** | V2 shows wallet rows inside FIN-OVERVIEW; Micro has the dedicated screen V2 defers. |
| 34 | FIN-WALLET-DETAIL | `/cash/wallet/:id` → `WalletLedger.tsx` (+ opening-later/adjust/reverse) | **IMPLEMENTED** | V2 defers. |
| 35 | FIN-ALLOCATION | `/cash/distribute` → `CashDistribution.tsx` | **IMPLEMENTED** | V2 defers. |
| 36 | FIN-TRANSFER | `/cash/transfer` → `CashTransferEditor.tsx` | **IMPLEMENTED** | V2 defers. |
| 37 | FIN-DEBTS | `/loans` → `Loans.tsx` (issued + received) + `/finance/upcoming` + FinanceObligationsCard | **IMPLEMENTED** | Spread across three surfaces; V2 exercised debt *values* as fixtures only. |
| 38 | FIN-ACTIVITY | `/finance/activity` → `FinanceActivity.tsx` (every record type, one effect word per row, source links) | **IMPLEMENTED** | V2's TransactionRow is studio-only; Micro's real list exists. |
| 39 | FIN-TRANSACTION-DETAIL | no dedicated route; rows link to source records | **PARTIAL** | Micro's source-linking pattern replaces the generic tx-detail concept; owner may keep it. |
| 40 | FIN-CHARTS | — | **NOT_STARTED (both, conditional)** | No chart exists in either repo; V2 marks ConditionalVerify; U-16 floors recorded for the first chart. |
| 41 | TOOL-HOME | `/tools` → `Tools.tsx` | **IMPLEMENTED** | V2 TOOL-HOME is a deferred doc card. |
| 42 | TOOL-CALCULATOR | `/tools/calculator` → `CostCalculator.tsx` (+ `/tools/estimate/:id`) | **IMPLEMENTED** | V2 defers. |
| 43 | MKT-HOME | `/market` → `Market.tsx` (honest «قريبًا», no financial effect) | **IMPLEMENTED** | Exactly matches V2's "tab visible/enabled, screen deferred, no invented offerings" (GAP-005). |
| 44 | MKT-OFFER-DETAIL | — | **NOT_STARTED (both)** | Only design an offering proven to exist. |
| 45 | GLB-FILTER-PANEL | distributed inline filters + FIN-003 period presets/comparison | **PARTIAL** | No unified panel in either repo; Micro's period comparison already exceeds V2's period menu functionally. |
| 46 | GLB-ERROR-RECOVERY | retry on 20 surfaces (matrix 57 routes × 5 + 13 recovery scenarios), Home refreshError pattern, FeedbackNote channels, UnsavedChangesGuard | **IMPLEMENTED** | Both sides have approved patterns; visual languages differ. |

**Totals: 32 IMPLEMENTED · 8 PARTIAL · 5 NOT_STARTED · 1 NOT_APPLICABLE = 46.** (Counting PARTIAL entries with live routes generously, up to 40/46 have some live Micro surface.) `VERIFIED`

**Interpretation for waves:** the ledger is a *validation ledger*, not a build list. The integration does **not** add 46 screens; it re-skins, over time and per authorized wave, the Micro screens that already exist, starting with the three designed references (OVR-NOW → Home; OPS-SALE-CREATE → QuickSaleForm/DirectSaleEditor; FIN-OVERVIEW → Finance). The ~24 Micro screens V2 has not designed stay on the current Micro Standard design until their own future waves — an explicit V2 OPEN-ISSUES row states the remaining Micro screens are not fully designed and must never be built by copying one screen's composition. `VERIFIED`

---
## 10. Dark Mode impact and preservation boundary

**Current state (preserved exactly):** Micro's Dark Mode is a permanent, user-selected, persisted production theme (ADR-009; `defaultTheme="light"`; toggle via preference service; `color-scheme` on `:root`/`.dark`; dark PWA meta `#211D18`). `styles/theme-dark.css` is the **single owner** of dark hex values and rebinds **all 59 color-material `--vf-*` contracts** for `:root.dark` (surfaces, inks, semantics, action contracts — with the one sanctioned inversion: dark commit fill = warm paper ink `#F2EEE6` + dark text; identity `#D97757`/`#C96442` preserved exactly), plus 43 alias re-declarations. Geometry, type scale, motion are theme-independent. WCAG floors are mechanically verified in **both** themes by `scripts/theme-contrast-guard.py` (41 pairs × 2 = 82 checks, wired into `pnpm design-guards`). `VERIFIED`

**V2 scope:** Light Mode only — `foundations/tokens.css` line 5: "Light Mode فقط — لا Dark Tokens". No dark values exist in the V2 system. `VERIFIED`

**Impact analysis:**

1. **No silent leakage is possible** for color tokens: dark values are independent literals, so changing a light value in `vf-tokens.css` cannot alter dark. `VERIFIED`
2. **The real risk is staleness**: every light value changed under V2 leaves dark showing the old palette until `theme-dark.css` is edited in the same change. Mitigation (mandatory per wave): parallel dark binding + contrast-guard pass + dark regression captures. `VERIFIED`
3. **New V2-derived tokens** added to light but not to dark will auto-resolve through dark primitives — usually desirable, occasionally unintended; each new token needs an explicit dark decision (rebind, cascade, or documented exemption). `VERIFIED`
4. **Shared files that could affect Dark Mode** if edited carelessly during V2 waves: `styles/vf-tokens.css` (light contracts), `styles/theme-dark.css` (dark owner — must never be deleted or bypassed), `styles/index.css` (`:root` alias layer + `.dark` structural rules at lines 453–459 + data-tone dark pairs), `styles/primitives.css` (chip/notice/stripe tone rules consumed in both themes), `contexts/ThemeContext.tsx` (meta theme-color rewrite), `R3.themeBehavior.test.ts` + `R2.renderSmoke.test.tsx` (both-themes gates). `VERIFIED`
5. **Boundary for this program:** V2 tokens are **not** applied to Dark Mode in any current wave. Any dark redesign is a separate owner decision and a separate wave (Phase 0 decision 3; EXTENSION_PLAYBOOK §G). Until then, dark keeps the current warm palette — including during Light-side V2 changes — and every wave must regression-check it. `VERIFIED`

---

## 11. Financial/domain/storage/export safety analysis

### 11.1 How presentation consumes domain truth (the chain that must not change)

```
pages/*.tsx → usePrototypeServices() (app/PrototypeServicesContext.tsx:363; singleton store + lazy services)
  → application services (stateless; finance/, transfers/, collections/, fulfillment/, cash/, activity/ …)
    → src/domain/* (pure; ESLint-enforced: no non-relative imports, no browser globals, no Math.round/floor)
      → storage/local/* (IndexedDbLocalStore/MemoryLocalStore; export/import only via localTransferService)
```
Money formatting and status words live in exactly two presentation modules — `presentation/formatters.ts` and `presentation/stateAdapter.ts` + the label dictionaries — all test-frozen. `formatters.ts` is also consumed by application services that generate share text and statement markdown (shareMessageService, statementMarkdownService, correctionHistoryService, integrityCheckService, homeControlCenterService) — **any money-format change propagates into exported text, not just screen pixels**. `VERIFIED`

### 11.2 Where a visual change could falsely imply profit, loss, cash, collection, success, failure, zero, or completeness

| Surface | Current Micro truth (frozen) | V2 proposal | Verdict |
|---|---|---|---|
| Period result card | «نتيجة الفترة المسجلة» (contract 05 §3.2.1: never «صافي ربح نهائي», never «قيمة المشروع»; `recorded_only` does not certify completeness; invalid → «غير متاح», never 0.00) | §13.11 verdict word «ربح» on success surface + hero title «نتيجة هذا الشهر»; `ResultBlock` complete=success container + verdict; `SnapshotDeck` strong brand card when result+complete | **STOP → OD-06.** The verdict word re-labels a recorded-only operating result as certified profit. Adaptation may adopt the *container visuals* only with Micro's frozen names/status words. |
| Negative amounts / period loss | `data-negative` → amber `--color-warning-text`; a loss is never red today | negative = danger container `#B0324F`/`#FFE7EB` + «خسارة» + explanation | **OD-05** (loss severity re-association). |
| Due vs overdue | `due` = neutral clock; only `overdue` escalates to error (stateAdapter.test.ts:99–102) | §13.6 «المستحق Warning (amber)» for due-today | **STOP → OD-07** (frozen semantics; only overdue may escalate). |
| Pending / partial / reversed | all rendered blue info tone (`--vf-info`; tests freeze `pending→info`, `partial→info`) | partial/unknown = neutral gray `#5B6770`; attention = amber; info = blue-gray | **OD-02** (semantic tone remap with per-consumer re-classification). |
| Cash vs profit | cash numbers ink-only + explicit «الكاش ليس ربحًا» copy; success tone only on settled/saved marks | cash = Information blue-gray container (explicitly "never a shorthand for profit or collection") | **SAFE in meaning** — both systems separate cash from profit; danger is only if V2's *success container* were applied to any positive figure (banned by both standards). |
| Zero | measured zero = `0.00` neutral + honest-void labels; unknown never 0.00 | true-zero = `0.00 د.أ` + «صفر حقيقي» tag + complete signal | Compatible truth; V2 adds a tag (allowed, word must come from Micro dictionaries). |
| Direction words | «نقدي داخل» / «نقدي خارج» / effect words per row (collection ≠ income) | TransactionRow «دخل» / «خرج» | **STOP** — «دخل» reads as *income* next to collections; the pair must not transfer (Micro words preserved). |
| «بحاجة للمراجعة» | V2 uses it as label for *unknown debt magnitude*; in Micro «يحتاج مراجعة» is a **heavy lock state** (needs_review blocks all state/snapshot/financial ops except `reverseDelivery`) | — | Word must not be reused for mere unknowns (OD-08 vocabulary reconciliation). |
| «غير معروف» | displayed widely in Micro knowledge options | §13.20 *bans* it as a general financial descriptor («فضفاض») | OD-08. |
| Impact preview | `EventEffectPreview` = domain dry-run (`createFinancialEvent` preview-id); QuickSaleForm live text («سيدخل الكاش X د.أ… لا إيراد ولا ربح يُعرض قبل التسليم») | studio `OpsSaleCreate` impact = hardcoded fixtures (`fixtures/ops-sale-create.json`, `$fixture: true`, GAP-004 disclaimer) | **PRESERVE Micro's real computation; never add a UI-side equation (S4-05).** V2 layout adapts on top with Micro-fed values. |
| Save/sync states | Micro is `local_only` (contract 04; no SyncQueue); local-truth sentence «بياناتك محفوظة على هذا الجهاز… لم يُرسل لأي مكان» | SaveState axis: local-saved «محفوظ على هذا الهاتف», **pending-send «بانتظار الإرسال»**, offline ribbon | **DEFER** pending-send/offline (implies a send target that does not exist — would falsify the local-only promise). local-saved *styling* may align with Micro's existing sentence. |
| Money format | en-US digits, exactly 2 decimals (sub-qirsh rejected at input), ASCII `-`, unit outside the LTR island, `—` for null; IBM Plex Mono numeric slot (frozen) | U+2212 minus, up to 3 decimals, unit inside the money figure, Alexandria tabular-nums, spoken «دينار أردني» aria | **OD-04** (formatter contract change; propagates into share/markdown exports; 3-decimal money contradicts input policy). |
| Schema/export/permissions | `localSchemaVersion=38`, `localExportVersion=30` (types.ts:55,71 — group6Docs + cross-surface tests); 37 entity stores under touchpoints guard; no auth/roles (G004 capability toggles hide create entries only; PIN lock) | V2 account panel ships password row + logout dialog | **PRESERVE guards; DEFER auth semantics** (AGENTS §7.6 forbids auth before the phase gate). A visual-only wave mechanically cannot touch schema/export (ESLint boundaries + touchpoints guard + version/budget tests). |

### 11.3 Stop-condition register (consolidated)

`S4-01` verdict words «ربح/خسارة» on the result card → OD-06 · `S4-02` due-today amber → OD-07 · `S4-03` pending-send/offline as live states → DEFER · `S4-04` password/logout semantics → DEFER (auth gate) · `S4-05` UI-side financial equations → PRESERVE prohibition · `S4-06` formatter changes without contract decision → OD-04 · `S4-07` chart introduction → DEFER (conditional) · `S4-08` state-word replacement or «دخل/خرج»/«بانتظار تحديد المحفظة»/review-word reuse → OD-08/OD-06 · `S4-09` schema/export/persistence/permission changes inside a visual wave → PRESERVE guards (mechanically blocked) · `S4-10` studio artifacts (fixtures, StudioBar, ReviewControls, studio.css, simulated status bar) entering production → OUT_OF_SCOPE. `VERIFIED`

**Conclusion:** a visual-only migration **can** preserve all words, states, formulas, data, and storage behavior — the entire financial display language is concentrated in two presentation modules plus dictionaries, all frozen by tests, and the domain/storage layers are mechanically unreachable from UI waves. The conditions are: the decision register (Section 17) is resolved first; stop conditions S4-01..S4-10 are enforced in every wave; and Micro's formatters/adapter/dictionaries remain the single sources. `VERIFIED`

---

## 12. RTL, accessibility, device, performance, and security analysis

### 12.1 RTL — compatible, no conflicts
Both systems are native RTL: `<html lang="ar" dir="rtl">` + logical properties (Micro 116 declarations in index.css; V2 25, zero physical left/right in core CSS), LTR-isolated numbers (`bdi dir="ltr"` / `.ltr`), unit kept with the amount, forward-chevron = `caret-left`, non-directional icons never mirrored. Micro adds a structural RTL scanner guard (0 defects, 12 surfaces) and `dir=auto` for free-text names. One divergence is brand-level, not RTL: V2 "no logo in top area" vs Micro's logo header (OD-10). `VERIFIED`

### 12.2 Responsive widths & text scaling
- Micro: `min-width: 320px` + breakpoints at 340/370/380/420/430/480/520px + landscape guard; 376 rem font-sizes, 0 px font-sizes (guard-tested); touch targets stay px (never shrink with text). Proven 152/152 no-horizontal-scroll at 19 routes × 4 widths × 2 themes (2026-09-18) — **stale vs the current 66 mounted routes** (later waves added ~15 surfaces). `VERIFIED`
- V2: **no width media queries at all** — fluid `minmax(0,1fr)` grids + `overflow-wrap` + `[data-text-scale='200']` restructure rules; automated zero-overflow claim at 320–412 across states; the 200% row fixes (OpenRow/TransactionRow) are **UNVERIFIED in browser** (QA-SUMMARY; old evidence images removed). `VERIFIED` (as claims; the checks themselves were not re-run)
- **Transfer requirement:** every adapted surface needs re-verification at 320/360/390/412 × 150/200% × light/dark, with real long Arabic product names on Micro's real forms — V2's fixes were never re-shot, and Micro's dark theme has no V2-side testing counterpart. `VERIFIED` (as a gap)

### 12.3 Touch targets, focus, keyboard, reduced motion
- Micro: 44px touch floor / 48px controls (U09-tested); `:focus-visible` ink outline; keyboard-open chrome hiding (`visualViewport`); arrow-key menu navigation + focus restore; focus-trapped soon-panels; no-Enter-in-textarea rule. `VERIFIED`
- V2: 44px floor claimed, **but `qty-btn` is 40×40 in screens.css — below both V2's own floor and Micro's contract; must be raised in any transfer (F-10)**. Focus = Information `#305968` 2px ring (color decision OD-01 package); Sheet lacks a full focus trap (Micro's vaul trap must win). Reduced-motion: both implement `prefers-reduced-motion` (Micro 5 blocks + splash fallback; V2 media query + `[data-motion=reduced]` switch + "one active motion rule"). `VERIFIED`

### 12.4 Accessibility evidence state
Static verification: strong on both sides (ARIA roles, aria-current, aria-busy, spoken money labels in V2, WCAG 2.2 AA claims with 82/82 Micro pairs and 25/25 computed V2 pairs — **against different palettes; all pairs must be recomputed on the final reconciled palette, both themes**). Focused browser check needed: keyboard operability of transferred patterns, 150/200% zoom, contrast on final values. Real device needed (DEVICE-001, both repos honest `NOT_RUN`/`UNVERIFIED`): TalkBack/VoiceOver, safe areas, daylight, one-handed use, mid-range performance. Owner/UAT needed: Jordanian small-business user validation of the final visual language and of state-word comprehension. `VERIFIED` (as classified gaps)

### 12.5 Performance & maintainability
- **Bundle budget (hard gate):** 650,000 raw / 155,000 gzip (`check-bundle-budget.mjs`, immutable caps, also enforced inside `vite build`). Last recorded CI-parity: **648,772 raw (headroom 1,228) / 153,862 gzip** (FIN-001 Wave 6 report, 2026-09-23; local build 648,660). Current values `NOT_EXECUTED` (no build in this phase). **Any eager JS addition breaks the gate** — Wave 2/3 additions (SnapshotDeck ≈170 LOC TSX + ~150 CSS; TruthNote; AnchoredMenu; StructuralLoad; Insight card — together roughly 650–750 LOC TSX + 600–700 LOC CSS ≈ 25–45KB raw / 8–14KB gzip if eager) must use the EXE-014/D-034 dynamic-load precedent or be accompanied by an owner cap raise (OD-11). CSS additions grow the PWA precache but not the JS gate. `VERIFIED` (figures = last recorded; estimates = `INFERRED` from LOC ratios)
- **Fonts:** V2 as-delivered = Alexandria-VF.ttf 332,488 B + NotoSansArabic-VF.ttf 844,676 B = 1,177,164 B unsubsetted TTF vs Micro's 10 subsetted woff2 ≈ 312KB (PWA-precached, `font-display: swap`, no network at launch). As-delivered adoption ≈ +850KB precache; subsetting to woff2 (Micro's existing pipeline pattern) and dropping the Noto fallback would close most of the gap. Mono removal breaks the frozen numeric-slot contract (OD-03). `VERIFIED`
- **Icons:** keep `lucide-react`; never import V2's inline Phosphor registry (duplicate system + `dangerouslySetInnerHTML`). `VERIFIED`
- **Animations:** V2 motion map is transform/opacity only; reduced-motion collapses to fades — low runtime risk. Page-swipe + deck-drag both use pointer capture; V2 documented the arbitration (deck stops propagation, `data-swipe-lock`) — complexity, not perf. `VERIFIED`
- **CSS architecture:** Micro's single `index.css` (6,983 lines) + `primitives.css` vs V2's per-family files (~3,264 LOC across core/financial/contextual/screens/navigation/studio). V2 CSS must be re-homed into Micro's convention — never imported wholesale (Phase 0 prohibition + guard zones). `VERIFIED`
- **Guard friction:** V2 geometry (radii 14/22/24; spacing 6/10/14/18/28; type 34px; px-based sizes) fails Micro's frozen scales as-is (OD-08); text-density caps (49 named, per-surface, owner-gated raises) will be pressed by V2's honesty layers (TruthNote ≈ +30–40 Arabic words per financial card; precedent: Statement 209→216 raise in WS-173). `VERIFIED`

### 12.6 Security
Both repositories scanned read-only: **no secrets found** (no `github_pat_`/`ghp_`/`AKIA`/`xox`/`sk-`/private keys; no `.env`/`.pem`/`.key`/`id_rsa` committed). Micro's `check-secrets.mjs` gate is CI-wired and never prints values. One env-injected Bearer header in `apps/prototype-web/vite.config.ts:195` (dev-server storage proxy; value from `process.env` — not a leak). Fixtures on both sides are synthetic (Jordanian display samples; `$fixture: true` tags; no PII). Minor hygiene notes: `check-secrets.mjs` excludes any directory named `fixtures` (broader than its documented exception); the V2 repo root has no `.gitignore` and no SECURITY.md (studio-level `.gitignore` is good). CI least-privilege (`permissions: contents: read`) on both workflows. `VERIFIED`

---
## 13. Contradiction and legacy-document register

Every entry below could mislead a future agent if read without cross-checking. Code and tests are the authority; each row lists the correct value.

| # | Contradiction / legacy item | Correct value (authoritative) | Evidence | Risk if trusted |
|---|---|---|---|---|
| C-01 | `AGENTS.md` §10 says schema/export "36/28 اليوم" | **38 / 30** | `storage/local/types.ts:55,71`; `group6Docs.test.ts:99–101`; `exact-values.cross-surface.test.ts:233–235` | An agent would treat 38/30 as a silent raise or a violation; two owner-approved raises (37/29, 38/30) happened after the doc was written |
| C-02 | `AGENTS.md` §11 rule 3 says "(35/27…)" — contradicting §10 itself | 38/30 (see C-01) | same | Double contradiction inside the entry-point doc |
| C-03 | `docs/operations/control/context.md` says main = `81fa524…` and Schema/Export = 35/27 | main = `4e1bab9…` (this baseline); 38/30 | `context.md:10,13`; live git | The "permanent context" for new agents is ≥2 main commits and 3 schema raises behind |
| C-04 | `current-state.md` header "آخر تحديث: 18/19 سبتمبر… الموجة 4.4" while §70 (2026-09-23 Phase 0) exists in the same file | §70 and §59–§69 are newer; header is stale | `current-state.md:4` vs `:1448–1465` | Freshness marker wrong; an agent might discount the Phase 0 record |
| C-05 | `styles/vf-tokens.css` header (lines 16–17) says the `.dark` layer "remains Micro-local legacy until its own owner gate" | Dark Mode is **active and permanent** (ADR-009; `theme-dark.css`) | ADR-009; SURFACE_TONE_SYNTAX §4 | The exact file a Wave-1 agent edits carries wrong boundary info — could invite deleting/bypassing dark |
| C-06 | `docs/00-document-index.md` (mandated first read) lists **no** `docs/architecture/` file | SOURCE_OF_TRUTH, CHANGE_PROTOCOL, COMPONENT_CONTRACTS, EXTENSION_PLAYBOOK, MIGRATION_STATUS, SURFACE_TONE_SYNTAX, UI_AUX_ARCHITECTURE, ADR-001..009 are all live authorities | full read of the index (131 lines); architecture docs referenced from AGENTS §2 | Index-following agents never find the token-authority ladder or change protocol that govern the migration |
| C-07 | `#CC785C` described everywhere as retired/historical | True for runtime CSS/TS (guard-banned, zero occurrences) — **but it is live in 13 `public/brand/**` SVG assets** (favicon, BrandMark, PWA icons, splash, launch-motion) | `scripts/design-token-guards.py:41–48` (scans `client/src` only); `public/brand/**` greps | "Retired palette is gone from the runtime path" claims are contradicted by visible surfaces (browser tab, installed PWA, splash) in both themes |
| C-08 | Same for `#079FA0` (retired v0 teal) | Same: banned in code, absent from V2, live in the same 13 SVGs (turquoise layer) | same | same |
| C-09 | `R2.renderSmoke.test.tsx` comment says "(55)"; `MIGRATION_STATUS.md` says 55 route registrations | The ROUTES array has **56** entries; `MicroRouter.tsx` has 65 `path=` occurrences (66 mounted) | array count; router count | Minor count drift; route additions must update list + counts |
| C-10 | `exact-values.cross-surface.test.ts` docstring says "(35/27)" | Its own assertions pin 38/30 | file lines 7 vs 233–235 | Cosmetic docstring lag |
| C-11 | `COLOR-STANDARD-V2.md` §2: Pressed/Disabled "Derived and documented by ZAI" (i.e., pending) | V2 `tokens.css` + TOKEN-DICTIONARY already freeze the derived values (`#8F3B27`, `#C4663F`, `#E4EAEC`, `#8A959C`, `#A6AEB4`) | `foundations/tokens.css:7–12` | Documentation lag inside V2; live tokens are the source (no value conflict) |
| C-12 | V2 "47/47 automated browser checks" claim (original ZAI report) | The Playwright script and raw results were never delivered in the repo; that round predates the 200% row fixes; not an independent re-verification | `TRANSFER-READINESS-V2.md` ("ما فُحص وما بقي"); QA-SUMMARY | Waves must not cite 47/47 as evidence |
| C-13 | Bundle figures drift across docs: 599,270 (W4.4) → 645,136 (FIN W1) → 648,660/648,772 (FIN W6) | The **last recorded** CI-parity figure is 648,772 raw / 153,862 gzip (headroom 1,228 / 1,138) — current values `NOT_EXECUTED` | the three dated reports | Plans based on 4.9KB headroom would breach the gate |
| C-14 | `check-secrets.mjs` documented exception `scripts/fixtures/secrets` vs actual behavior (excludes ANY dir named `fixtures`; the documented dir doesn't exist) | Behavior is broader than documented | `check-secrets.mjs:46` | Low security-relevant scanning-scope discrepancy |
| C-15 | `DARK_MODE_BOUNDARY.md` + ADR-007 describe dark as a future/gated boundary | Historical records only; ADR-009 supersedes | ADR-009 status line | Reading order matters; both docs self-declare as superseded/historical |

---

## 14. Risk register

Severity reflects combined likelihood × impact on users, data, financial meaning, and security. All rows are `VERIFIED` evidence-backed unless noted.

| ID | Sev | Risk | Evidence / affected paths | Impact | Dependencies | Minimum safe remediation | Acceptance criteria | Rollback boundary |
|---|---|---|---|---|---|---|---|---|
| R-01 | **HIGH** | Silent financial-meaning change via V2 state/verdict visuals («ربح» card, loss-as-danger, due-amber, partial-gray, «دخل/خرج», review-word reuse) | V2 `ResultBlock.tsx:34–35`, `financial.css:427`, §13.6/§13.11/§13.20; Micro `contracts/05 §3.2.1`, `stateAdapter.test.ts:99–102`, `activityLabels.ts` | Users could read recorded-only result as certified profit, attention states as failures, collections as income | OD-02/05/06/07/08 resolutions before Wave 1/2 | Enforce stop-conditions S4-01..S4-10 in every wave; adopt container visuals only with Micro's frozen words | All frozen-word/tone tests stay green unchanged; no contract-05 wording change; per-wave screen diff review of every state word | Pre-wave SHA; revert the wave commit (single revertible commit per wave, per CHANGE_PROTOCOL §5) |
| R-02 | **HIGH** | Token swap bypassing the authorization artifacts (silent guard/test weakening) | `vf-tokens.test.ts` (APPROVED_18 freeze), `design-token-guards.py`, `theme-contrast-guard.py` | Silent palette drift; unverified contrast; loss of audit trail | Wave-1 authorization | Value changes only through the sanctioned path: same-PR test re-baseline + guard scale updates + owner decision record | The test diff IS the change record; guards green; old→new values with dates in the PR | Revert commit; tests restored = old palette restored |
| R-03 | **HIGH** | Dark Mode staleness/regression during Light-scope V2 waves | `theme-dark.css` (59 rebinds), 82-pair contrast guard | Dark users see mixed old/new palette or failing contrast | None (protocol) | Parallel dark binding per changed token + contrast-guard pass + dark captures per wave | Contrast guard 82/82 both themes; R2.renderSmoke dark green; dark visual captures attached | Remove the wave commit; dark layer independently revertible (ADR-009: additive) |
| R-04 | **HIGH** | Bundle-budget breach (1,228 B raw headroom) blocking CI | `check-bundle-budget.mjs` (650,000/155,000); FIN W6 report | Wave PRs fail the gate; pressure to raise caps silently | OD-11 strategy | Dynamic-load precedent (EXE-014/D-034) for new components; CSS additions reviewed for precache size; cap raise only by owner in double diff | CI-parity bundle ≤ caps; no cap raise without owner record | Revert; dynamic imports removable |
| R-05 | **HIGH** | Font strategy breakage (payload ~3.8×, mono-contract break, RTL metric drift, precache bloat) | V2 `assets/fonts/` (1,177,164 B TTF); Micro `public/fonts/` (312KB woff2); `NUMERIC_SLOT_CONTRACT`; rem-ladder guard | Slower first paint, +~850KB precache, changed line-height rhythm across 66 routes, broken numeric-slot test | OD-03 decision | Decide family + mono contract first; subset to woff2 in Micro's pipeline; re-verify 320px/200% rhythm and a11y font tests | Budget respected; font tests re-baselined deliberately; visual captures at 320/200% pass | Font commit revertible independently of token changes |
| R-06 | **HIGH** | Retired v0 palette live in 13 brand SVG assets (unguarded zone) | `public/brand/{favicon,mark,pwa,splash,motion}/*.svg` | Visible contradiction of the approved identity in browser tab, installed PWA, splash — both themes; undermines "retired values banned" invariant | F-01 wave (small, standalone) | Regenerate the 13 SVGs (+ audit PNG twins) on the approved clay palette; optionally extend the guard to `public/` | Zero retired-value occurrences in `public/brand`; guard (if extended) green | Asset-only commit; trivially revertible |
| R-07 | **HIGH** | Stale numeric/doc authority misleading future waves (36/28, 35/27, stale SHAs, missing index entries) | C-01..C-06, C-09, C-10 | Agents plan against wrong invariants; gate confusion; wrong bundle headroom assumptions | Wave 0 doc fixes (Micro write — separate commission) | Doc-only correction PR in Micro before Wave 1; add architecture docs to 00-document-index | Values match code/tests; index lists architecture set | Doc-only commit; trivially revertible |
| R-08 | **MED** | Scale collisions (spacing/radii/type/z) causing guard failures or silent value bending | guard scale sets vs V2 token values | Build failures, or "adapted" values that no longer match either system | OD-08 decision | Explicit mapping decision per scale (adapt V2 to Micro scale, or owner-approved scale change updating guard + stylelint + tests together) | Guard green; mapping table records every adapted value with rationale | Guard/test commit revertible with the token commit |
| R-09 | **MED** | Studio artifacts leaking into production (fixtures, `--studio-*` namespace, Phosphor registry, word-generating components, simulated status bar) | `studio/studio.css`, `phosphor.generated.ts`, `MoneyValue.tsx:26–46`, fixtures | Competing token source; word-ownership violation; bundle bloat | None (enforcement) | Phase 0 exclusion rules restated per wave PR; reviewer checklist; strip word generation at adaptation | Zero studio imports in Micro source; census guard green; words only from Micro dictionaries | Revert offending commit |
| R-10 | **MED** | Text-density cap breaches on adapted screens | `text-density-count.py` (49 caps); TruthNote/Insight add ~30–40 words/card | Caps fail; pressure to raise silently | Per-wave audit | Count before/after per adapted screen; owner-recorded raises only (WS-173 precedent) | Density check green or owner-recorded raise comments | Revert; caps independent |
| R-11 | **MED** | Accessibility gaps transferring unverified (V2 qty 40px; contrast pairs not extended to new roles; 200% fixes unverified; Sheet focus trap) | `screens.css .qty-btn`; contrast-guard pair lists; QA-SUMMARY; Overlays.tsx | Touch-target violations; unverified contrast on new roles; keyboard traps | F-02/F-10 wave rules | Raise qty to 44px in transfer; extend contrast pairs for new roles at Wave 1; keep Micro focus trap; re-verify 200% on real Micro | Contrast guard covers every new role both themes; U09-style target tests green; 200% captures pass | Component-level reverts |
| R-12 | **MED** | Sequencing conflict with the Post-Group-6 structural gate (Finance is named in the no-split list; Group 11 final owner gate open) | `AGENTS.md` §11; `current-state.md` §40 | V2 screen work on Finance could violate the approved-plan rule or collide with Group 11 closure | OD-09 decision | Sequence Finance/Home recomposition through/after the Group 11 final gate; keep V2 work visual-only inside existing page files until then | Owner's explicit sequencing record before any Finance structural change | Not applicable (no structural change permitted before the gate) |
| R-13 | **MED** | Real-device/UAT claims without evidence (both repos register NOT_RUN/UNVERIFIED) | DEVICE-001; `REAL_DEVICE_QA_NOT_PERFORMED`; V2 OPEN-ISSUES rows 4–6 | False readiness claims; Pilot gate integrity | Wave gates | Keep device/UAT as explicit external gates; never mark DONE from static evidence | DEVICE-001/UAT-001 items VERIFIED with evidence before Pilot | N/A (gate, not code) |
| R-14 | **LOW** | V2 TOKEN-DICTIONARY generator lives outside the repo (drift risk) | `TOKEN-DICTIONARY.md:4` | Dictionary could diverge from tokens.css in future V2 edits | Wave 0 snapshot | Snapshot/verify dictionary vs tokens.css at Wave 0 (this audit found zero deltas at `026541d`) | Mapping references verified values | N/A (read-only) |
| R-15 | **LOW** | V2 open issues untracked (no ISS/GAP ID system; 8 untracked rows) | `OPEN-ISSUES.md` vs Micro ops-control | Open issues silently dropped during transfer | Wave 0 | Mint Micro-side ops-control items for the 8 V2 open issues | Items exist with status/owner | N/A |

---
## 15. Findings classified — FIX_NOW / PRESERVE / DEFER / OUT_OF_SCOPE / OWNER_DECISION_REQUIRED

`FIX_NOW` here means **recommended for a later approved implementation wave**; it does NOT authorize implementation during Phase 1. Counts: **13 FIX_NOW · 21 PRESERVE · 12 DEFER · 8 OUT_OF_SCOPE · 12 OWNER_DECISION_REQUIRED = 66 findings.**

### 15.1 FIX_NOW (13) — full records

**F-01 — Retired v0 palette in 13 live brand SVG assets**
- Category: Brand/asset hygiene · Classification: `FIX_NOW` (standalone small wave)
- Evidence: `apps/prototype-web/client/public/brand/{favicon/micro-favicon-field.svg, mark/micro-quad{,-compact}.svg, pwa/{micro-adaptive-foreground,micro-maskable,micro-appicon-quad}.svg, splash/{ios-1179x2556,ios-1290x2796,ipad-2048x2732,android-960x960-icon}.svg, motion/{light/2-right-turquoise,light/4-left-terracotta,micro-mark-layered}.svg}` contain `#CC785C`/`#079FA0` (+ retired dark values in dark twins); guard scans `client/src` only (`design-token-guards.py:33,256–263`)
- Affected: brand assets only (favicon, BrandMark, PWA icons, splash, launch motion)
- Impact: visual identity contradiction (browser tab, installed PWA, splash) in both themes; no data/financial/security impact
- Dependencies: none (uses the already-approved clay palette)
- Minimum safe remediation: regenerate the 13 SVGs on the approved palette; audit PNG/ICO twins (binary — unauditable by grep); optionally extend the guard to `public/`
- Focused verification: repo-wide grep for retired values incl. `public/`; visual check of favicon/splash/PWA install in both themes
- Acceptance criteria: zero retired-value occurrences in `public/brand/**`; guard (if extended) green
- Rollback boundary: single asset-only commit; revert restores prior assets

**F-02 — Extend contrast-guard pair matrix for new V2 roles** — Category: guard extension · `FIX_NOW` (Wave-1 boundary). Evidence: `theme-contrast-guard.py` TEXT_PAIRS/MARK_PAIRS hard-coded to current roles; new roles (Action `#A94630`, Partial/Unknown `#5B6770`, Boundary `#78868D`, Brand-Soft `#FBE9E2`, Info/Local `#305968`) uncovered. Affected: guard script only. Impact: unverified contrast on new roles. Dependencies: OD-01/OD-02 values. Remediation: add pairs at Wave 1; run in both themes. Verification: guard green incl. new pairs. Acceptance: every new role covered. Rollback: guard commit revertible with token commit.

**F-03 — Documentation staleness corrections (C-01..C-06, C-09, C-10)** — Category: documentation authority · `FIX_NOW` (doc-only Micro PR — requires separate Micro write commission). Evidence: Section 13. Affected: `AGENTS.md` §10/§11.3, `context.md`, `current-state.md` header, `vf-tokens.css` header comment, `00-document-index.md`, `R2.renderSmoke` comment, test docstring. Impact: future agents plan against wrong invariants (38/30 vs 36/28 vs 35/27; dark status; missing index entries). Dependencies: none. Remediation: one doc-only PR aligning every number/status to code+tests. Verification: cross-check each corrected value against code. Acceptance: zero contradictions from Section 13 remain. Rollback: doc commit revertible.

**F-04 — Wave-1 token reconciliation implementation** (after OD-01/OD-02/OD-08) — Category: foundations · `FIX_NOW` (Wave 1). Evidence: Sections 7–8. Affected: `styles/vf-tokens.css`, `styles/theme-dark.css` (parallel bindings), `vf-tokens.test.ts` (deliberate re-baseline = authorization artifact), guard scale sets, `.stylelintrc.json`. Impact: whole-surface visual change; financial meaning preserved via words/markers (R-01 controls). Dependencies: OD-01/02/08 + F-02. Remediation: single-wave change through the bridge; old→new values with dates; both-theme captures. Verification: `pnpm check` full chain + 82-pair contrast + dark regression. Acceptance: all guards green; captures attached; migration notes complete. Rollback: pre-wave SHA; single revertible commit (CHANGE_PROTOCOL §5).

**F-05 — stateAdapter tone-vocabulary extension** (after OD-02) — Category: state semantics · `FIX_NOW` (Wave 1/2). Evidence: `stateAdapter.ts` (`partial→"info"`), `stateAdapter.test.ts`, primitives chip/notice/stripe rules. Affected: stateAdapter + primitives.css tone rules + tests. Impact: changes how partial/unknown/pending render — must NOT change words or families (R-01). Dependencies: OD-02. Remediation: add `partial`/`unknown` neutral tones; re-classify per-consumer; keep frozen words. Verification: stateAdapter suite + per-screen DOM tests. Acceptance: tone map matches the owner decision; all word tests unchanged. Rollback: adapter+rules commit revertible.

**F-06 — Button/action-class visual adaptation** (after OD-01) — Category: components · `FIX_NOW` (Wave 1/2). Evidence: `primitives/Button.tsx` (8 classes), `primitives.css:122–187`, V2 `core/Button.tsx`. Affected: Button primitive skin + bindings. Impact: every action surface (52/52 routes). Dependencies: OD-01 + F-04. Remediation: re-skin classes through tokens; keep Micro's class ladder and semantics; V2 in-button success/error → Micro feedback regime. Verification: primitives suite + U09 + captures. Acceptance: class contracts unchanged; tests green. Rollback: primitive commit revertible.

**F-07 — Field visual additions** (unit-slot decision after OD-04) — Category: components · `FIX_NOW` (Wave 2/3). Evidence: `primitives/Field.tsx`, `forms/EnglishNumberInput`, V2 `Field.tsx`. Affected: Field primitive + amount inputs. Impact: money input/display correctness (bidi). Dependencies: OD-04. Remediation: add clear-value button, LTR tel/ID isolation, focus treatment; unit placement per Micro's unit-outside-island contract unless owner decides otherwise. Verification: exact-values suites + a11y field tests. Acceptance: numeric-slot contract green. Rollback: per-component commit.

**F-08 — Row `unavailable` state + 200% restructure technique** — Category: components · `FIX_NOW` (Wave 3). Evidence: `primitives/Row.tsx`; V2 `OpenRow.tsx` + `core.css [data-text-scale='200']`. Affected: Row primitive (60+ consumers). Impact: low (additive slots). Dependencies: none beyond Wave-1 tokens. Remediation: add optional `unavailable` slot + restructure rules; verify against 60+ consumers. Verification: Row tests + 200% captures. Acceptance: no consumer breaks; 200% no-overflow. Rollback: per-component commit.

**F-09 — Net-new capabilities: StructuralLoad, TruthNote, AnchoredMenu, SnapshotDeck, Insight card** — Category: components · `FIX_NOW` (Wave 2/3, dynamic-loaded). Evidence: Sections 8–9 (no Micro counterparts). Affected: new primitives in `components/primitives/` (+ finance presentation comps). Impact: bundle budget (R-04) — must be dynamic-loaded; SnapshotDeck data from Micro readers only; TruthNote words from Micro dictionaries. Dependencies: OD-06 guardrails (deck strong card), OD-11 (bundle strategy). Verification: primitives tests; budget check; deck a11y (arrows, live indicator); density caps. Acceptance: budget within caps; a11y tests green; no fixture values. Rollback: dynamic-import removal / component commit.

**F-10 — Touch-target floor enforcement in transfer** — Category: accessibility · `FIX_NOW` (every wave). Evidence: V2 `screens.css .qty-btn` 40×40 vs 44px contract (U09). Affected: any transferred interaction. Impact: a11y compliance. Dependencies: none. Remediation: raise to ≥44px; keep Micro focus traps. Verification: U09-style checks on new components. Acceptance: zero sub-44px targets. Rollback: per-component commit.

**F-11 — Word-generation stripping + fixtures exclusion enforcement** — Category: state-grammar integrity · `FIX_NOW` (adaptation rule). Evidence: V2 `MoneyValue.tsx:26–46`, `SIGNAL_STATE_TEXT`, EmptyState hardcoded hints vs Micro word-ownership invariant. Affected: every adapted component. Impact: prevents state-grammar violation (R-01/R-09). Dependencies: none. Remediation: components render only; words from Micro dictionaries; fixtures never enter production. Verification: census/word tests; grep for studio dictionaries. Acceptance: zero V2-generated words in Micro runtime. Rollback: per-component commit.

**F-12 — Per-wave visual evidence protocol** — Category: process · `FIX_NOW` (every wave). Evidence: CHANGE_PROTOCOL §3; no automated visual-regression tooling exists (manual captures only). Affected: wave acceptance. Impact: prevents unverified visual claims. Dependencies: none. Remediation: per affected route — Light+Dark captures; 320/360/390/412 × 150/200% spot matrix; density counts; both contrast guards. Acceptance: capture set attached per wave PR. Rollback: N/A (process).

**F-13 — Icon name mapping (Phosphor → lucide)** — Category: components · `FIX_NOW` (implementation rule). Evidence: `phosphor.generated.ts` vs `lucide-react`. Affected: adapted components. Impact: prevents duplicate icon system + bundle bloat. Dependencies: none. Remediation: name-map at adaptation; never import the registry. Acceptance: zero phosphor imports. Rollback: per-component commit.

### 15.2 PRESERVE (21)

P-01 Layered architecture + ESLint boundaries + runtime-cycle guard (S1-01/S1-05) · P-02 Single token bridge + single-stylesheet convention — all V2 values enter through `vf-tokens.css`/`theme-dark.css` only (S1-02/S1-03) · P-03 Single vaul drawer primitive composed by all sheets (S1-06) · P-04 QuickActionSheet Home ownership; no central FAB (NAV-001) (S1-07) · P-05 Micro state words & dictionaries; adapter/components never generate words (S3-02/S4-08) · P-06 `formatters.ts` single money-format source incl. share/markdown propagation (S4-12) · P-07 EventEffectPreview domain dry-run; no UI-side equations ever (S4-05/S4-19) · P-08 Period-comparison truth, no silent 0% on missing (S4-21) · P-09 Honest-state invariants: pending≠success, unknown≠failure, zero≠no-data, no-data≠no-results (S4-27) · P-10 `#D97757` identity + never-financial guardrail on both sides (S4-29) · P-11 Full guard/CI chain + rollback protocol reused verbatim for V2 waves (S5-01/S5-17/S5-18) · P-12 Dark Mode as-is; parallel-binding protocol per token change (ADR-009) (S2-13/S4-30) · P-13 Native-RTL approach on both sides (S3-22) · P-14 Micro z-ladder + documented divergence; never import z-90 (S2-20) · P-15 lucide icon system (S3-16) · P-16 StatusChip word+marker contract (§8.2) · P-17 FeedbackNote explicit-channel contract (§8.2) · P-18 Sheet focus trap + unsaved-changes stack (S3-10) · P-19 Error-recovery semantics (retry in place, region isolation, refreshError pattern) (§8.2) · P-20 ThemeContext: light default, dark explicit/persisted, never OS-following (S1-12) · P-21 PWA style unity + generated SW/manifest; brand-launch-splash as sanctioned one-off (S1-11/S1-13)

### 15.3 DEFER (12)

D-01 Chart system (conditional; U-16 floors; FIN-CHARTS ConditionalVerify) · D-02 SaveState/pending-send/offline axis (no sync target exists — contract 04 `local_only`) · D-03 Auth/password/logout semantics (AGENTS §7.6 phase gate) · D-04 Page-swipe between tabs (net-new; arbitration complexity with deck drag) · D-05 SystemRibbon (sync-presuming) · D-06 Dead-token cleanup (documented list; avoid churn in Wave 1) · D-07 Finance-event → Row convergence (already a registered owner wave — not part of V2 waves) · D-08 Field-primitive form convergence (registered owner wave) · D-09 Redesign of the ~24 Micro screens V2 has not designed (stay on current design until individually authorized) · D-10 Real-device + UAT validation (external gates before Pilot) · D-11 Dark Mode V2 redesign (separate owner decision + wave) · D-12 Brand quad-mark / final logo asset (GAP-002 pending logo review)

### 15.4 OUT_OF_SCOPE (8)

O-01 Studio chrome: StudioShell/ReviewControls/StudioComponents/DeferredScreen/fixtures/simulated status bar · O-02 `studio.css` `--studio-*` namespace + raw-hex scrim (`core.css:435`) — never copied · O-03 Phosphor registry import · O-04 GLB-LOGOUT (local-first; no session) · O-05 Market offering invention (GAP-005; MKT-OFFER-DETAIL only for proven offerings) · O-06 Any domain/data/storage/export/financial-logic change (Phase 0 decision 4) · O-07 «دخل/خرج» direction-word transfer; review-word reuse for unknowns (hard prohibition) · O-08 Studio sale-impact fixture values as financial logic (GAP-004 — display values only)

### 15.5 OWNER_DECISION_REQUIRED (12) — summarized here, detailed in Section 17

OD-01 Action/Brand separation package (incl. focus color, on-action pairing) · OD-02 Semantic tone remap (info-blue → info/attention/partial; add partial tone; fate of `--vf-status`) · OD-03 Font strategy (family, mono numeric contract, subsetting, payload) · OD-04 Money display format contract (minus glyph, decimals, unit placement, spoken label) · OD-05 Loss/negative semantics (amber vs danger; «خسارة») · OD-06 Result-card verdict words & naming (contract 05 §3.2.1) · OD-07 Due-today coloring (frozen neutral vs amber) · OD-08 State vocabulary reconciliation («غير معروف», review word, new V2 words) · OD-09 Finance/Home structural sequencing vs Post-Group-6 Group 11 final gate · OD-10 Header/shell philosophy (logo vs no-logo; panel vs menu; nav height) · OD-11 Bundle strategy (dynamic-load offsets vs cap raise) · OD-12 OVR-SNAPSHOT-ALL product decision (ISS-005) + Wave-0 acceptance of this mapping

---

## 16. Minimum safe implementation waves

No wave is implemented or claimed in this phase. Each later wave requires its own workstream claim in Micro's operations-control system, its own owner gate, and full evidence per CHANGE_PROTOCOL. Sequencing rule: **nothing starts before Wave 0 acceptance.**

| Wave | Content | Dependencies | Acceptance criteria (minimum) | Rollback boundary |
|---|---|---|---|---|
| **0 — Authority & mapping acceptance** | Owner review of this report; resolution of OD-01..OD-12 (values recorded); F-03 doc corrections (separate Micro doc-only commission); mint ops-control items for V2's 8 open issues; snapshot-verify TOKEN-DICTIONARY (zero deltas at `026541d` — done in this audit) | This PR merged in the V2 repo | Decision register has recorded owner answers; Micro docs match code; items tracked | Doc-only commits; trivially revertible |
| **1 — Foundations & only the required shared primitives** | Measure current build first; reconcile approved roles through `vf-tokens.css` (+ parallel `theme-dark.css` bindings); record the owner-approved future Action extension (`#A94630`) without changing Documents in this phase; separate state meaning from urgency; optimize/subset Alexandria while keeping IBM Plex Mono for numeric slots; extend guards and tests only with the approved mapping | Wave 0; owner-direction record; current Standard/runtime cross-check; live Group-11 status; no unresolved conflict affecting the foundation | Full `pnpm check` green incl. design-guards + contrast; Light+Dark captures; migration notes; measured bundle within caps; no financial wording/export drift | Pre-wave SHA; single revertible commit; dark layer independently revertible |
| **2 — First integrated screen slice: OVR-NOW (Home)** | Implement the approved V2 Shell direction incrementally where it supports the screen; SnapshotDeck/insight/TruthNote/loading from Micro readers only; preserve quick-record actions; apply state tone meaning without changing financial words; keep `عرض الكل` as an approved follow-up slice | Wave 1; current Shell impact map; no unresolved financial wording conflict; measured budget | New DOM/journey tests; density caps; 320–412 × 150/200% × both themes captures; dark regression; budget within caps | Home-slice commit; deck dynamic-import removable; pre-slice SHA |
| **3 — Other shared components + reference screens** | OPS-SALE-CREATE quick-form skin; FIN-OVERVIEW presentation layer; Row `unavailable` + 200% technique; `عرض الكل` follow-up; remaining shared components. Limited structural changes are allowed only when necessary for an approved screen and after impact analysis; broad Finance/Home reorganization remains separately gated | Wave 1–2; live Group-11 status; financial wording/display decisions; shell decision; **separate structural gate for broad reorganization** | Same standard as Wave 2 per surface; no financial meaning/export/storage change; structural gate evidence where applicable | Per-surface commits; pre-wave SHA |
| **4+ — Route-by-route waves** | Remaining surfaces individually authorized (only where V2 has approved patterns or shared components changed underneath); un-designed screens stay on current design (D-09) | Waves 1–3; per-screen owner authorization | Per-surface: tests + captures + density + dark regression | Per-surface commits |
| **Standing gates (all waves)** | Dark regression per wave; real-device validation (DEVICE-001) and UAT (UAT-001) before Pilot — never marked DONE from static evidence | — | External gate evidence | — |

---

## 17. Unresolved questions and decisions required from the owner

**Decision register status:** The owner has answered OD-01..OD-12 after the initial audit. The records below are retained for traceability; the owner-direction addendum immediately below supersedes the original binary alternatives. Any implementation detail not explicitly fixed remains `OWNER_DECISION_REQUIRED`.

| ID | Decision | Why it cannot be resolved by an agent | Evidence |
|---|---|---|---|
| OD-01 | Adopt V2 Action `#A94630`+white as the solid action, re-classifying Micro's primary/create/FAB surfaces (and which surfaces keep Clay+ink)? Include focus color (`#305968` ring vs ink) and pressed-brand choice (`#C4663F` vs frozen `#C96442`)? | Re-classifies owner-approved action classes; frozen tests; brand identity | §7 Action rows; `SOURCE_OF_TRUTH.md:7` |
| OD-02 | Approve the semantic tone remap: split Micro's blue-info coverage of pending/partial/reversed into V2 info/attention/partial (adding a `partial` tone), and decide the fate of the "reviewed" `--vf-status` role? | Changes test-frozen state→tone semantics; user-facing state meaning | `stateAdapter.ts` + tests; §11.2 |
| OD-03 | Font strategy: adopt Alexandria (subset to woff2, drop/keep Noto fallback)? Keep IBM Plex Mono for numerals (contract) or move to tabular-nums Alexandria per V2 §7? Re-freeze the rem ladder for V2 sizes (incl. 34px hero)? | Frozen numeric-slot contract; payload/budget; a11y metrics | §12.5; `NUMERIC_SLOT_CONTRACT` |
| OD-04 | Money display format: keep ASCII minus + 2 decimals + unit-outside-island (recommended default), or adopt V2's U+2212/3-decimals/unit-inside? Adopt spoken «دينار أردني» aria? | Frozen display strings propagate into share/markdown exports; input policy (sub-qirsh rejected) | `formatters.ts`; `tokens.ts` |
| OD-05 | Loss/negative presentation: keep Micro's amber attention, or adopt V2's danger container + «خسارة» verdict? | Changes perceived severity of losses (financial meaning) | §11.2 |
| OD-06 | Result card: are verdict words «ربح/خسارة» and hero titles acceptable *anywhere*, given contract 05 §3.2.1 freezes «نتيجة الفترة المسجلة» and forbids «صافي ربح نهائي»? Is the brand-strong result card (complete only) acceptable? | Contract-governed financial naming; recorded_only ≠ certified completeness | `contracts/05 §3.2.1`; V2 §13.11 |
| OD-07 | Due-today coloring: keep frozen neutral due (only overdue escalates), or adopt V2 amber for actionable attention? | Test-frozen state semantics; user prioritization behavior | `stateAdapter.test.ts:99–102` |
| OD-08 | Vocabulary reconciliation: V2 bans «غير معروف» as a money descriptor while Micro displays it; V2 reuses the review word for unknowns; new V2 words («بانتظار تحديد المحفظة» etc.) — adopt, adapt, or reject? | Word dictionaries are frozen product property | §11.2; §13 |
| OD-09 | Sequencing: route Finance/Home structural recomposition through the open Group-11 final owner gate, or keep V2 work visual-only inside existing files until that gate closes? | AGENTS §11 rule 1 names Finance; Group 11's final gate is open | `AGENTS.md §11`; `current-state.md §40` |
| OD-10 | Shell philosophy: V2's no-logo header + account panel vs Micro's logo header + menu; adaptive ≥70px nav vs 64px min? | Brand/identity and shell layout ownership | §9 rows 1–2 |
| OD-11 | Bundle strategy: dynamic-load offsets only (recommended), or an owner cap raise for V2 additions + fonts? | Guarded numeric limits are owner-owned (double-diff rule) | §12.5; R-04 |
| OD-12 | Accept this mapping (Wave 0 gate) and decide OVR-SNAPSHOT-ALL's product fate (ISS-005)? | The program's next gate; product-scope decision | §9 row 11 |

### 17.1 Owner-direction addendum — accepted 2026-09-24

| ID | Accepted direction | Implementation boundary |
|---|---|---|
| OD-01 | `#D97757` remains identity; `#A94630` is the future solid primary action. Retired action colors are not preserved merely because they exist. | Record as a new Micro direction; do not modify Documents or runtime tokens in this closeout. |
| OD-02 | Separate state meaning from urgency: pending is not always Attention; partial/unknown are neutral with explanation; reversed follows actual meaning; needs_review remains an independent lock. | Exact consumer mapping remains a Wave 1 design/verification task. |
| OD-03 | Alexandria for interface after optimization/subsetting; IBM Plex Mono remains for numeric slots until loading and legibility are verified. | No font implementation in closeout. |
| OD-04 | Preserve Micro's two-decimal screen/share/export contract; accessibility wording may improve without changing values or contractual strings. | No formatter/export change in closeout. |
| OD-05 | Negative is not automatically a loss or Danger. A clearly qualified calculated period loss may receive stronger treatment only without implying a final result. | Financial wording and tone require focused Wave 2/financial review. |
| OD-06 | Keep `نتيجة الفترة المسجلة`; do not imply completeness or use `ربح نهائي`. `ربح` may describe a correct, bounded recorded calculation. | Contract 05 remains authoritative for wording. |
| OD-07 | Due-today is semantically neutral; overdue escalates. A required action today may be highlighted without changing the financial state. | Preserve state semantics in implementation tests. |
| OD-08 | Preserve established Micro operational vocabulary; do not globally replace `غير معروف`; reserve `يحتاج مراجعة` for the actual lock state. | Choose wording by cause during screen adaptation; no global dictionary rewrite now. |
| OD-09 | Verify the live Group-11 status first. Limited necessary structural changes may be proposed for an approved screen after impact analysis; broad reorganization requires a separate structural gate. | No bulk move or structural refactor in Phase 2 without the required scan/acceptance path. |
| OD-10 | V2 Shell is the approved direction: logo/name-free top bar, clickable account entry, five approved tabs, transferred incrementally while preserving Micro functions and familiar navigation. | Shell implementation is a later wave; no current Shell write. |
| OD-11 | Do not raise bundle cap in advance. Measure first, optimize fonts/loading selectively, and raise a precise decision only for a measured residual overage. | Historical bundle numbers are not current guarantees. |
| OD-12 | Accept the corrected Phase 1 map; summary-card swipe and `عرض الكل` are approved directions. `عرض الكل` may follow the first screen but is not cancelled or left undefined. | Product/screen sequencing remains a later implementation plan. |
| SOURCE-HIERARCHY | V2 is visual-direction authority; Micro is authority for functionality, data, financial contracts, and operational behavior; Documents is reviewed by topic and revision date. Historical documents are marked historical. | Stop only the specific change affected by a real unresolved conflict. |


**Remaining implementation checks (not identity decisions):** PNG/ICO brand twins are binary and were not auditable by grep (visual check recommended in F-01); Documents `micro-standard-v2/` was cross-checked during closeout at `2396ff09fa52bb7872ae40c10adfc86ee7a0808d` and remains a visual-contract source, not an implementation repository; Cloudflare Pages behavior is external to the repo; the V2 TOKEN-DICTIONARY generator lives outside the V2 repo (zero deltas verified at `026541d`).

---
## 18. Verification commands and results

### Executed (all read-only)

| # | Command / action | Result |
|---|---|---|
| V-01 | `git clone https://github.com/Qays7753/Micro.git` (anonymous) | PASS — clone @ `4e1bab9` |
| V-02 | `git clone https://github.com/Qays7753/Micro-Bold-Modular-Design-Handoff-V1.git` (anonymous) | PASS — clone @ `026541d` |
| V-03 | `git rev-parse origin/main` (Micro) | `4e1bab9198023cf76bf1ebd5e9481d898a95700e` — matches expected (PASS) |
| V-04 | `git rev-parse origin/main` (V2) | `026541d9ac10c8d8df9999c4cd85653c4231ff43` — matches expected (PASS) |
| V-05 | `git status --porcelain` (both) | clean (PASS) |
| V-06 | `git log -1 --format=%P` on `4e1bab9` | single parent `389afd5…` — squash-merge of PR #231 (PASS) |
| V-07 | `git ls-remote --heads origin` + `git ls-remote origin 'refs/pull/*'` (Micro) | 11 remote branches (historical/keep); max PR ref = 231 = baseline; no PR after baseline (PASS) |
| V-08 | `git branch -a` + `git merge-base --is-ancestor` (V2) | `win`, `exec/…` both at `026541d`, ancestors of `main` (PASS) |
| V-09 | `python3 scripts/operations-control/validate.py` (Micro) | **PASS** — "Operations Control valid: 64 items, 23 workstreams, 0 active claims, origin/main=4e1bab9…"; warnings: WS-170 historical base_sha; gh CLI unavailable (PR cross-check skipped — covered by V-07) |
| V-10 | Targeted `rg` verifications (schema versions, retired palette in SVGs, bundle figures, contract wording, V2 token values, font asset sizes) | All claims verified — see Section 5 |
| V-11 | Read-only GitHub API attempt (anonymous, both repos, open-PR check) | **RATE_LIMITED** (unauthenticated quota for this IP exhausted) — mitigated via V-07/V-08 + control docs; V2 open-PR state re-checked via the token at publication time |
| V-12 | Five specialist read-only audits + main-agent spot-verification | Complete (2-a retried once after an environment context deadline) |
| V-13 | Documents `micro-standard-v2/` closeout cross-check at Documents `main` `2396ff09fa52bb7872ae40c10adfc86ee7a0808d` | PASS — package marked final; authority ladder and action roles read; no Documents write performed |
| V-14 | Owner-direction record supplied after the initial audit | PASS — OD-01..OD-12 and source hierarchy recorded in §17.1; no implementation authorized |

### NOT_EXECUTED (deliberately — out of Phase 1 scope)

`pnpm check` (full chain) · any test suite (root/client/domain, incl. `vf-tokens.test.ts`, `legacyClassCensus`, `exact-values.*`, `R2.renderSmoke`) · `pnpm lint` / current lint-warning count · any build (`pnpm prototype:build` / `npm run build` in the studio) · current bundle measurement (last recorded 648,772 raw / 153,862 gzip, headroom 1,228 / 1,138 — see C-13) · `npm ci` / any dependency install · `theme-contrast-guard.py` / `design-token-guards.py` execution (their rules were read, not run) · browser/device rendering, screenshots, axe-core, 320–412 width or 150/200% zoom verification · TalkBack/screen-reader · `pnpm audit` (network) · Cloudflare Pages state (external) · visual diffing of any evidence PNGs. All visual/quality claims in this report are therefore sourced from the repos' own recorded evidence and are labeled accordingly.

---

## 19. Exact files and commits written to the V2 report repository

**Repository:** `Qays7753/Micro-Bold-Modular-Design-Handoff-V1` · **Branch (created for this report):** `reports/micro-phase1-v2-integration-mapping-20260923` (from `main` @ `026541d9ac10c8d8df9999c4cd85653c4231ff43`)

**Files added (exactly these, nothing else):**
1. `reports/micro-phase1-v2-integration-mapping-2026-09-23/PHASE-1-INTEGRATION-MAPPING.md` (this report)
2. `reports/micro-phase1-v2-integration-mapping-2026-09-23/TOKEN-MAPPING.tsv` (machine-readable token map)
3. `reports/micro-phase1-v2-integration-mapping-2026-09-23/FINDINGS.tsv` (machine-readable findings register)

**Commits:** the branch carries the original report commit plus this closeout commit. No V2 source file was touched; the closeout PR is opened for owner review and is not merged. The exact PR URL and final tip SHA are recorded in the final handoff after publication.

---

## 20. Explicit confirmation that Micro received no writes

**Confirmed: `MICRO_READ_ONLY — NO_MICRO_WRITES_PERFORMED`.**

- No Micro file was created, edited, deleted, renamed, or formatted. The analysis clone's worktree remained clean throughout (`git status --porcelain` empty).
- No Micro branch was created or modified; no commit, PR, merge, rebase, reset, force-push, or tag; `main` untouched at `4e1bab9`.
- No Micro Tracker/UX-001/current-state/contract/architecture update; no workstream claim and no Micro write. The owner-direction record is a report-side closeout only; a separate Micro doc-only Tracker PR is required before implementation.
- No `vf-tokens.css`, Dark Mode, component, screen, route, test, or dependency change; no lockfile change; no installs; no CI/workflow trigger; no deployment.
- The only Micro-remote operations were read-only git protocol reads (clone/fetch refs).
- Recommended-but-not-performed Micro items (F-01 asset fix, F-03 doc corrections, all FIX_NOW findings) await separate owner commission.

---

## 21. Next action: owner review and acceptance of the mapping before Phase 2

The next gate is the owner's. Concretely:

1. Review and accept this corrected report PR; the owner-direction addendum in §17.1 is the current direction.
2. Record the same direction in Micro's Operations Control/decision log through a separate doc-only PR; do not change runtime code or tokens in that PR.
3. Verify the live Group-11 gate status and the current bundle measurement before scoping Wave 1; historical figures are not guarantees.
4. Only after the report PR and Micro documentation PR are accepted, commission Wave 1 through Micro Operations Control v2 (workstream claim → PR → `MERGED_UNVERIFIED` → `VERIFIED` on main with evidence).

No implementation of Phase 2 was started, claimed, or authorized by this report. `UX-001` remains `DEFERRED`; its acceptance criteria (full RTL design system, per-screen purpose/states/accessibility, user testing before adoption) are unchanged and unaffected by this mapping.
