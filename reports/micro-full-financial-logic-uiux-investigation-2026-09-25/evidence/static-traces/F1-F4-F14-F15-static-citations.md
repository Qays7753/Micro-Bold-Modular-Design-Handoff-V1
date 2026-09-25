# FI-2 static citations for F1/F2/F3/F4/F14/F15 (repo @ c02fb458, read-only)

All paths relative to repo root. Line numbers from the pristine clone.

## F1 — statement/result explanation assembly
- Canonical numbers: `apps/prototype-web/client/src/application/finance/projectFinancialService.ts`
  - `readRecordedPeriodResult(from,to)` L576-830; result formula L811-822:
    `recognizedRevenueMinor + directSaleRevenueMinor − effectiveDirectCostMinor − directSaleCostKnownMinor − recordedOperatingExpenseMinor − assetDepreciationMinor − assetWriteOffLossMinor + assetDisposalResultMinor + retainedDepositRevenueMinor`; `null` when any direct sale has unknown cost (L812-813).
- Display assembly: `application/finance/statementService.ts` `StatementService.read` L134-… builds cashIn/cashOut lines with per-line `sources[]` + `qualifier`, corrections block (netEffectMinor = reversal + original-in-period), owner block, amanah block, receivablesPayables, deepFinance (contract 29/31 items), expenseCategories, truthLines, `recognizedRevenueTotalMinor` (L679-680 = orders + direct-sale revenue), `cashNetMinor` (L530-533).
- Page: `pages/Statement.tsx` displays service output only. Result card L577-603: net + one-line equation
  `إيراد معترف به {recognizedRevenueTotalMinor} − تكلفة مباشرة {effectiveDirectCostMinor} − مصروف موزّع {recordedOperatingExpenseMinor}` (L591-593).
  **GAP:** `directSaleCostKnownMinor` is subtracted in the result formula but is NOT displayed anywhere on Statement.tsx (grep: no match for directSaleCost/بيع مباشر cost line on the page; deepFinance block L640-719 covers only contract-29 items). With synthetic data (sale 12.75, cost 5.50, expense 2.50): visible equation 12.75 − 0.00 − 2.50 = 10.25 while net shows 4.75.
- Full component list IS shown on Finance page: `components/finance/FinancePeriodResultSection.tsx` L95-99 (equation incl. depreciation), L144-248 (per-component dl rows incl. "تكلفة بيع مباشر معروفة" L157, "بيع مباشر بتكلفة غير معروفة" L163).
- Markdown export reuses same reading: `application/finance/statementMarkdownService.ts` (contract 32).
- No UI re-derivation of money math found: Statement L590 comment "المجموع مشتقّ في الخدمة — لا حساب فترة داخل الصفحة"; FinancePeriodResultSection header L4 "لا حساب ماليًا هنا إطلاقًا، عرض فقط". Preview component uses the domain function itself (`components/presentation/EventEffectPreview.tsx` L1-14: same `expandExpenseRecordIntent` + `createFinancialEvent`).

## F2 — period comparison function, sign, period identity
- Service: `application/finance/periodComparisonService.ts`
  - `readPeriodComparison(periodA, periodB)` L388-424 → calls canonical `readRecordedPeriodResult` twice (L392-395).
  - `lineOf` L358-374: `delta = valueB − valueA` (L361); `changeBps = roundHalfUp(delta*10000, valueA)` only when base ≠ 0/null (L362-363).
  - Status = worst of sides (L335-338); `partial` when either side contains today (L400-403, PARTIAL_NOTE L332); overlap flagged (L404, L333).
- Page call: `pages/Statement.tsx` L219 `periodComparison.readPeriodComparison({ from, to }, sideB)` where `{from,to}` = CURRENT displayed period (side A) and sideB = previous-equal or custom (side B).
- Display: collapsed summary L368-382 shows `<strong>{deltaResultMinor}</strong>` with NO direction label; per-line rows L458-484 show "الحالية {a} · السابقة {b} · الفرق {delta}".
- **Sign convention as wired: displayed الفرق = previous − current (B − A with A=current).** Negative value = current period HIGHER than previous (improvement). Synthetic yardstick: current net 4.75, previous 0 → display "−4.75".
- Test convention is opposite ordering: `periodComparisonService.test.ts` L183-186 passes A=August(older), B=September(newer) and expects delta +3100 for growth (L207). The page's argument order inverts this intuitive direction.

## F3 — quick-expense validation + wording constants
- `components/layout/QuickActionSheet.tsx` L204-210 sheet description for expense-form mode: «مبلغ وبند اختياري — يتم التسجيل هنا فوق شاشتك من دون انتقال.»
- `components/finance/QuickExpenseForm.tsx`:
  - Amount required: L120-124 `"أدخل مبلغ المصروف بالأرقام 0–9."`
  - Note required: L127-131 `EXPENSE_NOTE_REQUIRED_MESSAGE`; field label L240-243 `البند <small>مطلوب</small>`
  - Wallet source rule: L133-138 `expenseSourceRuleViolation` → `expenseFormModel.ts` L38-43 "اختر مصدر الصرف: محفظة أو الكاش غير الموزع."
  - Optional: category chips L299-316 `aria-label="تصنيف سريع (اختياري)"`; date editable L252-257.
- Unified spec: `components/finance/expenseFormModel.ts` L27 `EXPENSE_NOTE_REQUIRED_MESSAGE = "اكتب ما حدث قبل الحفظ؛ الوصف جزء من السجل المالي."` L13 "الوصف إلزامي في المدخلين".
- **Contradiction: sheet header says البند اختياري; form blocks save without it (marker «مطلوب»).**
- Dismissal guard for quick forms exists: QuickActionSheet.tsx L143-167 + confirm dialog L225-249 («في رقم مكتوب — تسجّله أو تتجاهله؟» L231, "لا يوجد حفظ تلقائي" L232).

## F4 — FinancialEventEditor preview → error → success
- Page guards before any service call: `pages/FinancialEventEditor.tsx` `save()` L603-…: amount validity L612-624, note required L625-628, wallet-source rule L631-637, cross-model duplicate guard L641-655, `saveInFlightRef` L606/L261, `savedNote` short-circuit L607-611.
- Service: `application/finance/projectFinancialService.ts` `record()` L1296-1400: idempotency reuse first (L1300-1303) → `expandExpenseRecordIntent` validation (L1312-1322) → payable settlement limit (L1325-1338) → amanah limit (L1342-1350) → withdrawal wallet guard (L1354-1368) → `createFinancialEvent` inside try (L1369-1384) → `store.saveFinancialEvent(event)` ONLY after creation succeeds (L1385).
- Store: `storage/local/IndexedDbLocalStore.ts` L1328-1336 `saveFinancialEvent` = `writeOneIdempotent` (idempotency re-checked inside the transaction).
- **No financial record written on invalid submit.** The only persisted artifact after an invalid submit is the non-financial form draft (FinancialEventEditor.tsx L443-468 autosaves on dirty; cleared only on successful save L698 `clearDraft()`), declared non-financial by contract 36.
- Preview: `components/presentation/EventEffectPreview.tsx` — dry-runs the same domain `createFinancialEvent`; falls back to static text on insufficient input.
- Reused key path: L687-693 "لم يُحفظ التعديل. هذا الحدث مسجل سابقًا بنفس المفتاح…" (no second write).

## F14 — guard wording vs autosave
- Dialog copy: `components/forms/UnsavedChangesGuard.tsx` L270-271: title «تعديلات غير محفوظة» + «لن يُحفظ شيء تلقائيًا، وإذا أغلقت الصفحة أو التطبيق قبل الحفظ يفقد ما لم تحفظه.»
- Actual autosave (contract 36): `components/forms/useFormDraft.ts` `onValuesChanged` L79-112 saves the draft envelope on every real change; restore banner `components/forms/FormDraftRestoreBanner.tsx`; status line shown in editors e.g. `pages/DirectSaleEditor.tsx` L615-625 «مسودتك محفوظة محليًا… لم يُسجّل البيع بعد».
- Pages using BOTH the guard and useFormDraft/formDrafts: DirectSaleEditor (L255 + L258), FinancialEventEditor (L437 + L443-468), plus asset/loan/supplier_purchase/inventory_movement editors and Setup (per contract 36 §3).
- DraftEditor (order drafts) is a different family: first real input auto-materializes ONE draft (`pages/DraftEditor.tsx` L196-232), later edits are NOT autosaved — guard wording partially accurate there.
- **Verdict: blanket wording is false for the draft-backed editors (inputs ARE auto-persisted locally and recoverable); accurate only in the narrow sense that no financial record is auto-created.**

## F15 — draft creation trigger
- Order drafts (`drafts` store, inside export snapshot): `pages/DraftEditor.tsx`
  - `/orders/draft/new` starts VIRTUAL, no store read/write on open (L120-148).
  - First real input (values diverge from empty initial) → `ensureMaterialized()` L196-226 → `drafts.create()` ONCE (guarded by `materializePromiseRef` L203 and `draftRef.current` id swap L218).
  - Later edits: same draft id updated in place via explicit `save()` (L234-287) with `expectedUpdatedAt` conflict guard; auto-effect L227-232 only fires while `draft.id === "new"`.
  - `application/drafts/draftService.ts` L45-62 create; L65-98 save with و۶ conflict guard; L101-125 delete blocked when `linkedOrderId !== null`.
  - **One edit → one draft (created on first real input), updated in place. Multiple drafts only from multiple separate editor sessions.**
- Form drafts (`form-drafts` store, outside export snapshot): `application/drafts/formDraftService.ts` L41-43 `formDraftId = ${formKind}:${scopeId ?? "new"}` — single envelope per form+scope, updated in place (`save` L71-114, createdAt preserved L108); size cap 32k chars (L39, L77-84); sync guard `expectedUpdatedAt` (L89-100).
- Empty draft never created: `useFormDraft` L59-66 skips restore-offer for all-empty values; `FinancialEventEditor.coerceEditorDraft` L186-187 returns null for meaningless drafts; DraftEditor L201-202 refuses to materialize unchanged values.

## AUD-005 — dismissal guards in the 3 money sheets vs QuickActionSheet
- `components/loans/RepaymentSheet.tsx` L73: `onOpenChange={open => (open ? undefined : onClose())}` — X/outside/Escape/drag all close immediately, no discard question (amount field L101-109 receives money).
- `components/loans/ReceivedLoanRepaymentSheet.tsx` L71: identical pattern.
- `components/cost/MaterialSheet.tsx` L44 `onOpenChange={onOpenChange}`; parent `pages/CostEditor.tsx` L443-449: `if (!open) { setMaterialSheet(null); … }` — silent discard of in-sheet material entry.
- QuickActionSheet contrast: L143-167 `requestClose()` → `isFormDirty()` → confirm dialog L225-249.
- Confirms prior AUD-005 (FIX_NOW) statically: VERIFIED.

## Idempotency / double-submit / reload (path 15)
- Per-form-instance keys: DirectSaleEditor L125-131 (3 keys), FinancialEventEditor L273, QuickExpenseForm L71, RepaymentSheet saveInFlightRef L38.
- Service-level reuse: directSaleService.ts L80-81/L140-149; projectFinancialService.ts L1300-1303.
- Store-level: IndexedDbLocalStore.ts L891-897 (saveDirectSale), L1328-1336 (saveFinancialEvent) — `writeOneIdempotent` inside transaction; multi-family commits use guarded transactions (e.g. commitCashContinuity L1784-1820, commitOrderUpdate L227+).
- Loan events: deterministic keys `${loanId}:repayment:${repaymentId}` (loanService.ts L166).
- Reload mid-submit: writes are single idempotent puts / atomic transactions — either committed or absent; no partial state. No network in write path at all (SW precache only; no sync queue — contract 04, AUD-023).

## needs_review lock (path 14) — domain-enforced
- `src/domain/craft-order/policies.ts` L294-300 `assertNotLockedDeliveredReview` throws «الطلب المسلّم لا يخرج من «يحتاج مراجعة» إلا بتصحيح موثق صريح.» Called by: transitionOrder L573, reviseOrderCost L632, collectDeposit L679, collectRemaining L712, registerDebt L752, reviseAgreedPrice L841, cancelOrder L1065. Sole documented exit: reverseDelivery L990-1041 (requires reason L1014, links `reversesEventId` L1039, no double-reversal L1007-1013).
- Known documented gap: `reverseOrderCollection` outside the review guard — owner decision D-031 approved-not-implemented (docs/implementation/02-domain-contract-coverage.md row "post-delivery review guard").
- App-layer re-check: `application/fulfillment/reviewLockBoundary.test.ts` (D-031/D-2: store byte-identical on rejection).

## Direct sale + cost honesty (path 1)
- Domain: `src/domain/direct-sale/policies.ts` L54-88 create (costMinor null → profitMinor null L78), L35-46 resolveCollection (collected > revenue rejected L41-42), L50-52 outstanding, L155-179 price_cut, L181-193 cancel with mandatory reason (L95).
- Service: `application/direct-sales/directSaleService.ts` L76-126 record (reuse L80-81; default itemName «بيع نقدي» L89), cancel mirrors wallet allocations (L217-273, deterministic op keys `sale-cancel:…`).
- UI: `pages/DirectSaleEditor.tsx` — required-only-amount L340/L605, difference panel 3 choices L897-953, «لا أعرف الآن» L746-752 («عدم المعرفة يبقى معلومة ناقصة، ولا يسجل تكلفة صفرية»), receipt screen L497-590 (actual price, collected now, debt/needs-review line, wallet attribution, «سُجل محليًا… الضغط مرتين لا يضاعف أثرًا» L540).
