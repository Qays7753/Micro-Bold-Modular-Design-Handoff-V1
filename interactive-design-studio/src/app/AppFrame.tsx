// Micro Visual System — AppFrame (GLB-SHELL)
// الحاضن: Header الموحد + المحتوى القابل للتمرير + الشريط السفلي.
// Edge-to-Edge: Canvas خلف شريط النظام، والتحول للأبيض عند التمرير
// (160–200ms). المستوى الثالث (مهمة مركزة) بلا شريط سفلي وشريط علوي
// سياقي بسيط داخل الشاشة نفسها (§11.10).

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AppHeader, AccountPanel } from '../navigation/AppHeader'
import { BottomNav } from '../navigation/BottomNav'
import { activeTabFor } from '../navigation/navModel'
import { ROUTES } from './routes'

export interface AppFrameProps {
  screenId: string
  onNavigate: (screenId: string) => void
  children: ReactNode
  badges?: Record<string, number | undefined>
}

export function AppFrame({ screenId, onNavigate, children, badges }: AppFrameProps) {
  const [scrolled, setScrolled] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const route = ROUTES[screenId]
  const isLevel3 = route?.level === 3
  const activeTab = activeTabFor(screenId)

  // عند تغيير الشاشة: تصفير التمرير (شاشة جديدة = بداية جديدة)
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
    setScrolled(false)
    setAccountOpen(false)
  }, [screenId])

  return (
    <div className="app-root">
      {!isLevel3 ? (
        <AppHeader
          scrolled={scrolled}
          accountOpen={accountOpen}
          onToggleAccount={() => setAccountOpen((v) => !v)}
          onAskMicro={() => undefined}
          onDelivery={() => undefined}
        />
      ) : (
        <div className="app-header app-header--task" />
      )}

      <AccountPanel open={accountOpen} onClose={() => setAccountOpen(false)} />

      <main
        ref={contentRef}
        className={`app-content${accountOpen ? ' is-dimmed' : ''}${isLevel3 ? ' is-task' : ''}`}
        onScroll={(e) => {
          const top = (e.target as HTMLDivElement).scrollTop
          setScrolled(top > 8)
        }}
      >
        <div key={screenId} className="anim-slide-in-rtl">
          {children}
        </div>
      </main>

      {!isLevel3 ? (
        <BottomNav activeTab={activeTab} onNavigate={onNavigate} badges={badges} />
      ) : null}
    </div>
  )
}
