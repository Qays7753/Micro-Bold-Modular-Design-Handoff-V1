// Micro Visual System — App root — مراجعة V2
// يربط: طبقة المراجعة (Studio Chrome) + إطار التطبيق (GLB-SHELL) + الشاشات.
// الحالة في الـHash (روابط عميقة قابلة للمشاركة). Light Mode فقط. RTL أصلي.
// V2 (18 §2): تبديل السيناريو يعيد تركيب الشاشة (key) فيُعاد ضبط النموذج
// حتميًا بلا تسرب قيم أو رسائل من سيناريو سابق — مع بقاء التعديلات حية
// ما دام السيناريو نفسه نشطًا.

import { useEffect, useState } from 'react'
import { AppFrame } from './app/AppFrame'
import { ROUTES } from './app/routes'
import { OvrNow } from './screens/OvrNow'
import { OpsSaleCreate } from './screens/OpsSaleCreate'
import { FinOverview } from './screens/FinOverview'
import { OvrSnapshotAll } from './screens/OvrSnapshotAll'
import { DeferredScreen } from './screens/DeferredScreen'
import { StudioComponents } from './studio/StudioComponents'
import { StudioBar, ReviewControls, ScreenInfoDrawer, StudioStatusBar, StudioFrameCaption } from './studio/StudioShell'
import { parseHash, onHashChange, navigateTo, DEFAULT_PARAMS, type StudioParams } from './studio/urlState'
import { ovrNow, finOverview, sale } from './fixtures'
import { Icon } from './components/icons/Icon'

export default function App() {
  const [params, setParams] = useState<StudioParams>(() => parseHash(window.location.hash))
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => onHashChange(setParams), [])

  const route = params.screenId ? ROUTES[params.screenId] : undefined
  const onNavigate = (screenId: string) => {
    const target = ROUTES[screenId]
    navigateTo({ screenId, state: target?.scenarios[0]?.id ?? params.state })
  }

  const zoomScale = params.z === '200' ? '2' : params.z === '150' ? '1.5' : '1'
  const frameWidth = params.w === 'full' ? undefined : `${params.w}px`

  const renderScreen = () => {
    if (!params.screenId) return <StudioHome />
    if (!route) return <StudioHome />
    if (route.status === 'deferred') {
      return <DeferredScreen key={`deferred-${params.screenId}`} route={route} onNavigate={onNavigate} />
    }
    switch (route.screenId) {
      case 'OVR-NOW':
        return (
          <OvrNow
            key={`ovr-${params.state}`}
            scenario={ovrNow.scenarios[params.state] ?? ovrNow.scenarios.complete}
            scenarioId={params.state in ovrNow.scenarios ? params.state : 'complete'}
            onNavigate={onNavigate}
          />
        )
      case 'OVR-SNAPSHOT-ALL':
        return (
          <OvrSnapshotAll
            key={`snapall-${params.state}`}
            scenario={ovrNow.scenarios[params.state] ?? ovrNow.scenarios.complete}
            scenarioId={params.state in ovrNow.scenarios ? params.state : 'complete'}
            onBack={() => onNavigate('OVR-NOW')}
          />
        )
      case 'OPS-SALE-CREATE':
        return (
          <OpsSaleCreate
            key={`sale-${params.state}`}
            scenario={sale.scenarios[params.state] ?? sale.scenarios.empty}
            scenarioId={params.state in sale.scenarios ? params.state : 'empty'}
            onExit={() => onNavigate('OPS-HOME')}
            onNavigate={onNavigate}
          />
        )
      case 'FIN-OVERVIEW':
        return (
          <FinOverview
            key={`fin-${params.state}`}
            scenario={finOverview.scenarios[params.state] ?? finOverview.scenarios.complete}
            scenarioId={params.state in finOverview.scenarios ? params.state : 'complete'}
            onNavigate={onNavigate}
          />
        )
      case 'STUDIO-COMPONENTS':
        return <StudioComponents key="studio-components" />
      default:
        return <StudioHome />
    }
  }

  return (
    <div className="studio" data-gray={params.gray ? '1' : undefined}>
      <StudioBar onToggleInfo={() => setInfoOpen((v) => !v)} infoOpen={infoOpen}>
        <ReviewControls params={params} currentRoute={route} />
      </StudioBar>

      <main className="studio-stage">
        <div
          className={`device-frame${params.w === 'full' ? ' device-frame--full' : ''}`}
          style={frameWidth ? ({ '--frame-w': frameWidth } as React.CSSProperties) : undefined}
        >
          <StudioStatusBar />
          <div
            className="app-viewport"
            data-motion={params.rm ? 'reduced' : 'normal'}
            data-text-scale={params.z}
            style={{ '--text-scale': zoomScale } as React.CSSProperties}
          >
            <AppFrame screenId={params.screenId} onNavigate={onNavigate} badges={{ ops: 3 }}>
              {renderScreen()}
            </AppFrame>
          </div>
        </div>
        <StudioFrameCaption />
      </main>

      <ScreenInfoDrawer open={infoOpen} onClose={() => setInfoOpen(false)} route={route} params={params} />
    </div>
  )
}

function StudioHome() {
  return (
    <div className="screen screen--home" data-screen="STUDIO-HOME">
      <header className="screen__head">
        <h1 className="type-screen-title">استوديو مرجع التصميم التفاعلي</h1>
        <p className="type-supporting">Micro Visual System — V2 · مراجعة الألوان والتكوين 2026-09-23</p>
      </header>
      <section className="home-intro">
        <p className="type-body">
          هذا استوديو مرجعي مستقل قابل للتشغيل من المصدر داخل مستودع الـHandoff. كل القيم بيانات عرض (Fixtures) موسومة
          بمصدرها، وكل شاشة مرتبطة بـScreen ID وقراراتها. استخدم شريط الأدوات أعلاه لتبديل الشاشة والحالة والعرض والتكبير
          وفحص الرمادي والحركة المخفضة، أو افتح الروابط أدناه.
        </p>
        <ul className="home-links">
          {Object.values(ROUTES)
            .filter((r) => r.status === 'built' && !r.studioOnly)
            .map((r) => (
              <li key={r.screenId}>
                <button type="button" className="home-link" onClick={() => navigateTo({ screenId: r.screenId, state: r.scenarios[0]?.id ?? DEFAULT_PARAMS.state })}>
                  <span className="home-link__id ltr">{r.screenId}</span>
                  <span className="home-link__title">{r.title}</span>
                  <span className="home-link__meta type-supporting">
                    {r.scenarios.length} حالة مراجعة · {r.domain}
                  </span>
                  <Icon name="caret-left" size={20} />
                </button>
              </li>
            ))}
        </ul>
        <p className="type-supporting">
          بقية الشاشات <strong>Not Started — Deferred pending owner review</strong> وفق بوابة العينات في ملف{' '}
          <span className="ltr">16-EXECUTION-STAGES-AND-PROOF-GATES.md</span>، وتظهر كبطاقات توثيق عند اختيارها من مبدّل
          الشاشة أو النقر على إجراءاتها داخل الواجهة.
        </p>
      </section>
    </div>
  )
}
