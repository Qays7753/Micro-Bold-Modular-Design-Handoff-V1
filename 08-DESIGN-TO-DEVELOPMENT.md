# Design-to-Development Handoff

**حدود المرحلة الحالية:** هذا الملف قالب لعمل المصمم لاحقًا، وليس طلبًا لكتابة كود أو تغيير مستودع Micro. المرجع §§11–16 و21.4.

## لكل Screen ID معتمد

| البند | ماذا يسلم المصمم |
|---|---|
| المرجع | Screen ID، رابط Frame بحالة Approved، أقسام القرار |
| البنية | منطقة أعلى، محتوى، أسفل، Safe Areas، طبقات وظروف ظهورها |
| التكوين | مقاسات مرجعية ونطاقات Reflow وHierarchy وشكل المحتوى الطويل |
| النص والمال | نصوص عربية فعلية، حالات صفر/غير مسجل/جزئي، وحدة د.أ، BiDi |
| التفاعل | Entry/Exit، Tap، Swipe، Back، سلوك الطبقات، استعادة الموقع |
| الحالات | Loaded، Empty، Partial، Loading، Error، Offline، Local/Pending عند وجودها |
| الوصول | Target، Focus، Accessible Name/Role/State، ترتيب القراءة، تكبير 200% |
| Motion | Trigger، Source، Destination، Duration Range، Reduced Motion |
| الأصول | SVG والخط والترخيص والـToken المستخدم |
| القبول | لقطة/تسجيل للأجهزة والحالات المهمة، Issue ID عند الفشل |

## Design-to-Code Map — ينشئه المنفذ

| Design ID | Figma Component URL | Token IDs | Variant/State | Code counterpart | Owner | Status |
|---|---|---|---|---|---|---|
| `Financial/MoneyValue` | يُملأ بعد الإنتاج | يرجع لـ§7/8/13 | Positive/Negative/Unknown | يعينه فريق التنفيذ | يعين | Not Started |

لا يلزم Framework بعينه. ينفذ المطور semantics والأداء والأمن والحسابات وفق مواصفات تقنية مستقلة؛ هذه الوثيقة تحمي الشكل والمعنى المعروض فقط. لا يقرر المصمم أثر البيع أو الدين أو المزامنة على السجل.

## Design Gap Protocol

أي عنصر ناقص يسجل في `10-GAP-CONFLICT-CHANGE-LOGS.md` بمعرف الشاشة والأثر والمصدر، ويوقف الجزء المتأثر. لا يستخدم Default UI أو نسخة Micro القديمة أو عنصر مكتبة جاهزة لتغطية النقص. التغيير المطلوب في Navigation أو هوية أو Component Contract يدخل Change Request، بينما مخالفة Frame المعتمدة تعد Defect.

## التسلسل المستقبلي الموصى به

Tokens → Typography/Icons → Core → Financial → Contextual → Global Shell → Critical Journeys → Remaining Screens → Stress Cases → Visual/Accessibility QA. لا ينفذ Agent شاشات متعددة بمكونات مستقلة ذات قيم عشوائية. لا يعني انتهاء كود الشاشة قبولها البصري.
