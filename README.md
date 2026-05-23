# nodejs-hw

Проєкт виконано для домашнього завдання — Express сервер для нотаток.

## Посилання (заповніть після пушу/деплою)

- GitHub (гілка `01-express`): https://github.com/<your-username>/nodejs-hw/tree/01-express
- Render: https://<your-service>.onrender.com

## Як запустити локально

1. Встановити залежності:

```bash
npm install
```

2. Запустити в режимі розробки:

```bash
npm run dev
```

3. Тести маршрутів (приклад):

```bash
curl http://localhost:3000/notes
curl http://localhost:3000/notes/123
curl http://localhost:3000/test-error
```

## Примітки для деплою на Render

- Підключіть репозиторій GitHub і виберіть гілку `01-express`.
- Вкажіть команду запуску: `npm start` (Render визначить `start` зі `package.json`).
- Додайте змінну середовища `PORT` (якщо потрібно) у налаштуваннях сервісу.

Після пушу гілки зачекайте ~5 хвилин перед надсиланням роботи на перевірку.
