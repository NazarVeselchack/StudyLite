
import { Database } from "node:sqlite";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Визначаємо шлях до файлу бази даних
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const databasePath = join(currentDirectory, "studylite.db");

// Створюємо підключення до SQLite
const db = new Database(databasePath);

// Створюємо таблиці
db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 1,

        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE
    );
`);

// Перевіряємо, чи є вже курси в базі
const result = db.prepare(
    "SELECT COUNT(*) AS total FROM courses"
).get();

// Додаємо початкові дані лише один раз
if (result.total === 0) {

    const insertCourse = db.prepare(`
        INSERT INTO courses (title, description)
        VALUES (?, ?)
    `);

    const insertLesson = db.prepare(`
        INSERT INTO lessons (course_id, title, content, position)
        VALUES (?, ?, ?, ?)
    `);

    // Перший курс
    const webCourseId = Number(
        insertCourse.run(
            "Основи веброзробки",
            "Навчіться створювати вебсторінки за допомогою HTML та CSS."
        ).lastInsertRowid
    );

    insertLesson.run(
        webCourseId,
        "Що таке HTML?",
        "HTML — це мова розмітки, яка використовується для створення структури вебсторінок.",
        1
    );

    insertLesson.run(
        webCourseId,
        "Основи CSS",
        "CSS використовується для оформлення вебсторінок: кольорів, розмірів, відступів та розташування елементів.",
        2
    );

    // Другий курс
    const jsCourseId = Number(
        insertCourse.run(
            "Основи JavaScript",
            "Познайомтеся з основами програмування мовою JavaScript."
        ).lastInsertRowid
    );

    insertLesson.run(
        jsCourseId,
        "Змінні та типи даних",
        "Змінні дозволяють зберігати дані. У JavaScript використовуються let, const та var.",
        1
    );

    insertLesson.run(
        jsCourseId,
        "Умовні конструкції",
        "Умови if та else дозволяють виконувати різні частини коду залежно від певної умови.",
        2
    );

    console.log("Початкові курси та уроки додано до бази даних.");
}

console.log("Базу даних StudyLite підключено.");

export default db;
