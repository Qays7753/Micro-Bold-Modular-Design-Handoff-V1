# STATE-MATRIX — مصفوفة الحالات (V2 — مراجعة 2026-09-23)

**المرجع:** §13.20 (محورا معنى القيمة والحفظ) + §14 (النظام السياقي) + 04-CSV (الحالات المطلوبة) + 17 §2 (ألوان الحالات). النموذج في `src/states/types.ts`. ألوان الحالات دلالية (نجاح/انتباه/خطر/جزئي/معلومة) — لون الهوية ليس حالة.

## 1. محور معنى القيمة (MoneyValue — لا يخلط أبدًا)

| الحالة | العرض | مثال من Fixtures | أين تُرى |
|---|---|---|---|
| known | رقم منسق + `د.أ` | `385.75 د.أ` | كل الشاشات |
| true-zero | `0.00 د.أ` + وسم «صفر حقيقي» | مصروفات الشهر 0.00 | FIN-OVERVIEW/zero |
| negative | `−80.00 د.أ` + شرح نصي للسبب | خسارة الشهر | FIN-OVERVIEW/negative |
| estimated | رقم + وسم «تقريبًا/نتيجة تقديرية» + Partial Signal | ربح تقريبًا 380.00 | OVR وFIN الجزئية |
| not-recorded | نص «غير مسجل» | سعر صينية الكيك | OPS-SALE-CREATE/validation |
| cannot-compute | نص «لا يمكن حسابه» | النتيجة قبل تسجيل التكاليف | FIN/insufficient |
| unknown | `—` + «بحاجة للمراجعة» | ديون لك غير مؤكدة | FIN/insufficient |
| partial | رقم + وسم «جزئي» | ديون لك جزئية | OVR وFIN الجزئية |
| stale | القيمة + «من آخر نسخة محفوظة» | الكاش دون اتصال | الحالات offline |

## 2. محور الحفظ والإرسال (منفصل عن معنى القيمة — §14.7)

| الحالة | العرض | أين |
|---|---|---|
| saved | لا شارة دائمة (النجاح الطبيعي صامت) | الصفوف المكتملة |
| local-saved | «محفوظ على هذا الهاتف» + إشارة داخل إطار جهاز | TX-1038، OPS/offline-save |
| pending-send | «بانتظار الإرسال» | TX-1037، ملخص offline |
| not-saved | «لم تُحفظ العملية» + إعادة المحاولة والمدخلات باقية | OPS/failure |

## 3. حالات البيانات الإجمالية × الشاشات المنفذة

| DataState | OVR-NOW | OPS-SALE-CREATE | FIN-OVERVIEW | OVR-SNAPSHOT-ALL |
|---|---|---|---|---|
| complete | ✔ complete | ✔ filled/impact/success | ✔ complete/zero/negative | ✔ complete |
| partial | ✔ partial | ✔ (إجمالي جزئي بسعر غير مسجل) | ✔ partial | ✔ partial |
| unknown / insufficient | ✔ insufficient | — | ✔ insufficient | ✔ insufficient |
| empty | ✔ first-use (First Move) | ✔ empty (نموذج فارغ) | — | — |
| loading | — (منطقة StructuralLoad متاحة بالمكون) | ✔ saving (Action Hold) | — | — |
| error / recovery | ✔ error (RecoveryStage بالملخص فقط) | ✔ failure (فشل الحفظ) | — | — |
| offline | ✔ offline (Ribbon + stale) | ✔ offline-save | ✔ offline | ✔ offline |

**قواعد حاكمة مطبقة:** المجهول لا يتحول صفرًا أبدًا؛ الصفر الحقيقي يوسم؛ الحالة الحرجة لا تختبئ خلف Swipe (النتيجة أولًا في OVR)؛ الحالة تظهر من مصدرها (Anchor→Reveal→Recover)؛ بنية الشاشة لا تقفز عند تغير الحالة؛ **تبديل السيناريو يعيد تركيب الشاشة فلا تتسرب قيم/أخطاء من سيناريو سابق**؛ مؤشر انتظار متحرك واحد فقط.

## 4. حالات الفحص في طبقة المراجعة

`w=320/360/390/412/full` · `z=100/150/200` · `gray=1` · `rm=1` — كلها مع أي حالة شاشة، وتُحفظ في الرابط العميق.
