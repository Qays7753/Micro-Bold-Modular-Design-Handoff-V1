// Micro Visual System — Financial: MoneyValue (§13.3/§13.20/§16.2)
// المكوّن الوحيد المخوّل بعرض المبالغ. يميز: قيمة معلومة، صفرًا حقيقيًا،
// سالبًا مشروحًا، نتيجة تقديرية، غير مسجل، لا يمكن حسابه، غير معروف.
// الغياب لا يتحول أبدًا إلى 0.00. الرقم جزيرة LTR والوحدة «د.أ» في التدفق
// العربي. قارئ الشاشة يسمع قيمة مالية بـ«دينار أردني».

import { formatAmount, CURRENCY_UNIT, CURRENCY_SPOKEN } from '../../foundations/tokens'
import { MicroSignal, dataStateToSignal } from '../contextual/MicroSignal'
import type { MoneyFixture } from '../../fixtures/types'

export interface MoneyValueProps {
  money: MoneyFixture
  size?: 'hero' | 'list' | 'body'
  /** شرح سبب السالب أو حالة القيمة — يظهر كسياق قريب (§13.3) */
  note?: string
  /** وسم تقديري نصي بديل الرمز ≈ (§13.3) */
  estimatedTag?: string
  ariaLabelPrefix?: string
}

export function MoneyValue({ money, size = 'body', note, estimatedTag, ariaLabelPrefix }: MoneyValueProps) {
  const cls = `money-value money-value--${size}${money.stale ? ' is-stale' : ''}`

  // حالات نصية بلا رقم (§13.20)
  if (money.value === null || money.value === undefined) {
    const text =
      money.state === 'not-recorded'
        ? 'غير مسجل'
        : money.state === 'cannot-compute'
          ? 'لا يمكن حسابه'
          : '—'
    const stateNote = note ?? money.note
    return (
      <span className={cls}>
        <span className="money-value__figure">
          <span className="money-value__dash" aria-hidden="true">
            —
          </span>
        </span>
        <span className="money-value__state">
          <MicroSignal state={dataStateToSignal(mapToSignal(money.state))} size="sm" />
          <span className="money-value__state-text">{text}</span>
        </span>
        {stateNote ? <span className="money-value__note type-supporting">{stateNote}</span> : null}
      </span>
    )
  }

  const numeric = formatAmount(money.value)
  const spoken = `${ariaLabelPrefix ?? ''} ${Math.abs(money.value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })} ${CURRENCY_SPOKEN}${money.value < 0 ? ' ناقصًا' : ''}`

  return (
    <span className={cls} aria-label={spoken}>
      <span className="money-figure">
        <span className="money-num">{numeric}</span>{' '}
        <span className="money-unit" aria-hidden="true">
          {CURRENCY_UNIT}
        </span>
      </span>
      {money.state === 'estimated' ? (
        <span className="money-value__state">
          <MicroSignal state="partial" size="sm" />
          <span className="money-value__state-text">{estimatedTag ?? 'نتيجة تقديرية'}</span>
        </span>
      ) : null}
      {money.state === 'partial' ? (
        <span className="money-value__state">
          <MicroSignal state="partial" size="sm" />
          <span className="money-value__state-text">جزئي</span>
        </span>
      ) : null}
      {money.state === 'negative' && note ? (
        <span className="money-value__note type-supporting">{note}</span>
      ) : null}
      {money.state === 'true-zero' ? (
        <span className="money-value__state">
          <MicroSignal state="complete" size="sm" />
          <span className="money-value__state-text">صفر حقيقي</span>
        </span>
      ) : null}
      {money.stale ? <span className="money-value__stale type-supporting">من آخر نسخة محفوظة</span> : null}
    </span>
  )
}

function mapToSignal(state: string): string {
  if (state === 'not-recorded' || state === 'unknown') return 'unknown'
  if (state === 'cannot-compute') return 'unknown'
  return state
}
