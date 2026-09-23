# COMPONENT-CATALOG — كتالوج المكونات المنفذة

**المرجع:** `06-COMPONENT-INVENTORY.csv` (بذرة) + §§10، 12، 13، 14. الحالة العامة: `Candidate` حتى مراجعة المالك (§03-SPEC). لا Hex داخل أي مكون — Tokens فقط.

## Core Components (§10)

| المكوّن | الملف | الأدوار/الحالات المنفذة | المرجع | ملاحظات التنفيذ |
|---|---|---|---|---|
| `Action/Button` | `components/core/Button.tsx` | Roles: Primary/Accent/Secondary/Tertiary/Destructive · States: Default/Pressed/Focused/Loading/Disabled/Success | §10.1 | Loading يحافظ على الهندسة (Micro Signal + تسمية مستمرة)؛ أيقونة قبل النص يمينًا والسهم الاتجاهي في الطرف المقابل (caret-left في RTL)؛ Accent (Citrus) محصور في غير المالي |
| `Action/IconButton` | `components/core/Button.tsx` | Default/Pressed/Focused/Active/Disabled | §10.1، §16.4 | لمس ≥44×44 مع تسمية وصول إلزامية |
| `Select/SegmentedControl` | `components/core/SegmentedControl.tsx` | نقدي/آجل — اختيار واحد من 2–3 | §10.3، §12.4 | حاوية واحدة R12؛ الاختيار بالسطح+الوزن+المؤشر لا باللون وحده؛ role=radiogroup |
| `Field/Text` | `components/core/Field.tsx` | Empty/Filled/Focus/Error (+ بحث بحقل Sheet الاختيار) | §12.3 | عنوان ثابت، خطأ محدد أسفل الحقل بلا خلفية حمراء، زر مسح ≥44، حقول رقمية معزولة LTR |
| `Field/Amount` | `components/core/Field.tsx` | Empty/Filled/Error/Read-only | §12.4 | `د.أ` في الطرف المقابل، inputMode=decimal، أرقام إنجليزية فقط، لا تنسيق أثناء الكتابة |
| `Content/OpenRow` + `RowGroup` | `components/core/OpenRow.tsx` | Default/Pressed/Focused | §10.2 | أيقونة يمينًا/قيمة يسارًا؛ Divider داخلي لا يمتد للحواف؛ الصف كامل هدف واحد |
| `Overlay/Sheet` | `components/core/Overlays.tsx` | Closed/Open (+ Footer قرار) | §10.6، §11.13 | R24 علوي، عنوان يمينًا وإغلاق يسارًا، 220–280ms، Esc/النقر خارج عند الأمان فقط، لا Sheet فوق Sheet |
| `Overlay/Dialog` | `components/core/Overlays.tsx` | Closed/Open/Focus/قرار حساس | §10.6، §15.6 | عرض 90%، R20، أفعال صريحة (تسجيل الخروج/البقاء) لا نعم/لا، المدمر Danger والآمن غير متساويين |
| `Menu/AnchoredMenu` | `components/core/Overlays.tsx` | Closed/Open/Selected (قائمة الفترة) | §10.6، §12.4 | يفتح من مصدره 180–220ms؛ Check بجوار المحدد |
| `Feedback/Skeleton` + `StructuralLoad` | `components/core/Skeleton.tsx` | Local/Waiting/ReducedMotion | §14.4 | يحاكي إيقاع المحتوى؛ مؤشر متحرك واحد |

## Financial Components (§13)

| المكوّن | الملف | الحالات المنفذة | المرجع | ملاحظات |
|---|---|---|---|---|
| `Financial/MoneyValue` | `components/financial/MoneyValue.tsx` | Known/TrueZero/Negative/Estimated/NotRecorded/CannotCompute/Unknown/Stale | §13.3، §13.20، §16.2 | **المكوّن الوحيد المخوّل بعرض المبالغ**؛ الغياب `—`/نص حالة ولا يتحول صفرًا أبدًا؛ قارئ الشاشة يسمع «دينار أردني» |
| `Financial/TruthNote` | `components/financial/TruthNote.tsx` | Complete/Partial/Insufficient/Offline/Error | §13.2، §13.11 | «ماذا يمثل/الفترة/حالة البيانات/ما لا يمثله/مصدر القيمة» ينكشف من أسفل البطاقة (Seam Reveal) |
| `Financial/SnapshotDeck` | `components/financial/SnapshotDeck.tsx` | بطاقة واحدة ظاهرة + مؤشر «1 من 4» + عرض الكل + بطاقات Partial/Insufficient | §13.4 | الحالات العاجلة داخل البطاقة لا خلف Swipe؛ R22/P20؛ الكاش كتلة Indigo قوية |
| `Financial/TransactionRow` | `components/financial/TransactionRow.tsx` | Default/Partial-amount/LocalSaved/PendingSync | §13.5، §13.20 | صف مفتوح؛ التمييز بالأيقونة والاسم والإشارة؛ الجزئي يعرض الأصل/المدفوع/المتبقي؛ حالات الحفظ ببيانات الصف الثانوية |
| `Financial/ResultBlock` | `components/financial/ResultBlock.tsx` | Complete/Partial/Insufficient + ربح/خسارة/— | §13.11 | مكتملة Indigo؛ جزئية Lavender «نتيجة تقديرية»؛ متعذرة محايدة مع `—` والسبب والإجراء |
| `Financial/ImpactPreview` | `components/financial/ImpactPreview.tsx` | قبل/بعد + غير محسوب (`—` + Partial Signal + السبب) | §13.8 | قسم مفتوح فوق الإجراء النهائي؛ قيم Fixtures موسومة بأنها بيان تنسيق فقط (GAP-004) |

## Contextual Components (§14)

| المكوّن | الملف | الحالات | المرجع |
|---|---|---|---|
| `MicroSignal` | `components/contextual/MicroSignal.tsx` | complete/partial/in-progress/unknown/draft/error/local-saved | §10.4 (أصل مرشح GAP-002) |
| `Context/Trace` | `components/contextual/Contextual.tsx` | سياق هادئ ملاصق للمعلومة | §14.2 |
| `Context/Seam` | `Contextual.tsx` | neutral/warning/info/partial/local + إجراء | §14.2 |
| `Context/SystemRibbon` | `Contextual.tsx` | دون اتصال + ملخص انتظار الإرسال | §14.7 |
| `Context/RecoveryStage` | `Contextual.tsx` | تعثر منطقة + إعادة محاولة + آخر مزامنة ناجحة | §14.6 |
| `Context/EmptyState` | `Contextual.tsx` | first-move/continuation/search-reset/period-gap/clear-state | §14.3 |
| `Context/Insight` | `Contextual.tsx` | opportunity/attention/action-now/missing-data/clear — خلاصة→دليل→اكتمال→إجراء | §13.19 |

## Navigation (§11)

| المكوّن | الملف | الحالات | المرجع |
|---|---|---|---|
| `Navigation/Header` | `navigation/AppHeader.tsx` | Default/Scrolled (انتقال Canvas→أبيض 180ms + Divider) + شريط نظام محاكى Edge-to-Edge | §§11.7–11.8 |
| `Overlay/AccountPanel` | `navigation/AppHeader.tsx` | Open/Closed + حساب غير مكتمل (`بيانات المشروع غير مكتملة` + إكمال البيانات) + Dialog تسجيل خروج | §11.9 |
| `Navigation/Bottom` | `navigation/BottomNav.tsx` | Selected (Fill+Indigo+SemiBold+علامة Micro) / Unselected (Regular+Secondary) / Badge (3 على العمل فقط) | §§11.1–11.5 |

## مكونات الجرد غير المنتجة (موسومة بصدق)

`Select/Radio`، `Select/Checkbox`، `Select/Toggle`، `Field/Search` (مغطى جزئيًا كحقل بحث داخل Sheet الاختيار)، `Filter/CommandButton` + `Filter/ContextualPanel` (أُنتج فقط AnchoredMenu للفترة — لوحة الفلاتر الكاملة مؤجلة مع شاشاتها)، `Financial/ChartLine/ChartBar/HalfRing` (مشروطة بسؤال وبيانات مثبتة — FIN-CHARTS مؤجل بالشرط)، `Financial/WalletAllocation`، `Financial/DebtCollection` (الواجهة الكاملة مؤجلة مع FIN-DEBTS؛ ظهرت صفوف الديون داخل FIN-OVERVIEW عبر OpenRow+MoneyValue). انظر `SCREEN-CATALOG.md` و`07-DECISION-TRACEABILITY.csv` للحالات.
