// Micro Visual System — Bottom Navigation (§11.2 + 18 §1.6)
// شريط مدمج مع الحافة السفلية، خلفية بيضاء، Divider علوي خفيف، أدنى 70px
// فوق Safe Area — يتكيف ارتفاعه مع تكبير النص كي لا تُقص التسميات العربية.
// التبويبات الخمسة متساوية بلا زر مركزي. الاختيار: أيقونة Fill + تسمية
// SemiBold + لون Action + العلامة الرباعية للهوية (§11.2) — لا لونًا وحده.
// Badge لعدد واضح فقط بحد 99+.

import { TABS } from '../navigation/navModel'
import { Icon } from '../components/icons/Icon'

export interface BottomNavProps {
  activeTab: string
  onNavigate: (screenId: string) => void
  badges?: Record<string, number | undefined>
}

/** العلامة الرباعية المرشحة (GAP-002) — إشارة اختيار خاصة بالهوية (§11.2). */
function MicroQuadMark() {
  return (
    <span className="micro-quad" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
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
                  {selected ? <MicroQuadMark /> : null}
                </span>
                <span className="bottom-nav__label">{tab.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
