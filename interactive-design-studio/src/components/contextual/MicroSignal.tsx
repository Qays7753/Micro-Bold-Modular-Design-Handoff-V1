// Micro Visual System — Micro Signal (§10.4)
// علامة رباعية تظهر مع نص الحالة. هذه نسخة «مرشحة» (Candidate) — الأصل
// النهائي مربوط بمراجعة الشعار (GAP-002 في CONFLICT-AND-GAP-LOG) ولا يُسمى
// أصلًا معتمدًا. الوحدات الأربع: مكتمل/جزئي/قيد التنفيذ/غير معروف/مسودة/
// خطأ/محفوظ محليًا.

export type SignalState =
  | 'complete'
  | 'partial'
  | 'in-progress'
  | 'unknown'
  | 'draft'
  | 'error'
  | 'local-saved'

export interface MicroSignalProps {
  state: SignalState
  size?: 'sm' | 'md'
  /** التسمية القابلة للوصول — تُعلن حالة الإشارة لقارئ الشاشة (§16.4) */
  label?: string
  animated?: boolean
}

export function MicroSignal({ state, size = 'sm', label, animated = false }: MicroSignalProps) {
  const unitCount = 4
  return (
    <span
      className={`micro-signal is-${state} micro-signal--${size}`}
      role="img"
      aria-label={label ?? `إشارة حالة: ${state}`}
    >
      <span className="micro-signal__units" aria-hidden="true">
        {Array.from({ length: unitCount }, (_, i) => (
          <i
            key={i}
            className={[
              'micro-signal__unit',
              `u${i + 1}`,
              animated && state === 'in-progress' && i === 0 ? 'anim-wait' : '',
              animated && state === 'complete' ? 'anim-signal-unit' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={animated && state === 'complete' ? { animationDelay: `${i * 50}ms` } : undefined}
          />
        ))}
        {state === 'error' ? (
          <span className="micro-signal__x" aria-hidden="true">
            ×
          </span>
        ) : null}
      </span>
    </span>
  )
}

/** نص الحالة المعتمد المرافق للإشارة (§10.4: تظهر مع نص الحالة). */
export const SIGNAL_STATE_TEXT: Record<SignalState, string> = {
  complete: 'مكتمل',
  partial: 'جزئي',
  'in-progress': 'قيد التنفيذ',
  unknown: 'غير معروف',
  draft: 'مسودة',
  error: 'خطأ',
  'local-saved': 'محفوظ محليًا',
}

/** خريطة الحالة الدلالية إلى حالة إشارة (§§13.20، 14). */
export function dataStateToSignal(state: string): SignalState {
  switch (state) {
    case 'complete':
      return 'complete'
    case 'partial':
    case 'estimated':
      return 'partial'
    case 'insufficient':
    case 'not-recorded':
    case 'cannot-compute':
      return 'unknown'
    case 'error':
      return 'error'
    case 'offline':
    case 'local-saved':
    case 'pending-send':
      return 'local-saved'
    case 'loading':
    case 'recovery':
      return 'in-progress'
    default:
      return 'unknown'
  }
}
