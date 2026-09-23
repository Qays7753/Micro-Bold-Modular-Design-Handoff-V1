// Micro Visual System — Financial: SnapshotDeck (§13.4)
// بطاقة رقمية كبيرة واحدة ظاهرة في اللحظة نفسها. Swipe بين البطاقات مع
// إشارة طرفية توحي بالبطاقة التالية (دون إظهار نصفها) ومؤشر «1 من 4»
// يندمج مع وحدات Micro. رأس القسم: «نظرة مالية» يمينًا و«عرض الكل» يسارًا.
// الحالات العاجلة ومشكلات البيانات لا تُخفى داخل Swipe — تظهر داخل البطاقة.

import { useState } from 'react'
import { MoneyValue } from './MoneyValue'
import { TruthNote } from './TruthNote'
import { MicroSignal, dataStateToSignal } from '../contextual/MicroSignal'
import type { SnapshotCardFixture } from '../../fixtures/types'
import { FIXTURE_DISCLAIMER } from '../../fixtures'

export interface SnapshotDeckProps {
  cards: SnapshotCardFixture[]
  activeIndex?: number
  onShowAll?: () => void
  onViewCard?: (cardId: string) => void
}

export function SnapshotDeck({ cards, activeIndex = 0, onShowAll, onViewCard }: SnapshotDeckProps) {
  const [index, setIndex] = useState(activeIndex)
  const card = cards[index] ?? cards[0]
  if (!card) return null

  const go = (dir: 1 | -1) => {
    setIndex((i) => Math.min(cards.length - 1, Math.max(0, i + dir)))
  }

  const isStrong = card.dataState === 'complete' && card.id === 'cash'
  const verdict = card.value.verdict

  return (
    <section className="snapshot-deck" aria-label="نظرة مالية">
      <header className="snapshot-deck__head">
        <h3 className="type-section-title">نظرة مالية</h3>
        {onShowAll ? (
          <button type="button" className="link-action" onClick={onShowAll}>
            عرض الكل
          </button>
        ) : null}
      </header>

      <div
        className={`snapshot-card${isStrong ? ' snapshot-card--strong' : ''}${card.dataState !== 'complete' ? ` snapshot-card--${card.dataState}` : ''}`}
        role="group"
        aria-roledescription="بطاقة مالية"
        aria-label={`البطاقة ${index + 1} من ${cards.length}: ${card.title}`}
      >
        <div className="snapshot-card__top">
          <span className="snapshot-card__question type-supporting">{card.question}</span>
          <MicroSignal state={dataStateToSignal(card.dataState)} size="sm" label={`حالة البيانات: ${card.dataState}`} />
        </div>
        <h4 className="snapshot-card__title type-card-title">{card.title}</h4>
        <MoneyValue money={card.value} size="hero" estimatedTag={card.value.state === 'estimated' ? 'تقريبًا' : undefined} />
        {verdict ? <span className="snapshot-card__verdict type-supporting">{verdict}</span> : null}
        <p className="snapshot-card__support type-supporting">{card.support}</p>
        {card.action ? (
          <button type="button" className="snapshot-card__action link-action" onClick={() => onViewCard?.(card.id)}>
            {card.action}
          </button>
        ) : null}
        <div className="snapshot-card__seam">
          <TruthNote
            what={card.note || `${card.title} — ${card.support}`}
            notWhat={card.note ? undefined : 'هذا الرقم وحده لا يمثل نتيجة المشروع'}
            period="هذا الشهر"
            dataState={card.dataState}
            stateText={card.missing}
            fixtureSource={FIXTURE_DISCLAIMER}
          />
        </div>
      </div>

      <div className="snapshot-deck__nav" role="tablist" aria-label="التنقل بين البطاقات">
        <div className="snapshot-deck__nav-row">
          <button
            type="button"
            className="snapshot-deck__arrow"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="البطاقة السابقة"
          >
            ‹
          </button>
          <span className="snapshot-deck__indicator" aria-live="polite">
            <span className="ltr">{`${index + 1} من ${cards.length}`}</span>
          </span>
          <button
            type="button"
            className="snapshot-deck__arrow"
            onClick={() => go(1)}
            disabled={index === cards.length - 1}
            aria-label="البطاقة التالية"
          >
            ›
          </button>
        </div>
        <span className="snapshot-deck__hint type-supporting" aria-hidden="true">
          اسحب لعرض بطاقة أخرى
        </span>
      </div>
    </section>
  )
}
