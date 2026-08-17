# SOFIRA SYSTEMS

Официален уебсайт на [SOFIRA SYSTEMS](https://sofirasystems.com).

Сайтът е изграден с Next.js, TypeScript и Tailwind CSS. Езикът на съдържанието е български.

## Разработка

```bash
npm install
npm run dev
```

Отворете [http://localhost:3000](http://localhost:3000).

## Проверки

```bash
npm run typecheck
npm run lint
npm run build
```

## Среда

Копирайте `.env.example` към `.env.local` при нужда.

```text
NEXT_PUBLIC_SITE_URL=https://sofirasystems.com
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` и `CONTACT_TO_EMAIL` се използват само на сървъра. Формата валидира данните и не твърди, че съобщението е изпратено, докато доставчикът не бъде свързан.

## Публикуване

Проектът е Next.js приложение и е готов за хостинг на Vercel. Официалният домейн е [sofirasystems.com](https://sofirasystems.com).

Преди публикуване задайте `NEXT_PUBLIC_SITE_URL=https://sofirasystems.com`. Имейл изпращането остава изключено, докато не се попълнят сървърните променливи за контакт. DNS и връзката на домейна се правят в хостинг акаунта.


## Структура

- `src/app` — страници, метаданни, API маршрути
- `src/components` — оформление, навигация, секции и UI
- `src/data` — навигация, услуги, продукти и проекти
- `public/brand` — официално лого
