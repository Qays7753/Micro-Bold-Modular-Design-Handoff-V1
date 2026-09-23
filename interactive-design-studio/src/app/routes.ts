// Micro Visual System — Route registry (§21.3) — مراجعة V2
// كل مسار مرتبط بـScreen ID مستقل عن ترتيب التبويبات، مع قراراته ومصادره
// وحالاته — يظهر في مبدّل الشاشات ودرج معلومات الشاشة داخل طبقة المراجعة.
// V2: أُضيفت مسارات مؤجلة حقيقية (04-CSV) لكل إجراء مرئي كي لا يبقى نقر
// ميتًا، وOVR-SNAPSHOT-ALL كعرض استوديو حقيقي لكل البطاقات (18 §2)،
// وSTUDIO-COMPONENTS كمساحة مراجعة مكوّنات — ليست شاشة منتج Micro.

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
  /** مساحة مراجعة داخل الاستوديو — ليست شاشة منتج */
  studioOnly?: boolean
  /** يُخفى من مبدّل الشاشات (يُفتح من إجراء داخل الواجهة) */
  hideFromSwitcher?: boolean
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
    entryNote: 'النتيجة واكتمالها تقود منطقة القرار الأولى؛ الكاش معلومة ثانوية مميزة — لا يُخلط الربح بالكاش.',
    scenarios: [
      { id: 'complete', label: 'الافتراضي — مكتمل', dataState: 'complete', description: 'وضع موثوق كامل: بطاقة النتيجة القوية أولًا + Insight قابلة للإجراء + آخر الحركات.' },
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
    entryNote: 'نموذج سريع بمستوى ثالث (بلا شريط سفلي)؛ الأثر قبل الحفظ بقيم Fixtures موسومة. تبديل السيناريو يعيد ضبط النموذج حتميًا.',
    scenarios: [
      { id: 'empty', label: 'نموذج فارغ', dataState: 'empty', description: 'نقدي/آجل + سلة فارغة بدعوة فعل + تفاصيل إضافية.' },
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
    entryNote: 'Question-First: الكاش/التدفق/الالتزامات/النتيجة مفصولة بأسطح هادئة وأرقام كبيرة؛ النتيجة دلالة (نجاح/خطر) لا هوية. لا Chart — مشروط (FIN-CHARTS).',
    scenarios: [
      { id: 'complete', label: 'الافتراضي — مكتمل', dataState: 'complete', description: 'الأسئلة الخمسة بأجوبة مكتملة + مقارنة مفسرة + غير موزع 5.00 د.أ.' },
      { id: 'partial', label: 'جزئي — تقديرية', dataState: 'partial', description: 'نتيجة تقديرية + مقارنة معطلة لنقص البيانات (لا 0%).' },
      { id: 'insufficient', label: 'بيانات غير كافية', dataState: 'insufficient', description: 'النتيجة غير متاحة بعد؛ ديون بحاجة للمراجعة.' },
      { id: 'zero', label: 'صفر حقيقي', dataState: 'complete', description: 'مصروفات 0.00 حقيقية + ديون لك 0.00 مع سطر هادئ.' },
      { id: 'negative', label: 'نتيجة سالبة', dataState: 'complete', description: 'خسارة −80.00 د.أ مشروحة بالنص مع أسبابها.' },
      { id: 'offline', label: 'دون اتصال', dataState: 'offline', description: 'شريط النظام + قيم آخر نسخة + عمليتان بانتظار الإرسال.' },
    ],
  },
  'OVR-SNAPSHOT-ALL': {
    screenId: 'OVR-SNAPSHOT-ALL',
    title: 'كل البطاقات المالية',
    domain: 'Overview',
    level: 2,
    status: 'built',
    decisionRefs: '§13.4 | §21.3 (04-CSV: OVR-SNAPSHOT-ALL) + 18-ZAI-STUDIO-REVISION-BRIEF §2',
    coverageRow: '04-SCREEN-COVERAGE.csv → OVR-SNAPSHOT-ALL · Required: Loaded|Partial|Unknown',
    entryNote: 'عرض استوديو حقيقي لبطاقات نظرة مالية نفسها مكشوفة كلها — لا نقر ميت خلف «عرض الكل»؛ زر عودة يحفظ التسلسل.',
    scenarios: [
      { id: 'complete', label: 'مكتمل', dataState: 'complete', description: 'البطاقات الأربع بحالتها المكتملة مكشوفة.' },
      { id: 'partial', label: 'جزئي', dataState: 'partial', description: 'بطاقة نتيجة تقديرية وديون جزئية.' },
      { id: 'insufficient', label: 'غير كافية', dataState: 'insufficient', description: 'نتيجة غير متاحة وديون بحاجة للمراجعة.' },
      { id: 'offline', label: 'دون اتصال', dataState: 'offline', description: 'قيم من آخر نسخة محفوظة.' },
    ],
  },
  'STUDIO-COMPONENTS': {
    screenId: 'STUDIO-COMPONENTS',
    title: 'مراجعة المكوّنات',
    domain: 'Studio',
    level: 3,
    status: 'built',
    studioOnly: true,
    decisionRefs: '19-STUDIO-COMPLETE-COVERAGE-GATE §2.3 (مساحة مراجعة مخصصة) — ليست شاشة منتج',
    coverageRow: '19-STUDIO-COMPLETE-COVERAGE-GATE → كل مكوّن وVariant منفذ قابل للفحص',
    entryNote: 'مساحة مراجعة داخل الاستوديو لأغراض QA فقط — ليست شاشة من Micro. تعرض مصفوفة الأزرار والحقول والحالات المالية والإشارات والأنماط السياقية.',
    scenarios: [
      { id: 'all', label: 'كل المكوّنات', dataState: 'complete', description: 'مصفوفة كاملة للمكوّنات المنفذة وحالاتها على أسطحها المتقابلة.' },
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
  // ===== مسارات مؤجلة (04-CSV) تفتح من إجراءات مرئية — لا نقر ميت =====
  'FIN-ACTIVITY': {
    screenId: 'FIN-ACTIVITY',
    title: 'الحركة المالية',
    domain: 'Finance',
    level: 2,
    status: 'deferred',
    decisionRefs: '§13.5 | §21.3 (04-CSV: FIN-ACTIVITY)',
    coverageRow: '04-SCREEN-COVERAGE.csv → FIN-ACTIVITY · Required: Loaded|FilteredEmpty|Loading|Offline|PendingSync',
    entryNote: 'قائمة الحركة المالية — مؤجلة؛ صف TransactionRow منفذ ويظهر في آخر الحركات.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'FIN-TRANSACTION-DETAIL': {
    screenId: 'FIN-TRANSACTION-DETAIL',
    title: 'تفاصيل العملية',
    domain: 'Finance',
    level: 3,
    status: 'deferred',
    decisionRefs: '§13.10 | §15.6 | §21.3 (04-CSV: FIN-TRANSACTION-DETAIL)',
    coverageRow: '04-SCREEN-COVERAGE.csv → FIN-TRANSACTION-DETAIL · Required: Loaded|Partial|Error|SensitiveAction',
    entryNote: 'تفاصيل العملية — مؤجلة؛ الصف القابل للنقر يوصل إليها عند تنفيذها.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'OPS-EXPENSE-CREATE': {
    screenId: 'OPS-EXPENSE-CREATE',
    title: 'تسجيل مصروف',
    domain: 'Operations',
    level: 3,
    status: 'deferred',
    decisionRefs: '§12 | §21.3 (04-CSV: OPS-EXPENSE-CREATE)',
    coverageRow: '04-SCREEN-COVERAGE.csv → OPS-EXPENSE-CREATE · Required: Empty|Filled|Validation|Saving|Failure|Success',
    entryNote: 'تسجيل المصروف — مؤجل؛ إجراء «إضافة التكاليف» يوصل إليه عند تنفيذه.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'FIN-WALLETS': {
    screenId: 'FIN-WALLETS',
    title: 'المحافظ والكاش',
    domain: 'Finance',
    level: 2,
    status: 'deferred',
    decisionRefs: '§13.7 | §21.3 (04-CSV: FIN-WALLETS)',
    coverageRow: '04-SCREEN-COVERAGE.csv → FIN-WALLETS · Required: Loaded|Empty|Unavailable|Offline',
    entryNote: 'المحافظ — مؤجلة؛ صفوف المحافظ وغير الموزع يظهران داخل FIN-OVERVIEW.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'FIN-TRANSFER': {
    screenId: 'FIN-TRANSFER',
    title: 'نقل بين المحافظ',
    domain: 'Finance',
    level: 3,
    status: 'deferred',
    decisionRefs: '§12 | §13.8 | §21.3 (04-CSV: FIN-TRANSFER)',
    coverageRow: '04-SCREEN-COVERAGE.csv → FIN-TRANSFER · Required: Empty|Impact|Saving|Failure|Success',
    entryNote: 'النقل بين المحافظ — مؤجل؛ إجراء النقل يظهر في قسم الكاش.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'REL-CUSTOMERS': {
    screenId: 'REL-CUSTOMERS',
    title: 'العملاء',
    domain: 'Relationships',
    level: 2,
    status: 'deferred',
    decisionRefs: '§10.2 | §21.3 (04-CSV: REL-CUSTOMERS)',
    coverageRow: '04-SCREEN-COVERAGE.csv → REL-CUSTOMERS · Required: Loaded|FirstUse|FilteredEmpty|Offline',
    entryNote: 'قائمة العملاء — مؤجلة؛ بيانات العملاء موجودة كـFixtures وورقة اختيار داخل نموذج البيع.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'REL-SUPPLIERS': {
    screenId: 'REL-SUPPLIERS',
    title: 'الموردون',
    domain: 'Relationships',
    level: 2,
    status: 'deferred',
    decisionRefs: '§10.2 | §21.3 (04-CSV: REL-SUPPLIERS)',
    coverageRow: '04-SCREEN-COVERAGE.csv → REL-SUPPLIERS · Required: Loaded|FirstUse|FilteredEmpty|Offline',
    entryNote: 'قائمة الموردين — مؤجلة؛ «عرض الموردين» من قسم الالتزامات يوصل إليها.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'GLB-ASK': {
    screenId: 'GLB-ASK',
    title: 'اسأل Micro',
    domain: 'Global',
    level: 2,
    status: 'deferred',
    decisionRefs: '§11.7 | §21.3 (04-CSV: GLB-ASK)',
    coverageRow: '04-SCREEN-COVERAGE.csv → GLB-ASK · Required: Loaded|Unavailable|Error',
    entryNote: 'مدخل «اسأل Micro» — موضعه معتمد في الهيدر؛ الخدمة غير متحققة (GAP-006) والشاشة مؤجلة.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'GLB-DELIVERY': {
    screenId: 'GLB-DELIVERY',
    title: 'التوصيل',
    domain: 'Global',
    level: 2,
    status: 'deferred',
    decisionRefs: '§11.7 | §21.3 (04-CSV: GLB-DELIVERY)',
    coverageRow: '04-SCREEN-COVERAGE.csv → GLB-DELIVERY · Required: Loaded|Unavailable|Error',
    entryNote: 'مدخل «التوصيل» — موضعه معتمد في الهيدر؛ نطاق الخدمة غير متحقق (GAP-006) والشاشة مؤجلة.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'GLB-ACCOUNT': {
    screenId: 'GLB-ACCOUNT',
    title: 'حسابي',
    domain: 'Global',
    level: 2,
    status: 'deferred',
    decisionRefs: '§11.9 | §21.3 (04-CSV: GLB-ACCOUNT)',
    coverageRow: '04-SCREEN-COVERAGE.csv → GLB-ACCOUNT · Required: Loaded|Incomplete|Error',
    entryNote: 'بيانات الحساب — مؤجلة؛ تفتح من لوحة الحساب.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'GLB-PROJECT': {
    screenId: 'GLB-PROJECT',
    title: 'بيانات المشروع',
    domain: 'Global',
    level: 2,
    status: 'deferred',
    decisionRefs: '§11.9 | §21.3 (04-CSV: GLB-PROJECT)',
    coverageRow: '04-SCREEN-COVERAGE.csv → GLB-PROJECT · Required: Complete|Incomplete|Error',
    entryNote: 'بيانات المشروع — مؤجلة؛ تفتح من لوحة الحساب.',
    scenarios: [],
    hideFromSwitcher: true,
  },
  'GLB-SETTINGS': {
    screenId: 'GLB-SETTINGS',
    title: 'إعدادات النظام',
    domain: 'Global',
    level: 2,
    status: 'deferred',
    decisionRefs: '§11.9 | §21.3 (04-CSV: GLB-SETTINGS)',
    coverageRow: '04-SCREEN-COVERAGE.csv → GLB-SETTINGS · Required: Loaded|Unavailable',
    entryNote: 'إعدادات النظام — مؤجلة؛ تفتح من لوحة الحساب.',
    scenarios: [],
    hideFromSwitcher: true,
  },
}

export const BUILT_SCREEN_IDS = Object.values(ROUTES)
  .filter((r) => r.status === 'built')
  .map((r) => r.screenId)

export function getRoute(screenId: string): ScreenRoute | undefined {
  return ROUTES[screenId]
}
