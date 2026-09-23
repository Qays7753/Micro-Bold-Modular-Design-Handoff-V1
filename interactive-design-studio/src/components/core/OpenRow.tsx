// Micro Visual System — Core: OpenRow (§10.2)
// الصف المفتوح: أيقونة/علامة يمينًا، العنوان والمساند في الوسط، القيمة أو
// الحالة أو السهم يسارًا. ارتفاع أدنى 56px، Divider داخلي، لا بطاقة لكل صف.
// الصف كامل قابل للنقر عندما له وجهة واحدة.

import type { ReactNode } from 'react'
import { Icon, type IconName } from '../icons/Icon'

export interface OpenRowProps {
  icon?: IconName
  iconVariant?: 'regular' | 'fill'
  title: ReactNode
  supporting?: ReactNode
  trailing?: ReactNode
  chevron?: boolean
  onClick?: () => void
  ariaLabel?: string
  divider?: boolean
  state?: 'default' | 'unavailable'
}

export function OpenRow({
  icon,
  iconVariant = 'regular',
  title,
  supporting,
  trailing,
  chevron = false,
  onClick,
  ariaLabel,
  divider = true,
  state = 'default',
}: OpenRowProps) {
  const clickable = Boolean(onClick)
  return (
    <div className={`open-row${divider ? ' has-divider' : ''}${state === 'unavailable' ? ' is-unavailable' : ''}`}>
      <button
        type="button"
        className="open-row__target"
        onClick={onClick}
        disabled={!clickable || state === 'unavailable'}
        aria-label={ariaLabel}
      >
        {icon ? (
          <span className="open-row__icon">
            <Icon name={icon} variant={iconVariant} size={22} />
          </span>
        ) : null}
        <span className="open-row__body">
          <span className="open-row__title">{title}</span>
          {supporting ? <span className="open-row__supporting">{supporting}</span> : null}
        </span>
        <span className="open-row__trailing">
          {trailing}
          {chevron ? <Icon name="caret-left" size={20} /> : null}
        </span>
      </button>
    </div>
  )
}

/** حاوية صفوف مفتوحة تحت حد خارجي واحد وفواصل داخلية (§10.2). */
export function RowGroup({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <section className="row-group" aria-label={label}>
      {children}
    </section>
  )
}
