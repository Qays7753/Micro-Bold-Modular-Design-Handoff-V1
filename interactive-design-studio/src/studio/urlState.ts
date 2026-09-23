// Micro Visual System — Studio URL state (hash router)
// روابط عميقة قابلة للمشاركة داخل الاستوديو:
// #/OVR-NOW?state=partial&w=320&z=150&gray=1&rm=1
// التوجيه Hash-based ليعمل من أي خادم ثابت ومن file:// دون إعداد.

export type WidthOption = '320' | '360' | '390' | '412' | 'full'
export type ZoomOption = '100' | '150' | '200'

export interface StudioParams {
  screenId: string
  state: string
  w: WidthOption
  z: ZoomOption
  gray: boolean
  rm: boolean
}

export const DEFAULT_PARAMS: StudioParams = {
  screenId: '',
  state: 'complete',
  w: '360',
  z: '100',
  gray: false,
  rm: false,
}

export function parseHash(hash: string): StudioParams {
  const raw = hash.replace(/^#/, '')
  if (!raw || raw === '/') return { ...DEFAULT_PARAMS }
  const [path, query = ''] = raw.split('?')
  const screenId = path.replace(/^\//, '').split('/')[0] ?? ''
  const params = new URLSearchParams(query)
  const w = (params.get('w') ?? '360') as WidthOption
  const z = (params.get('z') ?? '100') as ZoomOption
  return {
    screenId,
    state: params.get('state') ?? 'complete',
    w: ['320', '360', '390', '412', 'full'].includes(w) ? w : '360',
    z: ['100', '150', '200'].includes(z) ? z : '100',
    gray: params.get('gray') === '1',
    rm: params.get('rm') === '1',
  }
}

export function buildHash(p: Partial<StudioParams>): string {
  const merged = { ...DEFAULT_PARAMS, ...p }
  const screenId = merged.screenId || ''
  const query = new URLSearchParams()
  if (screenId) {
    query.set('state', merged.state)
    query.set('w', merged.w)
    if (merged.z !== '100') query.set('z', merged.z)
    if (merged.gray) query.set('gray', '1')
    if (merged.rm) query.set('rm', '1')
  }
  const qs = query.toString()
  return `#/${screenId}${qs ? `?${qs}` : ''}`
}

export function navigateTo(p: Partial<StudioParams>) {
  window.location.hash = buildHash(p)
}

/** الاستماع لتغير الهاش — يستدعي التسجيل عند كل تغيير مسار/حالة. */
export function onHashChange(cb: (params: StudioParams) => void): () => void {
  const handler = () => cb(parseHash(window.location.hash))
  window.addEventListener('hashchange', handler)
  return () => window.removeEventListener('hashchange', handler)
}
