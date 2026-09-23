// Micro Visual System — Icon component
// المرجع §9: Phosphor أساسًا، Regular افتراضيًا وFill للمحدد؛ لا يوضع كل
// أيقونة داخل دائرة/مربع؛ الأيقونة لا تختصر مساحة اللمس (تُضبط في CSS).
// الأصل: assets/icons (MIT) — السجل المولد: phosphor.generated.ts

import { PHOSPHOR_REGULAR, PHOSPHOR_FILL } from './phosphor.generated'

export type IconName = keyof typeof PHOSPHOR_REGULAR | keyof typeof PHOSPHOR_FILL

export interface IconProps {
  name: IconName
  variant?: 'regular' | 'fill'
  size?: number
  /** تسهيل الوصول: الأيقونة المنفردة تحمل تسمية (§9/§16.4) */
  alt?: string
  decorative?: boolean
}

export function Icon({ name, variant = 'regular', size = 22, alt, decorative = true }: IconProps) {
  const bank = variant === 'fill' ? PHOSPHOR_FILL : PHOSPHOR_REGULAR
  const inner = bank[name as string] ?? PHOSPHOR_REGULAR[name as string] ?? ''
  const label = decorative && !alt ? undefined : (alt ?? String(name))
  return (
    <svg
      className="icon"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden={decorative && !alt ? true : undefined}
      role={label ? 'img' : undefined}
      focusable="false"
    >
      {label ? <title>{label}</title> : null}
      <g dangerouslySetInnerHTML={{ __html: inner }} />
    </svg>
  )
}
