// Micro Visual System — Studio Chrome: أداة المراجعة (03-SPEC) — مراجعة V2
// شريط تحكم ودرج معلومات وإطار هاتف — «أدوات اختيار الحالات والأحجام
// للمراجعة لا تصبح تلقائيًا عناصر في واجهة مستخدم Micro» (§21.2).
// V2 (18 §1.7): الشريط مدمج — الشاشة والحالة ظاهران دائمًا، وأدوات العرض
// (العرض/التكبير/الرمادي/الحركة) خلف زر ملخص قابل للطي كي لا يهيمن كروم
// المراجعة على دليل المراجعة. كروم الاستوديو بلون Information الداكن —
// منفصل بصريًا ودلاليًا عن واجهة Micro وموسوم بذلك في كل مكان.

import { useState } from 'react'
import type { ReactNode } from 'react'
import { ROUTES, type ScreenRoute } from '../app/routes'
import { Icon } from '../components/icons/Icon'
import { MicroSignal } from '../components/contextual/MicroSignal'
import { FIXTURE_DISCLAIMER, ovrNow, finOverview, sale } from '../fixtures'
import type { StudioParams, WidthOption, ZoomOption } from './urlState'
import { navigateTo } from './urlState'

export interface ReviewControlsProps {
  params: StudioParams
  currentRoute: ScreenRoute | undefined
}

const WIDTHS: WidthOption[] = ['320', '360', '390', '412', 'full']
const ZOOMS: ZoomOption[] = ['100', '150', '200']

export function ReviewControls({ params, currentRoute }: ReviewControlsProps) {
  const [toolsOpen, setToolsOpen] = useState(false)
  const set = (p: Partial<StudioParams>) => navigateTo(p)
  const scenarios = currentRoute?.scenarios ?? []
  const switcherRoutes = Object.values(ROUTES).filter((r) => !r.hideFromSwitcher)

  return (
    <div className="studio-controls" role="toolbar" aria-label="أدوات مراجعة الاستوديو — ليست جزءًا من واجهة Micro">
      <div className="studio-controls__group">
        <span className="studio-controls__label">الشاشة</span>
        <div className="studio-chip-row">
          {switcherRoutes.map((r) => (
            <button
              key={r.screenId}
              type="button"
              className={`studio-chip${r.screenId === params.screenId ? ' is-active' : ''}${r.status === 'deferred' ? ' is-deferred' : ''}${r.studioOnly ? ' is-studio' : ''}`}
              onClick={() => set({ screenId: r.screenId, state: r.scenarios[0]?.id ?? 'complete' })}
              aria-pressed={r.screenId === params.screenId}
            >
              <span className="ltr">{r.screenId}</span>
              {r.status === 'deferred' ? <span className="studio-chip__tag">مؤجلة</span> : null}
              {r.studioOnly ? <span className="studio-chip__tag">استوديو</span> : null}
            </button>
          ))}
        </div>
      </div>

      {scenarios.length > 0 ? (
        <div className="studio-controls__group">
          <span className="studio-controls__label">الحالة</span>
          <div className="studio-chip-row">
            {scenarios.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`studio-chip${s.id === params.state ? ' is-active' : ''}`}
                onClick={() => set({ state: s.id })}
                aria-pressed={s.id === params.state}
                title={s.description}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="studio-controls__group">
        <span className="studio-controls__label">أدوات العرض</span>
        <div className="studio-bar__summary-row">
          <button
            type="button"
            className="studio-toggle"
            aria-expanded={toolsOpen}
            onClick={() => setToolsOpen((v) => !v)}
          >
            <Icon name="sliders-horizontal" size={16} />
            <span>
              <span className="studio-toggle__value ltr">{params.w === 'full' ? 'متجاوب' : params.w}</span>
              {' · '}
              <span className="studio-toggle__value ltr">{params.z}%</span>
              {params.gray ? ' · رمادي' : ''}
              {params.rm ? ' · حركة مخفضة' : ''}
            </span>
            <Icon name={toolsOpen ? 'caret-up' : 'caret-down'} size={16} />
          </button>
        </div>
        {toolsOpen ? (
          <div className="anim-crossfade" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4) var(--space-10)' }}>
            <div className="studio-controls__group">
              <span className="studio-controls__label">العرض</span>
              <div className="studio-chip-row">
                {WIDTHS.map((w) => (
                  <button
                    key={w}
                    type="button"
                    className={`studio-chip${params.w === w ? ' is-active' : ''}`}
                    onClick={() => set({ w })}
                    aria-pressed={params.w === w}
                  >
                    {w === 'full' ? 'متجاوب' : <span className="ltr">{w}</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="studio-controls__group">
              <span className="studio-controls__label">تكبير النص</span>
              <div className="studio-chip-row">
                {ZOOMS.map((z) => (
                  <button
                    key={z}
                    type="button"
                    className={`studio-chip${params.z === z ? ' is-active' : ''}`}
                    onClick={() => set({ z })}
                    aria-pressed={params.z === z}
                  >
                    <span className="ltr">{z}%</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="studio-controls__group">
              <span className="studio-controls__label">فحوص بصرية</span>
              <div className="studio-chip-row">
                <button
                  type="button"
                  className={`studio-chip${params.gray ? ' is-active' : ''}`}
                  onClick={() => set({ gray: !params.gray })}
                  aria-pressed={params.gray}
                  title="Color Removal Test (§16.7): تبقى الهرمية واضحة دون اللون"
                >
                  رمادي (Grayscale)
                </button>
                <button
                  type="button"
                  className={`studio-chip${params.rm ? ' is-active' : ''}`}
                  onClick={() => set({ rm: !params.rm })}
                  aria-pressed={params.rm}
                  title="محاكاة Reduced Motion (§16.6)"
                >
                  حركة مخفضة
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function ScreenInfoDrawer({
  open,
  onClose,
  route,
  params,
}: {
  open: boolean
  onClose: () => void
  route: ScreenRoute | undefined
  params: StudioParams
}) {
  if (!open || !route) return null
  const fixtureFile =
    route.screenId === 'OVR-NOW' || route.screenId === 'OVR-SNAPSHOT-ALL'
      ? 'ovr-now.json'
      : route.screenId === 'FIN-OVERVIEW'
        ? 'fin-overview.json'
        : route.screenId === 'OPS-SALE-CREATE'
          ? 'ops-sale-create.json'
          : '—'
  const scenarioCount = route.scenarios.length

  return (
    <aside className="studio-drawer" role="dialog" aria-label="معلومات الشاشة" aria-modal="false">
      <header className="studio-drawer__head">
        <h3>معلومات الشاشة</h3>
        <button type="button" onClick={onClose} aria-label="إغلاق درج المعلومات">
          <Icon name="x" size={20} />
        </button>
      </header>
      <div className="studio-drawer__body">
        <dl className="studio-drawer__defs">
          <div>
            <dt>Screen ID</dt>
            <dd className="ltr">{route.screenId}</dd>
          </div>
          <div>
            <dt>العنوان</dt>
            <dd>{route.title}</dd>
          </div>
          <div>
            <dt>المجال / المستوى</dt>
            <dd>
              <span className="ltr">{route.domain}</span> · مستوى {route.level}
            </dd>
          </div>
          <div>
            <dt>حالة التنفيذ</dt>
            <dd>
              {route.studioOnly
                ? 'Studio QA — مساحة مراجعة مكوّنات داخل الاستوديو (ليست شاشة منتج)'
                : route.status === 'built'
                  ? 'اللغة المرئية معتمدة — التحقق على الجهاز لاحقًا'
                  : 'Not Started — Deferred'}
            </dd>
          </div>
          <div>
            <dt>مراجع القرار</dt>
            <dd className="ltr">{route.decisionRefs}</dd>
          </div>
          <div>
            <dt>صف التغطية</dt>
            <dd className="ltr">{route.coverageRow}</dd>
          </div>
          <div>
            <dt>ملف Fixtures</dt>
            <dd className="ltr">fixtures/{fixtureFile}</dd>
          </div>
          <div>
            <dt>الحالات المنفذة</dt>
            <dd>{scenarioCount > 0 ? `${scenarioCount} حالات مراجعة (انظر مبدّل الحالة)` : 'لا حالات — مؤجلة'}</dd>
          </div>
          <div>
            <dt>الرابط العميق الحالي</dt>
            <dd className="ltr">{`#/${params.screenId}?state=${params.state}`}</dd>
          </div>
        </dl>
        {route.entryNote ? <p className="studio-drawer__note type-supporting">{route.entryNote}</p> : null}
        <p className="studio-drawer__fixtures type-supporting">{FIXTURE_DISCLAIMER}</p>
      </div>
    </aside>
  )
}

export function StudioStatusBar() {
  return (
    <div className="device-statusbar" role="presentation">
      <span className="device-statusbar__time ltr">2:35 م</span>
      <span className="device-statusbar__icons" aria-hidden="true">
        <Icon name="wifi-high" size={14} />
        <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M112 32h32a8 8 0 0 1 8 8v120h32a8 8 0 0 1 0 16h-40a8 8 0 0 1-8-8V48h-16v120a8 8 0 0 1-8 8H64a8 8 0 0 1 0-16h40V40a8 8 0 0 1 8-8Z" />
        </svg>
      </span>
    </div>
  )
}

export function StudioFrameCaption() {
  return (
    <p className="device-caption type-supporting">
      شريط النظام محاكاة عرض داخل المتصفح — ليس اختبار تكامل أصلي (UNVERIFIED على الجهاز الفعلي).
    </p>
  )
}

export function StudioBar({
  onToggleInfo,
  infoOpen,
  children,
}: {
  onToggleInfo: () => void
  infoOpen: boolean
  children: ReactNode
}) {
  const [aboutOpen, setAboutOpen] = useState(false)
  return (
    <header className="studio-bar">
      <div className="studio-bar__row">
        <div className="studio-bar__identity">
          <MicroQuadStudio />
          <div>
            <h1 className="studio-bar__title">Micro Visual System — V2</h1>
            <p className="studio-bar__sub">Interactive Design Reference Studio · الألوان والتكوين: 17/18/19-2026-09-23</p>
          </div>
        </div>
        <div className="studio-bar__tools">
          <button type="button" className={`studio-chip${infoOpen ? ' is-active' : ''}`} onClick={onToggleInfo} aria-pressed={infoOpen}>
            معلومات الشاشة
          </button>
          <button type="button" className="studio-chip" onClick={() => setAboutOpen((v) => !v)} aria-pressed={aboutOpen}>
            عن الاستوديو
          </button>
        </div>
      </div>
      <p className="studio-bar__chrome-note type-supporting">
        <Icon name="info" size={16} /> شريط الأدوات أعلاه هو Studio Chrome لأغراض المراجعة — ليس جزءًا من واجهة Micro.{' '}
        <MicroSignal state="complete" size="sm" /> الحالة: <strong>Visual V2 approved — device QA pending</strong>
      </p>
      {aboutOpen ? (
        <div className="studio-about anim-crossfade">
          <p className="type-supporting">
            استوديو مرجعي مستقل لتصميم Micro يُشغَّل من مصدره داخل مستودع الـHandoff. بيانات العرض (Fixtures) موسومة
            ومصدرها <span className="ltr">JORDANIAN-FIXTURES.md</span>؛ لا يوجد اتصال بأي API أو بيانات حقيقية،
            ولا كود من تطبيق Micro الإنتاجي. الفحوص هنا فحوص متصفح داخل بيئة التنفيذ؛ اختبار Android فعلي وقارئ الشاشة
            ومستخدمون أردنيون <strong>UNVERIFIED</strong> حتى إجرائها.
          </p>
          <p className="type-supporting">
            حالات OVR-NOW: {Object.keys(ovrNow.scenarios).length} · FIN-OVERVIEW: {Object.keys(finOverview.scenarios).length} ·
            OPS-SALE-CREATE: {Object.keys(sale.scenarios).length} — كلها عبر مبدّل الحالة أعلاه أو الروابط العميقة، مع
            مساحة مراجعة المكوّنات <span className="ltr">STUDIO-COMPONENTS</span>.
          </p>
        </div>
      ) : null}
      {children}
    </header>
  )
}

function MicroQuadStudio() {
  return (
    <span className="micro-quad micro-quad--studio" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}
