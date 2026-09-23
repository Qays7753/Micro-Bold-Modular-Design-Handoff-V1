// Micro Visual System — State model (§§13.20، 14، 21.2)
// حالات البيانات للشاشات والمكونات + محور معنى القيمة + محور الحفظ/الإرسال.

/** حالة البيانات الإجمالية لمنطقة/شاشة. */
export type DataState =
  | 'complete' // مكتمل
  | 'partial' // جزئي
  | 'unknown' // غير معروف
  | 'insufficient' // بيانات غير كافية للحكم/الحساب
  | 'error' // خطأ
  | 'offline' // دون اتصال
  | 'recovery' // تعافٍ بعد فشل
  | 'loading' // تحميل
  | 'empty' // فراغ (يصنف فرعيًا في EmptyState)

/** محور معنى القيمة المالية (§13.20) — لا يحوّل الغياب إلى صفر. */
export type ValueState =
  | 'known' // قيمة معلومة (تشمل الصفر الحقيقي عبر value === 0)
  | 'true-zero' // صفر حقيقي معلوم
  | 'negative' // قيمة سالبة — يشرح سبب السالب بالنص
  | 'estimated' // نتيجة تقديرية مبنية على بيانات غير مكتملة
  | 'not-recorded' // غير مسجل
  | 'cannot-compute' // لا يمكن حسابه
  | 'unknown' // غير معروف/بحاجة للمراجعة

/** محور الحفظ والإرسال (§13.20/§14.7) — منفصل عن معنى القيمة. */
export type SaveState =
  | 'saved' // حفظ وإرسال طبيعيان — لا شارة دائمة
  | 'local-saved' // محفوظ على هذا الهاتف
  | 'pending-send' // بانتظار الإرسال
  | 'sending' // جارٍ الإرسال
  | 'not-sent' // لم يتم الإرسال
  | 'not-saved' // لم تُحفظ العملية

/** مستويات معنى Insight (§13.19). */
export type InsightLevel =
  | 'opportunity' // فرصة
  | 'attention' // يحتاج انتباه
  | 'action-now' // يحتاج إجراء الآن
  | 'missing-data' // بيانات ناقصة
  | 'clear' // لا أمور تحتاج إجراءً (سطر هادئ)

/** أنواع الفراغ الخمسة (§14.3). */
export type EmptyKind =
  | 'first-move' // أول استخدام
  | 'continuation' // قسم مستخدم بلا عناصر
  | 'search-reset' // بحث/فلترة بلا نتائج
  | 'period-gap' // فترة بلا بيانات
  | 'clear-state' // حالة إيجابية هادئة

/** بيانات موسومة — كل Fixtures تحمل مصدرها. */
export interface FixtureMeta {
  readonly fixture: true
  readonly source: string
  readonly note: string
}

/** وصف حالة مراجعة شاشة داخل الاستوديو. */
export interface ScreenScenario {
  readonly id: string
  readonly screenId: string
  readonly label: string
  readonly description: string
  readonly dataState: DataState
}

export const STATE_LABELS: Record<DataState, string> = {
  complete: 'مكتمل',
  partial: 'جزئي',
  unknown: 'غير معروف',
  insufficient: 'بيانات غير كافية',
  error: 'خطأ',
  offline: 'دون اتصال',
  recovery: 'تعافٍ',
  loading: 'تحميل',
  empty: 'فراغ',
}

export const VALUE_STATE_LABELS: Record<ValueState, string> = {
  known: '',
  'true-zero': 'صفر حقيقي',
  negative: 'سالب',
  estimated: 'نتيجة تقديرية',
  'not-recorded': 'غير مسجل',
  'cannot-compute': 'لا يمكن حسابه',
  unknown: 'بحاجة للمراجعة',
}

export const SAVE_STATE_LABELS: Record<SaveState, string> = {
  saved: '',
  'local-saved': 'محفوظ على هذا الهاتف',
  'pending-send': 'بانتظار الإرسال',
  sending: 'جارٍ الإرسال',
  'not-sent': 'لم يتم الإرسال',
  'not-saved': 'لم تُحفظ العملية',
}
