# AUDIT CORRIGENDUM — 2026-09-25
### Corrections, confirmations, and status changes to `COMPREHENSIVE-AUDIT.md` (2026-09-24) after the rendered/interactive evidence pass

Baseline unchanged: Micro @ `c02fb458b1c97d30f67ca7f5a82de82bbc77325d` (verified live at both audit opens); design repo main @ `1c990544`; audit branch head was `e6f1a5a9` (both commits from the 2026-09-24 audit; no unexplained commits).
New evidence: 33 rendered captures + 18 interaction probes + computed-style/DOM metrics across Home/Work/Finance/Tools at 320/360/390/430, light + dark; zero console errors; **every financial store remained at 0 records** (IndexedDB census). Full method: `VISUAL-INTERACTION-REVIEW.md` §1.

---

## 1. Findings whose evidence class changed

| Prior finding | Prior evidence | New evidence | Change |
|---|---|---|---|
| **AUD-009** — label duplication on Home | STATIC_CODE (VERIFIED) | RENDERED — and **generalized**: the duplication exists on **3 of 4 surfaces** by two mechanisms (Home: context label = overline «مشروعي الآن»; Work: context label = h1 «العمل» because `/orders` is absent from `CONTEXT_REPEATS_H1`; Tools: context label = overline «أدواتي»). Finance is the model (suppression + task-descriptive overline). | **Upgraded + scope-corrected** → new finding VIS-001 (MEDIUM, FIX_NOW, light owner decision). The 2026-09-24 text described this as Home-only; that scope was incomplete. |
| **AUD-008** — numbers-grid comment/code mismatch | STATIC_CODE (VERIFIED) | RENDERED at 320 px: grid stays `140px 140px`; no overflow; panels fit | **Confirmed** (evidence class → MIXED). Classification FIX_NOW unchanged; visual severity noted LOW. → VIS-002 |
| **AUD-014** — `--vf-tint` triple duty / semantic overload | STATIC_CODE (VERIFIED) | RENDERED: peach/brand-soft carries ≥3 roles (primary tile; decision panels; warning-limits card) and side borders have 4 parameter variants (3/4 px; `#C96442`/`#D97757`; radius `0 16 16 0`/`16px`; present/absent) | **Sharpened** with concrete rendered parameters → VIS-003 (DEFER + owner decision). Classification unchanged (DEFER). |
| **AUD-021** — Finance copy-density outlier (332 strings) | STATIC_CODE (VERIFIED) | RENDERED: 3,825 px ≈ 5 viewports and 2,846 chars of main text **in first-use with zero records** | **Confirmed** with rendered numbers → VIS-010 (DEFER; owner ratchet gate unchanged). |
| **AUD-017** — loading is text-only (skeletons deferred) | STATIC_CODE | Route-loading render NOT reproducible: SW precache serves all chunks (no navigation waits on network). Splash rendered and settles. | **Unchanged** (DEFER); honest gap logged → VIS-014 |
| **AUD-004** — suggest-chip color-only selected state | STATIC_CODE (VERIFIED) | Not re-renderable in first-use (needs suggestion data) | **Unchanged** — stands on static evidence; remains FIX_NOW |
| **AUD-005** — three sheets close without discard question | STATIC_CODE (VERIFIED) | Not re-renderable in first-use (needs repayment/material data) | **Unchanged** — stands on static evidence; remains FIX_NOW |
| **AUD-006** — destructive ink inconsistency | STATIC_CODE (VERIFIED) | Not re-renderable in first-use (needs drafts to delete) | **Unchanged** — stands on static evidence; remains FIX_NOW |
| **AUD-001/002/003/007/010/011/012/013/015/016/018/019/020/022/023/024/026** | various | Not touched by rendered evidence (data-dependent, config-level, or owner-gated) | **Unchanged** in class and classification |

## 2. Prior-report claims now confirmed by browser execution

The 2026-09-24 report's §13 (state/feedback/interruption/recovery) presented these behaviors as static-code findings. They are now **executed** (probe log P-01..P-18, all reversible, all stores stayed 0):

- Quick sheet dirty-dismissal asks before discarding typed input, repeated close = stay (least destructive default), discard leaves **no record and no success feedback**.
- UnsavedChangesGuard dialog orders stay-first and states the loss honestly («لن يُحفظ شيء تلقائيًا…»); exit-without-save leaves the estimate store untouched.
- Logo menu opens/closes by outside click and Escape; «قريبًا» panels are honest about being future features.
- Bottom-nav selected state carries non-color cues (weight 600 + `aria-current="page"`); focus ring renders on keyboard Tab.
- The app renders and navigates fully **offline** from the service-worker precache (local-first is functional, not just copy).
- First-run journey: startup gate routes to `/setup`; the wizard's skip-wallet path creates **zero** financial records.

No prior claim was downgraded: nothing that the 2026-09-24 report stated as VERIFIED static behavior failed under rendered/interactive testing.

## 3. V2 decisions and owner records — re-opening check (mandated)

- **No approved V2 decision was re-opened as an owner question.** SnapshotDeck IA (AUD-001), five-page swipe (AUD-019), V2 shell (AUD-018/OD-10), skeletons (D-11), field convergence (D-08) all remain exactly as recorded.
- **No approved decision was presented as open in the prior report.** Cross-check of the 2026-09-24 decision list against V2/UX-001 records found no misclassification. (Explicit statement required by the continuation mission: none found.)
- **Genuine integration specification gaps stated precisely** (not re-votes): (a) SnapshotDeck→Micro honest-value mapping spec if ever approved; (b) gesture-ownership rule if page-swipe is ever approved; (c) one-line semantic rule per emphasis role if the peach/border grammar is unified (VIS-003).

## 4. Retraction and method notes (this session)

- **VIS-018 (RETRACTED observation):** an apparent permanently-visible «جارٍ قراءة التصحيحات الموثقة…» loading row was a **measurement artifact** — the text sits inside a closed `<details>` whose content reports non-zero layout boxes under `content-visibility` while not being painted. Playwright rendered-visibility (0×0 box) and the pixel capture prove it hidden; opening the layer lazy-loads and resolves to the honest empty copy (probe P-18 PASS). Retracted before publication; kept in the register as a META row for method transparency. This is the same lesson class as the 2026-09-24 bracket-m retractions: surprising claims require a second, mechanism-different verification.
- **VLM usage discipline:** vision-model readings were used as auxiliary signal only. Two VLM readings were rejected after DOM cross-check (hallucinated Arabic labels); every VLM-supported point in the findings cites its DOM/computed-style confirmation.

## 5. Missing-artifact status (mandated)

- **`HOME-DEEP-AUDIT.md`** was referenced as prepared-but-unpublished in the 2026-09-24 session (it existed only in the audit workbench, never on the branch). **It is now published** alongside this corrigendum as a 20-region + 2-overlay review with per-region evidence classes, incorporating the 15-region static table from the 2026-09-24 specialist pass plus the rendered/interactive evidence collected in this continuation.
- All six 2026-09-24 artifacts (`COMPREHENSIVE-AUDIT.md`, `FINDINGS.tsv`, `INTERACTIVE-COMPONENT-INVENTORY.tsv`, `ROUTE-COVERAGE.tsv`, `STRUCTURE-SCAN.tsv`, `TOKEN-CONSUMER-INVENTORY.tsv`) are preserved untouched on the branch; nothing was rewritten or deleted. `COMPREHENSIVE-AUDIT.md` receives only a dated addendum linking the four new artifacts.

## 6. Owner-decision register delta

New decisions required by this continuation (all genuinely new; none reopening a recorded one):

1. **VIS-001 (light):** which element owns the seat name on each surface (header context vs page overline/h1) — then a mechanical shell fix follows.
2. **VIS-003:** unify the peach/side-border emphasis grammar or document per-surface meanings (one owner sentence either way).
3. **VIS-005:** keep the brand-soft primary quick tile or align it with the filled action contract (one owner sentence; interacts with the recorded W4 decision).

Decisions explicitly **not** required by this continuation: SnapshotDeck, swipe, V2 shell, field convergence, copy ratchet — all unchanged from their recorded gates.
