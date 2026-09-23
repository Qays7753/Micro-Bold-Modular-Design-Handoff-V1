# Implemented Coverage — V2

| الطبقة | المصدر الحي | نطاق التنفيذ |
|---|---|---|
| Foundations | `src/foundations/` و`TOKEN-DICTIONARY.md` | ألوان ودلالات وطباعة وأبعاد وحركة. |
| Core | `src/components/core/` و`COMPONENT-CATALOG.md` | أزرار وحقول وصفوف وفلاتر وقوائم وطبقات وحالاتها. |
| Financial | `src/components/financial/` | مبلغ وحالات صدقه، بطاقات مالية، نتيجة، سطر حركة، أثر بصري قبل الحفظ. |
| Contextual | `src/components/contextual/` | إشارات جزئي/خطأ/فراغ/اتصال وإجراءات مرتبطة بالسياق. |
| Navigation | `src/navigation/` و`NAVIGATION-MAP.md` | خمسة تبويبات ورأس حساب وسحب وإطارات. |
| Product sample screens | `src/screens/OvrNow.tsx`, `OpsSaleCreate.tsx`, `FinOverview.tsx` | 6 + 9 + 6 حالات في الاستوديو، لا منطق Micro الحقيقي. |
| Supporting studio | `OvrSnapshotAll.tsx`, `StudioComponents.tsx` | عرض البطاقات ومساحة فحص المكونات، لا تعني اكتمال شاشات المنتج. |
| Deferred routes | `src/app/routes.ts` | وجهات توثيقية وليست واجهات منجزة. |

التفصيل الدلالي في `COMPONENT-CATALOG.md` و`SCREEN-CATALOG.md` و`STATE-MATRIX.md`، والجرد الأوسع في `../SCREEN-COVERAGE-V2.csv`. الصور الموجودة دليل على V2 قبل إصلاح 200%، مع حذف الصور المتأثرة؛ فحص التصحيح على جهاز ما زال مطلوبًا وفق `QA-SUMMARY.md`.
