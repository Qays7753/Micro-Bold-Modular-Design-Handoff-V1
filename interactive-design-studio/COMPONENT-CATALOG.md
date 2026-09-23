# COMPONENT-CATALOG — مكوّنات الاستوديو المنفذة (V2 — مراجعة 2026-09-23)

> كل مكوّن منفذ أدناه **قابل للفحص حيًّا**: في سيناريو موجود أو داخل `#/STUDIO-COMPONENTS` (مساحة مراجعة الاستوديو). التفصيل الكامل لنتائج الفحص في `reports/REVISION-COVERAGE-LEDGER.md`.

## Core (`src/components/core/`)

| المكوّن | Variants المنفذة | أين يُفحص |
|---|---|---|
| `Button` | primary (صلب Action #A94630) · secondary · tertiary · accent (هوية بنص Ink) · destructive · compact · icon · loading (Action Hold) · disabled · success | STUDIO-COMPONENTS + أزرار الشاشات |
| `IconButton` | regular · fill · active (Brand-Soft + Action) · disabled | STUDIO-COMPONENTS + قائمة الفترة |
| `Field/TextField/AmountField` | نص · بحث بأيقونة · هاتف · خطأ (حد Danger + رسالة) · اختياري · مسح القيمة · LTR معزول · مبلغ بـ«د.أ» ثابتة | STUDIO-COMPONENTS + نموذج البيع |
| `SegmentedControl` | نقدي/آجل — اختيار بسطح + وزن + نقطة Action | نموذج البيع (ارتفاع 48) + STUDIO-COMPONENTS |
| `OpenRow/RowGroup` | افتراضي · unavailable (معطل موثق السبب) · مع قيمة مالية · مع chevron | كل الشاشات + STUDIO-COMPONENTS |
| `Overlays` | Sheet (من الأسفل + إغلاق/Escape) · Dialog (قراران صريحان + destructive) · AnchoredMenu (listbox + محدد) | أوراق الأصناف/العملاء · حوار الخروج · قائمة الفترة · تفصيل النتيجة · STUDIO-COMPONENTS |
| `Skeleton/StructuralLoad` | text/title/money/row · summary/section/list | STUDIO-COMPONENTS |

## Financial (`src/components/financial/`)

| المكوّن | الحالات/Variants | أين يُفحص |
|---|---|---|
| `MoneyValue` | known · true-zero · negative (مشروح) · estimated («تقريبًا») · partial · not-recorded · cannot-compute · unknown · stale · hero/list/body | FIN/OVR بكل سيناريوهاتها + STUDIO-COMPONENTS (التسع كلها) |
| `SnapshotDeck` | **سحب مباشر حقيقي** (المحتوى يتبع الإصبع + مقاومة الحواف) + أزرار الوصول + مؤشر «n من m» + strong (هوية بنص Ink — بطاقة النتيجة) + partial/unknown بشريط جانبي + تلميح صادق | OVR-NOW بكل حالاته + OVR-SNAPSHOT-ALL |
| `TruthNote` | منكشف من المصدر · فوق كتلة الهوية (لوح أبيض داخلي) · تحذير (ما لا يمثله) | كل البطاقات المالية + STUDIO-COMPONENTS |
| `TransactionRow` | بيع نقدي/آجل · تحصيل · دفعة · جزئي (أصل/مدفوع/متبقي) · محفوظ محليًا/بانتظار الإرسال | آخر الحركات + STUDIO-COMPONENTS |
| `ResultBlock` | complete (حاوية نجاح + كلمة «ربح») · negative (حاوية خطر + «خسارة») · partial · insufficient + **تفصيل حقيقي داخل Sheet** + إجراء بوجهة حقيقية | FIN-OVERVIEW بكل حالاته |
| `ImpactPreview` | قبل/بعد · صف غير محسوب (null) · وسم Fixtures | نموذج البيع (impact/impact-credit) + Echo + STUDIO-COMPONENTS |

## Contextual (`src/components/contextual/`)

| المكوّن | الحالات/Variants | أين يُفحص |
|---|---|---|
| `MicroSignal` | complete · partial · in-progress (متنفس) · unknown · draft · error · local-saved — sm/md، وداخل كتلة الهوية بـInk | في كل الشاشات + STUDIO-COMPONENTS (السبع كلها) |
| `ContextTrace` | مع إشارة حالة · بلا إشارة | رؤوس الشاشات والتذييل |
| `ContextSeam` | neutral · warning · info · partial · local (مع إجراء) | غير الموزع في FIN + STUDIO-COMPONENTS |
| `SystemRibbon` | دون اتصال (Information) + إجراء حقيقي (العمليات المعلقة) | OVR/FIN offline |
| `RecoveryStage` | خطأ منطقة + إعادة محاولة + آخر مزامنة | OVR error + STUDIO-COMPONENTS |
| `EmptyState` | first-move · continuation · search-reset · period-gap · clear-state | أول استخدام + لا حركات + STUDIO-COMPONENTS (الخمسة كلها) |
| `Insight` | opportunity (Brand-Soft) · attention (Attention) · action-now (Attention — دين مستحق) · missing-data (Partial) · clear | OVR بكل حالاته + STUDIO-COMPONENTS |

## Iconography (`src/components/icons/`)

- `Icon`: Phosphor (MIT) بنكان regular/fill، `currentColor`، حجم من Tokens، بديل نصي للأيقونات المعنوية المستقلة (`alt`). **لا ألوان موروثة قديمة** — كل الاستهلاك عبر Tokens الدلالية.
- علامة `micro-quad` الرباعية بلون الهوية `#D97757` (إشارة اختيار التبويب + اسأل Micro + شعار الاستوديو الرباعي بألوان المنظومة).

## Studio Chrome (`src/studio/`)

- `StudioShell/ReviewControls`: شريط **مدمج قابل للطي** — الشاشة والحالة ظاهران دائمًا، وأدوات العرض (العرض/التكبير/الرمادي/الحركة) خلف زر ملخص `360 · 100%` (18 §1.7) بلون كروم Information منفصل عن هوية الهاتف. درج معلومات الشاشة + عن الاستوديو + روابط عميقة.
- `urlState`: موجّه Hash كامل: `#/SCREEN?state=…&w=…&z=…&gray=1&rm=1`.
- `StudioComponents`: مساحة مراجعة المكوّنات (ليست شاشة منتج).
