// Micro Visual System — TypeScript token mirror + financial formatting (V2).
// المرجع: COLOR-STANDARD-V2.md §§2–3 + §§7، 13.3، 16.2 من القرارات القائمة.
// أرقام إنجليزية 0–9 فقط، فاصلة آلاف «,»، فاصلة عشرية «.», منزلتان افتراضيًا
// والثالثة عند كونها قيمة حقيقية، علامة السالب «−» (U+2212)، والوحدة «د.أ»
// تُعرض مع المبلغ الرئيسي.

export const CURRENCY_UNIT = 'د.أ' as const
export const CURRENCY_SPOKEN = 'دينار أردني' as const
export const MINUS_SIGN = '\u2212' as const // −

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
  useGrouping: true,
})

const integerFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  useGrouping: true,
})

/** تنسيق جزء الرقم فقط (بدون الوحدة) — جزيرة LTR داخل RTL. */
export function formatAmount(value: number): string {
  const formatted = Number.isInteger(value)
    ? numberFormatter.format(value)
    : numberFormatter.format(value)
  return value < 0 ? `${MINUS_SIGN}${formatted.replace(/^-/, '')}` : formatted
}

/** تنسيق كمية صحيحة (عدد عمليات، أطراف…) */
export function formatCount(value: number): string {
  return integerFormatter.format(value)
}

/** تاريخ رقمي DD/MM/YYYY بأرقام إنجليزية (§16.2). */
export function formatDateNumeric(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** نسبة مئوية بأرقام إنجليزية (§16.2) — بلا «0%» عند غياب البيانات. */
export function formatPercent(value: number): string {
  return `${integerFormatter.format(value)}%`
}

/** هاتف أردني LTR معزول (§16.2). */
export function formatPhone(raw: string): string {
  return raw // يُخزن في Fixtures بصيغة عرض جاهزة مثل 079 123 4567
}

/**
 * أزواج الألوان المعتمدة للمراجعة (COLOR-STANDARD-V2 §3) — تُستخدم لحساب
 * التباين برمجيًا في تقارير QA. الأزواج المركبة فعليًا في الواجهة فقط.
 * فوق كتلة الهوية #D97757 لا يوضع أبيض عادي؛ النص الأساسي Ink (#1D2930).
 */
export const APPROVED_COLOR_PAIRS = [
  { id: 'ink-on-canvas', fg: '#1D2930', bg: '#F0F3F4', usage: 'النص الأساسي على Canvas' },
  { id: 'ink-2-on-canvas', fg: '#53616A', bg: '#F0F3F4', usage: 'النص المساند على Canvas' },
  { id: 'ink-on-white', fg: '#1D2930', bg: '#FFFFFF', usage: 'النص الأساسي على السطح الأبيض' },
  { id: 'ink-2-on-white', fg: '#53616A', bg: '#FFFFFF', usage: 'النص المساند على الأبيض' },
  { id: 'ink-on-brand', fg: '#1D2930', bg: '#D97757', usage: 'كل النص فوق كتلة الهوية (لا أبيض عادي)' },
  { id: 'white-on-action', fg: '#FFFFFF', bg: '#A94630', usage: 'نص الزر الصلب' },
  { id: 'white-on-action-pressed', fg: '#FFFFFF', bg: '#8F3B27', usage: 'نص الزر المضغوط (مشتق)' },
  { id: 'ink-on-brand-soft', fg: '#1D2930', bg: '#FBE9E2', usage: 'نص فوق حقل الهوية الناعم' },
  { id: 'action-on-white', fg: '#A94630', bg: '#FFFFFF', usage: 'إجراء نصي/اختيار على الفاتح' },
  { id: 'info-on-surface', fg: '#305968', bg: '#DFEDF1', usage: 'معلومة/دون اتصال على سطحها' },
  { id: 'success-on-surface', fg: '#16765A', bg: '#DFF3E9', usage: 'كلمة حالة نجاح/نتيجة مؤكدة' },
  { id: 'attention-on-surface', fg: '#95590C', bg: '#FFF0D7', usage: 'كلمة حالة انتباه' },
  { id: 'danger-on-surface', fg: '#B0324F', bg: '#FFE7EB', usage: 'كلمة حالة خطر/خسارة' },
  { id: 'partial-on-surface', fg: '#5B6770', bg: '#EDF1F2', usage: 'كلمة حالة جزئي/غير معروف' },
  { id: 'focus-on-canvas', fg: '#305968', bg: '#F0F3F4', usage: 'حد التركيز على Canvas (غير نصي 3:1)' },
  { id: 'boundary-on-canvas', fg: '#78868D', bg: '#F0F3F4', usage: 'حد حقل ضروري على Canvas (غير نصي)' },
] as const

/** دلالات ألوان الحالة (17 §2) للاستخدام الدلالي المقيد في المكونات. */
export const SEMANTIC_STATE_COLORS = {
  success: { fg: '#16765A', surface: '#DFF3E9' },
  warning: { fg: '#95590C', surface: '#FFF0D7' },
  danger: { fg: '#B0324F', surface: '#FFE7EB' },
  info: { fg: '#305968', surface: '#DFEDF1' },
  partial: { fg: '#5B6770', surface: '#EDF1F2' },
  unknown: { fg: '#5B6770', surface: '#EDF1F2' },
  local: { fg: '#305968', surface: '#DFEDF1' },
} as const

export type SemanticStateKey = keyof typeof SEMANTIC_STATE_COLORS
