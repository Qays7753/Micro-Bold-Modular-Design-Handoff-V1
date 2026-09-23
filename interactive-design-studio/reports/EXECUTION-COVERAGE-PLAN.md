# EXECUTION-COVERAGE-PLAN — خطة التنفيذ وربطها بالقرارات وScreen IDs

**Task:** exec/interactive-design-studio-zed-20260923 · **التاريخ:** 2026-09-23 · **المنفذ:** Zed AI (GLM)
النطاق: بوابة العينات الثلاث (المرحلة 2 من ملف 16) مع البنية القابلة للتوسع (المرحلة 1). **لا تعميم على 46 شاشة قبل مراجعة المالك.**

## 1. ما سينتج فعليًا في هذه الجولة

| المخرج | التفصيل | المرجع القراري | أين يظهر |
|---|---|---|---|
| Foundations | Tokens ثلاث طبقات (Core Primitives / Semantic / Component عند الحاجة) للون والمسافة والنصف قطر والحد والحركة والطباعة، Light فقط | §§6–8، 21.2 | `src/foundations/` + `TOKEN-DICTIONARY` + `DESIGN-SYSTEM.md` |
| Typography عربية | Alexandria + Noto Sans Arabic بترخيص OFL موثق (إن نجح التنزيل)، أنماط وظيفية مسماة `Type/*`، أرقام `0–9` LTR و`د.أ` وTabular | §§7، 16.2 | `src/foundations/` + `assets/fonts/` |
| Micro Signal | علامة رباعية مرشحة بحالات: مكتمل/جزئي/قيد التنفيذ/غير معروف/مسودة/خطأ/محفوظ محليًا (أصل مرشح — GAP-002) | §10.4 | `src/components/contextual/MicroSignal.tsx` |
| GLB-SHELL | هيكل بخمسة تبويبات V1 (مشروعي الآن/العمل/المالية/أدواتي/السوق) بلا زر سادس، Header موحد بلا اسم صفحة (UserCircleGear يمينًا؛ التوصيل و«اسأل Micro» يسارًا)، Edge-to-Edge مع حالة Scrolled، لوحة حساب متصلة بالـHeader (كاملة/غير مكتملة) | §§11.1–11.9 | `src/navigation/` |
| شاشة OVR-NOW | ملخص حالة المالك: Snapshot Deck (نظرة مالية + عرض الكل)، Insight واحدة قابلة للإجراء (خلاصة→دليل→اكتمال→إجراء)، صفوف اليوم، آخر الحركات | §§13.2، 13.4، 13.19، 21.3 | `src/screens/OvrNow.tsx` |
| شاشة OPS-SALE-CREATE | نموذج سريع بيع نقدي/آجل: Segmented، سطور منتجات، عميل مشروط بالآجل، تفاصيل إضافية، Impact Preview، إجراء `تسجيل البيع` مع Saving/Failure/Success/Offline | §§12، 13.8، 13.20 | `src/screens/OpsSaleCreate.tsx` |
| شاشة FIN-OVERVIEW | Question-First: الكاش المتاح (كتلة قوية) → الدخل والخرج → ما لي وما عليّ → النتيجة + الاكتمال → المقارنة؛ زر فترة واحد؛ لا Chart (مشروط غير مثبت) | §§13.2، 13.3، 13.11، 13.12 | `src/screens/FinOverview.tsx` |
| مكونات Core | Button (Primary/Secondary/Destructive/IconOnly)، SegmentedControl، Field/AmountField، OpenRow، Sheet، Dialog، FilterCommand، Skeleton | §§10.1–10.6، 12.3–12.4 | `src/components/core/` |
| مكونات Financial | MoneyValue (Known/TrueZero/Negative/Unknown/Estimated)، TruthLayer، SnapshotDeck، TransactionRow، DebtRow، ResultBlock، ImpactPreview | §§13.2–13.11 | `src/components/financial/` |
| مكونات Contextual | MicroSignal، ContextTrace، RevealRow، ContextSeam، SystemRibbon، RecoveryStage، EmptyState (5 أنماط)، LoadingChoreography، CausalFeedback، ContinuityThread | §14 كاملًا | `src/components/contextual/` |
| Fixtures | ملفات JSON بحقل provenance لكل مجموعة (مصدر: 14-JORDANIAN-CONTENT-FIXTURES) تشمل الأسماء الطويلة والقيم الحدية (صفر حقيقي/سالب/ثلاث منازل/كبير/غير مسجل) | §14 + 16.7 | `fixtures/` + `FIXTURE-CATALOG.md` |
| طبقة مراجعة الاستوديو | شريط Studio Chrome: مبدّل شاشة/حالة/عرض (320/360/390/412)/تكبير (100/150/200)/رمادي/حركة مخفضة + درج معلومات الشاشة (Screen ID + القرارات + المصادر + Fixtures) + روابط عميقة `#/<ScreenID>?state=…` | 03-SPEC «مستكشف مكونات وحالات منفصل عن واجهة المستخدم» | `src/studio/` |
| شاشات مؤجلة | OPS-HOME، TOOL-HOME، MKT-HOME وكل ما عدا الثلاث: بطاقة توثيق `Not Started / Deferred pending owner review` مع معرفها وقراراتها وحالاتها المطلوبة من 04-CSV | 16-بوابة 2 | `src/screens/DeferredScreen.tsx` |
| توثيق | README + DESIGN-SYSTEM + TOKEN-DICTIONARY + COMPONENT-CATALOG + SCREEN-CATALOG + NAVIGATION-MAP + STATE-MATRIX + MOTION-MAP + RTL-ACCESSIBILITY + FIXTURE-CATALOG + ASSET-MANIFEST + DESIGN-TO-DEVELOPMENT | D-03..D-14 | جذر `interactive-design-studio/` |
| أدلة | لقطات العرض والحالات والتكبير والرمادي + تقرير `VISUAL-PROOF-REVIEW.md` + `QA-SUMMARY.md` + حساب تباين برمجي للأزواج المعتمدة | §§16.3، 16.7، 21.5 | `evidence/` + `reports/` |

## 2. مصفوفة حالات الشاشات الثلاث (المطلوب فعليًا)

| Screen ID | الحالات المنفذة | لماذا |
|---|---|---|
| OVR-NOW | Complete (افتراضي) · Partial (مزامنة جزئية تُظهر قيماً جزئية) · Insufficient (تعذر حساب النتيجة) · FirstUse (فراغ أول استخدام) · Offline (شريط دون اتصال + بانتظار الإرسال) · Error (استرجاع منطقة الملخص فقط) | 04-CSV + بوابة 16 (Default + Partial/Unknown + Error/Recovery مغطاة وزيادة) |
| OPS-SALE-CREATE | Empty (افتراضي) · Filled · Validation (أخطاء بعد المتابعة) · Impact (مملوء مع أثر العملية) · Saving (Action Hold) · Failure (لم تُحفظ + إعادة المحاولة مع بقاء القيم) · Success (عودة للسياق مع Echo) · Offline-Save (محفوظ على هذا الهاتف) | 04-CSV كاملًا |
| FIN-OVERVIEW | Complete · Partial (نتيجة تقديرية) · Insufficient (النتيجة غير متاحة بعد) · Zero (صفر حقيقي في مصروف) · Negative (نتيجة سالبة مشروحة) · Offline | 04-CSV كاملًا |

## 3. اختيارات موثقة داخل النطاقات المعتمدة (لا قيم هوية جديدة)

صنف «نطاق قابل للضبط» في ملف 16: تُثبَّت القيم التالية داخل نطاقات المرجع وتوثق أسبابها في `DESIGN-SYSTEM.md §Token choices`:

- الطباعة: Hero 30، عنوان شاشة 24، عنوان قسم 19، عنوان بطاقة 16، متن 15، مساند 13، زر 16، Money Hero 34، قيمة قائمة 16، تنقل 12 (كلها داخل نطاقات §7).
- الهندسة: بطاقة رئيسة R22/P20، متوسطة R16/P16، زر R16/H48، حقل R14/H54، صف معاملة H68/P16، شريط سفلي 70px (داخل §§6، 10.2، 11.2).
- المسافات: داخلي 10، بين بطاقات 14، بين أقسام 28، Padding شاشة 18 (داخل §10.2).
- الحركة: ضغط 100ms، تغير محلي 150ms، توسع 200ms، انتقال شاشة 280ms، Sheet 240ms، Dialog 190ms، اختيار 160ms، Fade مخفض 120ms، والإغلاق أسرع بـ40ms (داخل §§10.4، 11.13، 15.1، 16.6).

## 4. ما لا يُنتج هذه الجولة (يبقى Not Started / Deferred)

43 شاشة من 04-CSV غير الثلاث + GLB-SHELL المسجل كمرجع بنية (يُنفذ فعليًا كحاضن للعينات ويُحدَّث صفه بأدلة الشل). الرسوم البيانية (`FIN-CHARTS`) نمط مشروط: لا يُرسم لعدم وجود سؤال منتج وبيانات مثبتة (GAP مؤجل بالشرط). عروض السوق واستجابات «اسأل Micro» وسلوك التوصيل: مؤجلة (GAP-005/006). اختبار جهاز فعلي ومستخدمين: `UNVERIFIED` (TECH-001).

## 5. خطة التحقق المخططة (المتصلة بالأدلة)

1. `npm run build` بدون أخطاء، ثم تشغيل خادم معاينة محلي وفحص المتصفح بلا أخطاء Console.
2. لقطات 320/360/390/412 لكل عينة (على الأقل 360 لكل حالة)، وتكبير 150/200 عبر محاكاة عرضية موثقة، وملون ثم رمادي.
3. تحقق تفاعلي قابل للتكرار: تنقل التبويبات، فتح لوحة الحساب، تغيير الحالات، فتح Sheet العميل/Dialog الخروج، إرسال نموذج البيع بمسارات النجاح/الفشل/Offline.
4. حساب تباين برمجي (WCAG) لأزواج الألوان المعتمدة كدليل مساند.
5. كل ذلك يُوسم «فحص متصفح داخل بيئة التنفيذ» ويُفصل صراحة عن اختبار Android فعلي/TalkBack/مستخدمين (`UNVERIFIED`).
