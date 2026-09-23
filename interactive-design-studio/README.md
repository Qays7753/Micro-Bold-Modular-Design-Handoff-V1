# Micro Interactive Design Reference Studio — Micro Visual System V1

> **Revision pending (2026-09-23):** الكود واللقطات والأدلة المدرجة أدناه من نسخة Indigo/Citrus السابقة؛ المرجع الحاكم الآن `../17-COLOR-DECISION-2026-09-23.md` ومطالب التصحيح `../18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md`. لا تُنسب هذه الأدلة إلى اللون الجديد `#D97757` قبل تعديل الاستوديو وإعادة الفحص.

استوديو تصميم مرجعي **مستقل وقابل للتشغيل والتعديل** لتصميم Micro، مبني من مصدر الحقيقة `MICRO-VISUAL-DESIGN-DECISIONS-V1.md`. هذا ليس كود Micro الإنتاجي ولا صفحة HTML ثابتة ولا معرض لقطات — إنه نظام Tokens ومكونات وشاشات وحالات حية تُراجع ثم تُستخدم مرجعًا للتطوير.

**الحالة:** `Candidate — Ready for Owner Review` (بوابة العينات الثلاث من ملف 16) · **الإصدار:** 0.1.0 · **التاريخ:** 2026-09-23 · **المنفذ:** Zed AI (GLM)

## التشغيل

المتطلبات: Node.js ≥ 18. الاعتماديات مثبتة النسخ في `package.json` (Vite 5 + React 18 + TypeScript فقط — أصغر Stack مستقر؛ لا مكتبة UI ولا Tailwind ولا مكتبة رسوم).

```bash
cd interactive-design-studio
npm install        # مرة واحدة
npm run dev        # خادم تطوير: http://localhost:5173
npm run build      # فحص أنواع + بناء إنتاجي إلى dist/
npm run preview    # معاينة نسخة البناء: http://localhost:4173
```

كل البيانات **Fixtures موسومة** من `fixtures/` — لا اتصال بأي API ولا بيانات حقيقية، وأي «حفظ» في نموذج البيع محاكاة عرض موسومة لا عملية حقيقية.

## طريقة المراجعة (لوحة الأدوات أعلى الشاشة)

- **الشاشة:** التبديل بين الشاشات الثلاث المنفذة والشاشات المؤجلة.
- **الحالة:** كل شاشة لها حالات مراجعة (افتراضي/جزئي/غير كافٍ/فراغ أول استخدام/دون اتصال/خطأ…).
- **العرض:** 320 / 360 / 390 / 412 / متجاوب — داخل إطار هاتف محاكى.
- **تكبير النص:** 100% / 150% / 200% — تكبير خطوط فعلي مع Reflow (كما على الجهاز)، لا تكبير متصفح متناسب.
- **رمادي (Grayscale):** اختبار إزالة اللون — يجب أن تبقى الهرمية واضحة.
- **حركة مخفضة:** محاكاة Reduced Motion.
- **معلومات الشاشة:** درج يعرض Screen ID والقرارات والمصدر وملف Fixtures والرابط العميق.
- **روابط عميقة قابلة للمشاركة:** مثل `#/FIN-OVERVIEW?state=partial&w=320&z=150&gray=1&rm=1`.

شريط الأدوات **Studio Chrome** لأغراض المراجعة فقط وليس جزءًا من واجهة Micro (§21.2)، وشريط النظام داخل الإطار محاكاة عرض موثقة الحدود.

## بنية المجلد

| المسار | الغرض |
|---|---|
| `src/foundations/` | Tokens ثلاث طبقات + طباعة + حركة + reset — المصدر الحقيقي للقيم |
| `src/components/core/` | Buttons، SegmentedControl، Fields، OpenRow، Overlays (Sheet/Dialog/Menu)، Skeleton |
| `src/components/financial/` | MoneyValue، TruthNote، SnapshotDeck، TransactionRow، ResultBlock، ImpactPreview |
| `src/components/contextual/` | MicroSignal، ContextTrace/Seam، SystemRibbon، RecoveryStage، EmptyState، Insight |
| `src/components/icons/` | Icon (Phosphor MIT) + سجل مولد من أصول `assets/icons/` |
| `src/navigation/` | الهيكل: AppHeader + AccountPanel + BottomNav (خمسة تبويبات V1) + navModel |
| `src/app/` | AppFrame (GLB-SHELL) + سجل المسارات routes.tsx |
| `src/screens/` | OVR-NOW، OPS-SALE-CREATE، FIN-OVERVIEW + DeferredScreen + StudioHome |
| `src/states/` | نموذج الحالات (DataState/ValueState/SaveState + تسمياتها) |
| `src/studio/` | طبقة المراجعة: urlState (راوتر Hash) + StudioShell + درج المعلومات |
| `src/fixtures/` | أنواع وتحميل Fixtures الموسومة |
| `fixtures/` | بيانات JSON بحقل provenance لكل ملف |
| `assets/fonts/` | Alexandria + Noto Sans Arabic (OFL) مع التراخيص |
| `assets/icons/` | Phosphor SVG (MIT) مع الترخيص |
| `evidence/` | لقطات الفحص البصري (68 لقطة) + دليلها |
| `reports/` | تقارير Preflight وQA والتسليم والفجوات والتباين |
| `TOKEN-DICTIONARY.md/.json` | قاموس Tokens مولّد آليًا من `tokens.css` |
| `DESIGN-SYSTEM.md` … `DESIGN-TO-DEVELOPMENT.md` | توثيق النظام (انظر الفهرس أدناه) |

## الشاشات المنفذة (بوابة العينات)

| Screen ID | العنوان | الحالات |
|---|---|---|
| `OVR-NOW` | مشروعي الآن | complete · partial · insufficient · first-use · offline · error |
| `OPS-SALE-CREATE` | تسجيل بيع | empty · filled · validation · impact · impact-credit · saving · failure · success · offline-save |
| `FIN-OVERVIEW` | المالية | complete · partial · insufficient · zero · negative · offline |

بقية الشاشات (43 من جرد 04-CSV) **Not Started — Deferred pending owner review** وتظهر كبطاقات توثيق داخل الاستوديو مع معرفاتها وقراراتها.

## حدود الاستوديو (اقرأها قبل المراجعة)

1. **Figma: NOT AVAILABLE** في بيئة التنفيذ — لم يُنشأ ملف أو رابط Figma، والاستوديو التفاعلي هو المرجع.
2. كل القيم **Fixtures** من `fixtures/` بمصدر موثق (`14-JORDANIAN-CONTENT-FIXTURES.md`)؛ «أثر العملية» في نموذج البيع يعرض **تنسيق** قبل/بعد بقيم عرض فقط — الأثر المالي الفعلي يحدده منطق المنتج (GAP-004).
3. الفحوص المنفذة فحوص **متصفح داخل بيئة التنفيذ** (بناء نظيف، صفر أخطاء Console، صفر تجاوز أفقي، لقطات 320–412 وتكبير 150/200 ورمادي، تفاعلات مُعادة). اختبار Android فعلي وTalkBack ومستخدمون أردنيون **UNVERIFIED** (§21.5 يفصل تسليم التصميم عن التحقق الواقعي).
4. علامة Micro الرباعية وMicro Financial Glyphs **أصول مرشحة (GAP-002/003)** ترتبط بمراجعة الشعار النهائي — لا تُعد أصلًا معتمدًا.
5. لا يوجد Dark Mode. الأرقام إنجليزية `0–9` والعملة `د.أ` والسالب `−`. RTL أصلي بخصائص منطقية لا Mirror.
6. هذا المصدر داخل مستودع الـHandoff فقط؛ لم يُلمس مستودع `Qays7753/Micro` ولا كوده الإنتاجي.

## فهرس التوثيق

`DESIGN-SYSTEM.md` · `TOKEN-DICTIONARY.md` · `COMPONENT-CATALOG.md` · `SCREEN-CATALOG.md` · `NAVIGATION-MAP.md` · `STATE-MATRIX.md` · `MOTION-MAP.md` · `RTL-ACCESSIBILITY.md` · `FIXTURE-CATALOG.md` · `ASSET-MANIFEST.md` · `DESIGN-TO-DEVELOPMENT.md` · `reports/` (Preflight الخمسة + `VISUAL-PROOF-REVIEW` + `QA-SUMMARY` + `CONTRAST-REPORT` + `OPEN-ISSUES` + `DELIVERY-REPORT`) · `evidence/README.md`
