# Micro Interactive Design Reference Studio — Micro Visual System V2 (مراجعة الألوان والتكوين 2026-09-23)

استوديو تصميم مرجعي **مستقل وقابل للتشغيل والتعديل** لتصميم Micro. **النسخة الحالية هي المراجعة V2:** منظومة الألوان الجديدة وفق `../17-COLOR-DECISION-2026-09-23.md` (الهوية القائدة `#D97757` المعتمدة من المالك، بلا عائلة Indigo/Citrus في أي مصدر نشط)، وتكوينات معاد تصميمها وفق `../18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md`، وتغطية كاملة وفق `../19-STUDIO-COMPLETE-COVERAGE-GATE-2026-09-23.md`. هذا ليس كود Micro الإنتاجي ولا صفحة HTML ثابتة — إنه نظام Tokens ومكونات وشاشات وحالات حية.

**الحالة:** `Owner-approved visual baseline — phased transfer` · **الإصدار:** 0.2.0 · **التاريخ:** 2026-09-23 · **المنفذ:** ZAI (GLM)

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

## طريقة المراجعة (شريط الأدوات المدمج أعلى الشاشة)

- **الشاشة والحالة ظاهران دائمًا:** التبديل بين الشاشات المنفذة (3 عينات + كل البطاقات + مساحة مراجعة المكوّنات) والشاشات المؤجلة، وكل شاشة بحالاتها.
- **أدوات العرض خلف زر ملخص قابل للطي** (`360 · 100% · رمادي…`): العرض 320/360/390/412/متجاوب · تكبير النص 100/150/200% · رمادي · حركة مخفضة — كي لا يهيمن كروم المراجعة على واجهة الهاتف (18 §1.7).
- **معلومات الشاشة:** درج يعرض Screen ID والقرارات والمصدر وملف Fixtures والرابط العميق.
- **روابط عميقة قابلة للمشاركة:** مثل `#/FIN-OVERVIEW?state=partial&w=320&z=150&gray=1&rm=1`.

شريط الأدوات **Studio Chrome** (بلون Information الداكن المنفصل عن هوية الهاتف) لأغراض المراجعة فقط وليس جزءًا من واجهة Micro (§21.2)، وشريط النظام داخل الإطار محاكاة عرض موثقة الحدود.

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
| `src/screens/` | OVR-NOW، OPS-SALE-CREATE، FIN-OVERVIEW، OVR-SNAPSHOT-ALL + DeferredScreen + StudioHome |
| `src/states/` | نموذج الحالات (DataState/ValueState/SaveState + تسمياتها) |
| `src/studio/` | طبقة المراجعة: urlState (راوتر Hash) + StudioShell + StudioComponents (مساحة مراجعة المكوّنات) |
| `src/fixtures/` | أنواع وتحميل Fixtures الموسومة |
| `fixtures/` | بيانات JSON بحقل provenance لكل ملف |
| `assets/fonts/` | Alexandria + Noto Sans Arabic (OFL) مع التراخيص |
| `assets/icons/` | Phosphor SVG (MIT) مع الترخيص |
| `evidence/screenshots/` | لقطات الفحص للنسخة V2 (عنصرية مقروئة لإطار الهاتف) + ورقة مقارنة قبل/بعد |
| `evidence/history-v1-indigo/` | لقطات الإصدار الأول (Indigo) — **تاريخية موسومة، ليست دليلًا للنسخة الحالية** |
| `reports/` | تقارير Preflight وQA والتسليم والفجوات والتباين + `REVISION-COVERAGE-LEDGER.md` |
| `TOKEN-DICTIONARY.md/.json` | قاموس Tokens مولّد آليًا من `tokens.css` |
| `DESIGN-SYSTEM.md` … `DESIGN-TO-DEVELOPMENT.md` | توثيق النظام (انظر الفهرس أدناه) |

## الشاشات المنفذة

| Screen ID | العنوان | الحالات |
|---|---|---|
| `OVR-NOW` | مشروعي الآن | complete · partial · insufficient · first-use · offline · error |
| `OPS-SALE-CREATE` | تسجيل بيع | empty · filled · validation · impact · impact-credit · saving · failure · success · offline-save |
| `FIN-OVERVIEW` | المالية | complete · partial · insufficient · zero · negative · offline |
| `OVR-SNAPSHOT-ALL` | كل البطاقات المالية (عرض استوديو حقيقي) | complete · partial · insufficient · offline |
| `STUDIO-COMPONENTS` | مراجعة المكوّنات (استوديو فقط — ليست شاشة منتج) | all |

بقية شاشات 04-CSV **Not Started — Deferred pending owner review** وتظهر كبطاقات توثيق، وكل إجراء مرئي داخل الواجهة يوصل لمساره المؤجل الصادق (لا نقر ميت).

## حدود الاستوديو (اقرأها قبل المراجعة)

1. **Figma: NOT AVAILABLE** في بيئة التنفيذ — لم يُنشأ ملف أو رابط Figma، والاستوديو التفاعلي هو المرجع.
2. كل القيم **Fixtures** من `fixtures/` بمصدر موثق؛ «أثر العملية» في نموذج البيع يعرض **تنسيق** قبل/بعد بقيم عرض فقط (GAP-004).
3. الفحوص المنفذة فحوص **متصفح داخل بيئة التنفيذ** (بناء نظيف، صفر أخطاء Console، صفر تجاوز أفقي بعد تحميل الخطوط، 21 سيناريو + عروض وتكبير ورمادي وحركة مخفضة، سحب بطاقات وصفحات فعلي بالPointer، تبديل سيناريو بلا تسرب — راجع `reports/QA-SUMMARY.md`). اختبار Android فعلي وTalkBack ومستخدمون أردنيون **UNVERIFIED** (§21.5).
4. علامة Micro الرباعية وMicro Financial Glyphs **أصول مرشحة (GAP-002/003)**.
5. لا Dark Mode. الأرقام إنجليزية `0–9` والعملة `د.أ` والسالب `−`. RTL أصلي بخصائص منطقية لا Mirror.
6. هذا المصدر داخل مستودع الـHandoff فقط؛ لم يُلمس مستودع `Qays7753/Micro` ولا كوده الإنتاجي، ولا `main`.
7. **حكم المالك في هذه المحادثة بتاريخ 2026-09-23:** وافق على مظهر V2 المعروض بوصفه مرجعًا بصريًا للنقل التدريجي. لا يُفهم ذلك اعتماد بقية الشاشات غير المنفذة، أو بيانات Fixtures، أو قبول التطبيق الإنتاجي بعد النقل. راجع `../20-V2-DESIGN-TRANSFER-READINESS-2026-09-23.md`.

## فهرس التوثيق

`DESIGN-SYSTEM.md` · `TOKEN-DICTIONARY.md` · `COMPONENT-CATALOG.md` · `SCREEN-CATALOG.md` · `NAVIGATION-MAP.md` · `STATE-MATRIX.md` · `MOTION-MAP.md` · `RTL-ACCESSIBILITY.md` · `FIXTURE-CATALOG.md` · `ASSET-MANIFEST.md` · `DESIGN-TO-DEVELOPMENT.md` · `reports/` (Preflight الخمسة + `VISUAL-PROOF-REVIEW` + `QA-SUMMARY` + `CONTRAST-REPORT` + `OPEN-ISSUES` + `DELIVERY-REPORT` + **`REVISION-COVERAGE-LEDGER`**) · `evidence/README.md`
