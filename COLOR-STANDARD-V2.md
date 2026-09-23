# Micro — Color Standard V2

**الحالة:** مرجع اللون المعتمد لاتجاه Micro V2 المرئي، بتاريخ 2026-09-23. الأرقام والأزواج أدناه مرجع للأدوار؛ قيم التوكنز الحية في `interactive-design-studio/src/foundations/tokens.css` و`interactive-design-studio/src/foundations/tokens.ts`. المالك اعتمد اتجاه V2 الظاهر و`#D97757` تحديدًا؛ هذا لا يعني اختبار جميع الشاشات المستقبلية على مستخدمين.

**النطاق:** واجهة عربية RTL، Light Mode فقط. اللون ليس إثباتًا للربح أو الخسارة وحده. لا تحوّل جميع المكونات إلى لون الهوية؛ حافظ على أدوار الفعل والدلالة والمعلومة وحدود التفاعل.

## 1. Design intent

Micro should feel awake, competent and comfortable to a Jordanian small business owner seeking an answer quickly. A large color field is allowed when its content and purpose justify it. **No 70/20/10, 70–80% neutral, 1–5% brand, or 5–8% terracotta quota applies.** No requirement to paint the same block on every screen. Distinctiveness depends on the relation between color, typography, space, content and interaction; changing one HEX without changing the composition fails this brief.

`#D97757` is the **lead brand color**, not an auxiliary accent and not a profit/loss/collection signal. It may frame a meaningful section, support a distinctive top-level area or be used for a strong module when visual hierarchy warrants it. It need not be confined to a logo or tiny touch. The important financial label, number, qualifier and period must stay clearly legible and truthful; a large branded background must not imply that sales, cash or debt are profit. Place detailed figures on a readable surface within or beside the block if needed.

## 2. Color roles to implement

| Role | HEX | Use and guardrail |
|---|---|---|
| Brand lead | `#D97757` | Brand surfaces and structural emphasis when appropriate; no ordinary white text, small white money figures, or small functional white icon on this background. Large white type may be used only at the actual WCAG large-text size/weight; do not infer readability from a screenshot. Dark `#1D2930` passes normal-text contrast on this color. |
| Action / on-action | `#A94630` / `#FFFFFF` | Solid main action with a short verb; usable normal white text. Do not classify an amount as profit or danger by this action color. Avoid making every action a solid terracotta pill. |
| Brand soft | `#FBE9E2` | A local supporting field tied to identity or explanation; no automatic pastel card behind every datum. Dark text or `#A94630` only after pair verification. |
| Canvas / primary surface | `#F0F3F4` / `#FFFFFF` | Quiet reading foundation. Their difference (~1.12:1) does not by itself define the edge of a field or interactive control. Vary composition rather than producing a uniform white-card grid. |
| Primary / secondary text | `#1D2930` / `#53616A` | Primary numbers, titles and status wording; secondary units, dates and explanations. No lowered-opacity critical text. English digits `0–9`, Arabic copy and `د.أ`; keep unit and amount together. |
| Information / container | `#305968` / `#DFEDF1` | Neutral comparison, explanation or explicitly named cash information. Never a shorthand for profit or collection. Limit repetition of blue-gray fields that makes every screen look like a generic fintech template. |
| Success / container | `#16765A` / `#DFF3E9` | Confirmed saved action, verified result or fully computed profit, with a word and non-color cue. A cash receipt or any positive figure alone is not profit. |
| Attention / container | `#95590C` / `#FFF0D7` | Actionable attention and near-term due items, labeled with reason and time; overdue severity follows actual consequence and action, not a fixed rule that all debts turn amber or red. |
| Danger / container | `#B0324F` / `#FFE7EB` | Clearly serious loss, harmful error or urgent overdue condition as justified by scenario; use distinct words/icons for loss versus save failure. No red for ordinary expense, debt, or missing data. |
| Partial / unknown | `#5B6770` / `#EDF1F2` | Unknown or incomplete result with reason and next step. Never render missing profit as `0.00`; distinguish visually and verbally from Disabled. |
| Necessary control outline | `#78868D` | Borders that are required to discover a field/control against white and canvas, not a border around every card. |
| Decorative divider | `#DCE3E5` | Dividers that do not carry a control boundary or required graphic information. |
| Focus / selection | `#305968` / `#A94630` | Focus outline visible against its **actual adjacent** surface; selection needs shape/weight/position as well as color. Recheck combinations over brand and semantic fields. |
| Pressed / Disabled | **Derived and documented by ZAI** | Pressed must be discernible, contrast-valid, reversible and consistent. Disabled must not look like unknown data and must not conceal the reason for an unavailable action. Do not use opacity to create unmeasured text pairs. |
| Chart series | `#305968` (current), `#5B6770` (prior) | Direct labels + solid versus dotted/marker pattern, separate intersecting strokes as needed. These two colors have only ~1.31:1 contrast *against one another*; shape/labels and neighboring background must make comparisons perceivable. Verified success/danger colors are reserved for a chart that actually encodes those semantic states. |

لا تعِد ألوان الاتجاهات السابقة إلى التوكنز أو الشاشات. استخدم أدوار اللون الحالية وقياس التباين الفعلي لكل سطح وحالة.

## 3. Checked contrast pairs (sRGB WCAG 2.2)

| Foreground / background | Ratio | Intended use |
|---|---:|---|
| `#FFFFFF` / `#D97757` | 3.12:1 | **Fails ordinary text** (requires 4.5:1); qualifies for genuinely large text (requires 3:1) only. |
| `#1D2930` / `#D97757` | 4.76:1 | Ordinary text passes; visual comfort still requires screen review. |
| `#FFFFFF` / `#A94630` | 5.82:1 | Ordinary text on solid action passes. |
| `#1D2930` / `#FFFFFF` | 14.87:1 | Primary text on main surface passes. |
| `#53616A` / `#F0F3F4` | 5.73:1 | Secondary text on canvas passes. |
| `#78868D` / `#F0F3F4` | 3.37:1 | Necessary border against canvas passes non-text threshold. |
| `#305968` / `#DFEDF1` | 6.36:1 | Information text passes. |
| `#16765A` / `#DFF3E9` | 4.81:1 | Success label passes; no opacity. |
| `#95590C` / `#FFF0D7` | 5.04:1 | Attention label passes. |
| `#B0324F` / `#FFE7EB` | 5.24:1 | Danger label passes. |
| `#5B6770` / `#EDF1F2` | 5.10:1 | Unknown/partial label passes. |

These are checks on specified solid pairs, **not** a declaration that current or future screens pass WCAG. ZAI must recalculate actual pairs after replacing tokens, including hover/pressed/focus, navigation, overlays, charts and all relevant states. For ordinary text use 4.5:1, genuinely large text 3:1, and necessary non-text elements 3:1 against adjacent color. Do not rely on color alone for meaning. A measured minimum does not prove daytime comfort or pleasure.


## 4. التطبيق

انتقل بالأدوار عبر التوكنز والمكونات المشتركة أولًا، ثم افحص كل حالة في موضعها الحقيقي. امنع نقل قيم Fixtures أو استنتاج منطق مالي من لون. تقرير الأزواج المنفذة هو `interactive-design-studio/reports/CONTRAST-REPORT.md`، وقيم الضغط والحالات المشتقة تقرأ من ملفات التوكنز؛ تحتاج الحالات والشاشات الجديدة فحصًا مستقلًا. لا وضع ليلي في هذه المرحلة.
