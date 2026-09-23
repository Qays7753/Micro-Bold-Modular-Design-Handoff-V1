// Micro Visual System — Financial: TransactionRow (§13.5)
// صف مفتوح لا بطاقة لكل عملية. اليمين: أيقونة بلا مربع ملون. الوسط: نوع
// العملية والطرف والتاريخ. اليسار: المبلغ LTR والحالة عند الحاجة. التمييز
// بالاسم والأيقونة وMicro Signal لا بالأحمر والأخضر. الجزئي يعرض الأصل
// والمدفوع والمتبقي. حالات الحفظ (محفوظ محليًا/بانتظار الإرسال) تظهر من
// بيانات الصف الثانوية.

import { MoneyValue } from './MoneyValue'
import { MicroSignal, dataStateToSignal, SIGNAL_STATE_TEXT } from '../contextual/MicroSignal'
import { Icon, type IconName } from '../icons/Icon'
import { SAVE_STATE_LABELS } from '../../states/types'
import type { TransactionFixture } from '../../fixtures/types'
import { formatAmount } from '../../foundations/tokens'

const TYPE_ICON: Record<string, IconName> = {
  'بيع نقدي': 'basket',
  'بيع آجل': 'basket',
  مصروف: 'receipt',
  'تحصيل دين': 'hand-coins',
  'دفعة مورد': 'arrows-left-right',
  شراء: 'arrows-left-right',
}

export function TransactionRow({ tx, chevron = true, onClick }: { tx: TransactionFixture; chevron?: boolean; onClick?: () => void }) {
  const icon = TYPE_ICON[tx.type] ?? 'receipt'
  const saveLabel = SAVE_STATE_LABELS[tx.saveState as keyof typeof SAVE_STATE_LABELS] ?? ''
  const directionWord = tx.direction === 'in' ? 'دخل' : 'خرج'

  return (
    <div className={`tx-row${tx.saveState !== 'saved' ? ' has-save-state' : ''}`}>
      <button type="button" className="tx-row__target" onClick={onClick} aria-label={`تفاصيل ${tx.type} — ${tx.party}`}>
        <span className="tx-row__icon">
          <Icon name={icon} size={22} />
        </span>
        <span className="tx-row__body">
          <span className="tx-row__title type-card-title">{tx.type}</span>
          <span className="tx-row__party type-supporting">{tx.party}</span>
          <span className="tx-row__meta type-supporting">
            <span className="ltr">{tx.id}</span>
            <span aria-hidden="true"> · </span>
            {tx.when}
          </span>
          {tx.valueState === 'partial-amount' && typeof tx.paid === 'number' && typeof tx.remaining === 'number' ? (
            <span className="tx-row__partial type-supporting">
              {([
                ['الأصل', tx.amount],
                ['المدفوع', tx.paid],
                ['المتبقي', tx.remaining],
              ] as const).map(([label, value]) => (
                <span className="tx-row__partial-item" key={label}>
                  {label}{' '}
                  <span className="money-figure">
                    <span className="money-num">{value === null ? '—' : formatAmount(value)}</span>{' '}
                    {value !== null ? <span className="money-unit">د.أ</span> : null}
                  </span>
                </span>
              ))}
            </span>
          ) : null}
          {saveLabel ? (
            <span className="tx-row__save">
              <MicroSignal state={dataStateToSignal(tx.saveState)} size="sm" />
              <span className="type-supporting">{saveLabel}</span>
            </span>
          ) : null}
        </span>
        <span className="tx-row__trailing">
          <MoneyValue money={{ value: tx.amount, state: 'known' }} size="list" />
          <span className="tx-row__direction type-supporting">{directionWord}</span>
          {tx.dataState !== 'complete' ? (
            <MicroSignal state={dataStateToSignal(tx.dataState)} size="sm" label={SIGNAL_STATE_TEXT[dataStateToSignal(tx.dataState)]} />
          ) : null}
          {chevron ? <Icon name="caret-left" size={20} /> : null}
        </span>
      </button>
    </div>
  )
}
