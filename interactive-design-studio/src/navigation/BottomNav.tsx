// Micro Visual System — Bottom Navigation (§11.1/§11.2)
// شريط مدمج مع الحافة السفلية، خلفية بيضاء، Divider علوي خفيف، ارتفاع 70px
// فوق Safe Area. التبويبات الخمسة متساوية بلا زر مركزي. الأيقونة النشطة
// Fill بلون Indigo + تسمية SemiBold + علامة Micro الرباعية (مرشحة). الحالة
// لا تعتمد على اللون وحدها. Badge لعدد واضح فقط بحد 99+.

import { TABS } from '../navigation/navModel'
import { Icon } from '../components/icons/Icon'
import { MicroSignal } from '../components/contextual/MicroSignal'

export interface BottomNavProps {
  activeTab: string
  onNavigate: (screenId: string) => void
  badges?: Record<string, number | undefined>
}

export function BottomNav({ activeTab, onNavigate, badges = {} }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="التنقل الرئيسي">
      <ul className="bottom-nav__list">
        {TABS.map((tab) => {
          const selected = tab.id === activeTab
          const badge = badges[tab.id]
          return (
            <li key={tab.id} className="bottom-nav__item">
              <button
                type="button"
                className={`bottom-nav__target${selected ? ' is-selected' : ''}`}
                aria-current={selected ? 'page' : undefined}
                aria-label={
                  badge
                    ? `${tab.label}${selected ? '، محدد' : ''}، ${badge > 99 ? 'أكثر من 99' : `${badge}`} عناصر بحاجة للمراجعة`
                    : undefined
                }
                onClick={() => onNavigate(tab.rootScreen)}
              >
                <span className="bottom-nav__icon">
                  <Icon name={tab.icon} variant={selected ? 'fill' : 'regular'} size={24} />
                  {badge ? (
                    <span className="bottom-nav__badge" aria-hidden="true">
                      {badge > 99 ? '99+' : badge}
                    </span>
                  ) : null}
                </span>
                <span className="bottom-nav__label">{tab.label}</span>
                {selected ? (
                  <MicroSignal state="complete" size="sm" label="محدد" aria-hidden={undefined} />
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
