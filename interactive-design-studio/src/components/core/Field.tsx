// Micro Visual System — Core: Fields (§12.3/§12.4)
// عنوان ثابت + إدخال + توضيح/خطأ. ارتفاع 54، نصف قطر 14، حد 1px.
// Focus: حد Indigo بحلقة Soft بلا تغيير حجم. الخطأ: حد Danger + أيقونة +
// رسالة محددة أسفل الحقل بلا خلفية حمراء. المبلغ: أرقام LTR و«د.أ» في
// الطرف المقابل، ولا تنسيق آلاف أثناء الكتابة.

import { useId } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../icons/Icon'

export interface FieldBaseProps {
  label: string
  hint?: string
  error?: string
  optional?: boolean
  children: (ids: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode
}

export function FieldShell({ label, hint, error, optional = false, children }: FieldBaseProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional ? <span className="field__optional"> (اختياري)</span> : null}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={errorId}>
          <Icon name="warning-circle" size={16} />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

export interface TextFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  error?: string
  optional?: boolean
  /** حقول الرقم/الهاتف/المعرف تعزل LTR (§12.4/§16.2) */
  ltr?: boolean
  icon?: 'search' | 'phone'
  type?: 'text' | 'tel' | 'number'
  inputMode?: 'text' | 'tel' | 'numeric' | 'decimal'
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  optional,
  ltr = false,
  icon,
  type = 'text',
  inputMode,
}: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} optional={optional}>
      {({ id, describedBy, invalid }) => (
        <div className="field__box">
          {icon === 'search' ? <Icon name="magnifying-glass" size={20} /> : null}
          {icon === 'phone' ? <Icon name="phone" size={20} /> : null}
          <input
            id={id}
            className={`field__input${ltr ? ' ltr' : ''}`}
            type={type}
            inputMode={inputMode}
            value={value}
            placeholder={placeholder}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            dir={ltr ? 'ltr' : undefined}
          />
          {value ? (
            <button type="button" className="field__clear" aria-label="مسح القيمة" onClick={() => onChange('')}>
              <Icon name="x" size={18} />
            </button>
          ) : null}
        </div>
      )}
    </FieldShell>
  )
}

export interface AmountFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
  error?: string
  /** بيانات قراءة فقط عند قيمة غير قابلة للإدخال */
  readOnly?: boolean
}

export function AmountField({ label, value, onChange, hint, error, readOnly = false }: AmountFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error}>
      {({ id, describedBy, invalid }) => (
        <div className="field__box field__box--amount">
          <input
            id={id}
            className="field__input ltr field__input--amount"
            type="text"
            inputMode="decimal"
            value={value}
            placeholder="0.00"
            readOnly={readOnly}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            onChange={(e) => {
              // أرقام إنجليزية فقط + فاصلة عشرية، بلا تنسيق آلاف أثناء الكتابة (§12.4)
              const v = e.target.value.replace(/[^\d.]/g, '')
              onChange(v)
            }}
            dir="ltr"
          />
          <span className="field__unit" aria-hidden="true">
            د.أ
          </span>
        </div>
      )}
    </FieldShell>
  )
}
