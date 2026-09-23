// Micro Visual System — Contextual patterns (§14)
// ContextTrace / ContextSeam / SystemRibbon / RecoveryStage / EmptyState / Insight
// الحالات تحولات داخل بنية الواجهة تظهر من مصدرها (Anchor → Reveal → Recover)،
// وليست Alerts أو Cards جاهزة. عنصر واحد عالي الحضور في مساحة العرض.

import type { ReactNode } from 'react'
import { MicroSignal, dataStateToSignal } from './MicroSignal'
import { Icon, type IconName } from '../icons/Icon'
import { Button } from '../core/Button'
import type { EmptyKind, InsightLevel } from '../../states/types'

/** أثر نصي صغير ملاصق للمعلومة (§14.2) — سياق هادئ بلا حاوية. */
export function ContextTrace({ children, state }: { children: ReactNode; state?: string }) {
  return (
    <span className="context-trace type-supporting">
      {state ? <MicroSignal state={dataStateToSignal(state)} size="sm" /> : null}
      <span>{children}</span>
    </span>
  )
}

/** طبقة سياقية تمتد داخل القسم بين محتويين (§14.2) — لا تطفو كبطاقة. */
export function ContextSeam({
  children,
  tone = 'neutral',
  action,
  onAction,
}: {
  children: ReactNode
  tone?: 'neutral' | 'warning' | 'info' | 'partial' | 'local'
  action?: string
  onAction?: () => void
}) {
  return (
    <div className={`context-seam context-seam--${tone}`} role="note">
      <div className="context-seam__content">{children}</div>
      {action && onAction ? (
        <button type="button" className="link-action" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  )
}

/** شريط النظام العام أسفل المنطقة العلوية (§14.2/§14.7) — Offline وأخواته. */
export function SystemRibbon({
  text,
  detail,
  action,
  onAction,
  icon = 'wifi-slash',
}: {
  text: string
  detail?: string
  action?: string
  onAction?: () => void
  icon?: IconName
}) {
  return (
    <div className="system-ribbon" role="status" aria-live="polite">
      <Icon name={icon} size={18} />
      <span className="system-ribbon__text type-supporting">
        {text}
        {detail ? <span className="system-ribbon__detail"> — {detail}</span> : null}
      </span>
      {action && onAction ? (
        <button type="button" className="system-ribbon__action" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  )
}

/** استبدال المنطقة المتعطلة فقط مع إبقاء بنية الصفحة الصالحة (§14.2/§14.6). */
export function RecoveryStage({
  title,
  body,
  action,
  onAction,
  lastSync,
}: {
  title: string
  body: string
  action: string
  onAction: () => void
  lastSync?: string
}) {
  return (
    <div className="recovery-stage" role="alert">
      <div className="recovery-stage__signal">
        <MicroSignal state="error" size="md" label="تعثر تحديث هذه المنطقة" />
      </div>
      <h4 className="type-card-title">{title}</h4>
      <p className="type-supporting">{body}</p>
      {lastSync ? <ContextTrace state="offline">{lastSync}</ContextTrace> : null}
      <div className="recovery-stage__action">
        <Button role="secondary" size="compact" icon="arrow-right" onClick={onAction}>
          {action}
        </Button>
      </div>
    </div>
  )
}

const EMPTY_CONTENT: Record<EmptyKind, { icon: IconName; hint: string; showAction: boolean }> = {
  'first-move': { icon: 'basket', hint: 'دعوة قرب موضع أول محتوى', showAction: true },
  continuation: { icon: 'check', hint: 'قسم مستخدم بلا عناصر حاليًا', showAction: false },
  'search-reset': { icon: 'magnifying-glass', hint: 'بحث أو فلترة بلا نتائج', showAction: true },
  'period-gap': { icon: 'calendar-blank', hint: 'الفترة المختارة بلا بيانات', showAction: true },
  'clear-state': { icon: 'check', hint: 'حالة إيجابية هادئة', showAction: false },
}

/** أنماط الفراغ الخمسة (§14.3) — في مكان المحتوى المتوقع لا بطاقة عامة. */
export function EmptyState({
  kind,
  title,
  body,
  action,
  onAction,
}: {
  kind: EmptyKind
  title: string
  body?: string
  action?: string
  onAction?: () => void
}) {
  const meta = EMPTY_CONTENT[kind]
  return (
    <div className={`empty-state empty-state--${kind}`} role="note">
      <MicroSignal state="complete" size="md" label={meta.hint} />
      <h4 className="type-card-title">{title}</h4>
      {body ? <p className="type-supporting">{body}</p> : null}
      {kind === 'search-reset' ? (
        <button type="button" className="link-action" onClick={onAction}>
          مسح الفلاتر
        </button>
      ) : null}
      {kind === 'first-move' && action && onAction ? (
        <Button role="primary" size="compact" icon="plus" onClick={onAction}>
          {action}
        </Button>
      ) : null}
      {kind === 'period-gap' && action && onAction ? (
        <button type="button" className="link-action" onClick={onAction}>
          {action}
        </button>
      ) : null}
    </div>
  )
}

const INSIGHT_TONE: Record<InsightLevel, string> = {
  opportunity: 'opportunity',
  attention: 'warning',
  'action-now': 'warning',
  'missing-data': 'partial',
  clear: 'neutral',
}

/** «الأهم الآن» (§13.19) — Evidence → Action: خلاصة، دليل، اكتمال، إجراء واحد. */
export function Insight({
  level,
  category,
  title,
  evidence,
  completeness,
  action,
  onAction,
}: {
  level: InsightLevel
  category: string
  title: string
  evidence: string
  completeness: string
  action: string
  onAction?: () => void
}) {
  if (level === 'clear') {
    return <ContextTrace>لا توجد أمور تحتاج إجراءً الآن</ContextTrace>
  }
  return (
    <section className={`insight insight--${INSIGHT_TONE[level]}`} aria-labelledby="insight-title">
      <div className="insight__head">
        <MicroSignal state={dataStateToSignal(level === 'missing-data' ? 'partial' : 'complete')} size="sm" />
        <span className="insight__category type-supporting">{category}</span>
      </div>
      <h3 id="insight-title" className="insight__title type-card-title">
        {title}
      </h3>
      <p className="insight__evidence type-supporting">{evidence}</p>
      <p className="insight__completeness type-supporting">اكتمال البيانات: {completeness}</p>
      <div className="insight__action">
        <Button role="primary" size="compact" icon="arrow-right" onClick={onAction} trailingArrow>
          {action}
        </Button>
      </div>
    </section>
  )
}
