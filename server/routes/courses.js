
import { Router } from "express";
import db from "../database/db.js";

const router = Router();

// Отримання всіх курсів
router.get("/", (req, res) => {

    const courses = db.prepare(`
        SELECT
            courses.id,
            courses.title,
            courses.description,
            COUNT(lessons.id) AS lessonCount

        FROM courses

        LEFT JOIN lessons
        ON courses.id = lessons.course_id

        GROUP BY courses.id
        ORDER BY courses.id
    `).all();

    res.json(courses);
});

// Отримання конкретного курсу разом з уроками
router.get("/:id", (req, res) => {

    const courseId = Number(req.params.id);

    if (!Number.isInteger(courseId) || courseId <= 0) {
        return res.status(400).json({
            message: "Некоректний ідентифікатор курсу."
        });
    }

    const course = db.prepare(`
        SELECT id, title, description
        FROM courses
        WHERE id = ?
    `).get(courseId);

    if (!course) {
        return res.status(404).json({
            message: "Курс не знайдено."
        });
    }

    const lessons = db.prepare(`
        SELECT id, title, content, position
        FROM lessons
        WHERE course_id = ?
        ORDER BY position
    `).all(courseId);

    res.json({
        ...course,
        lessons
    });
});

export default router;
