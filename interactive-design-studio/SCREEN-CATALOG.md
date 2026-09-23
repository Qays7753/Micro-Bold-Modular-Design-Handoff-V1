# SCREEN-CATALOG — شاشات الاستوديو المنفذة (V2 — مراجعة 2026-09-23)

> المنفذ فعليًا وقابل للتشغيل من `#/…`: 5 مسارات (3 عينات منتج + عرض كل البطاقات + مساحة مراجعة مكوّنات) و12 مسارًا مؤجلًا صادقًا يفتح من إجراءات الواجهة. بقية شاشات SCREEN-COVERAGE-V2.csv خارج هذه الجولة (`NOT IMPLEMENTED`).

| Screen ID | المسار العميق | الحالات المنفذة | التكوين V2 | ملف المصدر |
|---|---|---|---|---|
| `OVR-NOW` | `#/OVR-NOW?state=…` | complete · partial · insufficient · first-use · offline · error (6) | **بطاقة النتيجة أولًا** (هوية #D97757 بنص Ink — «هل أنا ربحان أم خسران؟» مع الاكتمال والحكم)، ثم الكاش بطاقة بيضاء، ثم Insight وصفوف اليوم وآخر الحركات. سحب فعلي للبطاقات + سحب بين الصفحات. | `src/screens/OvrNow.tsx` |
| `OPS-SALE-CREATE` | `#/OPS-SALE-CREATE?state=…` | empty · filled · validation · impact · impact-credit · saving · failure · success · offline-save (9) | نموذج سريع: طريقة نقدي/آجل بارزة، عميل آجل بحالة خطأ، أسطر صنف **شبكية صفين** (الاسم+الكمية ثم السعر+إجمالي السطر الثابت)، سلة فارغة كدعوة فعل منقطة، أثر العملية فوق شريط إجراء صلب كامل العرض. تبديل السيناريو = إعادة ضبط حتمية. | `src/screens/OpsSaleCreate.tsx` |
| `FIN-OVERVIEW` | `#/FIN-OVERVIEW?state=…` | complete · partial · insufficient · zero · negative · offline (6) | **بلا كتلة ملونة مهيمنة**: «كم معي الآن؟» لوحة بيضاء برقم Ink كبير والمحافظ صفوف نظيفة داخلها (الاسم/التاريخ يلتفان، المبلغ مع د.أ)، أسئلة على Canvas بخط فاصل، النتيجة حاوية دلالية (ربح/خسارة/جزئي) بكلمة حكم + تفصيل حقيقي داخل Sheet. | `src/screens/FinOverview.tsx` |
| `OVR-SNAPSHOT-ALL` | `#/OVR-SNAPSHOT-ALL?state=…` | complete · partial · insufficient · offline (4) | **عرض استوديو حقيقي** طلبته المراجعة (IMPLEMENTED-COVERAGE-V2.md): بطاقات نظرة المالية نفسها مكشوفة كلها ببيانات نفس Fixtures، مع زر عودة يحفظ التسلسل — لا نقر ميت خلف «عرض الكل». | `src/screens/OvrSnapshotAll.tsx` |
| `STUDIO-COMPONENTS` | `#/STUDIO-COMPONENTS` | all (1) | **مساحة مراجعة مكوّنات (Studio QA — ليست شاشة منتج)**: مصفوفة الأزرار والحقول وقيم المالية بتسع حالات وإشارة Micro السبع وأنماط الفراغ الخمسة والطبقات المنبثقة الحية (IMPLEMENTED-COVERAGE-V2.md). | `src/studio/StudioComponents.tsx` |
| `OPS-HOME` · `TOOL-HOME` · `MKT-HOME` | `#/…` | — | بطاقات توثيق مؤجلة (SCREEN-COVERAGE-V2.csv صادقة) مع رابط العينة المنفذة حيث يوجد. | `src/screens/DeferredScreen.tsx` |
| `FIN-ACTIVITY` · `FIN-TRANSACTION-DETAIL` · `OPS-EXPENSE-CREATE` · `FIN-WALLETS` · `FIN-TRANSFER` · `REL-CUSTOMERS` · `REL-SUPPLIERS` · `GLB-ASK` · `GLB-DELIVERY` · `GLB-ACCOUNT` · `GLB-PROJECT` · `GLB-SETTINGS` | من إجراءات الواجهة فقط | — | مسارات مؤجلة حقيقية من SCREEN-COVERAGE-V2.csv تفتح من كل إجراء مرئي (عرض الكل، صف معاملة، إضافة التكاليف، عرض التوزيع/النقل/العملاء/الموردين، اسأل Micro، التوصيل، صفوف لوحة الحساب) — **لا نقر ميت**. | `src/app/routes.ts` |

**ملاحظات:**

- ترتيب بطاقات نظرة المالية في `fixtures/ovr-now.json` صار `[result, cash, forYou, onYou]` و`activeIndex=0` — **النتيجة هي البطاقة الأولى الظاهرة** في كل السيناريوهات (تغيير ترتيب عرض فقط؛ لا قيمة مالية تغيرت).
- القيم المعروضة كلها Fixtures موسومة بمصدرها (`JORDANIAN-FIXTURES.md`) — الغياب لا يتحول أبدًا إلى `0.00`.
- الحالة القصوى: `معتمد بصريًا للعينات المنفذة، لا للشاشات المؤجلة` — لا تدعي هذه الجولة تصميم الشاشات المؤجلة.
