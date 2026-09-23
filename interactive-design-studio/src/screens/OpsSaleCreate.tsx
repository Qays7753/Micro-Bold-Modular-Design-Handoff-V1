// Micro Visual System — Screen: OPS-SALE-CREATE (تسجيل بيع — نقدي أو آجل)
// المرجع: §12 (Guided Open Forms) + §13.8 (Impact Preview) + §13.20 + SCREEN-COVERAGE-V2.csv
// + 18 §1.3/§1.4 (إيقاع أقوى لمهمة هاتف سريعة).
// نموذج سريع بمستوى ثالث: لا شريط سفلي، «إلغاء» يمينًا، الإجراء النهائي
// ثابت أسفل الشاشة بعرض كامل. سطر الصنف بشبكة صفين كي لا يُضغط على 320:
// الاسم والمقادير فوق، السعر وإجمالي السطر أسفل (المبلغ مع «د.أ» دائمًا).
// السلة الفارغة دعوة فعل منقطة لا نص خامد. التحقق بعد محاولة المتابعة.
// الفشل يحفظ المدخلات ويظهر «لم تُحفظ العملية». النجاح يعود للسياق مع Echo
// واحد (محاكاة موسومة) وإجراء «عرض العملية» بوجهة حقيقية مؤجلة.

import { useMemo, useState } from 'react'
import { SegmentedControl } from '../components/core/SegmentedControl'
import { TextField } from '../components/core/Field'
import { Sheet } from '../components/core/Overlays'
import { Button } from '../components/core/Button'
import { ImpactPreview } from '../components/financial/ImpactPreview'
import { MoneyValue } from '../components/financial/MoneyValue'
import { ContextTrace } from '../components/contextual/Contextual'
import { MicroSignal } from '../components/contextual/MicroSignal'
import { Icon } from '../components/icons/Icon'
import { sale, products, customers, getCustomer } from '../fixtures'
import type { SaleScenarioFixture, SaleLineFixture } from '../fixtures/types'
import { formatAmount } from '../foundations/tokens'

export interface OpsSaleCreateProps {
  scenario: SaleScenarioFixture
  scenarioId: string
  onExit: () => void
  onNavigate: (screenId: string) => void
}

type Mode = 'cash' | 'credit'

export function OpsSaleCreate({ scenario, scenarioId, onExit, onNavigate }: OpsSaleCreateProps) {
  const [mode, setMode] = useState<Mode>(scenario.mode)
  const [cart, setCart] = useState<SaleLineFixture[]>(scenario.cart)
  const [customerId, setCustomerId] = useState<string | null>(scenario.customer)
  const [notes, setNotes] = useState(scenario.notes)
  const [extrasOpen, setExtrasOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState<'product' | 'customer' | null>(null)
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState<{ customer?: string; amount?: string } | null>(scenario.errors ?? null)
  const [phase, setPhase] = useState<'form' | 'saving' | 'failure' | 'success'>(
    scenarioId === 'saving'
      ? 'saving'
      : scenarioId === 'failure'
        ? 'failure'
        : scenarioId === 'success' || scenarioId === 'offline-save'
          ? 'success'
          : 'form',
  )
  const [echo, setEcho] = useState(scenario.echo ?? null)

  const customer = customerId ? getCustomer(customerId) : null

  const total = useMemo(() => {
    if (cart.length === 0) return { value: null as number | null, state: 'known' }
    const hasUnknown = cart.some((l) => l.price === null || l.price === undefined)
    if (hasUnknown) return { value: null, state: 'cannot-compute' }
    return { value: cart.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0), state: 'known' }
  }, [cart])

  const impactRows = useMemo(() => {
    if (!scenario.impact) return []
    const rows = []
    if (scenario.impact.cash) rows.push({ label: scenario.impact.cash.label, before: scenario.impact.cash.before, after: scenario.impact.cash.after })
    if (scenario.impact.debt) rows.push({ label: scenario.impact.debt.label, before: scenario.impact.debt.before, after: scenario.impact.debt.after })
    if (scenario.impact.salesToday)
      rows.push({ label: scenario.impact.salesToday.label, before: scenario.impact.salesToday.before, after: scenario.impact.salesToday.after })
    return rows
  }, [scenario.impact])

  const trySave = () => {
    // التحقق بعد محاولة المتابعة (§12.5) — رسائل محددة قابلة للتصرف
    const next: { customer?: string; amount?: string } = {}
    if (mode === 'credit' && !customerId) next.customer = 'اختر عميلًا لتسجيل البيع الآجل'
    if (cart.length === 0) next.amount = 'أضف منتجًا واحدًا على الأقل قبل تسجيل البيع'
    else if (total.value === null) next.amount = 'سعر منتج غير مسجل — لا يمكن حساب الإجمالي'
    if (next.customer || next.amount) {
      setErrors(next)
      return
    }
    setErrors(null)
    setPhase('saving')
    window.setTimeout(() => {
      if (scenarioId === 'failure') {
        setPhase('failure')
      } else {
        setEcho({
          headline: 'تم تسجيل البيع',
          detail: `بيع ${mode === 'cash' ? 'نقدي' : 'آجل'} ${formatAmount(total.value ?? 0)} د.أ · رقم العملية TX-1043`,
          impact: scenario.impact?.cash
            ? { label: scenario.impact.cash.label, before: scenario.impact.cash.before, after: scenario.impact.cash.after }
            : undefined,
          viewAction: 'عرض العملية',
          backAction: 'العودة إلى العمل',
          note: 'محاكاة عرض داخل الاستوديو — لا عملية حقيقية ولا أثر محاسبي (Fixtures)',
          ...(scenarioId === 'offline-save' ? { localSaved: 'محفوظ على هذا الهاتف', pending: 'بانتظار الإرسال' } : {}),
        })
        setPhase('success')
      }
    }, 1400)
  }

  const changeQty = (idx: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((l, i) => (i === idx ? { ...l, qty: Math.max(0, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    )
  }

  const filteredProducts = products.products.filter((p) => !search || p.name.includes(search))
  const filteredCustomers = customers.customers.filter((c) => !search || c.name.includes(search))

  // ============ عرض النجاح: عودة إلى السياق مع Echo واحد (§12.7/§14.5) ============
  if (phase === 'success' && echo) {
    return (
      <div className="screen screen--sale is-level3" data-screen="OPS-SALE-CREATE">
        <header className="screen__head">
          <h1 className="type-screen-title">تسجيل بيع</h1>
        </header>
        <div className="sale-echo anim-crossfade" role="status">
          <div className="sale-echo__signal">
            <MicroSignal state={scenarioId === 'offline-save' ? 'local-saved' : 'complete'} size="md" animated label={echo.headline} />
          </div>
          <h2 className="type-card-title">{echo.headline}</h2>
          <p className="type-body">{echo.detail}</p>
          {echo.localSaved ? (
            <div className="sale-echo__save">
              <MicroSignal state="local-saved" size="sm" />
              <span className="type-supporting">{echo.localSaved}</span>
              {echo.pending ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <span className="type-supporting">{echo.pending}</span>
                </>
              ) : null}
            </div>
          ) : null}
          {echo.impact ? (
            <ImpactPreview
              rows={[{ label: echo.impact.label, before: echo.impact.before, after: echo.impact.after }]}
            />
          ) : null}
          <div className="sale-echo__actions">
            <Button role="secondary" size="compact" onClick={onExit}>
              {echo.backAction}
            </Button>
            <Button role="tertiary" size="compact" onClick={() => onNavigate('FIN-TRANSACTION-DETAIL')}>
              {echo.viewAction}
            </Button>
          </div>
          <p className="sale-echo__note type-supporting">{echo.note}</p>
        </div>
      </div>
    )
  }

  // ==================== النموذج السريع (§12.1) ====================
  return (
    <div className="screen screen--sale is-level3" data-screen="OPS-SALE-CREATE">
      <header className="screen__head">
        <button type="button" className="link-action screen__cancel" onClick={onExit}>
          إلغاء
        </button>
        <div>
          <h1 className="type-screen-title">{sale.title}</h1>
          <ContextTrace>{sale.entryNote}</ContextTrace>
        </div>
      </header>

      <div className="sale-form">
        <div className="sale-form__mode">
          <SegmentedControl
            options={sale.paymentModes}
            value={mode}
            onChange={(m) => {
              setMode(m)
              setErrors(null)
            }}
            ariaLabel="طريقة البيع"
          />
        </div>

        {mode === 'credit' ? (
          <div className="sale-form__customer">
            <button
              type="button"
              className={`sale-customer${errors?.customer ? ' has-error' : ''}`}
              onClick={() => {
                setSearch('')
                setPickerOpen('customer')
              }}
              aria-haspopup="dialog"
            >
              <Icon name="user-circle" size={22} />
              <span className="sale-customer__body">
                <span className="sale-customer__label type-supporting">العميل (آجل)</span>
                <span className="sale-customer__name type-card-title">
                  {customer ? customer.name : 'اختر عميلًا'}
                </span>
                {customer ? (
                  customer.debt.value !== null ? (
                    <span className="sale-customer__debt type-supporting">دين حالي: {formatAmount(customer.debt.value)} د.أ</span>
                  ) : (
                    <span className="sale-customer__debt type-supporting">دين العميل غير مسجل</span>
                  )
                ) : null}
              </span>
              <Icon name="caret-left" size={20} />
            </button>
            {errors?.customer ? (
              <p className="field__error" role="alert">
                <Icon name="warning-circle" size={16} />
                <span>{errors.customer}</span>
              </p>
            ) : null}
          </div>
        ) : null}

        <section className="sale-form__lines" aria-label="أصناف البيع">
          <header className="screen__section-head">
            <h2 className="type-section-title">الأصناف</h2>
            <button
              type="button"
              className="link-action"
              onClick={() => {
                setSearch('')
                setPickerOpen('product')
              }}
            >
              <Icon name="plus" size={18} /> إضافة صنف
            </button>
          </header>
          {cart.length === 0 ? (
            <button
              type="button"
              className="sale-form__empty"
              onClick={() => {
                setSearch('')
                setPickerOpen('product')
              }}
            >
              <Icon name="plus" size={20} />
              <span className="type-body">أضف أول صنف لبدء البيع</span>
            </button>
          ) : (
            <ul className="sale-lines">
              {cart.map((line, idx) => (
                <li key={`${line.productId}-${idx}`} className="sale-line">
                  <div className="sale-line__body">
                    <span className="sale-line__name type-card-title">{line.name}</span>
                  </div>
                  <div className="sale-line__ctrl">
                    <button type="button" className="qty-btn" aria-label="إنقاص الكمية" onClick={() => changeQty(idx, -1)}>
                      <Icon name="minus" size={18} />
                    </button>
                    <span className="sale-line__qty ltr type-card-title">{line.qty}</span>
                    <button type="button" className="qty-btn" aria-label="زيادة الكمية" onClick={() => changeQty(idx, 1)}>
                      <Icon name="plus" size={18} />
                    </button>
                  </div>
                  <span className="sale-line__price type-supporting">
                    {line.price === null ? (
                      <>
                        <MicroSignal state="unknown" size="sm" />
                        <span>السعر غير مسجل لهذا المنتج</span>
                      </>
                    ) : (
                      <span className="ltr">{`${line.displayPrice ?? formatAmount(line.price)} د.أ / ${line.unit}`}</span>
                    )}
                  </span>
                  <div className="sale-line__total">
                    {line.lineTotal !== null && line.price !== null ? (
                      <span className="money-figure type-money-list">
                        <span className="money-num">{formatAmount(line.price * line.qty)}</span>{' '}
                        <span className="money-unit">د.أ</span>
                      </span>
                    ) : (
                      <span className="type-supporting">—</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* تفاصيل إضافية — قابلة للطي وتحفظ القيم (§12.1) */}
        <section className="sale-form__extras">
          <button
            type="button"
            className="sale-extras__toggle"
            aria-expanded={extrasOpen}
            onClick={() => setExtrasOpen((v) => !v)}
          >
            <span className="type-card-title">تفاصيل إضافية</span>
            {notes ? <span className="type-supporting">(ملاحظة مسجلة)</span> : null}
            <Icon name={extrasOpen ? 'caret-up' : 'caret-down'} size={20} />
          </button>
          {extrasOpen ? (
            <div className="sale-extras__body anim-crossfade">
              <TextField
                label="ملاحظة"
                value={notes}
                onChange={setNotes}
                optional
                placeholder="مثال: تسليم مسائي"
                hint="تظهر في تفاصيل العملية فقط ولا تغير أي قيمة مالية"
              />
            </div>
          ) : null}
        </section>

        {/* أثر العملية فوق الإجراء النهائي (§13.8) */}
        {impactRows.length > 0 && phase === 'form' ? <ImpactPreview rows={impactRows} /> : null}

        {/* الفشل: المدخلات باقية والخطأ قرب الإجراء (§12.5/§14.6) */}
        {phase === 'failure' && scenario.failure ? (
          <div className="sale-failure" role="alert">
            <MicroSignal state="error" size="md" label={scenario.failure.title} />
            <div className="sale-failure__body">
              <h3 className="type-card-title">{scenario.failure.title}</h3>
              <p className="type-supporting">{scenario.failure.body}</p>
            </div>
            <Button role="secondary" size="compact" icon="arrow-right" onClick={trySave}>
              {scenario.failure.action}
            </Button>
          </div>
        ) : null}
      </div>

      {/* شريط الإجراء السفلي: الإجمالي والإجراء معًا — زر واحد باسم النتيجة (§12.2/§12.7) */}
      <div className="action-bar">
        <div className="action-bar__summary">
          <span className="type-supporting">الإجمالي</span>
          {phase === 'form' ? (
            <MoneyValue money={{ value: total.value, state: total.value === null ? 'cannot-compute' : 'known' }} size="list" />
          ) : null}
          {errors?.amount && phase === 'form' ? (
            <span className="action-bar__error type-supporting" role="alert">
              {errors.amount}
            </span>
          ) : null}
        </div>
        {phase === 'form' ? (
          <Button
            role="primary"
            fullWidth
            onClick={trySave}
            state={scenario.holding ? 'loading' : 'default'}
            loadingLabel={scenario.holdingLabel ?? 'جارٍ تسجيل البيع'}
          >
            تسجيل البيع
          </Button>
        ) : phase === 'saving' ? (
          <Button role="primary" fullWidth state="loading" loadingLabel="جارٍ تسجيل البيع" onClick={() => undefined}>
            تسجيل البيع
          </Button>
        ) : null}
      </div>

      {/* أوراق الاختيار: قوائم طويلة تفتح Sheet مرتفعًا مع بحث ثابت (§12.4) */}
      <Sheet
        open={pickerOpen === 'product'}
        title="اختيار صنف"
        onClose={() => setPickerOpen(null)}
        dismissible={false}
      >
        <div className="picker">
          <div className="picker__search">
            <TextField label="بحث" value={search} onChange={setSearch} icon="search" placeholder="اسم الصنف" ltr={false} />
          </div>
          <ul className="picker__list">
            {filteredProducts.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="picker__item"
                  onClick={() => {
                    setCart((prev) => {
                      const existing = prev.findIndex((l) => l.productId === p.id)
                      if (existing >= 0) {
                        const copy = [...prev]
                        copy[existing] = { ...copy[existing], qty: copy[existing].qty + 1 }
                        return copy
                      }
                      return [
                        ...prev,
                        {
                          productId: p.id,
                          name: p.name,
                          unit: p.unit,
                          qty: 1,
                          price: p.price.value,
                          displayPrice: p.price.display,
                          lineTotal: p.price.value,
                          priceState: p.price.state,
                        },
                      ]
                    })
                    setPickerOpen(null)
                  }}
                >
                  <span className="picker__item-body">
                    <span className="type-card-title">{p.name}</span>
                    <span className="type-supporting">
                      {p.price.value === null ? (
                        <>
                          <MicroSignal state="unknown" size="sm" /> السعر غير مسجل
                        </>
                      ) : (
                        <span className="ltr">{`${p.price.display ?? formatAmount(p.price.value)} د.أ / ${p.unit}`}</span>
                      )}
                    </span>
                  </span>
                  <Icon name="plus" size={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      <Sheet
        open={pickerOpen === 'customer'}
        title="اختيار العميل"
        onClose={() => setPickerOpen(null)}
        dismissible={false}
      >
        <div className="picker">
          <div className="picker__search">
            <TextField label="بحث" value={search} onChange={setSearch} icon="search" placeholder="اسم العميل" />
          </div>
          <ul className="picker__list">
            {filteredCustomers.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="picker__item"
                  onClick={() => {
                    setCustomerId(c.id)
                    setErrors((e) => (e ? { ...e, customer: undefined } : e))
                    setPickerOpen(null)
                  }}
                >
                  <span className="picker__item-body">
                    <span className="type-card-title">{c.name}</span>
                    <span className="type-supporting">
                      <span className="ltr">{c.phone}</span>
                      {c.debt.value !== null ? <span> · دين حالي {formatAmount(c.debt.value)} د.أ</span> : ' · الدين غير مسجل'}
                    </span>
                  </span>
                  {customerId === c.id ? <Icon name="check" variant="fill" size={20} /> : <Icon name="caret-left" size={20} />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </div>
  )
}
