# DESIGN-TO-DEVELOPMENT — تسليم التنفيذ البصري (V2 — مراجعة 2026-09-23)

**المرجع:** `08-DESIGN-TO-DEVELOPMENT.md` (قالب الحزمة) + §21.4 + 17-COLOR-DECISION (المنظومة اللونية الحاكمة). هذا الجسر من الاستوديو المرشح إلى تطوير Micro: لا يفرض Framework (§03-SPEC)، ويحدد ما يحميه التصميم وما يقرره التطوير.

## 1. خريطة Design → Code (المكونات المنفذة)

| Design ID | مسار الاستوديو | Token IDs | Variants/States المنفذة | نظير الإنتاج | الحالة |
|---|---|---|---|---|---|
| `Financial/MoneyValue` | `src/components/financial/MoneyValue.tsx` | `--type-money-*` + `--c-ink` | Known/TrueZero/Negative/Estimated/NotRecorded/CannotCompute/Unknown/Stale | يعينه فريق التنفيذ | Candidate |
| `Financial/TruthNote` | `…/TruthNote.tsx` | `--c-surface-2` + ألوان دلالية | Complete/Partial/Insufficient/Offline/Error | يعين | Candidate |
| `Financial/SnapshotDeck` | `…/SnapshotDeck.tsx` | `--radius-card-lg` + `--c-brand`/`--c-on-brand` | بطاقة النتيجة القوية (Ink فوق الهوية) / جزئية بشريط / غير كافية + **سحب مباشر حقيقي** + مؤشر n من 4 + «عرض الكل» حقيقي | يعين | Candidate |
| `Financial/TransactionRow` | `…/TransactionRow.tsx` | `--size-row-tx` | Default/Partial/LocalSaved/PendingSync | يعين | Candidate |
| `Financial/ResultBlock` | `…/ResultBlock.tsx` | `--c-success-surface`/`--c-danger-surface`/`--c-partial-surface` | Complete (ربح)/Negative (خسارة)/Partial/Insufficient + كلمة حكم + تفصيل Sheet | يعين | Candidate |
| `Financial/ImpactPreview` | `…/ImpactPreview.tsx` | `--c-surface-2` | قبل/بعد + غير محسوب | يعين | Candidate (القيم من منطق المنتج) |
| `Contextual/*` (Signal/Trace/Seam/Ribbon/Recovery/Empty/Insight) | `src/components/contextual/` | `--signal-*` + أسطح دلالية | انظر COMPONENT-CATALOG | يعين | Candidate |
| `Navigation/*` (Header/AccountPanel/BottomNav) | `src/navigation/` | `--size-tabbar`/`--size-header`/`--nav-selected-ink` | Default/Scrolled/Selected (علامة رباعية)/Badge/PanelOpen + **سحب بين الصفحات §11.12** | يعين | Candidate |
| `Core/*` (Button/Segmented/Field/OpenRow/Sheet/Dialog/Menu/Skeleton) | `src/components/core/` | انظر TOKEN-DICTIONARY | انظر COMPONENT-CATALOG | يعين | Candidate |

## 2. لكل شاشة منفذة — ما يسلَّم للتطوير

| البند | OVR-NOW | OPS-SALE-CREATE | FIN-OVERVIEW |
|---|---|---|---|
| المرجع | `#/OVR-NOW` + 04-CSV | `#/OPS-SALE-CREATE` + 04-CSV | `#/FIN-OVERVIEW` + 04-CSV |
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

Foundations (tokens.css جاهزة للنقل كما هي) → Core → Financial → Contextual → Global Shell → الرحلات الحرجة (بيع نقدي/آجل، تحصيل، قراءة النتيجة) → بقية الشاشات من Coverage Ledger → Stress Cases. الشاشات الثلاث تُعمم مكوناتها — لا تُنسخ شاشة بعنوان جديد (§03-SPEC).

## 5. نقاط تحقق قبل بدء الإنتاج (بوابة §21.4)

شاشات وحالات معتمدة من المالك (بعد هذه المراجعة) + Tokens/القياسات (موثقة) + Reflow/RTL (محقون بالاستوديو) + الأصول والتراخيص (ASSET-MANIFEST) + Screen IDs ومقاييس القبول (09-QA). ما زال مفقودًا حتى الاعتماد: قرار المالك على العينات الثلاث، ثم التحقق الواقعي (جهاز/مستخدمون) كمرحلة مستقلة (§21.5).
