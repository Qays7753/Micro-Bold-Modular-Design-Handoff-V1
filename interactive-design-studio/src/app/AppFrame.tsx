// Micro Visual System — AppFrame (GLB-SHELL) — مراجعة V2
// الحاضن: Header الموحد + المحتوى القابل للتمرير + الشريط السفلي.
// Edge-to-Edge: Canvas خلف شريط النظام، والتحول للأبيض عند التمرير
// (160–200ms). المستوى الثالث (مهمة مركزة) بلا شريط سفلي وشريط علوي
// سياقي بسيط داخل الشاشة نفسها (§11.10).
// V2 (18 §2): سحب مباشر بين الصفحات الرئيسية (§11.12) — المحتوى يتبع
// الإصبع، مقاومة عند الحواف بلا Loop، يُعطل مع الطبقات المفتوحة/النماذج
// المالية/البطاقات الأفقية؛ وإجراءات الهيدر ولوحة الحساب توصل لمسارات
// مؤجلة صادقة بدل نقر ميت.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AppHeader, AccountPanel } from '../navigation/AppHeader'
import { BottomNav } from '../navigation/BottomNav'
import { TABS, activeTabFor } from '../navigation/navModel'
import { ROUTES } from './routes'

export interface AppFrameProps {
  screenId: string
  onNavigate: (screenId: string) => void
  children: ReactNode
  badges?: Record<string, number | undefined>
}

const PAGE_SWIPE_THRESHOLD = 56

export function AppFrame({ screenId, onNavigate, children, badges }: AppFrameProps) {
  const [scrolled, setScrolled] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [dragX, setDragX] = useState<number | null>(null)
  // قيمة السحب في مرجع متزامن: قراءة pointerup تكون دائمًا الأخيرة (لا مُغلق قديم)
  const dragXRef = useRef<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const pagerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ startX: number; startY: number; locked: 'none' | 'x' | 'y'; enabled: boolean }>({
    startX: 0,
    startY: 0,
    locked: 'none',
    enabled: false,
  })
  const route = ROUTES[screenId]
  const isLevel3 = route?.level === 3 || route?.studioOnly === true
  const activeTab = activeTabFor(screenId)

  // عند تغيير الشاشة: تصفير التمرير (شاشة جديدة = بداية جديدة)
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
    setScrolled(false)
    setAccountOpen(false)
    setDragX(null)
    dragXRef.current = null
  }, [screenId])

  // ============ السحب بين الصفحات الرئيسية (§11.12) ============
  const tabIndex = TABS.findIndex((t) => t.id === activeTab)

  const swipeEnabled = () => {
    if (isLevel3 || accountOpen) return false
    if (route?.level !== 1) return false // الصفحات الرئيسية فقط
    // لا Swipe أثناء وجود طبقة منبثقة (§11.12: Sheets/Dialogs/Menus)
    if (document.querySelector('.app-root .overlay')) return false
    return true
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!swipeEnabled()) return
    const target = e.target as HTMLElement
    // مناطق تعطيل السحب: البطاقات الأفقية (تدير سحبها بنفسها) وأي عنصر
    // بتمرير أفقي داخلي (18 §2: لا اختطاف التمرير داخل بطاقة مالية)
    if (target.closest('[data-swipe-lock]')) return
    let el: HTMLElement | null = target
    while (el && el !== e.currentTarget) {
      if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== 'visible') return
      el = el.parentElement
    }
    dragState.current = { startX: e.clientX, startY: e.clientY, locked: 'none', enabled: true }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragState.current
    if (!st.enabled) return
    const dx = e.clientX - st.startX
    const dy = e.clientY - st.startY
    if (st.locked === 'none') {
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return
      st.locked = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y'
      if (st.locked === 'x') e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (st.locked !== 'x') return
    // مقاومة خفيفة عند أول وآخر تبويب — لا Loop (§11.12)
    const atEdge = (dx > 0 && tabIndex <= 0) || (dx < 0 && tabIndex >= TABS.length - 1)
    const value = atEdge ? dx * 0.3 : dx
    dragXRef.current = value
    setDragX(value)
  }

  const endPageDrag = () => {
    const st = dragState.current
    const dx = dragXRef.current ?? 0
    dragXRef.current = null
    st.enabled = false
    st.locked = 'none'
    setDragX(null)
    if (Math.abs(dx) < PAGE_SWIPE_THRESHOLD) return
    // المحتوى يتبع الإصبع (§11.12): سحب يسارًا يحرك يسارًا نحو التبويب التالي
    const next = tabIndex + (dx < 0 ? 1 : -1)
    if (next < 0 || next > TABS.length - 1) return
    onNavigate(TABS[next].rootScreen)
  }

  const translate = dragX === null ? 0 : Math.round(dragX)
  const dragging = dragX !== null

  return (
    <div className="app-root">
      {!isLevel3 ? (
        <AppHeader
          scrolled={scrolled}
          accountOpen={accountOpen}
          onToggleAccount={() => setAccountOpen((v) => !v)}
          onAskMicro={() => onNavigate('GLB-ASK')}
          onDelivery={() => onNavigate('GLB-DELIVERY')}
        />
      ) : (
        <div className="app-header app-header--task" />
      )}

      <AccountPanel
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        onNavigate={(target) => {
          setAccountOpen(false)
          onNavigate(target)
        }}
      />

      <main
        ref={contentRef}
        className={`app-content${accountOpen ? ' is-dimmed' : ''}${isLevel3 ? ' is-task' : ''}`}
        onScroll={(e) => {
          const top = (e.target as HTMLDivElement).scrollTop
          setScrolled(top > 8)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPageDrag}
        onPointerCancel={endPageDrag}
      >
        <div
          key={screenId}
          ref={pagerRef}
          className={`app-content__pager anim-slide-in-rtl${dragging ? ' is-dragging' : ''}`}
          style={dragging ? { transform: `translateX(${translate}px)` } : undefined}
        >
          {children}
        </div>
      </main>

      {!isLevel3 ? (
        <BottomNav activeTab={activeTab} onNavigate={onNavigate} badges={badges} />
      ) : null}
    </div>
  )
}
