// Micro Visual System — Financial: ResultBlock (§13.11)
// النتيجة + الاكتمال. مكتملة: «نتيجة هذا الشهر» + ربح/خسارة + إشارة مكتملة
// + «بحسب جميع البيانات المسجلة». جزئية: «نتيجة تقديرية» + الناقص + إجراء.
// متعذرة: «النتيجة غير متاحة بعد» + «—» + السبب والإجراء. البطاقة Indigo أو
// Deep Ink ولا تتحول كلها للأخضر/الأحمر؛ Partial سطح Lavender وUnknown محايد.

import { MoneyValue } from './MoneyValue'
import { MicroSignal } from '../contextual/MicroSignal'
import { Button } from '../core/Button'
import type { FinOverviewScenarioFixture } from '../../fixtures/types'

export function ResultBlock({ result }: { result: FinOverviewScenarioFixture['result'] }) {
  const stateCls =
    result.state === 'complete'
      ? 'result-block--complete'
      : result.state === 'partial'
        ? 'result-block--partial'
        : 'result-block--insufficient'

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
          <MicroSignal
            state={result.state === 'complete' ? 'complete' : result.state === 'partial' ? 'partial' : 'unknown'}
            size="sm"
            label={result.completeness}
          />
        </div>
        <MoneyValue
          money={result.value}
          size="hero"
          note={result.value.state === 'negative' ? 'سالب لأن المصروفات أعلى من الإيرادات' : undefined}
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
          <Button
            role={result.state === 'complete' ? 'secondary' : 'primary'}
            size="compact"
            onClick={() => undefined}
            trailingArrow
          >
            {result.action}
          </Button>
        ) : null}
      </div>
    </section>
  )
}
