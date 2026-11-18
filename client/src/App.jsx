
import { useState, useEffect, useCallback } from "react";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";

import { getCourses, getCourse } from "./services/api";

import "./App.css";

function App() {
    // Список курсів
    const [courses, setCourses] = useState([]);

    // Стан завантаження курсів
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState("");

    // Вибраний курс
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    // Стан завантаження курсу
    const [courseLoading, setCourseLoading] = useState(false);
    const [courseError, setCourseError] = useState("");

    // Вибраний урок
    const [selectedLesson, setSelectedLesson] = useState(null);

    // Поточна сторінка
    const [page, setPage] = useState("home");

    // Завантаження всіх курсів
    const loadCourses = useCallback(async () => {
        setCoursesLoading(true);
        setCoursesError("");

        try {
            const data = await getCourses();
            setCourses(data);
        } catch {
            setCoursesError(
                "Не вдалося завантажити курси. Перевірте роботу сервера."
            );
        } finally {
            setCoursesLoading(false);
        }
    }, []);

    // Завантажуємо курси під час відкриття сайту
    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    // Відкриття конкретного курсу
    async function openCourse(courseId) {
        setPage("course");
        setSelectedCourse(null);
        setSelectedCourseId(courseId);
        setSelectedLesson(null);

        setCourseLoading(true);
        setCourseError("");

        try {
            const data = await getCourse(courseId);
            setSelectedCourse(data);
        } catch {
            setCourseError(
                "Не вдалося завантажити курс. Перевірте роботу сервера."
            );
        } finally {
            setCourseLoading(false);
        }
    }

    // Відкриття уроку
    function openLesson(lesson) {
        setSelectedLesson(lesson);
        setPage("lesson");
    }

    // Повернення на головну сторінку
    function goHome() {
        setPage("home");
        setSelectedCourse(null);
        setSelectedCourseId(null);
        setSelectedLesson(null);
    }

    return (
        <div className="app-shell">

            <Header onHome={goHome} />

            {page === "home" && (
                <HomePage
                    courses={courses}
                    loading={coursesLoading}
                    error={coursesError}
                    onOpenCourse={openCourse}
                    onRetry={loadCourses}
                />
            )}

            {page === "course" && (
                <CoursePage
                    course={selectedCourse}
                    loading={courseLoading}
                    error={courseError}
                    onBack={goHome}
                    onRetry={() => openCourse(selectedCourseId)}
                    onOpenLesson={openLesson}
                />
            )}

            {page === "lesson" && selectedCourse && selectedLesson && (
                <LessonPage
                    course={selectedCourse}
                    lesson={selectedLesson}
                    onBack={() => setPage("course")}
                />
            )}

            <footer className="site-footer">
                <div className="footer-inner">
                    <span>StudyLite</span>
                    <span>
                        Простір для навчання та розвитку
                    </span>
                </div>
            </footer>

        </div>
    );
}

export default App;
