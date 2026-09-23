// Micro Visual System — Financial: SnapshotDeck (§13.4 + 18 §2) — مراجعة V2
// بطاقة رقمية كبيرة واحدة ظاهرة في اللحظة نفسها. سحب مباشر حقيقي الآن
// (Pointer Events): المحتوى يتبع الإصبع يسارًا/يمينًا (§11.12)، والأزرار
// باقية لبديل الوصول. البطاقة توقف انتشار الحدث كي لا يتنازع مع السحب
// بين الصفحات، ولا تختطف التمرير الرأسي (touch-action: pan-y).
// مؤشر «n من m» يندمج مع وحدات Micro. الحالات العاجلة ومشكلات البيانات
// لا تُخفى داخل السحب — تظهر داخل البطاقة نفسها.

import { useRef, useState } from 'react'
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

const DRAG_THRESHOLD = 48

export function SnapshotDeck({ cards, activeIndex = 0, onShowAll, onViewCard }: SnapshotDeckProps) {
  const [index, setIndex] = useState(activeIndex)
  const [dragX, setDragX] = useState<number | null>(null)
  // قيمة السحب في مرجع متزامن: قراءة pointerup تكون دائمًا الأخيرة (لا مُغلق قديم)
  const dragXRef = useRef<number | null>(null)
  const dragState = useRef<{ startX: number; startY: number; locked: 'none' | 'x' | 'y' }>({
    startX: 0,
    startY: 0,
    locked: 'none',
  })
  const card = cards[index] ?? cards[0]
  if (!card) return null

  const go = (dir: 1 | -1) => {
    setIndex((i) => Math.min(cards.length - 1, Math.max(0, i + dir)))
  }

  const isStrong = card.id === 'result' && card.dataState === 'complete'
  const verdict = card.value.verdict

  // ============ سحب مباشر: المحتوى يتبع الإصبع (§11.12) ============
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // لا نبتلع النقر على الأزرار داخل البطاقة — نلتقط فقط إن بدأ سحب فعلي
    if ((e.target as HTMLElement).closest('button')) return
    dragState.current = { startX: e.clientX, startY: e.clientY, locked: 'none' }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragState.current
    if (st.startX === 0 && st.startY === 0) return
    const dx = e.clientX - st.startX
    const dy = e.clientY - st.startY
    if (st.locked === 'none') {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      st.locked = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y'
      if (st.locked === 'x') {
        // حجز المؤشر + إيقاف انتشار كي لا يشتبك مع سحب الصفحات
        e.currentTarget.setPointerCapture(e.pointerId)
      }
    }
    if (st.locked !== 'x') return
    e.stopPropagation()
    // مقاومة خفيفة عند أول وآخر بطاقة — لا Loop (§11.12)
    const atEdge = (dx > 0 && index === 0) || (dx < 0 && index === cards.length - 1)
    const value = atEdge ? dx * 0.3 : dx
    dragXRef.current = value
    setDragX(value)
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragState.current
    if (st.locked === 'x') e.stopPropagation()
    const dx = dragXRef.current ?? 0
    dragXRef.current = null
    dragState.current = { startX: 0, startY: 0, locked: 'none' }
    setDragX(null)
    if (st.locked !== 'x' || Math.abs(dx) < DRAG_THRESHOLD) return
    // المحتوى يتبع الإصبع: سحب يسارًا (dx<0) يكشف البطاقة التالية يسارًا في RTL
    go(dx < 0 ? 1 : -1)
  }

  const translate = dragX === null ? 0 : Math.round(dragX)
  const dragging = dragX !== null

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
        className={`snapshot-card${isStrong ? ' snapshot-card--strong' : ''}${card.dataState !== 'complete' ? ` snapshot-card--${card.dataState}` : ''}${dragging ? ' is-dragging' : ''}`}
        style={dragging ? { transform: `translateX(${translate}px)` } : undefined}
        role="group"
        aria-roledescription="بطاقة مالية قابلة للسحب"
        aria-label={`البطاقة ${index + 1} من ${cards.length}: ${card.title}`}
        data-swipe-lock="deck"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
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
        <span className="snapshot-deck__hint type-supporting">
          اسحب البطاقة بيدك أو استخدم الأسهم للتنقل
        </span>
      </div>
    </section>
  )
}
