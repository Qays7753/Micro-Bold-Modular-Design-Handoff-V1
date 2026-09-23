// Micro Visual System — DeferredScreen (مسار توثيقي لشاشة لم تُصمم بعد)
// بطاقة توثيق داخل الاستوديو — ليست شاشة منتج: تعرض Screen ID وحالاته
// المطلوبة من SCREEN-COVERAGE-V2.csv وسبب التأجيل، وتربط إلى العينة المنفذة عند وجودها.

import { Button } from '../components/core/Button'
import { MicroSignal } from '../components/contextual/MicroSignal'
import { Icon } from '../components/icons/Icon'
import type { ScreenRoute } from '../app/routes'

export function DeferredScreen({ route, onNavigate }: { route: ScreenRoute; onNavigate: (screenId: string) => void }) {
  const childSample =
    route.screenId === 'OPS-HOME' ? 'OPS-SALE-CREATE' : null

  return (
    <div className="screen screen--deferred" data-screen={route.screenId}>
      <header className="screen__head">
        <h1 className="type-screen-title">{route.title}</h1>
        <ContextNote />
      </header>

      <section className="deferred-card" aria-labelledby="deferred-title">
        <div className="deferred-card__signal">
          <MicroSignal state="draft" size="md" label="لم تبدأ بعد" />
        </div>
        <h2 id="deferred-title" className="type-card-title">
          هذه الشاشة لم تُصمّم بعد
        </h2>
        <p className="type-body">
          اتجاه التصميم المرئي V2 معتمد؛ هذه الوجهة تحتاج تصميمًا خاصًا بمهمتها وبياناتها الحقيقية. هذه البطاقة
          وثيقة داخل الاستوديو وليست واجهة منتج.
        </p>
        <dl className="deferred-card__meta">
          <div>
            <dt>Screen ID</dt>
            <dd className="ltr">{route.screenId}</dd>
          </div>
          <div>
            <dt>المجال</dt>
            <dd className="ltr">{route.domain}</dd>
          </div>
          <div>
            <dt>الحالة</dt>
            <dd>Not Started — يحتاج تصميم شاشة</dd>
          </div>
          <div>
            <dt>مرجع القرار</dt>
            <dd className="ltr">{route.decisionRefs}</dd>
          </div>
          <div>
            <dt>الحالات المطلوبة عند التنفيذ</dt>
            <dd className="ltr">{route.coverageRow.split('Required: ')[1] ?? '—'}</dd>
          </div>
        </dl>
        {route.entryNote ? <p className="deferred-card__note type-supporting">{route.entryNote}</p> : null}
        {childSample ? (
          <div className="deferred-card__action">
            <Button role="primary" size="compact" icon="arrow-right" trailingArrow onClick={() => onNavigate(childSample)}>
              فتح العينة المنفذة: <span className="ltr">{childSample}</span>
            </Button>
            <p className="type-supporting">زر مراجعة داخل الاستوديو — ليس جزءًا من واجهة Micro.</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function ContextNote() {
  return (
    <span className="screen__fixtures-badge" title="بطاقة توثيق استوديو">
      <Icon name="info" size={16} />
      <span className="type-supporting">Studio documentation</span>
    </span>
  )
}
