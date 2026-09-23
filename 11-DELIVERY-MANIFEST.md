# Delivery Manifest Template — يُملأ عند التسليم

**حالة الحزمة الحالية:** هذه قائمة مخرجات مطلوبة من Agent المصمم؛ لا يعني وجود الاسم هنا أن Figma أو الملفات المذكورة منتجة الآن.  
**اسم Agent:** يملأ. **تاريخ التسليم:** يملأ. **نسخة التصميم:** يملأ. **رابط ملف Figma:** يملأ بعد التحقق.

| ID | المخرج | الحالة الآن | رابط بعد الإنتاج | دليل فتحه عند المالك | ملاحظات أو سبب الحجب |
|---|---|---|---|---|---|
| D-01 | Figma Master قابل للتحرير | Not Produced | — | — | إلزامي لتسليم التصميم |
| D-02 | Backup Figma أو بديل تنزيل حقيقي بحسب الصلاحيات | Not Produced | — | — | لا تختلق `.fig` |
| D-03 | Foundations وTokens وTypography | Not Produced | — | — | Light only |
| D-04 | Core Component Library | Not Produced | — | — | variants موثقة |
| D-05 | Financial وContextual Components | Not Produced | — | — | لا Generic Cards |
| D-06 | Approved Screens and Critical States | Not Produced | — | — | مطابق Coverage Ledger |
| D-07 | Screen Coverage Ledger النهائي | Template Only | — | — | `04-SCREEN-COVERAGE.csv` بذرة |
| D-08 | Navigation Mapping النهائي | Template Only | — | — | مستقل عن Screen IDs |
| D-09 | Component Inventory النهائي | Template Only | — | — | روابط Figma وحالة نضج |
| D-10 | Decision Traceability Matrix النهائي | Template Only | — | — | كل قرار رئيسي |
| D-11 | Token Dictionary and Asset Manifest | Template Only | — | — | SVG والخط والترخيص |
| D-12 | RTL and Accessibility Annotations | Not Produced | — | — | أسماء وترتيب وFocus |
| D-13 | Motion and Reduced Motion Map | Not Produced | — | — | مصادر ووجهات وتوقيت |
| D-14 | Design-to-Development Handoff | Template Only | — | — | لا يفرض Framework |
| D-15 | QA Evidence and Open Issues | Not Produced | — | — | لا PASS وهمي |
| D-16 | Legacy Contamination and Template Audit | Not Produced | — | — | أمثلة مقارنة ودليل |
| D-17 | Gap Conflict Change Logs | Template Only | — | — | تحديثات فعلية |
| D-18 | Final Completion Report | Template Only | — | — | `12-FINAL-COMPLETION-REPORT.md` |
| D-19 | Visual Proof Review للشاشات الثلاث | Not Produced | — | — | `VISUAL-PROOF-REVIEW.md` مع روابط Figma ودليل المرونة والتكوين؛ §16 |
| D-20 | مخرجات التصميم المنشورة في هذا المستودع | Not Produced | — | — | رابط Commit وملفات فعلية قابلة للفتح؛ لا ZIP وحده |

## قاعدة الحالات

`Not Produced` و`Template Only` و`In Progress` و`Delivered` و`Blocked` و`Deferred by Owner`. لا تحول `Blocked` إلى `Delivered`. يمكن الوصول إلى `Design Delivered for Owner Review` عندما تكون حزمة التصميم فعلًا كاملة وقابلة للفتح، مع Tests واقعية `UNVERIFIED` معلنة في التقرير؛ لا تسمِّها `Experience Accepted`.

## فحص قابلية الوصول

- جرّب المالك فتح Figma أو نسخ الملف من حسابه، لا من جلسة Agent فقط.
- افتح عينتين من Frames وروابط Components.
- افتح Asset Manifest ومرفقات الترخيص.
- جرّب تنزيل النسخة الاحتياطية إن أمكن.
- لا تضع روابط محلية داخل بيئة Agent وحدها مكان روابط يستطيع المالك الوصول إليها.
