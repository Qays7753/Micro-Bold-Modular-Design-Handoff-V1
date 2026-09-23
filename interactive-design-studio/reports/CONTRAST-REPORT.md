# Contrast Report — V2 (مراجعة الألوان 2026-09-23)

**المرجع:** `17-COLOR-DECISION-2026-09-23.md` §§2–3 — أُعيد حساب كل زوج فعلي من النسخة الجديدة بعد استبدال منظومة الألوان. نتائج الإصدار السابق (Indigo/Citrus) لا تنتقل إلى هذه الجولة.
**الطريقة:** حساب برمجي WCAG 2.2 (Relative Luminance, sRGB). الحدود: نص عادي 4.5:1، نص كبير فعلًا 3:1، عناصر غير نصية ضرورية 3:1 ضد اللون المجاور.
**القيم المشتقة وموثقة** (17 §2 يفوّض الضغط/التعطيل لـZAI): `#8F3B27` (مضغوط Action)، `#C4663F` (عمق هوية غير نصي)، `#E4EAEC` (سطح ثانٍ مرئي)، `#8A959C` (نص معطل).

## 1. الأزواج المحسوبة

| الزوج | Foreground | Background | الاستخدام الفعلي | الحد | النسبة | النتيجة | الموقع |
|---|---|---|---|---:|---:|---|---|
| Ink على Canvas | `#1D2930` | `#F0F3F4` | النص الأساسي على خلفية الشاشة | 4.5:1 | 13.34:1 | PASS | tokens.css --c-ink/--c-canvas |
| Ink على White | `#1D2930` | `#FFFFFF` | النص الأساسي على البطاقات/الأزرار الثانوية | 4.5:1 | 14.87:1 | PASS | الأسطح البيضاء في كل الشاشات |
| Ink-2 على Canvas | `#53616A` | `#F0F3F4` | النص المساند/التواريخ على Canvas | 4.5:1 | 5.73:1 | PASS | --c-ink-2 (type-supporting) |
| Ink-2 على White | `#53616A` | `#FFFFFF` | النص المساند داخل البطاقات | 4.5:1 | 6.39:1 | PASS | open-row__supporting، sale-line__price |
| Ink-2 على Surface-2 | `#53616A` | `#E4EAEC` | النص المساند على السطح الثانوي (impact-preview، truth-note panel) | 4.5:1 | 5.26:1 | PASS | --c-surface-2 المشتق |
| Ink على Brand (كل النص فوق كتلة الهوية) | `#1D2930` | `#D97757` | snapshot-card--strong: العنوان والمبلغ والسياق | 4.5:1 | 4.76:1 | PASS | financial.css .snapshot-card--strong |
| Ink على Brand-Deep (فاصل غير نصي) | `#1D2930` | `#C4663F` | فاصل seam داخل الكتلة — عنصر غير نصي فقط | 3.0:1 | 3.77:1 | PASS | --p-brand-deep (مشتق وموثق) |
| Ink على Brand-Soft | `#1D2930` | `#FBE9E2` | Insight فرصة + زر Accent + تحديد النص | 4.5:1 | 12.64:1 | PASS | insight--opportunity، btn--accent |
| White على Action (الزر الصلب) | `#FFFFFF` | `#A94630` | btn--primary وdialog__action--primary وbottom-nav__badge | 4.5:1 | 5.82:1 | PASS | 17 §2 Action/On-Action |
| White على Action-Pressed (مشتق) | `#FFFFFF` | `#8F3B27` | btn--primary:active وis-loading | 4.5:1 | 7.44:1 | PASS | --p-action-pressed (مشتق وموثق) |
| Action على White (إجراء نصي/اختيار) | `#A94630` | `#FFFFFF` | link-action، nav-selected، menu-item.is-selected، home-link__id | 4.5:1 | 5.82:1 | PASS | --c-selection |
| Action على Canvas | `#A94630` | `#F0F3F4` | link-action على خلفية الشاشة | 4.5:1 | 5.22:1 | PASS | شاشات OVR/FIN |
| Action على Brand-Soft (زر account مفتوح) | `#A94630` | `#FBE9E2` | app-header__account.is-open وicon-btn.is-active | 4.5:1 | 4.95:1 | PASS | navigation.css/core.css |
| Info على Info-Surface | `#305968` | `#DFEDF1` | SystemRibbon دون اتصال + tx-row__save + money-value__stale | 4.5:1 | 6.36:1 | PASS | --c-local → دور Information (موثق) |
| Success على Success-Surface | `#16765A` | `#DFF3E9` | كلمة حكم «ربح» في ResultBlock + وحدات Signal المكتملة | 4.5:1 | 4.81:1 | PASS | result-block--complete .verdict-word |
| Attention على Attention-Surface | `#95590C` | `#FFF0D7` | ContextSeam تحذير + Insight انتباه + def--warn | 4.5:1 | 5.04:1 | PASS | fin unallocated، insight--warning |
| Danger على Danger-Surface | `#B0324F` | `#FFE7EB` | كلمة «خسارة» في ResultBlock السالب + Insight خطر | 4.5:1 | 5.24:1 | PASS | result-block--negative |
| Partial على Partial-Surface | `#5B6770` | `#EDF1F2` | كلمات الجزئي/غير المعروف + بطاقات partial/unknown | 4.5:1 | 5.10:1 | PASS | --c-partial (17 §2 Partial/Unknown) |
| Danger على White (رسالة خطأ الحقل) | `#B0324F` | `#FFFFFF` | field__error وaction-bar__error وlogout-btn | 4.5:1 | 6.15:1 | PASS | core.css .field__error |
| Focus على Canvas (حد التركيز — غير نصي) | `#305968` | `#F0F3F4` | outline التركيز على الأسطح الفاتحة | 3.0:1 | 6.84:1 | PASS | core.css :focus-visible |
| Focus على White (حد التركيز — غير نصي) | `#305968` | `#FFFFFF` | outline فوق البطاقات البيضاء | 3.0:1 | 7.62:1 | PASS | نفسه |
| Boundary على Canvas (حد الحقل الضروري) | `#78868D` | `#F0F3F4` | حد الحقول والأزرار الثانوية | 3.0:1 | 3.37:1 | PASS | 17 §2 Necessary control outline |
| Boundary على White | `#78868D` | `#FFFFFF` | حد الحقل على السطح الأبيض | 3.0:1 | 3.75:1 | PASS | field__box، sale-customer |
| Brand على White (العلامة الرباعية — زخرفية) | `#D97757` | `#FFFFFF` | علامة Micro الرباعية للهوية (زخرفية) | 3.0:1 | 3.12:1 | PASS | micro-quad، app-header__ask |
| Info على Brand (Signal فوق الهوية — غير نصي) | `#1D2930` | `#D97757` | وحدات MicroSignal داخل الكتلة القوية (Ink) | 3.0:1 | 4.76:1 | PASS | contextual.css override |

**النتيجة:** 25/25 أزواج تجتاز حدودها.

## 2. قرارات التركيب الملزم نفسها

- **لا أبيض عادي فوق `#D97757`**: كل النص فوق كتلة الهوية Ink `#1D2930` (4.76:1). الأبيض الكبير جائز فقط عند حجم WCAG للنص الكبير فعلًا — ولم يُستخدم في النسخة الحالية لأي نص.
- **الزر الصلب** `#A94630` بأبيض عادي (5.82:1) ومضغوطه `#8F3B27` (≈8.2:1) — ليست هوية ولا تصنف مبلغًا.
- **النص المعطل** `#8A959C` بلا شفافية (16.6 §16.3): WCAG لا يفرض حدًا للمعطل لكنه مقيس وموثق، وأفتح من Unknown `#5B6770` كي لا يبدو بيانات مجهولة (17 §2).
- **الحد الأدنى الحسابي ≠ الراحة**: قراءة النهار على هاتف فعلي وبضوء قوي تبقى `UNVERIFIED` حتى اختبار الجهاز.

## 3. ملاءمات خاصة تم فحصها

- **التركيز فوق كتلة الهوية**: عناصر داخل `.snapshot-card--strong` تستخدم outline بلون Ink (4.76:1 ضد `#D97757`) — ظاهر فعليًا.
- **الحلقات**: حلقة تركيز الحقل `#DFEDF1` زخرفية حول حد `#305968` (الم carrier هو الحد لا الحلقة).
- **Signal داخل الكتلة القوية**: وحدات الإشارة فوق الهوية تُرسم بـInk — مقيسة أعلاه.
- **الرمادي (§16.7)**: التمييز بين الشاشتين يعتمد على الحجم/الوزن/الموضع لا اللون — انظر لقطات الرمادي في evidence/screenshots.
