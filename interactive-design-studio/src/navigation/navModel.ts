// Micro Visual System — Navigation model (§11)
// خمسة تبويبات V1: مشروعي الآن، العمل، المالية، أدواتي، السوق — بهذا
// الترتيب من اليمين في RTL. لا تبويب سادس ولا CTA عائم. أيقونات Phosphor
// المعتمدة لكل تبويب (§11.3). حالة كل قسم تربط الشاشة الهدف بمجالها
// لا بترتيب التبويب (§21.3).

import type { IconName } from '../components/icons/Icon'

export interface TabDef {
  id: string
  /** التسمية الظاهرة — عربية */
  label: string
  icon: IconName
  /** الشاشة الجذر للقسم */
  rootScreen: string
  /** حالة التنفيذ داخل الاستوديو لهذه الجولة */
  studioStatus: 'built' | 'deferred'
}

export const TABS: ReadonlyArray<TabDef> = [
  { id: 'ovr', label: 'مشروعي الآن', icon: 'gauge', rootScreen: 'OVR-NOW', studioStatus: 'built' },
  { id: 'ops', label: 'العمل', icon: 'briefcase', rootScreen: 'OPS-HOME', studioStatus: 'deferred' },
  { id: 'fin', label: 'المالية', icon: 'wallet', rootScreen: 'FIN-OVERVIEW', studioStatus: 'built' },
  { id: 'tools', label: 'أدواتي', icon: 'toolbox', rootScreen: 'TOOL-HOME', studioStatus: 'deferred' },
  { id: 'market', label: 'السوق', icon: 'storefront', rootScreen: 'MKT-HOME', studioStatus: 'deferred' },
]

/** خريطة الشاشة → التبويب النشط (§21.3: معرف مستقل عن موقع التنقل). */
export const SCREEN_TO_TAB: Record<string, string> = {
  'OVR-NOW': 'ovr',
  'OVR-SNAPSHOT-ALL': 'ovr',
  'OPS-HOME': 'ops',
  'OPS-SALE-CREATE': 'ops',
  'OPS-EXPENSE-CREATE': 'ops',
  'FIN-OVERVIEW': 'fin',
  'FIN-ACTIVITY': 'fin',
  'FIN-TRANSACTION-DETAIL': 'fin',
  'FIN-WALLETS': 'fin',
  'FIN-TRANSFER': 'fin',
  'REL-CUSTOMERS': 'fin',
  'REL-SUPPLIERS': 'fin',
  'TOOL-HOME': 'tools',
  'MKT-HOME': 'market',
}

export function activeTabFor(screenId: string): string {
  return SCREEN_TO_TAB[screenId] ?? 'ovr'
}
