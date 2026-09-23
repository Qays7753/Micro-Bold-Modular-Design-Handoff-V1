# DESIGN-TO-DEVELOPMENT — تسليم التنفيذ البصري (V2 — مراجعة 2026-09-23)

**المرجع:** `../DESIGN-DECISIONS-V2.md` §21.4 و`../COLOR-STANDARD-V2.md`. هذا جسر مرئي للنقل التدريجي إلى Micro؛ لا يفرض إطار عمل ولا ينقل Fixtures أو قواعد حساب.

## 1. خريطة Design → Code (المكونات المنفذة)

| Design ID | مسار الاستوديو | Token IDs | Variants/States المنفذة | نظير الإنتاج | الحالة |
|---|---|---|---|---|---|
| `Financial/MoneyValue` | `src/components/financial/MoneyValue.tsx` | `--type-money-*` + `--c-ink` | Known/TrueZero/Negative/Estimated/NotRecorded/CannotCompute/Unknown/Stale | يعينه فريق التنفيذ | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Financial/TruthNote` | `…/TruthNote.tsx` | `--c-surface-2` + ألوان دلالية | Complete/Partial/Insufficient/Offline/Error | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Financial/SnapshotDeck` | `…/SnapshotDeck.tsx` | `--radius-card-lg` + `--c-brand`/`--c-on-brand` | بطاقة النتيجة القوية (Ink فوق الهوية) / جزئية بشريط / غير كافية + **سحب مباشر حقيقي** + مؤشر n من 4 + «عرض الكل» حقيقي | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Financial/TransactionRow` | `…/TransactionRow.tsx` | `--size-row-tx` | Default/Partial/LocalSaved/PendingSync | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Financial/ResultBlock` | `…/ResultBlock.tsx` | `--c-success-surface`/`--c-danger-surface`/`--c-partial-surface` | Complete (ربح)/Negative (خسارة)/Partial/Insufficient + كلمة حكم + تفصيل Sheet | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Financial/ImpactPreview` | `…/ImpactPreview.tsx` | `--c-surface-2` | قبل/بعد + غير محسوب | يعين | مرجع بصري معتمد؛ القيم تحددها بيانات المنتج |
| `Contextual/*` (Signal/Trace/Seam/Ribbon/Recovery/Empty/Insight) | `src/components/contextual/` | `--signal-*` + أسطح دلالية | انظر COMPONENT-CATALOG | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Navigation/*` (Header/AccountPanel/BottomNav) | `src/navigation/` | `--size-tabbar`/`--size-header`/`--nav-selected-ink` | Default/Scrolled/Selected (علامة رباعية)/Badge/PanelOpen + **سحب بين الصفحات §11.12** | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |
| `Core/*` (Button/Segmented/Field/OpenRow/Sheet/Dialog/Menu/Skeleton) | `src/components/core/` | انظر TOKEN-DICTIONARY | انظر COMPONENT-CATALOG | يعين | مرجع بصري معتمد؛ فحص الدمج لاحق |

## 2. لكل شاشة منفذة — ما يسلَّم للتطوير

| البند | OVR-NOW | OPS-SALE-CREATE | FIN-OVERVIEW |
|---|---|---|---|
| المرجع | `#/OVR-NOW` + SCREEN-COVERAGE-V2.csv | `#/OPS-SALE-CREATE` + SCREEN-COVERAGE-V2.csv | `#/FIN-OVERVIEW` + SCREEN-COVERAGE-V2.csv |
| البنية | Header عام + محتوى + شريط سفلي | مستوى 3: إلغاء + نموذج + شريط إجراء ثابت | Header عام + أقسام أسئلة |
| الحالات | 6 (الجدول في SCREEN-CATALOG) | 9 | 6 |
| الوصول | أهداف ≥44، أسماء ARIA عربية، ترتيب قراءة RTL | + تركيز الحقول وإعلان الأخطاء | + قائمة فترة role=listbox |
| Motion | انظر MOTION-MAP لكل عنصر | + Action Hold وEcho | + انتقال قائمة من مصدرها |
| الأصول | Icons/Fonts من ASSET-MANIFEST | نفسها | نفسها |
| القبول | لقطات evidence + إعادة إنتاج محلية | + مسار تفاعلي موثق | نفسها |

## 3. حدود المسؤولية (§21.4 حرفيًا)

- **يقرر التطوير:** البنية التقنية، إدارة الحالة، جلب البيانات، الأداء، طريقة تحقيق الدلالات.
- **لا يغير التطوير:** الألوان/Radius/المكونات/ترتيب المعلومة/نوع الطبقة/الأيقونة/الحالة/الحركة بدعوى سهولة التنفيذ — كلها محمية بـTokens وعقود موثقة هنا.
- **لا يخترع أحد:** أثرًا ماليًا أو قاعدة حساب أو حالة طلب أو صلاحية — الفجوات موثقة (GAP-004/005/006) وتُستكمل من منطق المنتج.
- التصنيف: مخالفة الشاشة المعتمدة مستقبلًا = Defect؛ تغيير Navigation/هوية/عقد مكوّن = Change Request.

## 4. تسلسل التطوير الموصى به بعد الاعتماد

Foundations (نقل الأدوار وتكييف التوكنز مع بنية Micro) → Core → Financial → Contextual → Global Shell → الرحلات الحرجة (بيع نقدي/آجل، تحصيل، قراءة النتيجة) → بقية الشاشات من Coverage Ledger → Stress Cases. الشاشات الثلاث تُعمم مكوناتها — لا تُنسخ شاشة بعنوان جديد (§03-SPEC).

## 5. بوابة نقل المعايير

ابدأ بالمكونات والأساسات المشتركة قبل نقل تكوين أي شاشة. افحص تأثيرها على جميع واجهات Micro القائمة، ثم صمم تكوين كل شاشة حسب المهمة والبيانات الحقيقية. فحوص المتصفح بعد تعديل صفوف 200% والأجهزة الحقيقية لا تزال غير مكتملة.

## 6. تحديث قرار المالك وحدود التنفيذ (2026-09-23)

المالك اعتمد اللغة المرئية المعروضة في V2، لذلك يجوز بدء نقل Foundations والمكونات والشاشات الثلاث المنفذة تدريجيًا. `OVR-SNAPSHOT-ALL` نمط عرض معتمد في الاستوديو، وتفصيله كشاشة منتج لاحق يحتاج تحديد المهمة والبيانات. لا يوجد اعتماد لنسخ بيانات Fixtures أو إتمام 43 شاشة مؤجلة أو اعتبار `STUDIO-COMPONENTS` شاشة منتج. بعد النقل، افحص 320/360/390/412 وتكبير 150/200% والـRTL على الجهاز، وتحقق من «أثر العملية» باستخدام منطق Micro الحقيقي. [قرار الجاهزية التفصيلي](../TRANSFER-READINESS-V2.md).
