# nodejs-hw — 03-validation

Короткі інструкції щоб підготувати репозиторій для перевірки і розгортання.

Потрібно зробити перед відправкою на перевірку:

- Створити MongoDB кластер (Atlas) або інший доступний MongoDB сервер.
- Додати в налаштування Render (або локальний `.env`) змінну `MONGO_URL` з рядком підключення.
- Зачекати ~5 хвилин після деплою перед перевіркою (Render build + start).

Запуск локально

1. Встановити залежності:

```bash
npm install
```

2. Додати в `.env` значення:

```
PORT=3000
MONGO_URL=your_mongo_connection_string
```

3. Запустити в режимі розробки:

```bash
npm run dev
```

4. Або запустити production-строкою:

```bash
npm start
```

Наявні точки доступу (CRUD)

### GET /notes
Повертає масив нот з підтримкою пагінації, фільтрування та пошуку.

Параметри запиту (query):
- `page` (int) - номер сторінки (за замовчуванням 1, мінімум 1)
- `perPage` (int) - кількість елементів на сторінці (за замовчуванням 10, мін 5, макс 20)
- `tag` (string) - фільтрування за тегом (один з: Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo)
- `search` (string) - текстовий пошук по title та content (без урахування регістру)

Приклади:
```bash
# Всі ноти з пагінацією
curl http://localhost:3000/notes?page=1&perPage=10

# Ноти з тегом "Work"
curl http://localhost:3000/notes?tag=Work

# Пошук по тексту "hello"
curl http://localhost:3000/notes?search=hello

# Комбінація фільтрів
curl http://localhost:3000/notes?page=1&perPage=15&tag=Todo&search=hello
```

Відповідь:
```json
{
  "page": 1,
  "perPage": 10,
  "totalNotes": 150,
  "totalPages": 15,
  "notes": [
    {
      "_id": "...",
      "title": "...",
      "content": "...",
      "tag": "Todo",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /notes/:noteId
Повертає ноту за ID або 404 { message: 'Note not found' }

### POST /notes
Створює ноту (201)

Параметри тіла запиту (body):
- `title` (string, обов'язково) - мінімум 1 символ
- `content` (string, опціонально) - може бути порожнім
- `tag` (string, опціонально) - один з доступних тегів

Приклад:
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "Content here", "tag": "Work"}'
```

### PATCH /notes/:noteId
Оновлює ноту або 404

Параметри тіла запиту (body):
- `title` (string, опціонально) - мінімум 1 символ
- `content` (string, опціонально) - може бути порожнім
- `tag` (string, опціонально) - один з доступних тегів

Примітка: хоча б одне поле мусить бути присутнім в запиті

### DELETE /notes/:noteId
Видаляє ноту або 404

Нові можливості (v3)

- **Пагінація** -支持分页查询, з параметрами page та perPage
- **Фільтрування** - фільтрування по тегам
- **Текстовий пошук** - пошук по title та content
- **Валідація** - валідація всіх запитів за допомогою бібліотеки celebrate
- **Обробка помилок** - коректна обробка помилок валідації та MongoDB

Приклади команд для перевірки (після запуску сервера):

```bash
curl -s http://localhost:3000/notes | jq

curl -s -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test note","content":"Hello","tag":"Todo"}' | jq

# замініть <id> на реальний id для наступних команд
curl -s http://localhost:3000/notes/<id> | jq
curl -s -X PATCH http://localhost:3000/notes/<id> -H "Content-Type: application/json" -d '{"title":"Updated"}' | jq
curl -s -X DELETE http://localhost:3000/notes/<id> | jq
```

Деплой на Render

1. Створіть новий Web Service, підключіть репозиторій і виберіть гілку `02-mongodb`.
2. Вказати build command: `npm install` (Render встановлює залежності автоматично).
3. Start Command: `npm start`.
4. Додайте Environment Variables: `PORT` (за бажанням) і `MONGO_URL` — рядок підключення.
5. Дочекайтесь завершення деплою і перевірте ендпоінти.

Якщо хочете — я можу допомогти додати `MONGO_URL` у Render (потрібен доступ) або зробити тестові запити після того, як ви додасте `MONGO_URL`.
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
