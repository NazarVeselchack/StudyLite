
function getLessonWord(count) {
    if (count === 1) return "урок";
    if (count >= 2 && count <= 4) return "уроки";
    return "уроків";
}

export default function CoursePage({
    course,
    loading,
    error,
    onBack,
    onRetry,
    onOpenLesson
}) {
    if (loading) {
        return (
            <main className="main-container">
                <div className="state-card">
                    Завантаження курсу...
                </div>
            </main>
        );
    }

    if (error || !course) {
        return (
            <main className="main-container">
                <div className="state-card error-state">
                    <p>{error || "Курс не знайдено."}</p>

                    <button
                        className="primary-button"
                        onClick={onRetry}
                    >
                        Спробувати ще раз
                    </button>

                    <button
                        className="back-button"
                        onClick={onBack}
                    >
                        ← До всіх курсів
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="main-container">

            <button
                className="back-button"
                onClick={onBack}
            >
                ← До всіх курсів
            </button>

            <section className="page-heading">

                <span className="eyebrow">
                    НАВЧАЛЬНИЙ КУРС
                </span>

                <h1>{course.title}</h1>

                <p>{course.description}</p>

            </section>

            <section className="lesson-section">

                <div className="section-heading">
                    <div>
                        <span className="eyebrow">
                            ПРОГРАМА НАВЧАННЯ
                        </span>

                        <h2>Уроки курсу</h2>
                    </div>

                    <span className="courses-total">
                        {course.lessons.length}{" "}
                        {getLessonWord(course.lessons.length)}
                    </span>
                </div>

                <div className="lesson-list">

                    {course.lessons.map((lesson) => (
                        <button
                            className="lesson-row"
                            key={lesson.id}
                            onClick={() => onOpenLesson(lesson)}
                        >

                            <span className="lesson-number">
                                {String(lesson.position).padStart(2, "0")}
                            </span>

                            <span className="lesson-row-text">
                                <strong>{lesson.title}</strong>

                                <small>
                                    Навчальний матеріал
                                </small>
                            </span>

                            <span className="lesson-arrow">
                                →
                            </span>

                        </button>
                    ))}

                    {course.lessons.length === 0 && (
                        <div className="state-card">
                            У цьому курсі поки немає уроків.
                        </div>
                    )}

                </div>

            </section>

        </main>
    );
}
