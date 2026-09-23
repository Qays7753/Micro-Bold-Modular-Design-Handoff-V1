# TOKEN-DICTIONARY — قاموس Tokens (V2)

**المرجع الأعلى للألوان:** `17-COLOR-DECISION-2026-09-23.md` (يعتمد #D97757 هوية قائدة من المالك؛ بقية القيم خط أساس تنفيذي مفوض). بقية القرارات: `MICRO-VISUAL-DESIGN-DECISIONS-V1.md` §§6–7، 10–12، 15–16، 21.2.
**ملف القيم الحقيقي:** `src/foundations/tokens.css` — هذا التوثيق مولّد منه آليًا بواسطة `scripts/export-tokens.mjs` (خارج المستودع) لضمان التطابق.
**الوضع:** Light Mode فقط — لا Dark Tokens ولا Hex داخل المكونات.
**قيم مشتقة وموثقة:** `#C4663F` (عمق هوية، غير نصي)، `#8F3B27` (مضغوط Action)، `#E4EAEC` (سطح ثانٍ)، `#8A959C` (نص معطل)، `#A6AEB4` (زخرفي) — من 17 §2 «Derived and documented by ZAI».
**دور Local (دون اتصال) = دور Information** `#305968/#DFEDF1` لأنه حالة نظام لا حالة جودة بيانات — موثق في REVISION-COVERAGE-LEDGER.md.
**تكبير النص:** `--text-scale` (1/1.5/2) تتحكم به طبقة المراجعة لأحجام الخطوط فقط — محاكاة تكبير النص على الجهاز (§16.5) مع ثبات مقاييس التخطيط.

## Core Tokens: Color Primitives (17-COLOR-DECISION §2)

| Token | القيمة |
|---|---|
| `--p-ink` | `#1d2930` |
| `--p-ink-2` | `#53616a` |
| `--p-ink-disabled` | `#8a959c` |
| `--p-muted` | `#a6aeb4` |
| `--p-canvas` | `#f0f3f4` |
| `--p-white` | `#ffffff` |
| `--p-surface-2` | `#e4eaec` |
| `--p-brand` | `#d97757` |
| `--p-brand-deep` | `#c4663f` |
| `--p-brand-soft` | `#fbe9e2` |
| `--p-action` | `#a94630` |
| `--p-action-pressed` | `#8f3b27` |
| `--p-on-action` | `#ffffff` |
| `--p-info` | `#305968` |
| `--p-info-surface` | `#dfedf1` |
| `--p-success` | `#16765a` |
| `--p-success-surface` | `#dff3e9` |
| `--p-attention` | `#95590c` |
| `--p-attention-surface` | `#fff0d7` |
| `--p-danger` | `#b0324f` |
| `--p-danger-surface` | `#ffe7eb` |
| `--p-partial` | `#5b6770` |
| `--p-partial-surface` | `#edf1f2` |
| `--p-unknown` | `#5b6770` |
| `--p-unknown-surface` | `#edf1f2` |
| `--p-local` | `#305968` |
| `--p-local-surface` | `#dfedf1` |
| `--p-boundary` | `#78868d` |
| `--p-border` | `#dce3e5` |
| `--p-overlay` | `rgba(29, 41, 48, 0.55)` |
| `--p-chart-current` | `#305968` |
| `--p-chart-prior` | `#5b6770` |

## Core Tokens: Typography (§7) — قيم داخل النطاقات المعتمدة

| Token | القيمة |
|---|---|
| `--text-scale` | `1` |
| `--type-hero` | `calc(30px * var(--text-scale))` |
| `--type-screen-title` | `calc(24px * var(--text-scale))` |
| `--type-section-title` | `calc(19px * var(--text-scale))` |
| `--type-card-title` | `calc(16px * var(--text-scale))` |
| `--type-body` | `calc(15px * var(--text-scale))` |
| `--type-supporting` | `calc(13px * var(--text-scale))` |
| `--type-button` | `calc(16px * var(--text-scale))` |
| `--type-money-hero` | `calc(34px * var(--text-scale))` |
| `--type-money-list` | `calc(16px * var(--text-scale))` |
| `--type-nav` | `calc(12px * var(--text-scale))` |
| `--leading-tight` | `1.25` |
| `--leading-snug` | `1.4` |
| `--leading-normal` | `1.6` |
| `--weight-regular` | `400` |
| `--weight-medium` | `500` |
| `--weight-semibold` | `600` |
| `--weight-bold` | `700` |

## Core Tokens: Spacing (§10.2)

| Token | القيمة |
|---|---|
| `--space-inset-xs` | `8px` |
| `--space-inset-sm` | `10px` |
| `--space-inset-md` | `12px` |
| `--space-card-gap` | `14px` |
| `--space-section-gap` | `28px` |
| `--space-screen` | `18px` |
| `--space-2` | `4px` |
| `--space-3` | `6px` |
| `--space-4` | `8px` |
| `--space-5` | `10px` |
| `--space-6` | `12px` |
| `--space-8` | `16px` |
| `--space-10` | `20px` |
| `--space-12` | `24px` |
| `--space-16` | `32px` |

## Core Tokens: Radius (§6)

| Token | القيمة |
|---|---|
| `--radius-card-lg` | `22px` |
| `--radius-card-md` | `16px` |
| `--radius-card-sm` | `14px` |
| `--radius-button` | `16px` |
| `--radius-field` | `14px` |
| `--radius-segmented` | `12px` |
| `--radius-filter` | `12px` |
| `--radius-menu` | `16px` |
| `--radius-sheet` | `24px` |
| `--radius-dialog` | `20px` |

## Core Tokens: Stroke / Elevation

| Token | القيمة |
|---|---|
| `--stroke-hairline` | `1px` |
| `--stroke-focus` | `2px` |
| `--elevation-layer` | `0 10px 30px rgba(29, 41, 48, 0.12)` |
| `--elevation-menu` | `0 4px 14px rgba(29, 41, 48, 0.1)` |

## Core Tokens: Motion (§§10.4، 11.13، 15.1، 16.6)

| Token | القيمة |
|---|---|
| `--motion-press` | `100ms` |
| `--motion-local` | `150ms` |
| `--motion-expand` | `200ms` |
| `--motion-screen` | `280ms` |
| `--motion-result` | `280ms` |
| `--motion-sheet` | `240ms` |
| `--motion-dialog` | `190ms` |
| `--motion-dropdown` | `200ms` |
| `--motion-selection` | `160ms` |
| `--motion-crossfade` | `180ms` |
| `--motion-reduced` | `120ms` |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

## Core Tokens: Icon Sizes (§9)

| Token | القيمة |
|---|---|
| `--icon-nav` | `24px` |
| `--icon-action` | `22px` |
| `--icon-row` | `22px` |
| `--icon-inline` | `20px` |
| `--icon-small` | `18px` |
| `--icon-empty` | `56px` |

## Core Tokens: Touch / Structure (§§10.1، 11.2، 11.8، 12.3)

| Token | القيمة |
|---|---|
| `--size-touch` | `44px` |
| `--size-touch-lg` | `48px` |
| `--size-button` | `48px` |
| `--size-button-compact` | `44px` |
| `--size-field` | `54px` |
| `--size-row` | `56px` |
| `--size-row-tx` | `68px` |
| `--size-tabbar` | `70px` |
| `--size-header` | `56px` |

## Semantic Tokens (17-COLOR-DECISION §2)

| Token | القيمة |
|---|---|
| `--c-canvas` | `var(--p-canvas)` |
| `--c-surface` | `var(--p-white)` |
| `--c-surface-2` | `var(--p-surface-2)` |
| `--c-ink` | `var(--p-ink)` |
| `--c-ink-2` | `var(--p-ink-2)` |
| `--c-ink-disabled` | `var(--p-ink-disabled)` |
| `--c-muted` | `var(--p-muted)` |
| `--c-brand` | `var(--p-brand)` |
| `--c-brand-deep` | `var(--p-brand-deep)` |
| `--c-brand-soft` | `var(--p-brand-soft)` |
| `--c-on-brand` | `var(--p-ink)` |
| `--c-action` | `var(--p-action)` |
| `--c-action-pressed` | `var(--p-action-pressed)` |
| `--c-on-action` | `var(--p-on-action)` |
| `--c-selection` | `var(--p-action)` |
| `--c-focus` | `var(--p-info)` |
| `--c-focus-ring` | `var(--p-info-surface)` |
| `--c-border` | `var(--p-border)` |
| `--c-boundary` | `var(--p-boundary)` |
| `--c-overlay` | `var(--p-overlay)` |
| `--c-info` | `var(--p-info)` |
| `--c-info-surface` | `var(--p-info-surface)` |
| `--c-success` | `var(--p-success)` |
| `--c-success-surface` | `var(--p-success-surface)` |
| `--c-attention` | `var(--p-attention)` |
| `--c-attention-surface` | `var(--p-attention-surface)` |
| `--c-danger` | `var(--p-danger)` |
| `--c-danger-surface` | `var(--p-danger-surface)` |
| `--c-partial` | `var(--p-partial)` |
| `--c-partial-surface` | `var(--p-partial-surface)` |
| `--c-unknown` | `var(--p-unknown)` |
| `--c-unknown-surface` | `var(--p-unknown-surface)` |
| `--c-local` | `var(--p-local)` |
| `--c-local-surface` | `var(--p-local-surface)` |

## Component Tokens — حاجة حقيقية فقط (§21.2)

| Token | القيمة |
|---|---|
| `--nav-selected-ink` | `var(--c-selection)` |
| `--btn-primary-bg` | `var(--c-action)` |
| `--btn-primary-ink` | `var(--c-on-action)` |
| `--btn-primary-pressed` | `var(--c-action-pressed)` |
| `--btn-secondary-bg` | `var(--c-surface)` |
| `--btn-secondary-ink` | `var(--c-ink)` |
| `--field-bg` | `var(--c-surface)` |
| `--field-boundary` | `var(--c-boundary)` |
| `--field-boundary-focus` | `var(--c-focus)` |
| `--signal-unit` | `7px` |
| `--signal-gap` | `3px` |
| `--signal-radius` | `2.5px` |
| `--signal-unit-lg` | `9px` |
| `--signal-gap-lg` | `4px` |

## طبقات Z (ترتيب الطبقات فقط، لا هوية)

| Token | القيمة |
|---|---|
| `--z-content` | `1` |
| `--z-ribbon` | `20` |
| `--z-header` | `30` |
| `--z-nav` | `40` |
| `--z-scrim` | `50` |
| `--z-sheet` | `60` |
| `--z-dialog` | `70` |
| `--z-studio-drawer` | `90` |

