// Micro Visual System — TypeScript token mirror + financial formatting.
// المرجع: §§7، 8، 13.3، 16.2. أرقام إنجليزية 0–9 فقط، فاصلة آلاف «,»،
// فاصلة عشرية «.», منزلتان افتراضيًا والثالثة عند كونها قيمة حقيقية،
// علامة السالب «−» (U+2212)، والوحدة «د.أ» تُعرض مع المبلغ الرئيسي.

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
 * أزواج الألوان المعتمدة (§8 + §16.3) — تُستخدم لحساب التباين برمجيًا
 * في أدلة QA. هذه هي المصادر الوحيدة المسموح بها للتركيب.
 */
export const APPROVED_COLOR_PAIRS = [
  { id: 'ink-on-canvas', fg: '#171923', bg: '#F4F6FA', usage: 'النص الأساسي على Canvas' },
  { id: 'ink-2-on-canvas', fg: '#5E6472', bg: '#F4F6FA', usage: 'النص المساند على Canvas' },
  { id: 'ink-on-white', fg: '#171923', bg: '#FFFFFF', usage: 'النص الأساسي على السطح الأبيض' },
  { id: 'ink-2-on-white', fg: '#5E6472', bg: '#FFFFFF', usage: 'النص المساند على الأبيض' },
  { id: 'white-on-indigo', fg: '#FFFFFF', bg: '#4F46E5', usage: 'نص الزر الأساسي / الكتلة القوية' },
  { id: 'ink-on-citrus', fg: '#171923', bg: '#D9F43B', usage: 'نص Accent فوق Citrus' },
  { id: 'ink-on-soft-semantic', fg: '#171923', bg: '#E8E7FF', usage: 'نص فوق سطح Soft Indigo' },
  { id: 'ink-2-on-soft-semantic', fg: '#5E6472', bg: '#E8E7FF', usage: 'مساند فوق سطح Soft' },
  { id: 'success-on-surface', fg: '#137A55', bg: '#DCF4E8', usage: 'كلمة حالة نجاح' },
  { id: 'warning-on-surface', fg: '#A65A00', bg: '#FFF0D6', usage: 'كلمة حالة تحذير' },
  { id: 'danger-on-surface', fg: '#C2354B', bg: '#FDE5E9', usage: 'كلمة حالة خطر' },
  { id: 'partial-on-surface', fg: '#6E5AA8', bg: '#EEE9FA', usage: 'كلمة حالة جزئي' },
  { id: 'indigo-on-white', fg: '#4F46E5', bg: '#FFFFFF', usage: 'إجراء نصي/تركيز على الفاتح' },
] as const

/** دلالات ألوان الحالة (§8) للاستخدام الدلالي المقيد في المكونات. */
export const SEMANTIC_STATE_COLORS = {
  success: { fg: '#137A55', surface: '#DCF4E8' },
  warning: { fg: '#A65A00', surface: '#FFF0D6' },
  danger: { fg: '#C2354B', surface: '#FDE5E9' },
  info: { fg: '#1D64D8', surface: '#E0ECFF' },
  partial: { fg: '#6E5AA8', surface: '#EEE9FA' },
  unknown: { fg: '#697386', surface: '#EEF0F4' },
  local: { fg: '#52657A', surface: '#E7EDF3' },
} as const

export type SemanticStateKey = keyof typeof SEMANTIC_STATE_COLORS
