// Micro Visual System — STUDIO-COMPONENTS: مساحة مراجعة المكوّنات
// (19-STUDIO-COMPLETE-COVERAGE-GATE §2.3). مساحة استوديو لأغراض QA فقط —
// ليست شاشة من Micro وتظهر موسومة كذلك. تجعل كل مكوّن وVariant منفذ
// قابلًا للفحص على أسطحه الحقيقية، بما فيه ما لا يظهر في السيناريوهات
// الافتراضية (AmountField وSkeleton وEmptyState بأنواعها…). حالات الضغط
// والتركيز تُفحص بالتفاعل المباشر وتوثق في REVISION-COVERAGE-LEDGER.

import { useState } from 'react'
import { Button, IconButton } from '../components/core/Button'
import { TextField, AmountField } from '../components/core/Field'
import { SegmentedControl } from '../components/core/SegmentedControl'
import { OpenRow, RowGroup } from '../components/core/OpenRow'
import { Sheet, Dialog, AnchoredMenu } from '../components/core/Overlays'
import { Skeleton, StructuralLoad } from '../components/core/Skeleton'
import { MoneyValue } from '../components/financial/MoneyValue'
import { TruthNote } from '../components/financial/TruthNote'
import { ImpactPreview } from '../components/financial/ImpactPreview'
import { TransactionRow } from '../components/financial/TransactionRow'
import { MicroSignal } from '../components/contextual/MicroSignal'
import {
  ContextTrace,
  ContextSeam,
  RecoveryStage,
  EmptyState,
  Insight,
} from '../components/contextual/Contextual'
import { Icon } from '../components/icons/Icon'
import { transactions } from '../fixtures'

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="studio-components__section">
      <header className="fin-question">
        <h2 className="type-section-title">{title}</h2>
      </header>
      {note ? <p className="type-supporting">{note}</p> : null}
      {children}
    </section>
  )
}

export function StudioComponents() {
  const [seg, setSeg] = useState<'cash' | 'credit'>('cash')
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuValue, setMenuValue] = useState('هذا الشهر')
  const [savedNote, setSavedNote] = useState(false)

  return (
    <div className="screen screen--studio-components" data-screen="STUDIO-COMPONENTS">
      <header className="screen__head">
        <h1 className="type-screen-title">مراجعة المكوّنات</h1>
        <span className="screen__fixtures-badge" title="مساحة مراجعة داخل الاستوديو">
          <Icon name="info" size={16} />
          <span className="type-supporting">Studio QA — ليست شاشة منتج</span>
        </span>
      </header>

      <Section title="الأزرار" note="الأدوار الخمسة + الحالات. الفعل الصلب #A94630 بأبيض؛ Accent فوق الهوية بـInk.">
        <div className="studio-components__panel">
          <div className="studio-components__grid">
            <Button role="primary" onClick={() => setSavedNote(true)}>تسجيل البيع</Button>
            <Button role="primary" state="loading" loadingLabel="جارٍ التنفيذ" onClick={() => undefined}>انتظار</Button>
            <Button role="primary" state="disabled" onClick={() => undefined}>معطل</Button>
          </div>
          <div className="studio-components__grid">
            <Button role="secondary">إلغاء</Button>
            <Button role="tertiary">عرض التفاصيل</Button>
            <Button role="accent">ابدأ الآن</Button>
            <Button role="destructive">حذف العملية</Button>
          </div>
          <div className="studio-components__grid">
            <Button role="primary" size="compact" icon="arrow-right" trailingArrow>إجراء مضغوط</Button>
            <IconButton icon="plus" ariaLabel="إضافة" />
            <IconButton icon="check" variant="fill" ariaLabel="محدد" active />
            <IconButton icon="x" ariaLabel="إغلاق" state="disabled" />
          </div>
          {savedNote ? (
            <ContextTrace state="complete">النقر يعمل — زر أساسي حي داخل مساحة المراجعة</ContextTrace>
          ) : null}
        </div>
      </Section>

      <Section title="الحقول" note="نص وبحث ومبلغ مع الخطأ والتركيز (تفاعل مباشر).">
        <div className="studio-components__panel">
          <TextField label="ملاحظة" value={text} onChange={setText} optional placeholder="مثال: تسليم مسائي" hint="تظهر في تفاصيل العملية فقط" />
          <TextField label="بحث" value={text} onChange={setText} icon="search" placeholder="اسم الصنف" ltr={false} />
          <TextField label="هاتف العميل" value={text} onChange={setText} icon="phone" error="أدخل رقمًا أردنيًا صحيحًا" ltr placeholder="079 123 4567" />
          <AmountField label="سعر الصنف" value={amount} onChange={setAmount} hint="أرقام إنجليزية والوحدة ثابتة في الطرف المقابل" />
        </div>
      </Section>

      <Section title="الاختيار والصفوف">
        <div className="studio-components__panel">
          <SegmentedControl
            options={[
              { id: 'cash', label: 'نقدي' },
              { id: 'credit', label: 'آجل' },
            ]}
            value={seg}
            onChange={setSeg}
            ariaLabel="طريقة البيع"
          />
          <RowGroup label="صفوف مفتوحة">
            <OpenRow icon="coins" title="الكاش الآن" supporting="في محفظتين" chevron onClick={() => undefined} />
            <OpenRow icon="wallet" title="محفظة إلكترونية" supporting="آخر حركة أمس 5:20 م" chevron onClick={() => undefined} />
            <OpenRow icon="basket" title="مبيعات اليوم" supporting="7 عمليات" state="unavailable" chevron divider={false} />
          </RowGroup>
        </div>
      </Section>

      <Section title="قيم المالية بكل حالاتها" note="المكوّن الوحيد المخوّل بعرض المبالغ — الغياب لا يصبح صفرًا.">
        <div className="studio-components__rows">
          <div>
            <p className="type-supporting">قيمة معلومة</p>
            <MoneyValue money={{ value: 385.75, state: 'known' }} size="list" />
          </div>
          <div>
            <p className="type-supporting">صفر حقيقي</p>
            <MoneyValue money={{ value: 0, state: 'true-zero' }} size="list" />
          </div>
          <div>
            <p className="type-supporting">سالب مشروح</p>
            <MoneyValue money={{ value: -80, state: 'negative' }} size="list" note="سالب لأن المصروفات أعلى" />
          </div>
          <div>
            <p className="type-supporting">نتيجة تقديرية</p>
            <MoneyValue money={{ value: 380, state: 'estimated' }} size="list" estimatedTag="تقريبًا" />
          </div>
          <div>
            <p className="type-supporting">جزئي</p>
            <MoneyValue money={{ value: 106.25, state: 'partial' }} size="list" />
          </div>
          <div>
            <p className="type-supporting">غير مسجل</p>
            <MoneyValue money={{ value: null, state: 'not-recorded' }} size="list" />
          </div>
          <div>
            <p className="type-supporting">لا يمكن حسابه</p>
            <MoneyValue money={{ value: null, state: 'cannot-compute' }} size="list" note="سعر منتج غير مسجل" />
          </div>
          <div>
            <p className="type-supporting">غير معروف</p>
            <MoneyValue money={{ value: null, state: 'unknown' }} size="list" />
          </div>
          <div>
            <p className="type-supporting">من آخر نسخة محفوظة</p>
            <MoneyValue money={{ value: 377.5, state: 'known', stale: true }} size="list" />
          </div>
          <div>
            <p className="type-supporting">حجم بطولي</p>
            <MoneyValue money={{ value: 3250.75, state: 'known' }} size="hero" />
          </div>
        </div>
      </Section>

      <Section title="إشارة Micro Signal — الحالات السبع">
        <div className="studio-components__rows">
          {(['complete', 'partial', 'in-progress', 'unknown', 'draft', 'error', 'local-saved'] as const).map((st) => (
            <div key={st} className="studio-components__grid">
              <MicroSignal state={st} size="md" />
              <span className="type-supporting">{st}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="بيان النزاهة" note="TruthNote منكشف من مصدره (افتح «بيان النزاهة»).">
        <div className="studio-components__panel">
          <TruthNote
            what="الكاش المتاح الآن: مجموع أرصدة المحافظ في هذه اللحظة"
            notWhat="الكاش ليس ربحًا ولا إيرادًا — يشمل رأس المال العامل"
            period="هذا الشهر"
            dataState="complete"
            fixtureSource="Fixtures — 14-JORDANIAN-CONTENT-FIXTURES.md"
          />
        </div>
      </Section>

      <Section title="أثر العملية" note="قيم قبل/بعد مع صف غير محسوب.">
        <ImpactPreview
          rows={[
            { label: 'الدرج النقدي', before: 385.75, after: 415.0 },
            { label: 'دين أبو محمد عطية الزيتون', before: null, after: null },
          ]}
        />
      </Section>

      <Section title="صفوف المعاملات" note="بيع نقدي، تحصيل جزئي، ومحفوظ محليًا بانتظار الإرسال.">
        <div className="screen__rows">
          <TransactionRow tx={transactions.transactions[0]} onClick={() => undefined} />
          <TransactionRow tx={transactions.transactions[1]} onClick={() => undefined} />
          <TransactionRow tx={transactions.transactions[4]} onClick={() => undefined} chevron={false} />
        </div>
      </Section>

      <Section title="أنماط الفراغ الخمسة">
        <div className="studio-components__rows">
          <EmptyState kind="first-move" title="ابدأ بتسجيل أول عملية" body="دعوة قرب موضع أول محتوى." action="تسجيل أول عملية" onAction={() => undefined} />
          <EmptyState kind="continuation" title="لا توجد حركات بعد" />
          <EmptyState kind="search-reset" title="لا نتائج مطابقة" action="مسح الفلاتر" onAction={() => undefined} />
          <EmptyState kind="period-gap" title="لا بيانات في هذه الفترة" action="اختيار فترة أخرى" onAction={() => undefined} />
          <EmptyState kind="clear-state" title="لا توجد ديون قائمة" />
        </div>
      </Section>

      <Section title="المستويات السياقية">
        <div className="studio-components__rows">
          <Insight
            level="opportunity"
            category="فرصة"
            title="طلبية جديدة من مطعم في حي الجامعة"
            evidence="سأل عن التوريد الأسبوعي مرتين هذا الأسبوع"
            completeness="مكتمل"
            action="تسجيل بيع"
            onAction={() => undefined}
          />
          <Insight
            level="attention"
            category="يحتاج انتباه"
            title="دين مستحق اليوم"
            evidence="المبلغ 62.50 د.أ · استحقاق اليوم"
            completeness="مكتمل"
            action="تسجيل التحصيل"
            onAction={() => undefined}
          />
          <Insight
            level="missing-data"
            category="بيانات ناقصة"
            title="تكاليف 3 منتجات غير مسجلة"
            evidence="النتيجة التقديرية لا تشملها"
            completeness="جزئي"
            action="إضافة التكاليف"
            onAction={() => undefined}
          />
          <ContextSeam tone="warning" action="تحديد المحفظة" onAction={() => undefined}>
            <span className="type-supporting">بانتظار تحديد المحفظة — 5.000 د.أ</span>
          </ContextSeam>
          <ContextSeam tone="info">
            <span className="type-supporting">معلومة محايدة: آخر مزامنة ناجحة اليوم 2:35 م</span>
          </ContextSeam>
          <ContextSeam tone="partial">
            <span className="type-supporting">رصيد عميلين غير مسجل — الحساب جزئي</span>
          </ContextSeam>
          <ContextSeam tone="local">
            <span className="type-supporting">محفوظ على هذا الهاتف · بانتظار الإرسال</span>
          </ContextSeam>
          <RecoveryStage
            title="لم نتمكن من تحديث هذه المنطقة"
            body="بقيت آخر قيم معروضة. تحقق من الاتصال وحاول مرة أخرى."
            action="إعادة المحاولة"
            lastSync="آخر تحديث ناجح 2:35 م"
            onAction={() => undefined}
          />
        </div>
      </Section>

      <Section title="الهيكل أثناء التحميل" note="Micro Structural Load — يطابق إيقاع المحتوى الحقيقي.">
        <StructuralLoad kind="summary" />
        <StructuralLoad kind="section" />
        <StructuralLoad kind="list" lines={2} />
        <div className="studio-components__grid">
          <Skeleton variant="money" width="60%" />
        </div>
      </Section>

      <Section title="الطبقات المنبثقة" note="افتح كل واحدة وأغلقها بالسحب على الخلفية أو Escape أو زر الإغلاق.">
        <div className="studio-components__panel">
          <div className="studio-components__grid">
            <Button role="secondary" size="compact" onClick={() => setSheetOpen(true)}>فتح Sheet</Button>
            <Button role="secondary" size="compact" onClick={() => setDialogOpen(true)}>فتح Dialog</Button>
            <Button role="secondary" size="compact" onClick={() => setMenuOpen(true)}>فتح Menu</Button>
          </div>
        </div>
      </Section>

      <footer className="screen__foot">
        <ContextTrace state="complete">
          كل مكوّن منفذ قابل للفحص هنا أو داخل السيناريوهات — راجع REVISION-COVERAGE-LEDGER
        </ContextTrace>
        <span className="screen__fixtures-badge" title="بيانات عرض فقط">
          <Icon name="info" size={16} />
          <span className="type-supporting">Fixtures</span>
        </span>
      </footer>

      <Sheet open={sheetOpen} title="ورقة اختبار" onClose={() => setSheetOpen(false)}>
        <div className="picker">
          <p className="type-body">هذه ورقة Sheet حقيقية: تدخل من الأسفل وتُغلق بالإغلاق أو Escape.</p>
        </div>
      </Sheet>

      <Dialog
        open={dialogOpen}
        title="حوار اختبار؟"
        body="هذا Dialog بقرارين صريحين لا نعم/لا."
        primaryAction={{ label: 'الإجراء الأساسي', onAction: () => setDialogOpen(false) }}
        secondaryAction={{ label: 'البقاء', onAction: () => setDialogOpen(false) }}
        onClose={() => setDialogOpen(false)}
      />

      <AnchoredMenu
        open={menuOpen}
        options={[
          { id: 'اليوم', label: 'اليوم' },
          { id: 'هذا الشهر', label: 'هذا الشهر' },
          { id: 'الشهر الماضي', label: 'الشهر الماضي' },
        ]}
        value={menuValue}
        onSelect={setMenuValue}
        onClose={() => setMenuOpen(false)}
        anchorLabel="اختيار فترة اختبار"
      />
    </div>
  )
}
