# Studio Delivery Checklist

## Preflight

- [x] قرأت جميع ملفات الحزمة المعتمدة (25 ملفًا — `reports/INPUT-INVENTORY.md`).
- [x] أنشأت تقارير المدخلات والسلطة والفجوات وخطة التغطية (5 تقارير).
- [x] أكدت أن Micro الإنتاجي لم يُلمس (لا clone/PR/Commit/Push له).
- [x] أكدت أن كل المخرجات الجديدة داخل هذا المجلد (عدا تحديث السجلات الجذرية بأدلة).

## Studio foundation

- [x] الاستوديو يعمل محليًا من README (`npm install/dev/build/preview` مثبتة النسخ).
- [x] Tokens منفصلة وقابلة للتعديل (ثلاث طبقات — `TOKEN-DICTIONARY`).
- [x] Components قابلة لإعادة الاستخدام (الشاشات الثلاث تشترك فيها جميعًا).
- [x] Arabic RTL و`0–9` و`د.أ` (فحص آلي + بصري).
- [x] Light Mode فقط (لا Dark Tokens).
- [x] Motion وReduced Motion (`MOTION-MAP.md` + مبدّل rm).
- [x] Fixtures موسومة وليست بيانات مالية حقيقية (`FIXTURE-CATALOG.md`).

## First proof gate

- [x] `OVR-NOW` (6 حالات).
- [x] `OPS-SALE-CREATE` (9 حالات).
- [x] `FIN-OVERVIEW` (6 حالات).
- [x] Default لكل شاشة.
- [x] Partial/Unknown/Insufficient ذات أثر على القرار.
- [x] Error/Recovery (RecoveryStage + فشل الحفظ + offline-save).
- [x] فحص 320/360/390/412 (لقطات + صفر تجاوز أفقي آلي).
- [x] فحص RTL والنصوص الطويلة و200% عند الحاجة (VLM + آلي).
- [x] فحص Grayscale وعدم تكرار قالب SaaS (لقطات + تحليل).
- [x] `VISUAL-PROOF-REVIEW.md` بأدلة فعلية (9 أسئلة).

## Delivery

- [x] Component catalog.
- [x] Screen catalog.
- [x] State matrix.
- [x] Navigation map.
- [x] Asset manifest والتراخيص (OFL×2 + MIT) أو الفجوات الموسومة.
- [x] QA summary (+ Contrast report).
- [x] Open issues.
- [x] Delivery report.
- [x] الحالة `Ready for Owner Review` (لا Accepted).
- [x] لا توجد Secrets (فحص git history + ملفات).
- [x] Commit وPush إلى فرع Zed فقط (دون Force/PR/دمج).
- [ ] معاينة مستضافة دائمة خارج الجلسة — **Blocked** بلا تفويض نشر (موثق D-02/ISS-004؛ البديل: تشغيل محلي).
