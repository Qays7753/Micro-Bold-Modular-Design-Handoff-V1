// Micro Visual System — Financial: TruthNote / Truth Layer (§13.2/§13.11)
// «ما هذا الرقم؟ وما ليس عليه؟» — طبقة نزاهة تنكشف من مصدرها (Reveal)
// وتشرح: ماذا يمثل، ما الفترة، حالة البيانات، وما لا يمثله. ليست Tooltip
// ولا بطاقة منفصلة — امتداد من الحد الأسفل للبطاقة/القسم (Seam Reveal).

import { useState } from 'react'
import { MicroSignal, dataStateToSignal } from '../contextual/MicroSignal'

export interface TruthNoteProps {
  /** ماذا يمثل الرقم */
  what: string
  /** ما لا يمثله — منع الخلط بين الكاش والربح والإيراد والدين */
  notWhat?: string
  period?: string
  dataState: string
  /** حالة نصية أدق عند وجودها */
  stateText?: string
  fixtureSource?: string
}

export function TruthNote({ what, notWhat, period, dataState, stateText, fixtureSource }: TruthNoteProps) {
  const [open, setOpen] = useState(false)
  const id = `truth-${what.slice(0, 12)}-${dataState}`
  return (
    <div className="truth-note" id={id}>
      <button
        type="button"
        className="truth-note__trigger"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
      >
        <MicroSignal state={dataStateToSignal(dataState)} size="sm" />
        <span className="truth-note__trigger-text type-supporting">
          {stateText ?? 'بيان النزاهة'}
        </span>
      </button>
      {open ? (
        <div className="truth-note__panel anim-crossfade" id={`${id}-panel`} role="note">
          <dl className="truth-note__defs">
            <div className="truth-note__def">
              <dt>ماذا يمثل</dt>
              <dd>{what}</dd>
            </div>
            {period ? (
              <div className="truth-note__def">
                <dt>الفترة</dt>
                <dd>{period}</dd>
              </div>
            ) : null}
            <div className="truth-note__def">
              <dt>حالة البيانات</dt>
              <dd>{stateText ?? dataStateLabel(dataState)}</dd>
            </div>
            {notWhat ? (
              <div className="truth-note__def truth-note__def--warn">
                <dt>ما لا يمثله</dt>
                <dd>{notWhat}</dd>
              </div>
            ) : null}
            {fixtureSource ? (
              <div className="truth-note__def">
                <dt>مصدر القيمة</dt>
                <dd>{fixtureSource}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}
    </div>
  )
}

function dataStateLabel(state: string): string {
  switch (state) {
    case 'complete':
      return 'مكتملة — بحسب جميع البيانات المسجلة'
    case 'partial':
      return 'جزئية — تنقص بعض المدخلات'
    case 'insufficient':
      return 'غير كافية للحكم'
    case 'estimated':
      return 'تقديرية — مبنية على بيانات غير مكتملة'
    case 'offline':
      return 'من آخر نسخة محفوظة (دون اتصال)'
    case 'error':
      return 'آخر قيم ناجحة بعد تعثر التحديث'
    default:
      return state
  }
}
