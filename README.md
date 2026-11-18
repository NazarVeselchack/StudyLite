
# StudyLite

StudyLite — це проста платформа дистанційного навчання,
розроблена як навчальний Full-Stack вебпроєкт.

Платформа дозволяє переглядати доступні навчальні курси,
ознайомлюватися з їхньою програмою та відкривати окремі уроки.

## Можливості

- Перегляд доступних навчальних курсів.
- Перегляд опису кожного курсу.
- Перегляд списку уроків.
- Відкриття та читання навчальних матеріалів.
- Отримання інформації з бази даних через API.

## Технології

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express
- CORS

### База даних
- SQLite
- Node.js SQLite API

### Інструменти
- Git
- GitHub
- Visual Studio Code

## Структура проєкту

```text
StudyLite/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── server/
│   ├── database/
│   │   └── db.js
│   ├── routes/
│   │   └── courses.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Встановлення та запуск

### 1. Клонування репозиторію

```bash
git clone <URL-РЕПОЗИТОРІЮ>
cd StudyLite
```

### 2. Запуск Backend

```bash
cd server
npm install
npm run dev
```

Сервер буде доступний за адресою:

http://localhost:3001

### 3. Запуск Frontend

Відкрийте другий термінал:

```bash
cd client
npm install
npm run dev
```

Сайт буде доступний за адресою:

http://localhost:5173

## API

| Метод | Маршрут | Опис |
|---|---|---|
| GET | /api/health | Перевірка сервера |
| GET | /api/courses | Отримання всіх курсів |
| GET | /api/courses/:id | Отримання курсу та його уроків |

## База даних

Для зберігання інформації використовується SQLite.

База даних містить дві основні таблиці:

- courses — навчальні курси;
- lessons — уроки курсів.

Файл бази даних створюється автоматично під час
першого запуску Backend.

## Статус проєкту

Навчальна версія. Основний функціонал перегляду курсів
та навчальних матеріалів реалізовано.

## Автор

Навчальний проєкт StudyLite.
