# REVISION-COVERAGE-LEDGER — سجل تغطية المراجعة الكاملة (V2 — 2026-09-23)

**الغرض (19-STUDIO-COMPLETE-COVERAGE-GATE §1):** يربط كل جزء منفذ في الاستوديو بمصدره ومواضع ظهوره وقراره اللوني/البصري الجديد وطريقة فحصه ودليله ونتيجته. الجولة غطت **كل ما نُفذ سابقًا وكل ما أضيف لهذه المراجعة** — لا سقفًا أدنى.

**المصادر المرجعية للألوان:** `17-COLOR-DECISION-2026-09-23.md` (هوية `#D97757` معتمدة المالك؛ البقية خط أساس مفوض). **أمر التصحيح:** `18-…` · **بوابة التغطية:** `19-…`.
**طريقة الفحص:** متصفح Chromium حقيقي عبر Playwright (47 فحصًا آليًا ناجحًا — `reports/QA-SUMMARY.md`) + فحص VLM بصري. الصفوف: `PASS` (فُحص فعليًا)، `UNVERIFIED` (يحتاج جهازًا/مستخدمين)، `NOT IMPLEMENTED` (مؤجل بصدق).
**الاختصارات:** SA = فحص آلي بالسكربت · VLM = فحص نموذج رؤية على اللقطة · E = `evidence/screenshots/`.

## A. الأساسيات (FOUNDATION)

| ID | المصدر | الاستخدام/المسارات | القديم (تاريخي) | القرار الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|---|
| F-TOK | `src/foundations/tokens.css` | كل الواجهة | 174 توكن بعائلة Indigo/Citrus | **163 توكن**: منظومة 17 كاملة (برميتيف → دلالي → مكوّن) + 5 قيم مشتقة موثقة؛ CSS وTS متطابقان | SA: تدقيق HEX/أسماء نصي نظيف + توليد القاموس آليًا | `TOKEN-DICTIONARY.md/.json` | **PASS** |
| F-TS | `src/foundations/tokens.ts` | تنسيق الأرقام + أزواج QA | أزواج Indigo القديمة | أزواج V2 الفعلية (16 زوجًا هنا + 25 في تقرير التباين) + `SEMANTIC_STATE_COLORS` الجديدة | SA: بناء نظيف + استهلاك المكونات | `reports/CONTRAST-REPORT.md` | **PASS** |
| F-RESET | `src/foundations/reset.css` | ::selection | Soft Indigo | Brand-Soft `#FBE9E2` + Ink | SA: تدقيق | مصدر CSS | **PASS** |
| F-TYPE | `src/foundations/typography.css` | كل النصوص | (بلا ألوان) | دون تغيير — نطاقات §7 | SA: خطوط فعلي Alexandria في الفحص | لقطات كل الشاشات | **PASS** |
| F-MOTION | `src/foundations/motion.css` | الحركات | echo بـSoft Indigo | echo بـBrand-Soft + إزالة fill-mode من انتقال الشاشة (يسمح بتتبع السحب) | SA: سحب وتبديل يعملان | `interaction_deck-drag-follow_360.png` | **PASS** |

## B. المكوّنات الأساسية (CORE)

| ID | المصدر | الاستخدام | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|---|
| C-BTN | `core/Button.tsx` + `core.css` | كل الشاشات + STUDIO-COMPONENTS | Primary Indigo/أبيض؛ Accent Citrus | Primary = Action `#A94630`/أبيض (5.82:1) ومضغوطه `#8F3B27`؛ Accent = هوية/Ink؛ تعليقات Citrus أزيلت | SA: الضغط يقيس `#8F3B27` + loading/disabled حية في مساحة المراجعة | `interaction_button-pressed_360.png` + `studio-components_360.png` | **PASS** |
| C-ICONBTN | `core/Button.tsx` | قائمة الفترة + مساحة المراجعة | active بـSoft Indigo | active بـBrand-Soft + Action | SA/تفاعل قائمة الفترة | `interaction_period-menu_360.png` | **PASS** |
| C-FIELD | `core/Field.tsx` + CSS | نموذج البيع + مراجعة المكوّنات | تركيز Indigo بحلقة Soft | تركيز Information `#305968` بحلقة `#DFEDF1`؛ خطأ Danger؛ مبلغ بـ«د.أ» ثابتة | SA: تفاعل إدخال + خطأ + AmountField متفحص | `interaction_sale-validation-live_360.png` | **PASS** |
| C-SEG | `core/SegmentedControl.tsx` | نقدي/آجل | نقطة Indigo | نقطة Action + سطح/وزن (اختيار بلون واحد ممنوع) | SA: تبديل الطريقة | لقطات النموذج | **PASS** |
| C-ROW | `core/OpenRow.tsx` | كل الصفوف | (بلا لون مميز) | متاح unavailable معطل موثق؛ مضغوط Surface-2 | SA: صفوف ملخص اليوم + unavailable في مساحة المراجعة | `studio-components_360.png` | **PASS** |
| C-OVL | `core/Overlays.tsx` + CSS | أوراق/حوارات/قوائم | Primary حوار Indigo | Primary حوار Action؛ محدد القائمة Action | SA: فتح/إغلاق/Escape/اختيار فترة | `interaction_logout-dialog_360.png`، `interaction_result-details-sheet_360.png` | **PASS** |
| C-SKL | `core/Skeleton.tsx` | (كان غير مستخدم) | muted قديم | `#A6AEB4` زخرفي — **صار قابل الفحص** في STUDIO-COMPONENTS | SA: ظاهر حيًّا | `fullpage-studio-components_360.png` | **PASS** |

## C. المكوّنات المالية (FINANCIAL)

| ID | المصدر | الاستخدام | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|---|
| FN-MONEY | `financial/MoneyValue.tsx` | كل المبالغ | (بنية ذاتها) | ألوان Ink دائمًا؛ الحالات نص+إشارة | SA: `385.75 د.أ` معًا + `−80.00` مع «خسارة» + لا `0.00` للناقص + VLM | لقطات FIN/OVR | **PASS** |
| FN-DECK | `financial/SnapshotDeck.tsx` + CSS | OVR-NOW (بكل حالاته) + OVR-SNAPSHOT-ALL | بطاقة قوية **للكاش** Indigo/أبيض؛ تلميح سحب كاذب؛ بلا سحب فعلي | القوية = **بطاقة النتيجة** (هوية/Ink)؛ partial/unknown سطح محايد + شريط جانبي؛ **سحب مباشر حقيقي** بتتبع الإصبع ومقاومة حواف؛ تلميح صادق؛ بيان النزاهة بلوح أبيض داخل الكتلة | SA: تتبع 1→2→1 + مقاومة + لا اختطاف للصفحات + VLM | `interaction_deck-drag-follow_360.png`، `ovr-now_complete_360.png` | **PASS** |
| FN-TRUTH | `financial/TruthNote.tsx` | كل البطاقات | لوح `rgba أبيض` فوق Indigo | لوح Surface-2؛ فوق الهوية لوح أبيض؛ تحذير Attention | SA: فتح بيان النزاهة فوق كتلة الهوية | `interaction_truth-note-open` القديم → V2 في لقطات OVR | **PASS** |
| FN-TX | `financial/TransactionRow.tsx` | آخر الحركات + مراجعة المكوّنات | local بلون قديم | local = Information؛ التمييز بالاسم والأيقونة والإشارة | SA + VLM | `ovr-now_complete_360.png` | **PASS** |
| FN-RESULT | `financial/ResultBlock.tsx` + CSS | FIN-OVERVIEW (كل الحالات) | complete = كتلة Indigo قوية | complete = **حاوية نجاح دلالية** (كلمة «ربح» + إشارة + Ink)؛ سالبة = حاوية خطر («خسارة»)؛ جزئي = محايد + شريط؛ **«عرض التفاصيل» يفتح Sheet حقيقي** و«إضافة التكاليف» يوصل لشاشة المصروف المؤجلة | SA: فتح Sheet التفصيل + VLM للسالبة | `interaction_result-details-sheet_360.png`، `fin-overview_negative_360.png` | **PASS** |
| FN-IMPACT | `financial/ImpactPreview.tsx` | النموذج + Echo + المراجعة | سهم Indigo | سهم Action؛ سطح Surface-2؛ صف غير محسوب | SA + VLM | `ops-sale-create_impact_360.png` | **PASS** |

## D. السياقية (CONTEXT)

| ID | المصدر | الاستخدام | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|---|
| X-SIGNAL | `contextual/MicroSignal.tsx` + CSS | كل الحالات | مكتمل = Indigo؛ partial = لافندر | ألوان **دلالية**: مكتمل نجاح، جزئي/غير معروف `#5B6770`، قيد التنفيذ/محلي Information، خطأ Danger؛ فوق الهوية Ink (مقيس) | SA: الحالات السبع حية في مساحة المراجعة | `fullpage-studio-components_360.png` | **PASS** |
| X-QUAD | `micro-quad` (contextual.css) | علامة هوية | Indigo | الهوية `#D97757`؛ رباعية الاستوديو بألوان المنظومة | SA + VLM | `interaction_bottom-nav-selected_360.png` | **PASS** |
| X-TRACE/SEAM | `Contextual.tsx` | كل الشاشات | أسطح قديمة | أسطح دلالية من 17 (تحذير/معلومة/جزئي/محلي) | SA: الأربع نغمات في مساحة المراجعة | نفس الدليل | **PASS** |
| X-RIBBON | `SystemRibbon` | OVR/FIN offline | local قديم | Information + إجراء حقيقي → FIN-ACTIVITY | SA: النقر يفتح مسارًا | `ovr-now_offline_360.png` | **PASS** |
| X-RECOVERY | `RecoveryStage` | OVR error + المراجعة | (بنية ذاتها) | سطح أبيض + إشارة خطأ دلالية | SA: إعادة المحاولة تعمل | `ovr-now_error_360.png` | **PASS** |
| X-EMPTY | `EmptyState` | أول استخدام + لا حركات + المراجعة | (بنية ذاتها) | أنواع الخمسة كلها صارت قابلة الفحص (كان search-reset/period-gap/clear-state غير متاحة) | SA: الخمسة حية | `fullpage-studio-components_360.png` | **PASS** |
| X-INSIGHT | `Insight` | OVR بكل حالاته | opportunity = Citrus Soft؛ action-now = خطر | opportunity = Brand-Soft؛ **action-now = انتباه (دين مستحق = قابل للتصرف لا خطر — 17 §2)**؛ missing-data = جزئي | SA + VLM | `ovr-now_complete_360.png` | **PASS** |

## E. الأيقونات (ICONS)

| ID | المصدر | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|
| I-ICON | `icons/Icon.tsx` + `phosphor.generated.ts` | استهلاك عبر توكنز قديمة | `currentColor` عبر توكنز دلالية جديدة فقط؛ السجل المولد لم يُحرَّر يدويًا | SA: تدقيق ألوان نظيف + عرض فعلي | لقطات | **PASS** |
| I-FAVICON | `public/favicon.svg` | رباعية Indigo/Citrus | رباعية بألوان المنظومة الجديدة | SA: تدقيق HEX نظيف | الملف نفسه | **PASS** |

## F. التنقل والغلاف (NAV)

| ID | المصدر | الاستخدام | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|---|
| N-HEADER | `navigation/AppHeader.tsx` + CSS | كل شاشات المستوى 1/2 | ask رباعية Indigo؛ إجراءات نقر ميت | رباعية الهوية؛ **«اسأل Micro»/«التوصيل» → مسارات مؤجلة صادقة** | SA: كلا الإجراءين يفتح بطاقة GLB-ASK/GLB-DELIVERY | سجل السكربت | **PASS** |
| N-PANEL | `AppHeader.tsx` (AccountPanel) | لوحة الحساب | صفوف معطلة | **صفوف تتنقل** (GLB-ACCOUNT/PROJECT/SETTINGS) وتغلق اللوحة؛ «إكمال البيانات» → GLB-PROJECT | SA: التنقل والإغلاق | `interaction_account-panel-open_360.png` | **PASS** |
| N-NAV | `navigation/BottomNav.tsx` + CSS | الشريط السفلي | اختيار: إشارة MicroSignal مطلقة؛ قصّ خطّين عند التكبير | اختيار: Fill + SemiBold + Action + **العلامة الرباعية** (§11.2)؛ ارتفاع **تكيفي** بلا قصّ؛ Badge بـAction | SA: التسميات الخمس + لا قصّ عند 320/200% + تنقل تبويب | `interaction_bottom-nav-selected_360.png`، `ovr-now_complete_320_z200.png` | **PASS** |
| N-FRAME | `app/AppFrame.tsx` | الغلاف | (بلا سحب صفحات) | **السحب بين الصفحات §11.12 منفذ**: يتبع الإصبع، مقاومة حواف، معطل في النماذج/الطبقات/البطاقات الأفقية | SA: 4 فحوص سحب | سجل السكربت | **PASS** |
| N-ROUTES | `app/routes.ts` | 6 مسارات (عرض الكل ميت) | **19 مسارًا**: 5 منفذة (3 عينات + OVR-SNAPSHOT-ALL + STUDIO-COMPONENTS موسومة استوديو) + 12 مؤجلة من 04-CSV لكل إجراء مرئي | SA: صحة توجيه 21 سيناريو + كل الإجراءات | سجل السكربت | **PASS** |

## G. الشاشات (SCREENS)

| ID | المصدر | القديم (تاريخي) | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|
| S-OVR | `screens/OvrNow.tsx` + `screens.css` | الكاش بطاقة قوية أولًا والنتيجة بالسحب | **النتيجة واكتمالها أولًا** (هوية/Ink) والكاش بطاقة بيضاء؛ كل الصفوف والإجراءات بوجهات حقيقية | SA: 6 حالات + VLM | `ovr-now_*_360.png` (6) | **PASS** |
| S-FIN | `screens/FinOverview.tsx` | كتلة كاش داكنة مهيمنة تجمع المحافظ بازدحام | **لوحة بيضاء هادئة** برقم كبير، محافظ صفوف نظيفة داخلها، أسئلة على Canvas بخط فاصل، نتيجة دلالية + تفصيل Sheet | SA: 6 حالات + VLM (ازدحام الصفوف زال) | `fin-overview_*_360.png` (6) | **PASS** |
| S-OPS | `screens/OpsSaleCreate.tsx` | سطر صنف مضغوط بعمود واحد؛ سلة فارغة نص خامد | **سطر شبكي صفين** (اسم+كمية ثم سعر+إجمالي ثابت)؛ سلة فارغة دعوة فعل منقطة تفتح ورقة الأصناف؛ زر الإجراء كامل العرض؛ **إعادة ضبط حتمية عند تبديل السيناريو** | SA: 9 حالات + تفاعلات الإدخال/التحقق/الحفظ/التبديل | `ops-sale-create_*_360.png` (9) | **PASS** |
| S-ALL | `screens/OvrSnapshotAll.tsx` (**جديد**) | «عرض الكل» نقر ميت | عرض استوديو حقيقي بكل البطاقات + عودة | SA: فتح/عودة/4 بطاقات | `ovr-snapshot-all_complete_360.png` | **PASS** |
| S-DEF | `screens/DeferredScreen.tsx` | 3 مسارات مؤجلة فقط | نفس البطاقة الصادقة لـ12 مسارًا مؤجلًا | SA: فتح مؤجل من إجراءات حية | `ops-home_deferred_360.png` + `tool/mkt-home` | **PASS** (المؤجلة نفسها `NOT IMPLEMENTED` كسلعة منتج — البطاقة عرض استوديو فقط) |
| S-STU | `studio/StudioComponents.tsx` (**جديد**) | — | مساحة مراجعة مكوّنات (19 §2.3) موسومة «Studio QA — ليست شاشة منتج» | SA: الحوار/الورقة/القائمة تعمل داخلها | `fullpage-studio-components_360.png` | **PASS** |

## H. البيانات (FIXTURES)

| ID | المصدر | التغيير | الفحص | النتيجة |
|---|---|---|---|---|
| FX-OVR | `fixtures/ovr-now.json` | **ترتيب البطاقات فقط** `[result, cash, forYou, onYou]` + activeIndex=0 — لا قيمة مالية تغيرت | SA: القيم نفسها في اللقطات + VLM | **PASS** |
| FX-OTHER | `fin-overview.json`، `ops-sale-create.json`، `shop/customers/products/transactions.json` | دون تغيير (مبدأ: لا تغيير بيانات لإنتاج رسومات أجمل) | SA | **PASS** |
| FX-TYPES | `src/fixtures/types.ts`, `index.ts` | دون تغيير | بناء نظيف | **PASS** |

## I. طبقة مراجعة الاستوديو (STUDIO)

| ID | المصدر | القديم | الجديد | الفحص | الدليل | النتيجة |
|---|---|---|---|---|---|---|
| ST-BAR | `studio/StudioShell.tsx` + CSS | شريط ضخم ثابت بخمس مجموعات ظاهرة + accent Indigo | **شريط مدمج قابل للطي**: الشاشة+الحالة دائمًا، أدوات العرض خلف زر ملخص؛ accent Information منفصل عن هوية الهاتف؛ وسم «استوديو» لمساحة المكوّنات | SA: كل الأدوات تعمل عبر الزر | لقطات الجولة كلها (الهاتف أعلى مساحة) | **PASS** |
| ST-URL | `studio/urlState.ts` | (ذاتها) | دون تغيير — روابط عميقة تعمل | SA: كل الفحوص عبر روابط عميقة | سجل السكربت | **PASS** |
| ST-DRAWER | `ScreenInfoDrawer` | (ذاتها) | يعرض حالة STUDIO-COMPONENTS بوسمها الصادق | SA | سجل السكربت | **PASS** |

## J. الأسطح والأدلة (SURFACES + EVIDENCE)

| ID | العنصر | القرار | النتيجة |
|---|---|---|---|
| SU-INLINE | تدقيق Hex/RGB/HSL/شفافيات داخل CSS/TSX | كل الألوان عبر توكنز؛ الشفافيات المتبقية زخرفية غير نصية (scrim/سكلتون) موثقة | **PASS** |
| SU-PSEUDO | `::before/::after` (أشرطة Partial الجانبية، خط السؤال الفاصل، ظل الهيدر) | إشارات موضع غير لونية + حدود زخرفية `#DCE3E5` | **PASS** |
| SU-CHART | توكنز الرسم `--p-chart-current/prior` | حسب 17 §2 (غير مستخدمة — FIN-CHARTS مشروط) | **PASS** (Tokens فقط) |
| SU-HIST | لقطات V1 القديمة (68) | نُقلت إلى `evidence/history-v1-indigo/` **موسومة تاريخيًا — ليست دليلًا للنسخة الحالية**؛ لقطات V2 الجديدة في `evidence/screenshots/` (أعيد توليدها كلها) + ورقة مقارنة قبل/بعد | **PASS** |

## K. سيناريوهات الشاشات الـ21 + الزيارات المطلوبة (19 §1)

كل صف زُار فعليًا بالسكربت (تحقق توجيه + لقطة + قياس تجاوز):

- **OVR-NOW:** complete · partial · insufficient · first-use · offline · error — **PASS ×6**
- **OPS-SALE-CREATE:** empty · filled · validation · impact · impact-credit · saving · failure · success · offline-save — **PASS ×9** (+ تفاعل حي: إضافة صنف/عميل/كمية/تحقق/حفظ→Echo/تبديل سيناريو)
- **FIN-OVERVIEW:** complete · partial · insufficient · zero · negative · offline — **PASS ×6**
- **عالمية:** لوحة الحساب (فتح/صف يتنقل/حوار خروج/Escape) · التبويبات الخمسة + Badge · المؤجل OPS/TOOL/MKT-HOME · قائمة الفترة (فتح/اختيار/لا سحب معها) · أوراق الأصناف/العملاء · Sheet تفصيل النتيجة · سحب Deck (تتبع/تبديل/حواف) · سحب الصفحات (اتجاهان/تعطيلات/Reduced) · STUDIO-COMPONENTS — **PASS**
- **عروض وفحوص:** 320/360/390/412 · z150/z200 · رمادي · حركة مخفضة · تركيز لوحة مفاتيح · ضغط — **PASS** (عينة ممثلة لا الضرب الديكارتي الكامل — موثق في QA-SUMMARY)

## L. ما لم يُنفذ (صادق)

| العنصر | الحالة |
|---|---|
| شاشات المنتج المؤجلة الـ43 (04-CSV) خارج العينات والعرضين الجديدين | **NOT IMPLEMENTED — Deferred** (لا تدّعي هذه الجولة تصميمها) |
| FIN-CHARTS | **NOT IMPLEMENTED** (مشروط بسؤال وبيانات — لم يتحقق) |
| محتوى «اسأل Micro/السوق/التوصيل» | **NOT IMPLEMENTED** (مداخل معتمدة؛ المحتوى GAP-005/006) |
| Dark Mode | مرفوض بقرار — غير مطلوب |

## M. خلاصة الحالة

**كل صف منفذ أعلاه: PASS بعد فحص فعلي بالكود الجديد.** لم يبق مكوّن أو حالة منفذة بلا صف. البقايا `UNVERIFIED` محصورة في التحقق الواقعي (جهاز/قارئ شاشة/مستخدمون) الموثق في QA-SUMMARY §2 — وهي خارج إمكان بيئة التنفيذ بصدق.
