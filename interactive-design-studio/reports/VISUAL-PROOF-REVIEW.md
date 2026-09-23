# VISUAL-PROOF-REVIEW — دليل المراجعة المرئي للعينات الثلاث (بوابة 16-المرحلة 2)

**التاريخ:** 2026-09-23 · **المنفذ:** Zed AI (GLM) · **الطريقة:** تشغيل الاستوديو من مصدره (`npm run build` نظيف) ثم فحص متصفح Chromium حقيقي داخل بيئة التنفيذ مع لقطات فعلية + فحص VLM للجودة البصرية + فحوص آلية (أخطاء Console، تجاوز أفقي، RTL).

كل صف أدناه: Question · Frame/Route · Fixture source · Observed evidence · Failure/hypothesis · Fix · Review state.

## أسئلة بوابة العينات (ملف 16)

### 1) هل يفهم مالك مشروع أردني أين يقف خلال نظرة سريعة في OVR-NOW، دون خلط الكاش بالربح؟

- **Frame/Route:** `#/OVR-NOW?state=complete&w=360` (+ لقطات fullpage و320/390/412)
- **Fixture source:** `fixtures/ovr-now.json` (complete) من 14-FIXTURES
- **Observed evidence:** بطاقة الكاش Indigo قوية واحدة (385.75 د.أ) ببيان نزاهة «الكاش ليس ربحًا — يشمل رأس المال العامل»؛ Insight واحدة قابلة للإجراء (دين مستحق اليوم + إجراء)؛ فحص VLM أكد: عربية سليمة متصلة، RTL صحيح 100%، المبلغ بالشكل الصحيح رقمًا ثم «د.أ»، لا تداخل/قصّ، Indigo هو الكتلة القوية الوحيدة.
- **Failure/hypothesis:** سهم الإجراء يشير يسارًا — تقدم في RTL (§16.1) لكن قد يبدو «رجوعًا» لبعض المراجعين.
- **Fix:** بقي كما هو (قرار معتمد: Chevron يتبع RTL)؛ إن رأاه المالك ملتبسًا فهو ملاحظة مراجعة لا عيب تنفيذ.
- **Review state:** **Ready for Owner Review**

### 2) هل يُخفى شيء حرج خلف Swipe في OVR-NOW؟

- **Frame/Route:** `#/OVR-NOW?state=partial` و`insufficient`
- **Fixture source:** نفس الملف (سيناريو partial/insufficient)
- **Observed evidence:** الحالات الحرجة (نتيجة تقديرية/تعذر الحساب/ديون غير مؤكدة) تظهر **داخل البطاقات نفسها** بإشارات ونصوص، والمؤشر «1 من 4» ظاهر؛ Insight الجزئية والأولوية فوق الـDeck لا داخله.
- **Fix:** لا حاجة.
- **Review state:** **Ready for Owner Review**

### 3) هل يدخل المستخدم بيعًا نقديًا/آجلًا دون تخمين ويرى الأثر قبل الحفظ في OPS-SALE-CREATE؟

- **Frame/Route:** `#/OPS-SALE-CREATE?state=impact` و`impact-credit`
- **Fixture source:** `fixtures/ops-sale-create.json` (impact values موسومة GAP-004)
- **Observed evidence:** قسم «أثر العملية» فوق الإجراء النهائي بصيغة قبل/بعد (385.75 ← 415.00 / دين أبو محمد 62.50 ← 90.00) مع وسم «قيم عرض من Fixtures لبيان طريقة العرض فقط — الأثر المالي الفعلي يحدده منطق المنتج»؛ فحص VLM: القيم صحيحة مقروءة والزر ثابت وواضح.
- **Failure/hypothesis:** وسم الفيكستشر تحت قسم الأثر قد يُقرأ كنص منتج زائد.
- **Fix:** مقبول لأنه شرط صدق صريح من §21.2 («محاكاة معلنة») — يُناقش مع المالك.
- **Review state:** **Ready for Owner Review**

### 4) هل يفهم أخطاء الإدخال والفشل والعودة في نموذج البيع؟

- **Frame/Route:** `validation` / `failure` / `success` (+ لقطات تفاعل: `interaction_sale-validation-errors`، `interaction_sale-success-echo`)
- **Fixture source:** نفس الملف؛ رسالة الفشل الحرفية من 14-FIXTURES
- **Observed evidence:** أخطاء محددة بعد المتابعة (عميل آجل مطلوب؛ سعر غير مسجل — لا يمكن حساب الإجمالي: يظهر `—` لا صفرًا)؛ الفشل يحفظ المدخلات ويظهر «لم تُحفظ العملية» بجوار الإجراء مع «إعادة المحاولة»؛ النجاح يعود للسياق مع Echo واحد موسوم كمحاكاة.
- **Fix:** لا حاجة.
- **Review state:** **Ready for Owner Review**

### 5) هل يفهم المستخدم الفرق بين الرصيد والإيراد والنتيجة والدين في FIN-OVERVIEW؟

- **Frame/Route:** `#/FIN-OVERVIEW?state=complete` (+ fullpage) و`negative` و`zero`
- **Fixture source:** `fixtures/fin-overview.json`
- **Observed evidence:** أقسام الأسئلة الأربعة مفصولة بوضوح (كم معي الآن؟ / ماذا دخل وخرج؟ / ما لي وما عليّ؟ / النتيجة واكتمالها)؛ كل كتلة ببيان نزاهة «ماذا يمثل/ما لا يمثله»؛ النتيجة المكتملة `ربح 420.00 د.أ · بحسب جميع البيانات المسجلة» والسالبة «−80.00» مشروحة نصيًا والصفر الحقيقي موسوم؛ فحص VLM للتكوين الكامل أكد ظهور بطاقة النتيجة وقسم المقارنة وحالة «بانتظار تحديد المحفظة».
- **Fix:** لا حاجة.
- **Review state:** **Ready for Owner Review**

### 6) هل تختلف التركيبات بين Overview وOperations وFinance (لا قالب واحد معاد)؟

- **Frame/Route:** الشاشات الثلاث بوضعها الافتراضي (لقطات fullpage-*)
- **Observed evidence:** ثلاث لغات تكوين: OVR قراءة وقرار (Deck + Insight + صفوف)، OPS إجراء (نموذج + شريط ثابت)، FIN تفسير (أسئلة متدرجة + كتلة كاش + نتيجة). اختبار Brand Substitution: لا يمكن إسقاط اسم SaaS آخر دون فقد الطابع (بطاقات مالية رباعية الوحدات، أقسام أسئلة عربية، بيانات نزاهة) — رأي تنفيذي موثق بانتظار حكم المالك.
- **Review state:** **Ready for Owner Review**

### 7) هل تبقى الهرمية دون اللون (Grayscale)؟

- **Frame/Route:** `gray=1` على الشاشات الثلاث (لقطات `*_gray`)
- **Observed evidence:** فحص VLM على FIN الرمادية: الهرمية واضحة بالوزن والحجم والمساحة، لا اعتماد على اللون وحده (كل حالة صحبت نصًا وإشارة).
- **Review state:** **Ready for Owner Review**

### 8) هل تصمد الشاشات على 320/360/390/412 وتكبير 150/200 وRTL؟

- **Frame/Route:** مصفوفة كاملة عبر مبدّل العرض/التكبير (لقطات `*_320/390/412` و`*_z150/z200`)
- **Observed evidence:** **صفر تجاوز أفقي آليًا** في كل التوليفات (فحص scrollWidth/clientWidth)؛ عند 200%: لا قصّ ولا تداخل (فحص VLM)، التسميات مقروءة، المبلغ الكبير كامل مع وحدته؛ RTL مثبت آليًا (dir/direction/الخط Alexandria فعلي).
- **Review state:** **Ready for Owner Review** (فحص المتصفح — الجهاز الفعلي UNVERIFIED)

### 9) الحالات الطرفية: Loading وError وOffline

- **Frame/Route:** `OVR-NOW/error` (RecoveryStage بالملخص فقط) · `OVR-NOW/offline` و`FIN-OVERVIEW/offline` (Ribbon + stale + بانتظار الإرسال) · `OPS-SALE-CREATE/saving` (Action Hold)
- **Observed evidence:** لقطات مطابقة للقرارات: الخطأ لا يمسح الشاشة، Offline يفصل الاتصال عن الحفظ/الإرسال، والحفظ يعرض إشارة واحدة بلا زر يتحول دائرة.
- **Review state:** **Ready for Owner Review**

## سجل عيوب التنفيذ التي ظهرت وعولجت أثناء الفحص (Builder Self-Audit)

| العيب | الأثر | الإصلاح |
|---|---|---|
| تلميح «اسحب لعرض بطاقة أخرى» كان يغطي زر البطاقة التالية (تداخل لمس) | P2 — تعطيل تفاعل | أُعيد بناء صف المؤشر عموديًا (hint تحت الأزرار) وأُعيد البناء والفحص — زال العيب |
| sticky toolbar للاستوديو كان يحجب العناصر عند التمرير إليها | P3 — قابلية استخدام طبقة المراجعة | أُضيف `scroll-padding-block-start` للصفحة |

## الحكم النهائي لهذه البوابة

**كل العينات: `Ready for Owner Review`** — لا `Approved` (يمنحه المالك فقط بدليل موافقة حقيقية). لا P0/P1 معروفة. ما بعد البوابة: تعميم المكونات على بقية المجال بعد قرار المالك (لا قبل)، مع بقاء كل الجديد `Candidate`.
