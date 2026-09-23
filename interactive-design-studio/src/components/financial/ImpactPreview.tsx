// Micro Visual System — Financial: ImpactPreview (§13.8)
// قسم «أثر العملية» داخل النموذج فوق الإجراء النهائي. قسم مفتوح لا بطاقة
// ضخمة. يعرض فقط قيم العرض المحددة: بصيغة قبل/بعد مع عنوان يفسرها. لا
// يعتمد «+» و«−» أو اللون وحدهما. القيم هنا Fixtures توضح تنسيق العرض فقط
// (GAP-004) — الأثر الفعلي يحدده منطق المنتج.

import { formatAmount } from '../../foundations/tokens'
import { MicroSignal } from '../contextual/MicroSignal'

export interface ImpactRow {
  label: string
  before: number | null
  after: number | null
  note?: string
}

export function ImpactPreview({ rows, fixtureNote = true }: { rows: ImpactRow[]; fixtureNote?: boolean }) {
  if (rows.length === 0) return null
  return (
    <section className="impact-preview" aria-labelledby="impact-title">
      <div className="impact-preview__head">
        <MicroSignal state="in-progress" size="sm" label="أثر العملية" />
        <h3 id="impact-title" className="type-card-title">
          أثر العملية
        </h3>
      </div>
      <p className="impact-preview__lead type-supporting">ماذا سيظهر أنه تغير بعد التنفيذ؟</p>
      <ul className="impact-preview__rows">
        {rows.map((row) => (
          <li key={row.label} className="impact-preview__row">
            <span className="impact-preview__label type-supporting">{row.label}</span>
            <span className="impact-preview__values">
              {row.before === null || row.after === null ? (
                <span className="impact-preview__unknown">
                  <MicroSignal state="unknown" size="sm" />
                  <span className="type-supporting">{row.note ?? 'غير محسوب — لا يمكن حسابه قبل إكمال المدخلات'}</span>
                </span>
              ) : (
                <span className="money-figure type-money-list">
                  <span className="money-num">{formatAmount(row.before)}</span>
                  <span className="impact-preview__arrow" aria-hidden="true">
                    ←
                  </span>
                  <span className="money-num">{formatAmount(row.after)}</span>
                  <span className="money-unit">د.أ</span>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {fixtureNote ? (
        <p className="impact-preview__fixture type-supporting">
          قيم عرض من Fixtures لبيان طريقة العرض فقط — الأثر المالي الفعلي يحدده منطق المنتج.
        </p>
      ) : null}
    </section>
  )
}
