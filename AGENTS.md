# Zed AI Workspace Rules — Micro Interactive Design Studio

هذه المساحة مخصصة لإنتاج **Interactive Design Reference Studio** مستقل لتصميم Micro فقط.

## قواعد إلزامية

- المستودع الحالي هو `Qays7753/Micro-Bold-Modular-Design-Handoff-V1`.
- الفرع المخصص للعمل هو `exec/interactive-design-studio-zed-20260923`.
- ضع كل مخرجات التنفيذ الجديدة داخل `interactive-design-studio/` ما لم يطلب العقد تحديث سجل تسليم جذريًا.
- لا تعدّل مستودع `Qays7753/Micro`، ولا تنشئ PR أو Commit أو Push إليه.
- لا تعدّل `main` مباشرة، ولا تستخدم force-push، ولا تغيّر القرارات المعتمدة بصمت.
- اقرأ `ZED-START-HERE-INTERACTIVE-DESIGN-STUDIO.md` ثم ملفات الحزمة المعتمدة قبل التنفيذ.
- لا تعتبر HTML أو Screenshot ثابتًا مخرجًا كافيًا؛ المطلوب استوديو قابل للتشغيل والتفاعل ومصدره قابل للتعديل.
- Figma اختياري. لا تتوقف بسببه ولا تدّعِ إنشاء Figma إذا لم توجد أداة حقيقية.
- لا تضع أي Token أو Secret أو Credential في Git أو الملفات أو URLs أو مخرجات الطرفية.
- لا تعلن `Accepted`؛ الحالة النهائية لهذه الجولة هي `Ready for Owner Review`.

## مصدر الحقيقة

**للمراجعة الحالية:** `17-COLOR-DECISION-2026-09-23.md` أعلى سلطة للألوان، و`18-ZAI-STUDIO-REVISION-BRIEF-2026-09-23.md` أمر تصحيح النسخة القائمة، ثم `MICRO-VISUAL-DESIGN-DECISIONS-V1.md` لبقية القرارات. قرار المالك يثبت `#D97757` هوية قائدة؛ بقية قيم 17 خط أساس تنفيذ مهني مفوض لا موافقات منفردة من المالك. ألوان Indigo/Citrus في تقارير أو صور التنفيذ القديم وصف تاريخي فقط. لا تغيّر التبويبات أو RTL أو `د.أ` أو حدود الوظائف؛ لا تُعد فتح خيار لون الهوية من دون طلب صريح من المالك.

## الاختبارات المطلوبة

شغّل الاستوديو محليًا، واختبره على 320/360/390/412، وRTL، والنصوص الطويلة، و200% حيث يلزم، وحالات Default/Partial/Unknown/Error/Recovery. احفظ الأدلة والتقارير داخل `interactive-design-studio/evidence/` و`interactive-design-studio/reports/`.

## Git

اعمل على الفرع المخصص نفسه طوال هذه المهمة. ادفع إلى هذا الفرع فقط بعد التحقق، من دون دمج أو فتح PR إلا إذا طلب المالك ذلك لاحقًا.

## الأسرار

إذا احتجت GitHub Push، استخدم Credential آمنًا يوفره المالك خارج المستودع، مثل Secret أو Environment Variable، وبأقل صلاحيات. لا تطلب من المالك وضعه داخل Prompt أو ملف.

## معيار الإغلاق

لا تعتبر العمل منجزًا إلا بعد وجود استوديو قابل للتشغيل، وثلاث عينات `OVR-NOW` و`OPS-SALE-CREATE` و`FIN-OVERVIEW`، ومصدر مكونات وتوكنز، وحالات وتوثيق وأدلة، وتقرير يوضح المنجز والناقص و`UNVERIFIED`.

اقرأ Prompt التنفيذ في `ZED-START-HERE-INTERACTIVE-DESIGN-STUDIO.md` قبل بدء أي تغيير.
