// Micro Visual System — Core: Overlay layers (§10.6/§11.13)
// Sheet: يدخل من الأسفل، سطح أبيض، نصف قطر علوي 24، العنوان يمينًا
// والإغلاق يسارًا، Footer ثابت عند وجود قرار. Dialog: قرار فقط، عرض
// 88–92%، نصف قطر 20، أفعال صريحة لا «نعم/لا». لا Sheet فوق Sheet.
// النجاح يغلق الطبقة ثم يظهر الأثر في الشاشة؛ الخطأ يبقيها ويحفظ المدخلات.

import { useEffect, useRef, type ReactNode } from 'react'
import { IconButton } from './Button'

export interface SheetProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  /** إغلاق بالسحب/الخارج مسموح فقط عند أمان فقد البيانات (§10.6) */
  dismissible?: boolean
}

export function Sheet({ open, title, onClose, children, footer, dismissible = true }: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, dismissible])

  if (!open) return null

  return (
    <div className="overlay" role="presentation">
      <div
        className="overlay__scrim"
        onClick={() => {
          if (dismissible) onClose()
        }}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="sheet anim-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="sheet__head">
          <h3 className="sheet__title type-card-title">{title}</h3>
          <button ref={closeRef} type="button" className="sheet__close" onClick={onClose} aria-label="إغلاق">
            <svg viewBox="0 0 256 256" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128 47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z" />
            </svg>
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer ? <div className="sheet__footer">{footer}</div> : null}
      </div>
    </div>
  )
}

export interface DialogProps {
  open: boolean
  title: string
  body: string
  /** إجراءان صريحان: آمن/إلغاء + الفعل الحاسم (§15.6) */
  primaryAction: { label: string; onAction: () => void; destructive?: boolean }
  secondaryAction?: { label: string; onAction: () => void }
  onClose: () => void
}

export function Dialog({ open, title, body, primaryAction, secondaryAction, onClose }: DialogProps) {
  const primaryRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    primaryRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="overlay" role="presentation">
      <div className="overlay__scrim" onClick={onClose} aria-hidden="true" />
      <div className="dialog anim-dialog-scale" role="alertdialog" aria-modal="true" aria-label={title}>
        <h3 className="dialog__title type-card-title">{title}</h3>
        <p className="dialog__body type-body">{body}</p>
        <div className="dialog__actions">
          {secondaryAction ? (
            <button
              type="button"
              className="dialog__action dialog__action--secondary"
              onClick={secondaryAction.onAction}
            >
              {secondaryAction.label}
            </button>
          ) : null}
          <button
            ref={primaryRef}
            type="button"
            className={`dialog__action dialog__action--primary${
              primaryAction.destructive ? ' is-destructive' : ''
            }`}
            onClick={primaryAction.onAction}
          >
            {primaryAction.label}
          </button>
        </div>
      </div>
    </div>
  )
}

/** قائمة سياقية صغيرة مرتبطة بمصدرها (§10.6 Menus) — تنفتح من مصدرها. */
export function AnchoredMenu<T extends string>({
  open,
  options,
  value,
  onSelect,
  onClose,
  anchorLabel,
}: {
  open: boolean
  options: ReadonlyArray<{ id: T; label: string }>
  value: T
  onSelect: (id: T) => void
  onClose: () => void
  anchorLabel: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="overlay overlay--menu" role="presentation">
      <div className="overlay__scrim overlay__scrim--light" onClick={onClose} aria-hidden="true" />
      <div className="anchored-menu" role="listbox" aria-label={anchorLabel}>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="option"
            aria-selected={opt.id === value}
            className={`anchored-menu__item${opt.id === value ? ' is-selected' : ''}`}
            onClick={() => {
              onSelect(opt.id)
              onClose()
            }}
          >
            <span>{opt.label}</span>
            {opt.id === value ? <IconButton icon="check" variant="fill" ariaLabel="محدد" size={20} /> : null}
          </button>
        ))}
      </div>
    </div>
  )
}
