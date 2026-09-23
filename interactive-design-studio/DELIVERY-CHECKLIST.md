# Studio Delivery Checklist

## Preflight

- [ ] قرأت جميع ملفات الحزمة المعتمدة.
- [ ] أنشأت تقارير المدخلات والسلطة والفجوات وخطة التغطية.
- [ ] أكدت أن Micro الإنتاجي لم يُلمس.
- [ ] أكدت أن كل المخرجات الجديدة داخل هذا المجلد.

## Studio foundation

- [ ] الاستوديو يعمل محليًا من README.
- [ ] Tokens منفصلة وقابلة للتعديل.
- [ ] Components قابلة لإعادة الاستخدام.
- [ ] Arabic RTL و`0–9` و`د.أ`.
- [ ] Light Mode فقط.
- [ ] Motion وReduced Motion.
- [ ] Fixtures موسومة وليست بيانات مالية حقيقية.

## First proof gate

- [ ] `OVR-NOW`.
- [ ] `OPS-SALE-CREATE`.
- [ ] `FIN-OVERVIEW`.
- [ ] Default.
- [ ] Partial أو Unknown.
- [ ] Error أو Recovery.
- [ ] فحص 320/360/390/412.
- [ ] فحص RTL والنصوص الطويلة و200% عند الحاجة.
- [ ] فحص Grayscale وعدم تكرار قالب SaaS.
- [ ] `VISUAL-PROOF-REVIEW.md` بأدلة فعلية.

## Delivery

- [ ] Component catalog.
- [ ] Screen catalog.
- [ ] State matrix.
- [ ] Navigation map.
- [ ] Asset manifest والتراخيص أو الفجوات.
- [ ] QA summary.
- [ ] Open issues.
- [ ] Delivery report.
- [ ] الحالة `Ready for Owner Review`.
- [ ] لا توجد Secrets.
- [ ] Commit وPush إلى فرع Zed فقط.
