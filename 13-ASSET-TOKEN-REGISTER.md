# Asset and Token Register — قرار الألوان الجديد مقابل التنفيذ السابق

السجل أدناه يميز ما **نفذ سابقًا** عما **يجب تنفيذه**؛ لا يجعل تغيير الوثائق الاستوديو محدّثًا بحد ذاته. المرجع الحاكم الجديد `17-COLOR-DECISION-2026-09-23.md`، وأمر التحديث `18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md`.

## خط الأساس الجديد المطلوب — التنفيذ لم يُتحقق منه بعد

| الدور | القيمة الجديدة | الحالة |
|---|---|---|
| `Brand/Lead` | `#D97757` | قرار مالك معتمد؛ توزيع اللون في الشاشات لا يزال مرشحًا للمراجعة البصرية. |
| `Action/Primary` / `OnAction` | `#A94630` / `#FFFFFF` | خط أساس التنفيذ؛ لا يعني ملاحظة نجاح مالي. |
| `Brand/Soft` | `#FBE9E2` | خط أساس التنفيذ، لا سطح لكل بطاقة. |
| `Text/Primary` / `Text/Secondary` | `#1D2930` / `#53616A` | خط أساس التنفيذ. |
| `Canvas` / `Surface` | `#F0F3F4` / `#FFFFFF` | خط أساس التنفيذ. |
| `Information` / `Surface` | `#305968` / `#DFEDF1` | خط أساس التنفيذ. |
| `Success` / `Surface` | `#16765A` / `#DFF3E9` | خط أساس التنفيذ. |
| `Attention` / `Surface` | `#95590C` / `#FFF0D7` | خط أساس التنفيذ. |
| `Danger` / `Surface` | `#B0324F` / `#FFE7EB` | خط أساس التنفيذ. |
| `Partial/Unknown` / `Surface` | `#5B6770` / `#EDF1F2` | خط أساس التنفيذ. |
| `Boundary/Interactive` / `Divider` | `#78868D` / `#DCE3E5` | خط أساس التنفيذ؛ حالات التركيز والضغط والمعطل تقاس بعد التنفيذ. |

القيم بخلاف Brand يختارها التصميم المهني لهذه الجولة، وليست موافقات فردية من المالك. البيانات التطبيقية في الجدول التالي **إصدار سابق** فقط؛ يجب على ZAI تحديث دليل التطبيق بعد تعديل الكود وتشغيل الفحوص.

## ألوان أساسية — رصد تاريخي للإصدار السابق لا قيم سارية

| Semantic role | Old observed value | ملاحظة تاريخية |
|---|---|---|
| `Text/Primary` | `#171923` | Deep Ink — مطبق عبر `--c-ink` |
| `Canvas` | `#F4F6FA` | Cool Cloud — مطبق |
| `Surface/Primary` | `#FFFFFF` | مطبق |
| `Surface/Secondary` | `#EEF1F7` | مطبق |
| `Action/Primary` | `#4F46E5` | Indigo — مطبق (الكتلة القوية الوحيدة والأزرار الأساسية) |
| `Action/Pressed` | `#3F37C9` | مطبق (`:active`) |
| `Accent/Citrus` | `#D9F43B` | مطبق محصورًا: لم يؤكد أي عملية مالية |
| `Accent/Terracotta` | `#C45F46` | مساند — ظهر هندسيًا في العلامة المرشحة فقط، لم يقُد سطحًا أو زرًا |
| `Text/Secondary` | `#5E6472` | مطبق — تباين 5.48:1 على Canvas (CONTRAST-REPORT) |
| `Text/Unavailable` | `#7D8596` | مطبق للحالات المعطلة فقط |
| `Boundary/Interactive` | `#7A8292` | مطبق للحدود الوظيفية (زر Secondary/حقول) |
| `Boundary/Decorative` | `#D8DDE8` | مطبق للـDividers |

الأزواج القديمة محسوبة في `interactive-design-studio/reports/CONTRAST-REPORT.md` **للإصدار القديم فقط**؛ لا يُنقل حكم نجاحها إلى اللوحة الجديدة. المكونات القديمة لا تحوي Hex مباشرًا؛ يعيد ZAI توليد Tokens والقاموس والتقرير من النسخة المنفذة الجديدة. Light Mode فقط.

## Asset Manifest — محدّث بالإنتاج

| Asset ID | الوظيفة | نوع الملف | المصدر | حالة الترخيص | رابط | حالة الاعتماد |
|---|---|---|---|---|---|---|
| AS-LOGO | الشعار النهائي إن استخدم | SVG | يحتاج أصلًا معتمدًا | غير متحقق | — | **Asset Gap (GAP-001)** — لا يحجب العينات لأن الـHeader بلا شعار (§11.7) |
| AS-ACCOUNT | UserCircleGear | SVG | Phosphor `@phosphor-icons/core@2.1.1` | **MIT موثق** — `assets/icons/LICENSE-phosphor.txt` | `interactive-design-studio/assets/icons/regular/user-circle-gear.svg` | **Delivered (Candidate)** |
| AS-ICONS | مجموعة تبويبات وأفعال (33 Regular + 7 Fill) | SVG | Phosphor وفق §11 | **MIT موثق** | `interactive-design-studio/assets/icons/` + السجل المولد `src/components/icons/phosphor.generated.ts` | **Delivered (Candidate)** |
| AS-FONT | Alexandria (Variable 100–900) | TTF | google/fonts `ofl/alexandria` | **SIL OFL 1.1 موثق** — `assets/fonts/OFL-Alexandria.txt` | `interactive-design-studio/assets/fonts/Alexandria-VF.ttf` (SHA-256 يبدأ `db8ae03b`) | **Delivered (Candidate)** |
| AS-FALLBACK | Noto Sans Arabic (Variable) | TTF | google/fonts `ofl/notosansarabic` | **SIL OFL 1.1 موثق** — `assets/fonts/OFL-NotoSansArabic.txt` | `interactive-design-studio/assets/fonts/NotoSansArabic-VF.ttf` (SHA-256 يبدأ `63111b5b`) | **Delivered (Candidate)** |
| AS-SIGNAL | علامة Micro الرباعية (Micro Signal) | CSS/React | تنفيذ داخلي وفق أوصاف §10.4 الوظيفية | داخلي | `interactive-design-studio/src/components/contextual/MicroSignal.tsx` + `contextual.css` | **Candidate — أصل مرشح موسوم (GAP-002)** — لا يُعد معتمدًا قبل مراجعة الشعار |
| AS-GLYPHS | Micro Financial Glyphs | — | هندسة مرتبطة بمراجعة شعار نهائي | غير متحقق | — | **Asset Gap (GAP-003)** — Phosphor للمفاهيم العامة + أشكال مرشحة بسيطة |

لا يُخترع شعار من أيقونة الحساب؛ زر الحساب ليس شعار Micro (مطبق). لا Pattern مرجعي من صور الإنترنت (لا يوجد). الأصول متوافقة مع RTL واتجاهية الأيقونات §9/16.1 (back = سهم يمين؛ غير الاتجاهية لا تُعكس). تراخيص الخطوط والأيقونات راجعت من مصادرها الرسمية ومرفوعة كملفات، وحالة كل أصل مرشح موسومة حتى اعتماد المالك — لا يصنف نقص الترخيص `Verified`.
