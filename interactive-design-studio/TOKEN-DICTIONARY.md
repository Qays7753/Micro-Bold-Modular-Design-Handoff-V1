# TOKEN-DICTIONARY — قاموس Tokens (V1)

> **Old generated dictionary:** القيم أدناه تصف الإصدار السابق ولا تشكل سلطة ألوان. يعيد ZAI التوليد من كود جديد وفق `../17-COLOR-DECISION-2026-09-23.md`.

**المصدر الأعلى:** `MICRO-VISUAL-DESIGN-DECISIONS-V1.md` §§6–8، 10–12، 15–16، 21.2.
**ملف القيم الحقيقي:** `src/foundations/tokens.css` — هذا التوثيق مولّد منه آليًا بواسطة `scripts/export-tokens.mjs` (خارج المستودع) لضمان التطابق.
**الوضع:** Light Mode فقط — لا Dark Tokens ولا Hex داخل المكونات.
**تكبير النص:** `--text-scale` (1/1.5/2) تتحكم به طبقة المراجعة لأحجام الخطوط فقط — محاكاة تكبير النص على الجهاز (§16.5) مع ثبات مقاييس التخطيط.

## Core Tokens: Color Primitives (§8)

| Token | القيمة |
|---|---|
| `--p-ink` | `#171923` |
| `--p-canvas` | `#f4f6fa` |
| `--p-white` | `#ffffff` |
| `--p-surface-2` | `#eef1f7` |
| `--p-indigo` | `#4f46e5` |
| `--p-indigo-pressed` | `#3f37c9` |
| `--p-indigo-soft` | `#e8e7ff` |
| `--p-citrus` | `#d9f43b` |
| `--p-citrus-soft` | `#f3fbcb` |
| `--p-terracotta` | `#c45f46` |
| `--p-terracotta-soft` | `#f7e4de` |
| `--p-text-2` | `#5e6472` |
| `--p-text-disabled` | `#7d8596` |
| `--p-muted` | `#9aa1ae` |
| `--p-border` | `#d8dde8` |
| `--p-boundary` | `#7a8292` |
| `--p-soft-blue` | `#dfe9ff` |
| `--p-soft-lavender` | `#ece7ff` |
| `--p-soft-mint` | `#dff5e7` |
| `--p-success` | `#137a55` |
| `--p-success-surface` | `#dcf4e8` |
| `--p-warning` | `#a65a00` |
| `--p-warning-surface` | `#fff0d6` |
| `--p-danger` | `#c2354b` |
| `--p-danger-surface` | `#fde5e9` |
| `--p-info` | `#1d64d8` |
| `--p-info-surface` | `#e0ecff` |
| `--p-partial` | `#6e5aa8` |
| `--p-partial-surface` | `#eee9fa` |
| `--p-unknown` | `#697386` |
| `--p-unknown-surface` | `#eef0f4` |
| `--p-local` | `#52657a` |
| `--p-local-surface` | `#e7edf3` |
| `--p-overlay` | `rgba(15, 17, 23, 0.55)` |
| `--p-chart-1` | `#4f46e5` |
| `--p-chart-2` | `#008c8c` |
| `--p-chart-3` | `#d97706` |
| `--p-chart-4` | `#b83b75` |
| `--p-chart-5` | `#657c25` |

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
| `--elevation-layer` | `0 10px 30px rgba(23, 25, 35, 0.12)` |
| `--elevation-menu` | `0 4px 14px rgba(23, 25, 35, 0.1)` |

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

## Semantic Tokens (§8 + §16.3)

| Token | القيمة |
|---|---|
| `--c-canvas` | `var(--p-canvas)` |
| `--c-surface` | `var(--p-white)` |
| `--c-surface-2` | `var(--p-surface-2)` |
| `--c-ink` | `var(--p-ink)` |
| `--c-ink-2` | `var(--p-text-2)` |
| `--c-ink-disabled` | `var(--p-text-disabled)` |
| `--c-muted` | `var(--p-muted)` |
| `--c-primary` | `var(--p-indigo)` |
| `--c-primary-pressed` | `var(--p-indigo-pressed)` |
| `--c-primary-soft` | `var(--p-indigo-soft)` |
| `--c-on-primary` | `var(--p-white)` |
| `--c-accent` | `var(--p-citrus)` |
| `--c-accent-soft` | `var(--p-citrus-soft)` |
| `--c-on-accent` | `var(--p-ink)` |
| `--c-warm` | `var(--p-terracotta)` |
| `--c-warm-soft` | `var(--p-terracotta-soft)` |
| `--c-border` | `var(--p-border)` |
| `--c-boundary` | `var(--p-boundary)` |
| `--c-overlay` | `var(--p-overlay)` |
| `--c-focus` | `var(--p-indigo)` |
| `--c-focus-on-primary` | `var(--p-citrus)` |
| `--c-success` | `var(--p-success)` |
| `--c-success-surface` | `var(--p-success-surface)` |
| `--c-warning` | `var(--p-warning)` |
| `--c-warning-surface` | `var(--p-warning-surface)` |
| `--c-danger` | `var(--p-danger)` |
| `--c-danger-surface` | `var(--p-danger-surface)` |
| `--c-info` | `var(--p-info)` |
| `--c-info-surface` | `var(--p-info-surface)` |
| `--c-partial` | `var(--p-partial)` |
| `--c-partial-surface` | `var(--p-partial-surface)` |
| `--c-unknown` | `var(--p-unknown)` |
| `--c-unknown-surface` | `var(--p-unknown-surface)` |
| `--c-local` | `var(--p-local)` |
| `--c-local-surface` | `var(--p-local-surface)` |
| `--c-soft-blue` | `var(--p-soft-blue)` |
| `--c-soft-lavender` | `var(--p-soft-lavender)` |
| `--c-soft-mint` | `var(--p-soft-mint)` |

## Component Tokens — حاجة حقيقية فقط (§21.2)

| Token | القيمة |
|---|---|
| `--nav-selected-surface` | `transparent` |
| `--nav-selected-ink` | `var(--c-primary)` |
| `--btn-primary-bg` | `var(--c-primary)` |
| `--btn-primary-ink` | `var(--c-on-primary)` |
| `--btn-secondary-bg` | `var(--c-surface)` |
| `--btn-secondary-ink` | `var(--c-ink)` |
| `--field-bg` | `var(--c-surface)` |
| `--field-boundary` | `var(--c-border)` |
| `--field-boundary-focus` | `var(--c-primary)` |
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
