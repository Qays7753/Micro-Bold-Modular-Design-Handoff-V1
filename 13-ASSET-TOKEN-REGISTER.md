# Asset and Token Register

هذا سجل بدء، لا يتضمن ملفات SVG أو خطوطًا منتجة. القيم المعتمدة في §§6–9؛ المرجع الأعلى يتقدم على هذا الملخص عند أي اختلاف.

## ألوان أساسية للتحقق عند البناء

| Semantic role | Current approved value | ملاحظة |
|---|---|---|
| `Text/Primary` | `#171923` | Deep Ink |
| `Canvas` | `#F4F6FA` | Cool Cloud |
| `Surface/Primary` | `#FFFFFF` | White |
| `Surface/Secondary` | `#EEF1F7` | Secondary Surface |
| `Action/Primary` | `#4F46E5` | Indigo |
| `Action/Pressed` | `#3F37C9` | Indigo Pressed |
| `Accent/Citrus` | `#D9F43B` | ليس لتأكيد مالي حساس |
| `Accent/Terracotta` | `#C45F46` | مساند لا يقود ولا نص صغير |
| `Text/Secondary` | `#5E6472` | يحتاج تحقق على التركيب الفعلي |
| `Text/Unavailable` | `#7D8596` | لا تعتم مكونًا كاملًا |
| `Boundary/Interactive` | `#7A8292` | عند الحاجة الوظيفية |
| `Boundary/Decorative` | `#D8DDE8` | ليس حدًا تفاعليًا وحده |

أزواج النص: White/Indigo وDeep Ink/Citrus وDeep Ink/Soft Semantic. تفحص النسبة على الحالات الحقيقية؛ لا تضع Hex داخل Component Instances. Light Mode فقط.

## Asset Manifest — يملؤه المنفذ

| Asset ID | الوظيفة | نوع الملف | المصدر | حالة الترخيص | رابط | حالة الاعتماد |
|---|---|---|---|---|---|---|
| AS-LOGO | الشعار النهائي إن استخدم | SVG | يحتاج أصلًا معتمدًا | غير متحقق | — | Asset Gap |
| AS-ACCOUNT | UserCircleGear | SVG | Phosphor وفق §11 | يتحقق | — | Not Produced |
| AS-ICONS | مجموعة تبويبات وأفعال | SVG | Phosphor مع قواعد Micro | يتحقق | — | Not Produced |
| AS-FONT | Alexandria | Font | مصدر خط موثق | يتحقق | — | Not Produced |
| AS-FALLBACK | Noto Sans Arabic | Font | مصدر خط موثق | يتحقق | — | Not Produced |
| AS-GLYPHS | Micro Financial Glyphs | SVG | هندسة مرتبطة بمراجعة شعار نهائي | غير متحقق | — | Asset Gap |

لا تخترع شعارًا من أيقونة الحساب؛ زر الحساب ليس شعار Micro. لا تستخدم Pattern مرجعيًا من صور الإنترنت بلا إذن وتوثيق. يجب أن تتوافق الأصول مع RTL واتجاهية الأيقونات في §9/16.1.

فجوة `AS-LOGO` لا توقف عينات الواجهة العلوية لأن المرجع §11.7 يقرر ألا يظهر الشعار فيها. تعرض علامة `اسأل Micro` الرباعية و`AS-GLYPHS` بوصفها أصلًا مرشحًا أو فجوة واضحة في مناطق استخدامها حتى اعتماد الأصل المناسب؛ لا يصبح الرسم المؤقت علامة نهائية صامتًا. يراجع المنفذ تراخيص المصادر قبل تسليم ملفات الخطوط والأيقونات، ولا يصنف نقص الترخيص `Verified`.
