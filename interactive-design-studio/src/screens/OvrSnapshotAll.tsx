// Micro Visual System — Screen: OVR-SNAPSHOT-ALL (كل البطاقات المالية)
// عرض استوديو حقيقي طلبته المراجعة (18 §2): «عرض الكل» في SnapshotDeck
// يفتح هذه الشاشة بدل نقر ميت — كل بطاقات نظرة المالية لحالة OVR-NOW
// الحالية مكشوفة للقراءة المتأنية، مع بيان نزاهة كل واحدة وزر عودة يحفظ
// التسلسل. ليست تصميمًا جديدًا لشاشة منتج — هي نفس بطاقات §13.4 ممددة.

import { MoneyValue } from '../components/financial/MoneyValue'
import { TruthNote } from '../components/financial/TruthNote'
import { MicroSignal, dataStateToSignal } from '../components/contextual/MicroSignal'
import { EmptyState, ContextTrace } from '../components/contextual/Contextual'
import { Icon } from '../components/icons/Icon'
import { FIXTURE_DISCLAIMER } from '../fixtures'
import type { OvrNowScenarioFixture, SnapshotCardFixture } from '../fixtures/types'

export interface OvrSnapshotAllProps {
  scenario: OvrNowScenarioFixture
  scenarioId: string
  onBack: () => void
}

export function OvrSnapshotAll({ scenario, scenarioId, onBack }: OvrSnapshotAllProps) {
  const cards: SnapshotCardFixture[] = scenario.snapshot?.cards ?? []

  return (
    <div className="screen screen--snapshot-all" data-screen="OVR-SNAPSHOT-ALL">
      <header className="screen__head">
        <button type="button" className="link-action snapshot-all__back" onClick={onBack}>
          <Icon name="caret-left" size={20} /> عودة إلى مشروعي الآن
        </button>
        <h1 className="type-screen-title">كل البطاقات المالية</h1>
        <ContextTrace state={scenarioId === 'offline' ? 'offline' : 'complete'}>
          {scenarioId === 'offline' ? 'من آخر نسخة محفوظة' : (scenario.today?.label ?? 'نظرة مالية موسعة')}
        </ContextTrace>
      </header>

      {cards.length === 0 ? (
        <EmptyState kind="continuation" title="لا بطاقات مالية بعد" body="ستظهر البطاقات هنا بعد أول عملية مسجلة." />
      ) : (
        <div className="snapshot-all__list">
          {cards.map((card, i) => {
            const isStrong = card.id === 'result' && card.dataState === 'complete'
            return (
              <section
                key={card.id}
                className={`snapshot-card${isStrong ? ' snapshot-card--strong' : ''}${card.dataState !== 'complete' ? ` snapshot-card--${card.dataState}` : ''}`}
                aria-label={`${card.question} — ${card.title}`}
              >
                <div className="snapshot-card__top">
                  <span className="snapshot-card__question type-supporting">
                    <span className="ltr">{`${i + 1}. `}</span>
                    {card.question}
                  </span>
                  <MicroSignal state={dataStateToSignal(card.dataState)} size="sm" label={`حالة البيانات: ${card.dataState}`} />
                </div>
                <h2 className="snapshot-card__title type-card-title">{card.title}</h2>
                <MoneyValue money={card.value} size="hero" estimatedTag={card.value.state === 'estimated' ? 'تقريبًا' : undefined} />
                {card.value.verdict ? <span className="snapshot-card__verdict type-supporting">{card.value.verdict}</span> : null}
                <p className="snapshot-card__support type-supporting">{card.support}</p>
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
              </section>
            )
          })}
        </div>
      )}

      <footer className="screen__foot">
        <ContextTrace state="complete">بطاقات نظرة المالية نفسها من شاشة مشروعي الآن — مكشوفة كلها للقراءة</ContextTrace>
        <span className="screen__fixtures-badge" title="بيانات عرض فقط">
          <Icon name="info" size={16} />
          <span className="type-supporting">Fixtures</span>
        </span>
      </footer>
    </div>
  )
}
