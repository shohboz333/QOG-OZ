# QOG'OZ — reklama va AdSense sozlamasi

## Reklama joylari

Saytda 2 ta tayyor reklama inventory mavjud:

- `top-banner` — hero ostidagi premium banner joyi
- `tools-inline` — tools bo'limidan keyingi keng banner joyi

Har ikkala joy foydalanuvchiga `Bu yerda sizning reklamangiz bo'lishi mumkin` degan premium placeholder ko'rsatadi.

## AdSense ulash

1. Google AdSense hisobingizni tasdiqlang.
2. `js/config.js` ichida `monetization.publisherId` ga o'zingizning `ca-pub-...` ID'ingizni kiriting.
3. `slots.topBanner` va `slots.toolsInline` ga Google AdSense ad unit slot ID'larini kiriting.
4. AdSense tomonidan berilgan scriptni `<head>` qismiga qo'shing.
5. Reklama siyosatlari va consent talablarini o'zingizning mamlakatingiz/auditoriyangizga mos tekshiring.

**Muhim:** placeholder reklama emas. Haqiqiy reklama faqat reklama tarmog'i kodi va tasdiqlangan publisher ma'lumotlari qo'yilgandan keyin chiqadi.
