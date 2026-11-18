
import express from "express";
import cors from "cors";

import coursesRouter from "./routes/courses.js";

const app = express();
const PORT = 3001;

// Налаштування сервера
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Перевірка роботи сервера
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Сервер StudyLite працює!"
    });
});

// Підключення маршрутів курсів
app.use("/api/courses", coursesRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});
