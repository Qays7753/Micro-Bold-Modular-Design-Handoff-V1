# Interactive Design Studio Construction Specification

**المرجع:** ملف القرارات §§3–16 و21.2 و21.3. هذه مواصفات تكوين استوديو مستقل، لا دليل على أن الاستوديو قد بُني.

## أقسام ومناطق مراجعة `Micro Visual System — V1`

`00 Start Here`، `01 Foundations`، `02 Identity & Assets`، `03 Core Components`، `04 Financial Components`، `05 Contextual Patterns`، `06 Overview & Insights`، `07 Operations & Orders`، `08 Finance & Money`، `09 Catalog & Relationships`، `10 Tools & Utilities`، `11 Market & Services`، `12 Cross-flow Layers`، `13 Stress & Edge Cases`، `14 Motion, RTL & Accessibility`، `15 Handoff & QA`، `99 Archive`.

تنظم الشاشات حسب المجال لا رقم التبويب؛ Mapping V1 منفصل. صفحة Archive موسومة `NOT FOR IMPLEMENTATION`. لا تستخدم صفحة واحدة ضخمة أو نسخ Foundations مستقلة لكل Screen ID. وفّر روابط شاشة وحالة مستقرة، ومستكشف مكونات وحالات منفصلًا عن واجهة المستخدم.

## Foundations

- أنشئ Color Primitives ثم Semantic Tokens ثم Component Tokens عند حاجة متكررة. `Light` فقط؛ لا Dark Mode أو Dark Tokens وهمية.
- أدخل القيم المعتمدة وأزواج Foreground/Background من §8، ولا تحوّل نسب 70/20/10 أو 5–8% إلى حدود آلية لكل شاشة.
- Alexandria أساسي، Noto Sans Arabic fallback؛ الأرقام الإنجليزية `0–9` مع Tabular Numbers للقيم. راجع التراخيص والإتاحة قبل تسليم الخطوط.
- سلم Typography وظيفي من §7؛ Spacing وRadius من §§6 و10؛ Motion من §15/16.6. إذا بدا قياس في ملف القرار إرشاديًا كنطاق لا تخترع قيمة «معتمدة» جديدة من دون توثيق اختيارها داخل النطاق وسببها.
- العرض المرجعي 360 مع Reflow على 320/390/412، والارتفاع حسب المحتوى وSafe Areas؛ يدعم تكبير 200%.

## مكونات وحالات

ابنِ Core ثم Financial ثم Contextual، ووثق لكل مكوّن: Anatomy، متى يستعمل/لا يستعمل، الحالة، التفاعل، Reflow، RTL، Focus، قارئ الشاشة، Motion، مثال صحيح ومرفوض. استخدم Props/variants للحالات ذات المعنى، وSlots للمحتوى المرن حيث تنطبق؛ لا تبن كل تقليب نظري بلا استخدام. المكوّن الأساسي `Candidate` ثم `Stable` بعد المراجعة؛ الاستبدال `Deprecated` موثق.

على الأقل عند وجود الحاجة المثبتة: أزرار وإجراءات، Input وأنواع الاختيار، صفوف وحاويات، Filter Command وPanel، تنقل وترويسة، Sheets وDialogs وMenus، Money Value، Snapshot Deck، Truth Layer، Transaction Row، Debt/Collection، Impact Preview، Insights، Empty/Loading/Error/Offline/Success/Unavailable. `Chart System` و`Half-Ring` أنماط مشروطة بسؤال وبيانات دقيقة، ولا يفرضان شاشة رسوم مستقلة. قائمة الجرد التفصيلية في `06-COMPONENT-INVENTORY.csv`؛ لا تعتبر هذه القائمة مغلقة أمام ميزة جديدة.

## التكوين والتسمية

- Layout مرن وCSS logical properties ودلالات Layout العربية. لا تستخدم Mirror عام أو مسافات يدوية لإصلاح BiDi.
- مسارات وحالات وظيفية مثل `Finance/Overview/Loaded/360`، ومعرف ثابت مستقل مثل `FIN-OVERVIEW`؛ لا `Screen 12` أو `Copy 7`.
- اربط Screen IDs بالمجال ثم Navigation Mapping الحالي؛ لا تضع ترتيب التبويبات في اسم المكوّن.
- يظل النص العربي قابلًا للتحرير والأرقام نصًا لا Vector. لا نسخة مكون غير موثقة ولا Hex خام داخل المكونات.
- «مكوّن واحد» لا يعني «كل شيء Card»؛ الاختلاف في التكوين يعكس وظيفة المجال وحالة البيانات.

## اختبار تصميم أولي قبل الانتشار

أنشئ قدرًا محدودًا من المكونات المرشحة اللازمة لثلاث عينات ذات بنية مختلفة على الهاتف: ملخص `OVR-NOW`، عملية `OPS-SALE-CREATE`، وموقف مالي `FIN-OVERVIEW`. اختبر الوظيفة والتميّز في Light Mode وRTL وبيانات طويلة وحالات نقص البيانات؛ افحص التكوين الملون ثم البنية دون لون. وثّق روابط المعاينة والحالات ودليل `VISUAL-PROOF-REVIEW.md` حسب `16-EXECUTION-STAGES-AND-PROOF-GATES.md`؛ بعد نجاح البوابة عمّم المكونات ولا تكرر شاشة واحدة مع عنوان مختلف. تبقى العينات `Candidate/In Review` حتى يراجعها المالك.

## عقد التشغيل والفحص

- ضع مشروع الاستوديو في مسار مستقل مثل `studio/`، واكتب في README طريقة تثبيت dependencies مثبتة النسخة، والتشغيل المحلي، والبناء، ومسار المعاينة إن توفر؛ اختر التقنية وفق القدرة على تشغيلها وفحصها، ولا تفرض مكتبة جاهزة كشكل الواجهة.
- وفّر مستكشفًا للمكونات وحالاتها ومسارات الشاشات بمعرف Screen ID، مع مبدّل fixtures منفصل عن واجهة Micro نفسها؛ حدد حالات Default وPressed وFocus وLoading وEmpty وPartial وError وOffline وUnknown بحسب معنى كل عنصر، ولا تولد كل التوافيق اعتباطًا.
- أثبت تفاعل Filter وSheet وDialog والتنقل وBack وSwipe وKeyboard وReduced Motion بأدلة قابلة للإعادة. لا تحوّل أزرار المراجعة أو أدوات Debug إلى واجهة منتج.
- استخدم بيانات اختبار أردنية معلّمة؛ عند عملية حفظ أو تحصيل أو حساب ربح، لا تحاكي نجاح عملية مالية حقيقية. توضح أي نتيجة تمثيلية مصدر fixture وحدودها.
- احفظ لقطات شاشة للحالات الحرجة ودليل عرض 320/360/390/412 وتكبير 150/200% وRTL، مع تقرير فشل/تصحيح. تجربة متصفح هاتف ليست اختبار Android أصليًا أو اختبار مستخدم؛ ضع غير المختبر `UNVERIFIED`.
- رابط المعاينة يجب أن يفتح خارج جلسة المنفذ من هاتف المالك؛ إذا لم توجد استضافة ضمن الصلاحية الممنوحة، سلّم مصدرًا قابلًا للتشغيل وحدد المعاينة `Blocked` ولا تعلن التسليم مكتملًا. Figma أو Penpot مرفق اختياري.

## التشغيل والتسليم

قدم مصدر استوديو منظمًا داخل المستودع، مع تعليمات تثبيت وتشغيل وبناء يمكن إعادة تنفيذها ونسخة مثبتة للـdependencies، وروابط معاينة هاتف قابلة للفتح فعلًا، وحزمة SVG/Fonts مع التراخيص وToken Dictionary وfixtures. لا يكفي ملف HTML ثابت أو صور. اذكر إن كانت الاستضافة تحتاج خدمة خارجية وصلاحية مستقلة؛ إذا لم تتوفر ضع المعاينة `Blocked` بدل اختلاق رابط، وسلم المصدر القابل للتشغيل. لا توصل الاستوديو ببيانات حقيقية أو كود إنتاج Micro، ولا تصف الكود التجريبي بأنه جاهز للإنتاج. Figma اختياري.
