
export default function LessonPage({
    course,
    lesson,
    onBack
}) {
    return (
        <main className="main-container lesson-container">

            <button
                className="back-button"
                onClick={onBack}
            >
                ← Повернутися до курсу
            </button>

            <article className="lesson-article">

                <span className="eyebrow">
                    {course.title}
                </span>

                <span className="lesson-position">
                    УРОК {lesson.position}
                </span>

                <h1>{lesson.title}</h1>

                <div className="lesson-content">
                    {lesson.content}
                </div>

                <div className="lesson-bottom">

                    <span>
                        Урок {lesson.position} з {course.lessons.length}
                    </span>

                    <button
                        className="primary-button"
                        onClick={onBack}
                    >
                        До списку уроків
                    </button>

                </div>

            </article>

        </main>
    );
}
