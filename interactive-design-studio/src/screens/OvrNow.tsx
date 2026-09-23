// Micro Visual System — Screen: OVR-NOW (مشروعي الآن)
// المرجع: §13.2/§13.4/§13.19/§13.20 + 04-SCREEN-COVERAGE (OVR-NOW).
// الحالات: Complete|Partial|Insufficient|FirstUse|Offline|Error.
// الكاش لا يظهر كربح؛ الحالة العاجلة لا تختبئ خلف Swipe؛ الخطأ يستبدل
// منطقة الملخص فقط (Recovery Stage) مع بقاء بقية الشاشة.

import { useState } from 'react'
import { SnapshotDeck } from '../components/financial/SnapshotDeck'
import { TransactionRow } from '../components/financial/TransactionRow'
import { MoneyValue } from '../components/financial/MoneyValue'
import { Insight, SystemRibbon, RecoveryStage, EmptyState, ContextTrace } from '../components/contextual/Contextual'
import { OpenRow, RowGroup } from '../components/core/OpenRow'
import { Icon } from '../components/icons/Icon'
import { ovrNow, transactions } from '../fixtures'
import type { OvrNowScenarioFixture } from '../fixtures/types'

export interface OvrNowProps {
  scenario: OvrNowScenarioFixture
  scenarioId: string
  onNavigate: (screenId: string) => void
}

export function OvrNow({ scenario, scenarioId, onNavigate }: OvrNowProps) {
  const [retrying, setRetrying] = useState(false)
  const isOffline = scenarioId === 'offline'
  const isError = scenarioId === 'error'
  const isFirstUse = scenarioId === 'first-use'

  const recent =
    scenario.recent === null
      ? []
      : transactions.transactions.slice(0, scenarioId === 'insufficient' ? 3 : 5)

  return (
    <div className="screen screen--ovr" data-screen="OVR-NOW">
      {isOffline && scenario.ribbon ? (
        <SystemRibbon text={scenario.ribbon.text} detail={scenario.ribbon.detail} icon="wifi-slash" action="عرض العمليات المعلقة" onAction={() => undefined} />
      ) : null}

      <header className="screen__head">
        <h1 className="type-screen-title">مشروعي الآن</h1>
        <ContextTrace state={isError ? 'error' : isOffline ? 'offline' : 'complete'}>
          {scenario.today?.label ?? 'بيانات المشروع غير مكتملة'}
        </ContextTrace>
      </header>

      {isFirstUse ? (
        <div className="screen__first-use">
          <EmptyState
            kind="first-move"
            title={scenario.firstUse?.title ?? 'ابدأ بتسجيل أول عملية'}
            body={scenario.firstUse?.body}
            action={scenario.firstUse?.action}
            onAction={() => onNavigate('OPS-SALE-CREATE')}
          />
        </div>
      ) : (
        <>
          {/* منطقة الملخص المالي — تُستبدل وحدها عند الخطأ (§14.6) */}
          {isError && scenario.summaryError ? (
            <RecoveryStage
              title={scenario.summaryError.title}
              body={scenario.summaryError.body}
              action={retrying ? 'جارٍ إعادة المحاولة…' : scenario.summaryError.action}
              lastSync={scenario.summaryError.lastSync}
              onAction={() => {
                setRetrying(true)
                window.setTimeout(() => setRetrying(false), 1200)
              }}
            />
          ) : scenario.snapshot ? (
            <SnapshotDeck
              cards={scenario.snapshot.cards}
              activeIndex={scenario.snapshot.activeIndex}
              onShowAll={() => onNavigate('OVR-SNAPSHOT-ALL')}
              onViewCard={(cardId) => {
                if (cardId === 'result') onNavigate('FIN-OVERVIEW')
              }}
            />
          ) : null}

          {/* الأهم الآن — Insight واحدة قابلة للإجراء (§13.19) */}
          {scenario.insight ? (
            <Insight
              level={(scenario.insight.level as 'opportunity' | 'attention' | 'action-now' | 'missing-data') ?? 'attention'}
              category={scenario.insight.category}
              title={scenario.insight.title}
              evidence={scenario.insight.evidence}
              completeness={scenario.insight.completeness}
              action={scenario.insight.action}
              onAction={() => onNavigate('OPS-SALE-CREATE')}
            />
          ) : null}

          {/* ملخص اليوم — صفوف مفتوحة */}
          {scenario.today ? (
            <RowGroup label="ملخص اليوم">
              <OpenRow
                icon="coins"
                title="الكاش الآن"
                supporting={isOffline ? 'من آخر نسخة محفوظة' : 'في محفظتين'}
                trailing={<MoneyValue money={scenario.today.cash} size="list" />}
                chevron
                onClick={() => onNavigate('FIN-OVERVIEW')}
              />
              <OpenRow
                icon="basket"
                title="مبيعات اليوم"
                supporting={scenario.today.sales.count ? `${scenario.today.sales.count} عمليات` : undefined}
                trailing={<MoneyValue money={scenario.today.sales} size="list" />}
                chevron
                onClick={() => onNavigate('FIN-ACTIVITY')}
              />
              <OpenRow
                icon="hand-coins"
                title="تحصيلات اليوم"
                supporting={scenario.today.collections.count ? `${scenario.today.collections.count} عمليات` : undefined}
                trailing={<MoneyValue money={scenario.today.collections} size="list" />}
                chevron
                onClick={() => onNavigate('FIN-ACTIVITY')}
              />
              <OpenRow
                icon="receipt"
                title="مصروفات اليوم"
                supporting={scenario.today.expenses.count ? `${scenario.today.expenses.count} عملية` : undefined}
                trailing={<MoneyValue money={scenario.today.expenses} size="list" />}
                chevron
                divider={false}
                onClick={() => onNavigate('OPS-EXPENSE-CREATE')}
              />
            </RowGroup>
          ) : null}

          {/* آخر الحركات */}
          <section className="screen__section" aria-labelledby="recent-title">
            <header className="screen__section-head">
              <h2 id="recent-title" className="type-section-title">
                آخر الحركات
              </h2>
              <button type="button" className="link-action" onClick={() => onNavigate('FIN-ACTIVITY')}>
                عرض الكل
              </button>
            </header>
            {recent.length === 0 ? (
              <EmptyState kind="continuation" title="لا توجد حركات بعد" />
            ) : (
              <div className="screen__rows">
                {recent.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} onClick={() => onNavigate('FIN-TRANSACTION-DETAIL')} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <footer className="screen__foot">
        <ContextTrace state={isError ? 'error' : isOffline ? 'offline' : scenarioId === 'partial' ? 'partial' : 'complete'}>
          {scenario.footerTrace}
        </ContextTrace>
        <span className="screen__fixtures-badge" title="بيانات عرض فقط">
          <Icon name="info" size={16} />
          <span className="type-supporting">Fixtures</span>
        </span>
      </footer>
    </div>
  )
}
