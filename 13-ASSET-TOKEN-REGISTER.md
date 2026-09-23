# Asset and Token Register — محدّث بالأدلة بعد إنتاج الاستوديو

هذا السجل محدّث بعد تنفيذ بوابة العينات الثلاث (2026-09-23). القيم المعتمدة في §§6–9؛ المرجع الأعلى يتقدم على هذا الملخص عند أي اختلاف.

## ألوان أساسية — مطابقة مطبقة داخل الاستوديو

| Semantic role | Current approved value | ملاحظة |
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

أزواج النص المطبقة حرفيًا (White/Indigo، Deep Ink/Citrus، Deep Ink/Soft Semantic) ومحسوبة برمجيًا في `interactive-design-studio/reports/CONTRAST-REPORT.md` (17 زوجًا؛ زوج Danger-على-سطحه عند حده 4.5:1 موثق قيده من §16.3). لا Hex داخل Component Instances — ثلاث طبقات Tokens (174 توكن) في `interactive-design-studio/src/foundations/tokens.css` والقاموس `TOKEN-DICTIONARY.md/.json`. Light Mode فقط.

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
