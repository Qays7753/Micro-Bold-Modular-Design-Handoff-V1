// Micro Visual System — Core: Buttons (§10.1)
// Primary/Accent/Secondary/Tertiary/Destructive/IconOnly. ارتفاع 48 (مضغوط 44)،
// نصف قطر 16، أيقونة قبل النص من جهة اليمين في RTL والسهم في الطرف المقابل.
// تسمية «فعل + مفعول». حالة Loading تحافظ على الهندسة وتمنع التكرار.
// Citrus لا يُستخدم لتأكيد مالي (Accent لغير الحساس فقط).

import type { ReactNode } from 'react'
import { Icon, type IconName } from '../icons/Icon'
import { MicroSignal } from '../contextual/MicroSignal'

export type ButtonRole = 'primary' | 'accent' | 'secondary' | 'tertiary' | 'destructive'
export type ButtonState = 'default' | 'pressed' | 'focused' | 'loading' | 'disabled' | 'success' | 'error-recovery'

export interface ButtonProps {
  role?: ButtonRole
  state?: ButtonState
  size?: 'regular' | 'compact'
  icon?: IconName
  /** سهم اتجاهي في الطرف المقابل (§10.1) */
  trailingArrow?: boolean
  loadingLabel?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  children: ReactNode
  ariaLabel?: string
  fullWidth?: boolean
}

export function Button({
  role = 'primary',
  state = 'default',
  size = 'regular',
  icon,
  trailingArrow = false,
  loadingLabel,
  onClick,
  type = 'button',
  children,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const cl = [
    'btn',
    `btn--${role}`,
    `btn--${size}`,
    fullWidth ? 'btn--block' : '',
    state === 'loading' ? 'is-loading' : '',
    state === 'success' ? 'is-success' : '',
    state === 'error-recovery' ? 'is-error-recovery' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const disabled = state === 'disabled' || state === 'loading'
  const isFinancialConfirm = role === 'primary' || role === 'destructive'

  return (
    <button
      type={type}
      className={cl}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={state === 'loading' || undefined}
    >
      {state === 'loading' ? (
        <>
          <MicroSignal state="in-progress" animated size="sm" label={loadingLabel ?? 'جارٍ التنفيذ'} />
          <span className="btn__label">{loadingLabel ?? children}</span>
        </>
      ) : (
        <>
          {icon ? <Icon name={icon} size={size === 'compact' ? 20 : 22} /> : null}
          <span className="btn__label">{children}</span>
          {trailingArrow ? <Icon name="caret-left" size={size === 'compact' ? 18 : 20} /> : null}
          {state === 'success' ? <MicroSignal state="complete" size="sm" label="تم" /> : null}
        </>
      )}
      {/* Citrus محجوز Accent لغير المالي — يُفرض في CSS أيضًا */}
      <span className="sr-only" hidden={isFinancialConfirm ? true : undefined} />
    </button>
  )
}

export interface IconButtonProps {
  icon: IconName
  variant?: 'regular' | 'fill'
  /** إجراء مفهوم عالميًا يحتاج تسمية وصول (§9) */
  ariaLabel: string
  onClick?: () => void
  active?: boolean
  size?: number
  state?: ButtonState
}

export function IconButton({ icon, variant = 'regular', ariaLabel, onClick, active = false, size = 22, state = 'default' }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`icon-btn${active ? ' is-active' : ''}${state === 'disabled' ? ' is-disabled' : ''}`}
      onClick={onClick}
      disabled={state === 'disabled'}
      aria-label={ariaLabel}
      aria-pressed={active || undefined}
    >
      <Icon name={icon} variant={variant} size={size} alt={ariaLabel} decorative={false} />
    </button>
  )
}
