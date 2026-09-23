// Micro Visual System — Route registry (§21.3)
// كل مسار مرتبط بـScreen ID مستقل عن ترتيب التبويبات، مع قراراته ومصادره
// وحالاته — يظهر في مبدّل الشاشات ودرج معلومات الشاشة داخل طبقة المراجعة.

export interface RouteScenario {
  id: string
  label: string
  dataState: string
  description: string
}

export interface ScreenRoute {
  screenId: string
  title: string
  domain: string
  level: 1 | 2 | 3
  status: 'built' | 'deferred'
  decisionRefs: string
  coverageRow: string
  scenarios: RouteScenario[]
  entryNote?: string
}

export const ROUTES: Record<string, ScreenRoute> = {
  'OVR-NOW': {
    screenId: 'OVR-NOW',
    title: 'مشروعي الآن',
    domain: 'Overview',
    level: 1,
    status: 'built',
    decisionRefs: '§13.2 | §13.4 | §13.19 | §13.20 | §21.3 (04-CSV: OVR-NOW)',
    coverageRow: '04-SCREEN-COVERAGE.csv → OVR-NOW · Required: Complete|Partial|Insufficient|FirstUse|Offline|Error',
    entryNote: 'الكاش والربح لا يُخلطان — القيم جزئية تظهر جزئية.',
    scenarios: [
      { id: 'complete', label: 'الافتراضي — مكتمل', dataState: 'complete', description: 'وضع موثوق كامل: Snapshot Deck مكتمل + Insight قابلة للإجراء + آخر الحركات.' },
      { id: 'partial', label: 'جزئي — نتيجة تقديرية', dataState: 'partial', description: 'نتيجة تقديرية تنقص تكاليف 3 منتجات؛ ديون جزئية بأثر على القرار.' },
      { id: 'insufficient', label: 'بيانات غير كافية', dataState: 'insufficient', description: 'تعذر حساب النتيجة؛ الديون بحاجة للمراجعة (— لا صفر).' },
      { id: 'first-use', label: 'أول استخدام', dataState: 'empty', description: 'First Move: دعوة قرب موضع أول محتوى بلا أرقام مختلقة.' },
      { id: 'offline', label: 'دون اتصال', dataState: 'offline', description: 'شريط النظام + آخر نسخة محفوظة + عمليتان بانتظار الإرسال.' },
      { id: 'error', label: 'خطأ التحديث — تعافٍ', dataState: 'error', description: 'Recovery Stage داخل منطقة الملخص فقط مع بقاء بقية الصفحة.' },
    ],
  },
  'OPS-SALE-CREATE': {
    screenId: 'OPS-SALE-CREATE',
    title: 'تسجيل بيع',
    domain: 'Operations',
    level: 3,
    status: 'built',
    decisionRefs: '§12 | §13.8 | §13.20 | §21.3 (04-CSV: OPS-SALE-CREATE)',
    coverageRow: '04-SCREEN-COVERAGE.csv → OPS-SALE-CREATE · Required: Empty|Filled|Validation|Impact|Saving|Failure|Success',
    entryNote: 'نموذج سريع بمستوى ثالث (بلا شريط سفلي)؛ الأثر قبل الحفظ بقيم Fixtures موسومة.',
    scenarios: [
      { id: 'empty', label: 'نموذج فارغ', dataState: 'empty', description: 'نقدي/آجل + سطر منتج فارغ + تفاصيل إضافية.' },
      { id: 'filled', label: 'مملوء — نقدي', dataState: 'complete', description: 'سلال معمولة وقهوة بإجمالي 29.25 د.أ.' },
      { id: 'validation', label: 'أخطاء تحقق', dataState: 'error', description: 'آجل بلا عميل + منتج بسعر غير مسجل: رسائل محددة بعد المتابعة.' },
      { id: 'impact', label: 'أثر العملية — نقدي', dataState: 'complete', description: 'أثر قبل الحفظ: الدرج 385.75 ← 415.00 د.أ (Fixtures).' },
      { id: 'impact-credit', label: 'أثر العملية — آجل', dataState: 'complete', description: 'دين أبو محمد 62.50 ← 90.00 د.أ (Fixtures).' },
      { id: 'saving', label: 'جارٍ الحفظ', dataState: 'loading', description: 'Action Hold: الزر يحتفظ بهندسته مع إشارة انتظار واحدة.' },
      { id: 'failure', label: 'فشل الحفظ — تعافٍ', dataState: 'recovery', description: 'لم تُحفظ العملية؛ المدخلات باقية + إعادة المحاولة.' },
      { id: 'success', label: 'نجاح — Echo', dataState: 'complete', description: 'عودة للسياق مع أثر واحد + صف جديد (محاكاة موسومة).' },
      { id: 'offline-save', label: 'نجاح دون اتصال', dataState: 'offline', description: 'محفوظ على هذا الهاتف + بانتظار الإرسال (بلا وعد مزامنة).' },
    ],
  },
  'FIN-OVERVIEW': {
    screenId: 'FIN-OVERVIEW',
    title: 'المالية',
    domain: 'Finance',
    level: 1,
    status: 'built',
    decisionRefs: '§13.2 | §13.3 | §13.11 | §13.12 | §13.20 | §21.3 (04-CSV: FIN-OVERVIEW)',
    coverageRow: '04-SCREEN-COVERAGE.csv → FIN-OVERVIEW · Required: Complete|Partial|Insufficient|Zero|Negative|Offline',
    entryNote: 'Question-First: الكاش/التدفق/الالتزامات/النتيجة مفصولة؛ لا Chart — النمط مشروط (FIN-CHARTS).',
    scenarios: [
      { id: 'complete', label: 'الافتراضي — مكتمل', dataState: 'complete', description: 'الأسئلة الخمسة بأجوبة مكتملة + مقارنة مفسرة + غير موزع 5.00 د.أ.' },
      { id: 'partial', label: 'جزئي — تقديرية', dataState: 'partial', description: 'نتيجة تقديرية + مقارنة معطلة لنقص البيانات (لا 0%).' },
      { id: 'insufficient', label: 'بيانات غير كافية', dataState: 'insufficient', description: 'النتيجة غير متاحة بعد؛ ديون بحاجة للمراجعة.' },
      { id: 'zero', label: 'صفر حقيقي', dataState: 'complete', description: 'مصروفات 0.00 حقيقية + ديون لك 0.00 مع سطر هادئ.' },
      { id: 'negative', label: 'نتيجة سالبة', dataState: 'complete', description: 'خسارة −80.00 د.أ مشروحة بالنص مع أسبابها.' },
      { id: 'offline', label: 'دون اتصال', dataState: 'offline', description: 'شريط النظام + قيم آخر نسخة + عمليتان بانتظار الإرسال.' },
    ],
  },
  'OPS-HOME': {
    screenId: 'OPS-HOME',
    title: 'العمل',
    domain: 'Operations',
    level: 1,
    status: 'deferred',
    decisionRefs: '§11 | §21.3 (04-CSV: OPS-HOME)',
    coverageRow: '04-SCREEN-COVERAGE.csv → OPS-HOME · Required: Loaded|FirstUse|Busy|Offline',
    entryNote: 'مركز العمليات — مؤجلة بانتظار مراجعة العينات الثلاث (بوابة 16).',
    scenarios: [],
  },
  'TOOL-HOME': {
    screenId: 'TOOL-HOME',
    title: 'أدواتي',
    domain: 'Tools',
    level: 1,
    status: 'deferred',
    decisionRefs: '§21.3 (04-CSV: TOOL-HOME)',
    coverageRow: '04-SCREEN-COVERAGE.csv → TOOL-HOME · Required: Loaded|Empty|Unavailable',
    entryNote: 'صفحة الأدوات — مؤجلة (لا شبكة بطاقات متطابقة عند التنفيذ).',
    scenarios: [],
  },
  'MKT-HOME': {
    screenId: 'MKT-HOME',
    title: 'السوق',
    domain: 'Market',
    level: 1,
    status: 'deferred',
    decisionRefs: '§11.6 | §21.3 (04-CSV: MKT-HOME · ConditionalVerify)',
    coverageRow: '04-SCREEN-COVERAGE.csv → MKT-HOME · Required: ValueNow|Empty|Loading|Offline',
    entryNote: 'التبويب الخامس معتمد وظاهر؛ محتوى الإطلاق يحتاج تحققًا — GAP-005 (لا عروض مختلقة ولا «قريبًا»).',
    scenarios: [],
  },
}

export const BUILT_SCREEN_IDS = Object.values(ROUTES)
  .filter((r) => r.status === 'built')
  .map((r) => r.screenId)

export function getRoute(screenId: string): ScreenRoute | undefined {
  return ROUTES[screenId]
}
