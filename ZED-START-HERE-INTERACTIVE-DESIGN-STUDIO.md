# Zed AI — تنفيذ Micro Interactive Design Reference Studio

## المهمة

أنت المنفذ المسؤول عن تحويل حزمة التصميم الموجودة في هذا المستودع إلى **Interactive Design Reference Studio مستقل وقابل للتشغيل والمراجعة**.

اعمل داخل هذا المستودع فقط:

- Repository: `Qays7753/Micro-Bold-Modular-Design-Handoff-V1`
- Branch: `exec/interactive-design-studio-zed-20260923`
- Implementation folder: `interactive-design-studio/`
- Revision baseline: latest remote commit on this branch; the old initial-execution base commit is superseded by the revision documents.

> **تعديل لاحق على التكليف الأصلي:** لتصحيح النسخة المنفذة اقرأ أولًا `17-COLOR-DECISION-2026-09-23.md` و`18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md` و`19-STUDIO-COMPLETE-COVERAGE-GATE-2026-09-23.md`. تتقدم هذه الملفات على أي لون أو وصف Indigo/Citrus في هذا التكليف القديم، وتشمل المراجعة **كل مكونات الاستوديو المنفذة وحالاتها وهيكله وواجهة مراجعته ووثائقه**، وليس الشاشات الثلاث الافتراضية وحدها. أعِد إنتاج أدلة الإصدار الجديد ولا تعتبر الصور والتقارير القديمة مطابقة للألوان الجديدة.

لا تعدّل مستودع `Qays7753/Micro` بأي شكل. لا تنشئ له Commit أو PR أو Push. لا تعدّل `main` مباشرة.

## عقد محادثة المتصفح — هذه الرسالة مكتفية ذاتيًا

أنت تعمل مع المالك من خلال محادثة ZAI في المتصفح. اعتبر هذا الملف كامل التعليمات؛ لا تفترض وجود Prompt آخر أو سياق سابق أو تعليمات لاحقة خارج هذا الملف. لا تطلب من المالك إعادة شرح المستودع أو الهدف أو مسار التنفيذ؛ اقرأ الملفات المحددة هنا ثم نفّذ وفقها.

في أول رد وقبل أي تعديل أو أمر يغيّر الملفات، قدم Preflight موجزًا يثبت: اسم المستودع، الفرع الحالي، Commit الأساس، مجلد التنفيذ، ما إذا كانت Figma متاحة فعليًا، ما الذي ستنتجه، وخطة البوابة الأولى. بعد هذا الرد تابع العمل على نفس المهمة؛ لا تنتظر رسالة منفصلة لإعادة إرسال هذه التعليمات.

قد يرسل المالك GitHub Fine-grained Personal Access Token داخل هذه المحادثة حتى تستطيع الرفع. إذا حدث ذلك، عامله كسر مؤقت: استخدمه فقط مع المستودع المحدد هنا وللدفع إلى الفرع المحدد هنا، ولا تطبعه أو تلخصه أو تضعه في Prompt أو ملف أو Commit أو URL أو Log أو Screenshot أو تقرير نهائي. لا تستخدمه للوصول إلى مستودع آخر، ولا تطلب صلاحيات إضافية. إذا لم يصل Token أو فشل الدفع، أكمل التنفيذ محليًا وسجل `PUSH BLOCKED` دون كشف السر.

لا تعتبر إرسال هذا الملف موافقة على دمج الفرع. لا تفتح Pull Request ولا تدمج إلى `main`. نهاية مهمتك هي `Ready for Owner Review` على فرع التنفيذ.

## النتيجة المطلوبة

ابنِ داخل `interactive-design-studio/` استوديو تصميم تفاعلي مستقل، وليس صفحة HTML ثابتة أو معرض Screenshots. يجب أن يكون قابلًا للتشغيل في المتصفح، قابلًا للتعديل من المصدر، ومبنيًا بنظام Tokens وComponents وحالات واضحة، بحيث يمكن للمالك مراجعته على الهاتف ثم استخدامه لاحقًا كمرجع لتطوير Micro.

Figma اختياري. لا تتوقف بسببه. إذا لم تكن لديك أداة Figma حقيقية فلا تدّعِ إنشاء ملف Figma أو رابط Figma؛ سجل ذلك `NOT AVAILABLE` أو `UNVERIFIED` وأكمل الاستوديو المطلوب.

## ابدأ بهذا الترتيب

### 1. قراءة وفهم كامل

اقرأ قبل التعديل:

- `17-COLOR-DECISION-2026-09-23.md`
- `18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md`
- `19-STUDIO-COMPLETE-COVERAGE-GATE-2026-09-23.md`
- `AGENTS.md`
- هذا الملف
- `README.md`
- `00-START-HERE.md`
- `MICRO-VISUAL-DESIGN-DECISIONS-V1.md`
- `01-MASTER-EXECUTION-PROMPT.md`
- `02-AUTHORITY-AND-QUARANTINE.md`
- `03-STUDIO-CONSTRUCTION-SPEC.md`
- `04-SCREEN-COVERAGE.csv`
- `05-NAVIGATION-MAPPING.csv`
- `06-COMPONENT-INVENTORY.csv`
- `07-DECISION-TRACEABILITY.csv`
- `08-DESIGN-TO-DEVELOPMENT.md`
- `09-QA-AND-ACCEPTANCE.md`
- `10-GAP-CONFLICT-CHANGE-LOGS.md`
- `11-DELIVERY-MANIFEST.md`
- `12-FINAL-COMPLETION-REPORT.md`
- `13-ASSET-TOKEN-REGISTER.md`
- `14-JORDANIAN-CONTENT-FIXTURES.md`
- `15-PACKAGE-VALIDATION.md`
- `16-EXECUTION-STAGES-AND-PROOF-GATES.md`

اعتبر هذه الملفات مصدر الحقيقة. لا تعتمد على تاريخ Git القديم أو تصميم Micro الحالي بصريًا.

### 2. Capability and input Preflight — دون تصميم بعد

أنشئ داخل `interactive-design-studio/reports/`:

- `INPUT-INVENTORY.md`
- `AUTHORITY-MAP.md`
- `UNDERSTANDING-SUMMARY.md`
- `CONFLICT-AND-GAP-LOG.md`
- `EXECUTION-COVERAGE-PLAN.md`

سجل بوضوح:

- ما قرأته ومصدر سلطة كل ملف.
- ما تستطيع إنتاجه فعليًا.
- ما لا تستطيع إثباته.
- أي قيود بيئية أو تقنية.
- أن Figma اختياري في هذه المهمة.
- أن كل المخرجات يجب أن تبقى داخل `interactive-design-studio/`.

لا تعدّل تطبيق Micro ولا تبدأ ببناء 46 شاشة قبل هذه الخطوة.

### 3. بناء الاستوديو الأساسي

اختر أصغر Stack مستقر وقابل للتشغيل في بيئتك. يفضل وضع `package.json` وملفات التشغيل داخل `interactive-design-studio/` وعدم تغيير ملفات جذر المستودع أو إضافة اعتماديات لتطبيق غير موجود.

أنشئ، بحسب الحاجة:

```text
interactive-design-studio/
  README.md
  package.json
  src/
    app/
    components/
    foundations/
    screens/
    states/
    navigation/
    fixtures/
  public/
  fixtures/
  assets/
  evidence/
  reports/
```

يجب أن يحتوي الاستوديو على:

- Design Tokens منفصلة للألوان والمسافات والأحجام والتباين.
- Typography عربية RTL مع Alexandria وNoto Sans Arabic fallback عندما يمكن إثبات المصدر والترخيص؛ لا تدّعِ التحقق إن لم يحدث.
- Light Mode فقط.
- أرقام `0–9` ووحدة `د.أ` في الواجهة العربية.
- Core Components قابلة لإعادة الاستخدام.
- Financial Components مع Truth Layer واضح.
- Contextual Components للحالات والرسائل والفلاتر.
- Bottom Navigation من خمسة تبويبات V1 دون زر سادس أو CTA عائم غير معتمد.
- Header والسلوك المتفق عليه دون استنساخ الشكل القديم.
- حركة وانتقالات ذات سبب، مع Reduced Motion.
- حالات البيانات: Complete وPartial وUnknown وInsufficient وError وOffline وRecovery وLoading وEmpty عند الحاجة.
- مصدر Fixtures واضح، وعدم تحويل المجهول إلى صفر أو رقم مختلق.
- لا Charts إلا عندما يوجد سؤال منتج وبيانات مناسبة؛ `FIN-CHARTS` نمط مشروط وليس شاشة إلزامية.
- لا تخترع Market offerings أو Ask Micro responses أو Delivery behavior غير مثبت.

### 4. بوابة العينات الثلاث — نفذها أولًا

ابنِ داخل الاستوديو، وبجودة قابلة للمراجعة على الهاتف:

1. `OVR-NOW` — Overview / Owner Status.
2. `OPS-SALE-CREATE` — Cash or Credit Sale.
3. `FIN-OVERVIEW` — Finance Overview.

لكل شاشة أنشئ على الأقل:

- Default / primary state.
- حالة Partial أو Unknown ذات أثر على القرار.
- حالة Error أو Recovery مهمة.
- نصوص عربية طويلة وأرقام ومبالغ واقعية موسومة كـFixtures.
- ربطًا واضحًا بالـScreen ID والقرار والمصدر.
- مسارًا قابلًا للضغط داخل الاستوديو، وليس مجرد صورة.

افحص العينات:

- 320 و360 و390 و412 عرضًا.
- RTL فعلي، وليس قلبًا بصريًا آليًا.
- 100% و150% و200% عندما يلزم.
- ألوان ثم Grayscale.
- Loading وError وOffline حيث تنطبق.
- وجود تميّز في التكوين بين Overview وOperations وFinance.
- عدم ظهور كاش على أنه ربح.
- عدم إخفاء المعلومة الحرجة خلف Swipe.
- وضوح أثر العملية قبل الحفظ.
- الفرق بين الرصيد والإيراد والنتيجة والدين.

أنشئ `interactive-design-studio/reports/VISUAL-PROOF-REVIEW.md` مع:

- Question.
- Frame/Route.
- Fixture source.
- Observed evidence.
- Failure or unresolved hypothesis.
- Fix.
- Review state: `Candidate` أو `Changes Required` أو `Ready for Owner Review`.

**لا تتوسع إلى جميع الشاشات قبل تسليم هذه البوابة للمراجعة.** نفذ البنية القابلة للتوسع الآن، لكن ابقِ بقية الشاشات `Not Started` أو `Deferred pending owner review`.

### 5. التوثيق والتسليم داخل المجلد

أنشئ أو حدّث داخل `interactive-design-studio/`:

- `README.md` يشرح التشغيل والبنية وحدود الاستوديو.
- `DESIGN-SYSTEM.md`.
- `TOKEN-DICTIONARY.json` أو Markdown مكافئ قابل للقراءة.
- `COMPONENT-CATALOG.md`.
- `SCREEN-CATALOG.md`.
- `NAVIGATION-MAP.md`.
- `STATE-MATRIX.md`.
- `MOTION-MAP.md`.
- `RTL-ACCESSIBILITY.md`.
- `FIXTURE-CATALOG.md`.
- `ASSET-MANIFEST.md`.
- `DESIGN-TO-DEVELOPMENT.md`.
- `reports/VISUAL-PROOF-REVIEW.md`.
- `reports/QA-SUMMARY.md`.
- `reports/OPEN-ISSUES.md`.
- `reports/DELIVERY-REPORT.md`.

لا تضع ادعاء `PASS` بلا دليل. استخدم `UNVERIFIED` عندما لا يتوفر جهاز أو قارئ شاشة أو مستخدم فعلي.

### 6. تحديث السجلات الجذرية بعد وجود أدلة فعلية

بعد إنتاج المخرجات، حدّث السجلات فقط بالحقائق:

- `04-SCREEN-COVERAGE.csv`
- `05-NAVIGATION-MAPPING.csv`
- `06-COMPONENT-INVENTORY.csv`
- `07-DECISION-TRACEABILITY.csv`
- `11-DELIVERY-MANIFEST.md`
- `12-FINAL-COMPLETION-REPORT.md`
- `13-ASSET-TOKEN-REGISTER.md`

لا تغيّر `MICRO-VISUAL-DESIGN-DECISIONS-V1.md` أو القرارات المعتمدة أو ألوان الهوية أو التبويبات إلا عبر Proposal منفصل وموافقة المالك. لا تستخدم تحديث السجلات لرفع حالة شيء لم يُنتج.

### 7. فحص نهائي

شغّل الاستوديو محليًا وافحص:

- لا أخطاء Build أو Console.
- التشغيل من تعليمات README.
- المسارات الثلاثة تعمل.
- المكونات قابلة لإعادة الاستخدام وليست نسخًا مستقلة.
- RTL واللغة العربية والأرقام و`د.أ` صحيحة.
- لا توجد قيم مالية مختلقة.
- لا يوجد Dark Mode.
- لا يوجد Micro production code.
- لا توجد أسرار أو Tokens أو مفاتيح في الملفات أو Git history.
- لا توجد أصول خارجية بلا مصدر أو ترخيص أو وسم Gap.
- الأدلة تشير إلى ملفات فعلية قابلة للفتح.

استخدم Browser Use أو أي معاينة متاحة للتحقق البصري، واحفظ Screenshots فقط كأدلة مساعدة؛ لا تقدمها بديلًا عن المصدر التفاعلي.

## سياسة GitHub وAccess Token

لرفع العمل، استخدم هذا الفرع فقط:

```text
exec/interactive-design-studio-zed-20260923
```

لا تضع Access Token في هذا Prompt أو أي ملف أو رابط Git. إذا تطلب Zed Credential، يجب أن يقدمه المالك من خلال Secret/Environment Variable أو حقل اعتماد آمن في Zed. لا تطبع قيمته ولا تعرضه في Logs.

الاعتماد المقترح هو GitHub Fine-grained Personal Access Token مخصص فقط للمستودع:

```text
Qays7753/Micro-Bold-Modular-Design-Handoff-V1
```

وبأقل صلاحيات:

- Repository access: هذا المستودع فقط.
- Contents: Read and write.
- Metadata: Read-only (يُمنح تلقائيًا عادةً).
- لا تمنح Administration أو Deletion أو Workflows أو Secrets أو صلاحيات مستودعات أخرى.
- ضع تاريخ انتهاء قصيرًا مناسبًا لهذه المهمة.

إذا لم تتوفر صلاحية Push، لا تغيّر remote إلى رابط يحتوي Token، ولا تعطل العمل بحل غير آمن. سجّل `PUSH BLOCKED` في التقرير وأعطني الخطأ والخطوة المطلوبة.

## Commit وPush

قبل Commit:

```bash
git status --short
git diff --check
git diff --stat
```

أنشئ Commit واحدًا أو عدة Commits مفهومة على هذا الفرع، ثم ادفع إلى الفرع نفسه دون Force Push:

```bash
git add AGENTS.md ZED-START-HERE-INTERACTIVE-DESIGN-STUDIO.md interactive-design-studio/
# If and only if you updated a root delivery registry with real evidence, stage the exact changed registry files separately.
git commit -m "design(studio): build independent interactive design reference"
git push origin HEAD:exec/interactive-design-studio-zed-20260923
```

لا تفتح PR ولا تدمج إلى `main` من تلقاء نفسك. لا تعدّل أي مستودع آخر.

## التقرير النهائي المطلوب في محادثة Zed

أعد ملخصًا دقيقًا يتضمن:

1. Commit SHA والفرع ورابط GitHub.
2. الملفات التي أنشأتها داخل `interactive-design-studio/`.
3. طريقة تشغيل الاستوديو.
4. المسارات الثلاثة التي نُفذت.
5. حالات الشاشة التي نُفذت فعليًا.
6. نتائج فحص 320/360/390/412 وRTL والتكبير.
7. روابط الأدلة الحقيقية.
8. ما هو `Delivered` و`Blocked` و`Deferred` و`UNVERIFIED`.
9. أي قيود تخص Figma، الأصول، الخطوط، الحركة، أو الاختبار الواقعي.
10. تأكيد صريح بأن مستودع Micro الإنتاجي لم يُلمس.

الحالة الصحيحة عند التسليم:

```text
Ready for Owner Review
```

وليست `Accepted` أو `Experience Accepted`.
