# Secure GitHub Push Setup for Zed

هذا الملف لا يحتوي على Token ولا يطلب وضع Token داخل المستودع.

## الاعتماد المقترح

أنشئ GitHub Fine-grained Personal Access Token مخصصًا للمستودع:

`Qays7753/Micro-Bold-Modular-Design-Handoff-V1`

واجعل الصلاحيات الدنيا:

- Repository access: هذا المستودع فقط.
- Contents: Read and write.
- Metadata: Read-only، وهو غالبًا تلقائي.
- تاريخ انتهاء قصير.
- دون Administration أو Delete أو Actions/Workflows أو Secrets أو مستودعات أخرى.

## طريقة الاستخدام

أدخل Token داخل حقل Secret أو Environment Variable الآمن في Zed، وفق ما توفره بيئته. الاسم المقترح:

`GITHUB_TOKEN`

لا تلصقه في:

- Prompt.
- ملف Markdown.
- `remote` URL.
- Commit message.
- Logs أو Screenshots.
- أي ملف داخل `interactive-design-studio/`.

## التحقق

يجب أن يرفع Zed إلى الفرع:

`exec/interactive-design-studio-zed-20260923`

ولا يرفع إلى `main` ولا إلى أي مستودع آخر. إذا فشل الرفع، يسجل الخطأ دون كشف قيمة Token ودون إعادة المحاولة بطريقة تعرضه.

## الإلغاء بعد المهمة

بعد انتهاء المهمة ومراجعة النتيجة، ألغِ Token أو دوّر قيمته من GitHub. لا تعتبر وجوده الدائم مطلوبًا.
