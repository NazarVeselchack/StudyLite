
function getLessonWord(count) {
    if (count === 1) return "урок";
    if (count >= 2 && count <= 4) return "уроки";
    return "уроків";
}

export default function HomePage({
    courses,
    loading,
    error,
    onOpenCourse,
    onRetry
}) {
    return (
        <main className="main-container">

            <section className="hero">

                <div className="hero-content">
                    <span className="eyebrow">
                        ПЛАТФОРМА ДИСТАНЦІЙНОГО НАВЧАННЯ
                    </span>

                    <h1>
                        Навчайтеся у власному темпі
                    </h1>

                    <p>
                        Вивчайте нові технології, відкривайте
                        цікаві курси та розвивайте свої навички
                        разом зі StudyLite.
                    </p>

                    <div className="hero-stat">
                        <strong>{courses.length}</strong>
                        <span>навчальні курси доступні зараз</span>
                    </div>
                </div>

                <div className="hero-art" aria-hidden="true">
                    <div className="hero-art-card">

                        <span className="art-label">
                            ВАШ НАСТУПНИЙ КРОК
                        </span>

                        <strong>
                            Нові знання
                            <br />
                            щодня
                        </strong>

                        <div className="art-progress">
                            <span />
                        </div>

                        <small>
                            Навчання у власному темпі
                        </small>

                    </div>
                </div>

            </section>

            <section className="courses-section">

                <div className="section-heading">
                    <div>
                        <span className="eyebrow">
                            НАВЧАЛЬНІ МАТЕРІАЛИ
                        </span>

                        <h2>Доступні курси</h2>
                    </div>

                    <span className="courses-total">
                        {courses.length} курсів
                    </span>
                </div>

                {loading && (
                    <div className="state-card">
                        Завантаження курсів...
                    </div>
                )}

                {error && (
                    <div className="state-card error-state">
                        <p>{error}</p>

                        <button
                            className="primary-button"
                            onClick={onRetry}
                        >
                            Спробувати ще раз
                        </button>
                    </div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <div className="state-card">
                        Наразі доступних курсів немає.
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (
                    <div className="course-grid">

                        {courses.map((course, index) => (
                            <button
                                className="course-card"
                                key={course.id}
                                onClick={() => onOpenCourse(course.id)}
                            >

                                <div className="course-card-top">

                                    <span
                                        className={`course-icon course-icon-${index % 3}`}
                                    >
                                        {index % 2 === 0 ? "</>" : "JS"}
                                    </span>

                                    <span className="course-tag">
                                        Курс
                                    </span>

                                </div>

                                <h3>{course.title}</h3>

                                <p>{course.description}</p>

                                <div className="course-card-footer">

                                    <span>
                                        {course.lessonCount}{" "}
                                        {getLessonWord(course.lessonCount)}
                                    </span>

                                    <span className="card-action">
                                        Переглянути курс →
                                    </span>

                                </div>

                            </button>
                        ))}

                    </div>
                )}

            </section>

        </main>
    );
}
