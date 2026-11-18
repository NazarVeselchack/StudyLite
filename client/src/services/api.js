
const API_URL = "http://localhost:3001/api";

// Обробка відповіді сервера
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Сталася помилка під час запиту."
        );
    }

    return data;
}

// Отримання всіх курсів
export async function getCourses() {
    const response = await fetch(`${API_URL}/courses`);
    return handleResponse(response);
}

// Отримання конкретного курсу разом з уроками
export async function getCourse(courseId) {
    const response = await fetch(`${API_URL}/courses/${courseId}`);
    return handleResponse(response);
}
