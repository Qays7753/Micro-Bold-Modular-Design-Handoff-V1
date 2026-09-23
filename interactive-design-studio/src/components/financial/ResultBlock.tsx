// Micro Visual System — Financial: ResultBlock (§13.11) — مراجعة V2
// النتيجة + الاكتمال في FIN-OVERVIEW. المكتملة: حاوية نجاح دلالية مع كلمة
// حكم (ربح) + إشارة + رقم Ink — النتيجة دلالة مالية لا لون هوية (17 §2).
// السالب: حاوية خطر مع كلمة «خسارة» مشروحة. الجزئية: محايد + شريط جانبي.
// «إضافة التكاليف» يوصل لشاشة المصروف المؤجلة؛ «عرض التفاصيل» يفتح تفصيلًا
// حقيقيًا من بيانات Fixtures نفسها داخل Sheet — لا نقر ميت.

import { useState } from 'react'
import { MoneyValue } from './MoneyValue'
import { MicroSignal } from '../contextual/MicroSignal'
import { Button } from '../core/Button'
import { Sheet } from '../core/Overlays'
import { OpenRow, RowGroup } from '../core/OpenRow'
import type { FinOverviewScenarioFixture, MoneyFixture } from '../../fixtures/types'

export interface ResultBlockProps {
  result: FinOverviewScenarioFixture['result']
  /** صف التدفق (إيرادات/مصروفات) لتفصيل النتيجة داخل Sheet */
  flowRows?: Array<{ label: string; value: MoneyFixture; detail: string }>
  onNavigate?: (screenId: string) => void
}

export function ResultBlock({ result, flowRows = [], onNavigate }: ResultBlockProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isNegative = result.value.state === 'negative'
  const stateCls = isNegative
    ? 'result-block--negative'
    : result.state === 'complete'
      ? 'result-block--complete'
      : result.state === 'partial'
        ? 'result-block--partial'
        : 'result-block--insufficient'

  const verdictWord =
    result.state === 'insufficient' ? 'غير متاحة' : result.verdict === 'خسارة' ? 'خسارة' : result.verdict || 'نتيجة'

  const isAddCosts = result.action === 'إضافة التكاليف' || result.action === 'عرض العمليات المعلقة'

  const onAction = () => {
    if (isAddCosts) {
      onNavigate?.(result.action === 'عرض العمليات المعلقة' ? 'FIN-ACTIVITY' : 'OPS-EXPENSE-CREATE')
    } else {
      setDetailsOpen(true)
    }
  }

  return (
    <section className={`result-block ${stateCls}`} aria-labelledby="result-question">
      <span id="result-question" className="result-block__question type-supporting">
        {result.question}
      </span>
      <div className="result-block__main">
        <div className="result-block__title-row">
          <h3 className="type-card-title">
            {result.state === 'complete'
              ? 'نتيجة هذا الشهر'
              : result.state === 'partial'
                ? 'نتيجة تقديرية'
                : 'النتيجة غير متاحة بعد'}
          </h3>
          <span className="result-block__verdict-word">
            <MicroSignal
              state={
                result.state === 'complete' ? (isNegative ? 'error' : 'complete') : result.state === 'partial' ? 'partial' : 'unknown'
              }
              size="sm"
              label={result.completeness}
            />
            {verdictWord}
          </span>
        </div>
        <MoneyValue
          money={result.value}
          size="hero"
          note={isNegative ? 'سالب لأن المصروفات أعلى من الإيرادات' : undefined}
          estimatedTag="تقريبًا"
        />
        {result.value.state === 'known' && result.verdict ? (
          <p className="result-block__verdict type-supporting">
            {result.verdict} · {result.completeness}
          </p>
        ) : null}
        {result.value.value === null ? <p className="result-block__reason type-supporting">{result.completeness}</p> : null}
        <p className="result-block__detail type-supporting">{result.detail}</p>
        {result.action ? (
          <Button role="secondary" size="compact" trailingArrow onClick={onAction}>
            {result.action}
          </Button>
        ) : null}
      </div>

      {/* تفصيل النتيجة داخل Sheet — من صفوف التدفق نفسها (Fixtures) بلا شاشة جديدة */}
      <Sheet open={detailsOpen} title="تفصيل نتيجة الشهر" onClose={() => setDetailsOpen(false)}>
        <div className="picker">
          <p className="type-supporting">{result.completeness}</p>
          {flowRows.length > 0 ? (
            <RowGroup label="مكونات النتيجة">
              {flowRows.map((row) => (
                <OpenRow
                  key={row.label}
                  icon={row.label.startsWith('إيرادات') ? 'basket' : 'receipt'}
                  title={row.label}
                  supporting={row.detail || undefined}
                  trailing={<MoneyValue money={row.value} size="list" />}
                  chevron={false}
                  divider={false}
                />
              ))}
            </RowGroup>
          ) : null}
          <p className="type-supporting">
            النتيجة = الفرق بين الإيرادات والمصروفات خلال الفترة. الكاش شيء آخر تمامًا — راجع بيان النزاهة في قسم الكاش
            أعلاه.
          </p>
        </div>
      </Sheet>
    </section>
  )
}
