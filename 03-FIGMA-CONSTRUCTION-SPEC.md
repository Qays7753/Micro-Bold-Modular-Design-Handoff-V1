# Figma Construction Specification

**المرجع:** ملف القرارات §§3–16 و21.2 و21.3. هذه مواصفات تكوين، لا ملف Figma منجز.

## صفحات الملف `Micro Visual System — V1`

`00 Start Here`، `01 Foundations`، `02 Identity & Assets`، `03 Core Components`، `04 Financial Components`، `05 Contextual Patterns`، `06 Overview & Insights`، `07 Operations & Orders`، `08 Finance & Money`، `09 Catalog & Relationships`، `10 Tools & Utilities`، `11 Market & Services`، `12 Cross-flow Layers`، `13 Stress & Edge Cases`، `14 Motion, RTL & Accessibility`، `15 Handoff & QA`، `99 Archive`.

تنظم الشاشات حسب المجال لا رقم التبويب؛ Mapping V1 منفصل. صفحة Archive موسومة `NOT FOR IMPLEMENTATION`. لا تستخدم صفحة واحدة ضخمة أو صفحة لكل Screen ID.

## Foundations

- أنشئ Color Primitives ثم Semantic Tokens ثم Component Tokens عند حاجة متكررة. `Light` فقط؛ لا Dark Mode أو Dark Tokens وهمية.
- أدخل القيم المعتمدة وأزواج Foreground/Background من §8، ولا تحوّل نسب 70/20/10 أو 5–8% إلى حدود آلية لكل شاشة.
- Alexandria أساسي، Noto Sans Arabic fallback؛ الأرقام الإنجليزية `0–9` مع Tabular Numbers للقيم. راجع التراخيص والإتاحة قبل تسليم الخطوط.
- سلم Typography وظيفي من §7؛ Spacing وRadius من §§6 و10؛ Motion من §15/16.6. إذا بدا قياس في ملف القرار إرشاديًا كنطاق لا تخترع قيمة «معتمدة» جديدة من دون توثيق اختيارها داخل النطاق وسببها.
- العرض المرجعي 360 مع Reflow على 320/390/412، والارتفاع حسب المحتوى وSafe Areas؛ يدعم تكبير 200%.

## مكونات وحالات

ابنِ Core ثم Financial ثم Contextual، ووثق لكل مكوّن: Anatomy، متى يستعمل/لا يستعمل، الحالة، التفاعل، Reflow، RTL، Focus، قارئ الشاشة، Motion، مثال صحيح ومرفوض. استخدم Component Properties للحالات ذات المعنى، وSlots للمحتوى المرن حيث تنطبق؛ لا تبن كل تقليب نظري بلا استخدام. المكوّن الأساسي `Candidate` ثم `Stable` بعد المراجعة؛ الاستبدال `Deprecated` موثق.

على الأقل عند وجود الحاجة المثبتة: أزرار وإجراءات، Input وأنواع الاختيار، صفوف وحاويات، Filter Command وPanel، تنقل وترويسة، Sheets وDialogs وMenus، Money Value، Snapshot Deck، Truth Layer، Transaction Row، Debt/Collection، Impact Preview، Insights، Empty/Loading/Error/Offline/Success/Unavailable. `Chart System` و`Half-Ring` أنماط مشروطة بسؤال وبيانات دقيقة، ولا يفرضان شاشة رسوم مستقلة. قائمة الجرد التفصيلية في `06-COMPONENT-INVENTORY.csv`؛ لا تعتبر هذه القائمة مغلقة أمام ميزة جديدة.

## التكوين والتسمية

- Auto Layout وConstraints ودلالات Layout العربية. لا تستخدم Mirror عام أو مسافات يدوية لإصلاح BiDi.
- Frames وظيفية مثل `Finance/Overview/Loaded/360`، ومعرف ثابت مستقل مثل `FIN-OVERVIEW`؛ لا `Frame 12` أو `Copy 7`.
- اربط Screen IDs بالمجال ثم Navigation Mapping الحالي؛ لا تضع ترتيب التبويبات في اسم المكوّن.
- يظل النص العربي قابلًا للتحرير والأرقام نصًا لا Vector. لا Detach غير موثق ولا Hex خام داخل Instances.
- «مكوّن واحد» لا يعني «كل شيء Card»؛ الاختلاف في التكوين يعكس وظيفة المجال وحالة البيانات.

## اختبار تصميم أولي قبل الانتشار

أنشئ قدرًا محدودًا من المكونات المرشحة اللازمة لثلاث عينات ذات بنية مختلفة على الهاتف: ملخص `OVR-NOW`، عملية `OPS-SALE-CREATE`، وموقف مالي `FIN-OVERVIEW`. اختبر الوظيفة والتميّز في Light Mode وRTL وبيانات طويلة وحالات نقص البيانات؛ افحص التكوين الملون ثم البنية دون لون. وثّق روابط ودليل `VISUAL-PROOF-REVIEW.md` حسب `16-EXECUTION-STAGES-AND-PROOF-GATES.md`؛ بعد نجاح البوابة عمّم المكونات ولا تكرر شاشة واحدة مع عنوان مختلف. تبقى العينات `Candidate/In Review` حتى يراجعها المالك.

## التصدير والتسليم

قدم رابط Figma بتصريح تحرير/نسخ يملكه المستخدم، ونسخة قابلة للتنزيل إن تسمح الأداة والصلاحيات، وحزمة SVG/Fonts مع التراخيص وToken Dictionary. إذا لم توجد صلاحية للتصدير، اذكر القيد ووسيلة احتياطية قابلة للتنفيذ؛ لا تختلق `.fig`.
