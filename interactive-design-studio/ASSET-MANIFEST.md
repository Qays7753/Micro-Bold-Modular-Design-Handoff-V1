# ASSET-MANIFEST — سجل الأصول والتراخيص

**المرجع:** `13-ASSET-TOKEN-REGISTER.md` + §§9، 13.21، 21.1. كل أصل هنا مصدره وترخيصه موثقان، أو موسوم كأصل مرشح/فجوة — لا أصول مجهولة.

## 1. الخطوط (مثبتة المصدر والترخيص)

| Asset ID | الملف | المصدر | الترخيص | SHA-256 (بداية) | الحالة |
|---|---|---|---|---|---|
| AS-FONT | `assets/fonts/Alexandria-VF.ttf` (332KB) | google/fonts · `ofl/alexandria/Alexandria[wght].ttf` | `assets/fonts/OFL-Alexandria.txt` — SIL OFL 1.1 | `db8ae03b…` | Delivered (Candidate مع الاستوديو) |
| AS-FALLBACK | `assets/fonts/NotoSansArabic-VF.ttf` (844KB) | google/fonts · `ofl/notosansarabic/NotoSansArabic[wdth,wght].ttf` | `assets/fonts/OFL-NotoSansArabic.txt` — SIL OFL 1.1 | `63111b5b…` | Delivered (Candidate مع الاستوديو) |

خطان متغيران (100–900) يغطيان Regular/Medium/SemiBold/Bold المطلوبة (§7). يُحمَّلان محليًا عبر `@font-face` في `typography.css` — لا CDN ولا طلب شبكة عند التشغيل. تنزيلهما تم من المستودع الرسمي `github.com/google/fonts` بتاريخ 2026-09-23.

## 2. الأيقونات (Phosphor — مثبتة المصدر والترخيص)

| Asset ID | المجلد | المصدر | الترخيص | الحالة |
|---|---|---|---|---|
| AS-ICONS | `assets/icons/regular/` (33 SVG) + `assets/icons/fill/` (7 SVG) | `@phosphor-icons/core@2.1.1` عبر unpkg (بادئة `assets/regular|fill/`) | `assets/icons/LICENSE-phosphor.txt` — MIT © 2023 Phosphor Icons | Delivered (Candidate) |

الأسماء المستخدمة: gauge, briefcase, wallet, toolbox, storefront (تبويبات §11.3)؛ user-circle-gear, truck (المنطقة العلوية §11.7)؛ basket, hand-coins, receipt, arrows-left-right, coins (أنواع الحركات §13.5/13.9)؛ caret-left/down/up, arrow-right, x, check, plus, minus, magnifying-glass, warning-circle, info, phone, user-circle, sliders-horizontal, sign-out, wifi-slash, wifi-high, calendar-blank, note-pencil, funnel, currency-circle-dollar. سجل SVGs مجمعة ببصمة مجلد `815586eb…` والمصدر المولد المشتق منها: `src/components/icons/phosphor.generated.ts` (توليد آلي — لا تحرير يدوي).

## 3. أصول مرشحة (GAP — لا تُعد معتمدة)

| Asset ID | الوصف | الحالة | القيد |
|---|---|---|---|
| AS-SIGNAL (GAP-002) | علامة Micro الرباعية (Micro Signal) — أربع وحدات هندسية تنفذها CSS في `contextual.css` + `MicroQuadMark` | **Candidate — أصل مرشح موسوم** | هندستها النهائية مربوطة بمراجعة الشعار النهائي (§13.21)؛ لا يُسمى أصلًا معتمدًا |
| AS-GLYPHS (GAP-003) | Micro Financial Glyphs (بيع مقابل تحصيل…) | **Not Produced — استخدام Phosphor للمفاهيم العامة + أشكال مرشحة بسيطة** | تحتاج أصلًا مرتبطًا بالشعار |
| AS-LOGO (GAP-001) | شعار Micro النهائي | **Asset Gap — غير مطلوب في الـHeader أصلًا (§11.7: لا شعار في المنطقة العلوية)** | لا يعطل أي عينة |

`public/favicon.svg`: علامة رباعية استوديو-مرجعية بألوان الهوية — أداة تشغيل للاستوديو فقط وليست شعار منتج.

## 4. Tokens

القيم المعتمدة مطابقة لسجل `13-ASSET-TOKEN-REGISTER.md` حرفيًا (Deep Ink `#171923`، Canvas `#F4F6FA`، Indigo `#4F46E5`…). القاموس الكامل: `TOKEN-DICTIONARY.md/.json` (174 Token بثلاث طبقات) مولّد آليًا من `src/foundations/tokens.css`. لا Hex خارج طبقة الـTokens.
