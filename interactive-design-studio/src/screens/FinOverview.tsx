// Micro Visual System — Screen: FIN-OVERVIEW (المالية) — مراجعة V2
// المرجع: §13.2 (Question-First) + §13.3 + §13.7 + §13.11 + §13.12 + §13.20
// + 17-COLOR-DECISION + 18 §1.2/§1.4.
// الحالات: Complete|Partial|Insufficient|Zero|Negative|Offline.
// التكوين: لا كتلة ملونة مهيمنة — أسئلة على Canvas بسطر فاصل رقيق ولوحات
// بيضاء هادئة وأرقام Ink كبيرة (إيقاع «بيان» مميز عن OVR). المحافظ خارج
// أي كتلة ملونة بتدفق نظيف: الاسم والتاريخ يلتفان والمبلغ مع «د.أ» دائمًا.
// الرصيد والإيراد والنتيجة والدين مفصولة؛ النتيجة دلالة (نجاح/خطر) لا هوية.
// لا Chart في هذه الجولة — النمط مشروط بسؤال وبيانات مثبتة (FIN-CHARTS).

import { useState } from 'react'
import { MoneyValue } from '../components/financial/MoneyValue'
import { ResultBlock } from '../components/financial/ResultBlock'
import { TruthNote } from '../components/financial/TruthNote'
import { SystemRibbon, ContextSeam, ContextTrace } from '../components/contextual/Contextual'
import { OpenRow, RowGroup } from '../components/core/OpenRow'
import { AnchoredMenu } from '../components/core/Overlays'
import { Icon } from '../components/icons/Icon'
import { finOverview } from '../fixtures'
import type { FinOverviewScenarioFixture } from '../fixtures/types'
import { formatAmount } from '../foundations/tokens'

export interface FinOverviewProps {
  scenario: FinOverviewScenarioFixture
  scenarioId: string
  onNavigate: (screenId: string) => void
}

export function FinOverview({ scenario, scenarioId, onNavigate }: FinOverviewProps) {
  const [periodMenuOpen, setPeriodMenuOpen] = useState(false)
  const [period, setPeriod] = useState(scenario.period)
  const isOffline = scenarioId === 'offline'

  return (
    <div className="screen screen--fin" data-screen="FIN-OVERVIEW">
      {isOffline && scenario.ribbon ? (
        <SystemRibbon
          text={scenario.ribbon.text}
          detail={scenario.ribbon.detail}
          icon="wifi-slash"
          action="عرض العمليات المعلقة"
          onAction={() => onNavigate('FIN-ACTIVITY')}
        />
      ) : null}

      <header className="screen__head">
        <h1 className="type-screen-title">المالية</h1>
        <button
          type="button"
          className="period-btn"
          onClick={() => setPeriodMenuOpen(true)}
          aria-haspopup="listbox"
          aria-label={`الفترة الحالية: ${period} — تغيير الفترة`}
        >
          <span className="type-card-title">{period}</span>
          <Icon name="caret-down" size={20} />
        </button>
      </header>

      {/* السؤال 1: كم معي الآن؟ — لوحة بيضاء هادئة ورقم كبير (لا كتلة ملونة) */}
      <section className="fin-cash" aria-labelledby="fin-cash-q">
        <div className="fin-cash__head">
          <span id="fin-cash-q" className="type-supporting">
            {scenario.cash.question}
          </span>
          <ContextTrace state={isOffline ? 'offline' : 'complete'}>
            {scenario.cash.staleTrace ?? 'آخر تحديث اليوم 2:35 م'}
          </ContextTrace>
        </div>
        <h2 className="fin-cash__title type-card-title">الكاش المتاح الآن</h2>
        <MoneyValue money={scenario.cash.value} size="hero" />
        <div className="fin-cash__actions">
          <button type="button" className="link-action" onClick={() => onNavigate('FIN-WALLETS')}>
            {scenario.cash.distributionAction}
          </button>
          <button type="button" className="link-action" onClick={() => onNavigate('FIN-TRANSFER')}>
            {scenario.cash.transferAction}
          </button>
        </div>
        <RowGroup label="المحافظ">
          {scenario.cash.wallets.map((w) => (
            <OpenRow
              key={w.name}
              icon="wallet"
              title={w.name}
              supporting={w.last}
              trailing={
                <span className="money-figure type-money-list">
                  <span className="money-num">{formatAmount(w.value)}</span> <span className="money-unit">د.أ</span>
                </span>
              }
              chevron
              onClick={() => onNavigate('FIN-WALLETS')}
            />
          ))}
          {scenario.cash.unallocated ? (
            <div className="fin-cash__unallocated">
              <ContextSeam tone="warning" action={scenario.cash.unallocated.action} onAction={() => onNavigate('FIN-WALLETS')}>
                <span className="type-supporting">
                  {scenario.cash.unallocated.note} — <span className="ltr">{formatAmount(scenario.cash.unallocated.value)}</span> د.أ
                </span>
              </ContextSeam>
            </div>
          ) : null}
        </RowGroup>
        <div className="fin-cash__truth">
          <TruthNote
            what="الكاش المتاح الآن: مجموع أرصدة المحافظ في هذه اللحظة"
            notWhat="الكاش ليس ربحًا ولا إيرادًا — يشمل رأس المال العامل ويستخدم لتسديد الالتزامات"
            period={period}
            dataState={isOffline ? 'offline' : 'complete'}
            stateText={isOffline ? 'من آخر نسخة محفوظة (دون اتصال)' : undefined}
            fixtureSource="Fixtures — 14-JORDANIAN-CONTENT-FIXTURES.md"
          />
        </div>
      </section>

      {/* السؤال 2: ماذا دخل وماذا خرج؟ */}
      <section className="screen__section" aria-labelledby="fin-flow-q">
        <header className="fin-question">
          <h2 id="fin-flow-q" className="type-section-title">
            {scenario.flow.question}
          </h2>
        </header>
        <RowGroup>
          {scenario.flow.rows.map((row) => (
            <OpenRow
              key={row.label}
              icon={row.label.startsWith('إيرادات') ? 'basket' : 'receipt'}
              title={row.label}
              supporting={row.detail || undefined}
              trailing={<MoneyValue money={row.value} size="list" />}
              chevron
              onClick={() => onNavigate('FIN-ACTIVITY')}
            />
          ))}
        </RowGroup>
        {scenario.flow.comparison ? (
          <div className={`fin-compare${scenario.flow.comparison.state === 'insufficient' ? ' is-insufficient' : ''}`}>
            {scenario.flow.comparison.state === 'insufficient' ? (
              <>
                <ContextTrace state="partial">{scenario.flow.comparison.text}</ContextTrace>
                <p className="type-supporting">{scenario.flow.comparison.detail}</p>
              </>
            ) : (
              <>
                <p className="fin-compare__text type-card-title">{scenario.flow.comparison.text}</p>
                <p className="type-supporting">{scenario.flow.comparison.detail}</p>
              </>
            )}
          </div>
        ) : null}
      </section>

      {/* السؤال 3: ما لي وما عليّ؟ */}
      <section className="screen__section" aria-labelledby="fin-debt-q">
        <header className="fin-question">
          <h2 id="fin-debt-q" className="type-section-title">
            {scenario.obligations.question}
          </h2>
        </header>
        <RowGroup>
          {scenario.obligations.forYou.clearState ? (
            <div className="fin-clear">
              <ContextTrace state="complete">{scenario.obligations.forYou.clearState}</ContextTrace>
            </div>
          ) : (
            <OpenRow
              icon="hand-coins"
              title={scenario.obligations.forYou.label}
              supporting={scenario.obligations.forYou.detail || undefined}
              trailing={<MoneyValue money={scenario.obligations.forYou.value} size="list" />}
              chevron={Boolean(scenario.obligations.forYou.view)}
              onClick={scenario.obligations.forYou.view ? () => onNavigate('REL-CUSTOMERS') : undefined}
            />
          )}
          <OpenRow
            icon="arrows-left-right"
            title={scenario.obligations.onYou.label}
            supporting={scenario.obligations.onYou.detail || undefined}
            trailing={<MoneyValue money={scenario.obligations.onYou.value} size="list" />}
            chevron={Boolean(scenario.obligations.onYou.view)}
            divider={false}
            onClick={scenario.obligations.onYou.view ? () => onNavigate('REL-SUPPLIERS') : undefined}
          />
        </RowGroup>
        <div className="fin-debt-truth">
          <TruthNote
            what="ديون لك: ما على العملاء من مبيعات آجلة مسجلة · ديون عليك: ما للموردين من مشتريات آجلة مسجلة"
            notWhat="صافي الدينين لا يعرض رقمًا واحدًا — الاتجاهان مفصولان (§13.6)"
            period={period}
            dataState={scenario.obligations.forYou.value.state === 'partial' ? 'partial' : scenario.obligations.forYou.value.value === null ? 'unknown' : 'complete'}
            stateText={
              scenario.obligations.forYou.value.state === 'partial'
                ? 'جزئية — رصيد بعض العملاء غير مسجل'
                : scenario.obligations.forYou.value.value === null
                  ? 'بحاجة للمراجعة — الربط غير مؤكد'
                  : undefined
            }
            fixtureSource="Fixtures — 14-JORDANIAN-CONTENT-FIXTURES.md"
          />
        </div>
      </section>

      {/* السؤالان 4 و5: النتيجة واكتمالها — دلالة مالية مع تفصيل حقيقي */}
      <ResultBlock result={scenario.result} flowRows={scenario.flow.rows} onNavigate={onNavigate} />

      <footer className="screen__foot">
        <ContextTrace state={isOffline ? 'offline' : scenario.result.state}>
          {isOffline
            ? 'قيم من آخر نسخة محفوظة — ستتحدث بعد الإرسال'
            : scenario.result.state === 'complete'
              ? 'بحسب جميع البيانات المسجلة خلال الفترة'
              : 'نتيجة غير مؤكدة — راجع بيان النزاهة أعلاه'}
        </ContextTrace>
        <span className="screen__fixtures-badge" title="بيانات عرض فقط">
          <Icon name="info" size={16} />
          <span className="type-supporting">Fixtures</span>
        </span>
      </footer>

      <AnchoredMenu
        open={periodMenuOpen}
        options={finOverview.periods.map((p) => ({ id: p, label: p }))}
        value={period}
        onSelect={setPeriod}
        onClose={() => setPeriodMenuOpen(false)}
        anchorLabel="اختيار الفترة"
      />
    </div>
  )
}
