// Micro Visual System — Global top area + Header-Connected Account Panel
// (§§11.7–11.9). لا اسم صفحة ولا شعار في الأعلى. يمينًا: زر الحساب
// UserCircleGear؛ يسارًا: «التوصيل» و«اسأل Micro» بعلامة Micro الرباعية
// المرشحة. Edge-to-Edge: يمتد Canvas خلف شريط الحالة، والارتفاع 56px فوق
// Safe Area، وعند التمرير يتحول للأبيض مع Divider خفيف (160–200ms).
// لوحة الحساب امتداد للمنطقة العلوية: زوايا سفلية 24px فقط، عرض كامل.

import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/icons/Icon'
import { MicroSignal } from '../components/contextual/MicroSignal'
import { OpenRow } from '../components/core/OpenRow'
import { Dialog } from '../components/core/Overlays'
import { shop } from '../fixtures'
import type { ShopFixture } from '../fixtures/types'

/** العلامة الرباعية المرشحة لـ«اسأل Micro» (GAP-002) — ليست أصلًا معتمدًا. */
function MicroQuadMark({ size = 20 }: { size?: number }) {
  return (
    <span className="micro-quad" role="img" aria-label="علامة Micro الرباعية (أصل مرشح)">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

export interface AppHeaderProps {
  scrolled: boolean
  accountOpen: boolean
  onToggleAccount: () => void
  onAskMicro?: () => void
  onDelivery?: () => void
}

export function AppHeader({ scrolled, accountOpen, onToggleAccount, onAskMicro, onDelivery }: AppHeaderProps) {
  return (
    <header className={`app-header${scrolled ? ' is-scrolled' : ''}${accountOpen ? ' is-panel-open' : ''}`}>
      <div className="app-header__row">
        <button
          type="button"
          className={`app-header__account${accountOpen ? ' is-open' : ''}`}
          onClick={onToggleAccount}
          aria-label="الحساب وإعدادات النظام"
          aria-expanded={accountOpen}
        >
          <Icon name="user-circle-gear" size={26} />
        </button>
        <div className="app-header__actions">
          <button type="button" className="app-header__text-action" onClick={onDelivery}>
            <Icon name="truck" size={20} />
            <span className="type-supporting">التوصيل</span>
          </button>
          <button type="button" className="app-header__text-action app-header__ask" onClick={onAskMicro}>
            <MicroQuadMark size={18} />
            <span className="type-supporting">اسأل Micro</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function AccountPanel({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean
  onClose: () => void
  onNavigate: (screenId: string) => void
}) {
  const [logoutOpen, setLogoutOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const project = shop.project as ShopFixture['project']
  const incomplete = project.accountState !== 'complete'

  return (
    <>
      <div className="overlay overlay--account" role="presentation">
        <div className="overlay__scrim" onClick={onClose} aria-hidden="true" />
        <div ref={panelRef} className="account-panel anim-sheet" role="dialog" aria-modal="true" aria-label="الحساب وإعدادات النظام">
          <div className="account-panel__identity">
            <h3 className="type-card-title">{project.name}</h3>
            {project.activityType ? (
              <p className="type-supporting">{project.activityType}</p>
            ) : (
              <p className="type-supporting">{project.accountMissing}</p>
            )}
            <span className="account-panel__signal">
              <MicroSignal state={incomplete ? 'partial' : 'complete'} size="sm" />
              <span className="type-supporting">{incomplete ? 'بيانات المشروع غير مكتملة' : 'بيانات المشروع مكتملة'}</span>
            </span>
            {incomplete ? (
              <button type="button" className="account-panel__complete link-action" onClick={() => onNavigate('GLB-PROJECT')}>
                {project.accountAction}
              </button>
            ) : null}
          </div>

          <div className="account-panel__menu">
            <OpenRow icon="user-circle" title="حسابي" supporting="الاسم والهاتف وكلمة المرور" chevron divider={false} onClick={() => onNavigate('GLB-ACCOUNT')} />
            <OpenRow icon="storefront" title="بيانات المشروع" supporting={incomplete ? 'غير مكتملة' : 'مكتملة'} chevron divider={false} onClick={() => onNavigate('GLB-PROJECT')} />
            <OpenRow icon="sliders-horizontal" title="إعدادات النظام" supporting="اللغة والإشعارات والنسخ الاحتياطي" chevron divider={false} onClick={() => onNavigate('GLB-SETTINGS')} />
          </div>

          <div className="account-panel__logout">
            <button type="button" className="account-panel__logout-btn" onClick={() => setLogoutOpen(true)}>
              <Icon name="sign-out" size={22} />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={logoutOpen}
        title="تسجيل الخروج من المشروع؟"
        body="ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى بيانات مشروعك على هذا الهاتف."
        primaryAction={{ label: 'تسجيل الخروج', onAction: () => setLogoutOpen(false), destructive: true }}
        secondaryAction={{ label: 'البقاء في الحساب', onAction: () => setLogoutOpen(false) }}
        onClose={() => setLogoutOpen(false)}
      />
    </>
  )
}
