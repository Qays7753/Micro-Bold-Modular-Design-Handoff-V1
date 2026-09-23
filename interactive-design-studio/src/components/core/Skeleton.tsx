// Micro Visual System — Core: Skeleton (§14.4 Micro Structural Load)
// سكلتون يطابق هندسة المحتوى الحقيقي ويقتصر على المنطقة المنتظرة، مع
// Shimmer هادئ واحد فقط، وثابت في Reduced Motion.

export function Skeleton({ variant = 'text', width, height }: { variant?: 'text' | 'title' | 'money' | 'row' | 'card'; width?: string; height?: string }) {
  return (
    <span
      className={`skeleton skeleton--${variant}`}
      style={{ width: width ?? undefined, height: height ?? undefined }}
      aria-hidden="true"
    />
  )
}

/** منطقة تحميل هيكلية: تحاكي إيقاع المحتوى الحقيقي لا مستطيلات متساوية. */
export function StructuralLoad({ lines = 3, kind = 'section' }: { lines?: number; kind?: 'section' | 'summary' | 'list' }) {
  return (
    <div className="structural-load" role="status" aria-label="جارٍ التحميل">
      {kind === 'summary' ? (
        <>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="money" width="62%" />
          <Skeleton variant="text" width="72%" />
        </>
      ) : null}
      {kind === 'section' ? (
        <>
          <Skeleton variant="title" width="34%" />
          <Skeleton variant="text" width="88%" />
          <Skeleton variant="text" width="64%" />
        </>
      ) : null}
      {kind === 'list'
        ? Array.from({ length: lines }, (_, i) => (
            <div className="structural-load__row" key={i}>
              <Skeleton variant="row" width="100%" />
            </div>
          ))
        : null}
    </div>
  )
}
