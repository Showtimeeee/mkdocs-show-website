<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест по REST API</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <style>
        /* Общие стили */
        #quiz-container {
            max-width: 700px;
            margin: 0 auto;
            padding: 30px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        #question-container ul {
            list-style-type: none;
            padding: 0;
        }

        #question-container li {
            margin: 15px 0;
            padding: 10px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        #question-container li:hover {
            background-color: #f0f0f0;
        }

        #next-button {
            display: block;
            margin: 30px auto 20px;
            padding: 12px 30px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        #next-button:hover {
            background-color: #0056b3;
        }

        #result-container {
            text-align: center;
            padding: 20px;
        }

        .progress-bar {
            width: 100%;
            height: 10px;
            background-color: #e0e0e0;
            border-radius: 5px;
            margin-bottom: 20px;
            overflow: hidden;
        }

        .progress {
            height: 100%;
            background-color: #4caf50;
            transition: width 0.3s ease;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }

        .description {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
        }

        /* Стили для тёмной темы */
        [data-md-color-scheme="slate"] #quiz-container {
            border-color: #424242;
            background-color: #212121;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        [data-md-color-scheme="slate"] .md-typeset {
            color: #e0e0e0;
        }

        [data-md-color-scheme="slate"] input[type="radio"] + label {
            color: #e0e0e0;
        }

        [data-md-color-scheme="slate"] #question-container li:hover {
            background-color: #2d2d2d;
        }

        [data-md-color-scheme="slate"] #next-button {
            background-color: #1e88e5;
        }

        [data-md-color-scheme="slate"] #result-container {
            color: #e0e0e0;
        }

        [data-md-color-scheme="slate"] h1 {
            color: #e0e0e0;
        }

        [data-md-color-scheme="slate"] .description {
            color: #b0b0b0;
        }

        [data-md-color-scheme="slate"] .progress-bar {
            background-color: #424242;
        }
    </style>
</head>
<body>
    <h1 class="animate__animated animate__bounce">📚 Тест по REST API</h1>
    <p class="description">Пройди тест из 25 вопросов и проверь свой уровень знаний. После завершения ты получишь детальную оценку.</p>

    <div id="quiz-container">
        <div class="progress-bar">
            <div class="progress" id="progress" style="width: 0%;"></div>
        </div>
        <div id="question-container"></div>
        <button id="next-button">Следующий вопрос →</button>
        <div id="result-container" style="display: none;"></div>
    </div>

    <script>
        // Расширенный набор вопросов по REST API
        const questions = [
            {
                question: "Что такое REST?",
                options: ["Архитектурный стиль для распределённых систем", "Язык программирования", "База данных", "Фреймворк"],
                answer: "Архитектурный стиль для распределённых систем"
            },
            {
                question: "Какой HTTP-метод используется для получения данных?",
                options: ["GET", "POST", "PUT", "DELETE"],
                answer: "GET"
            },
            {
                question: "Какой HTTP-метод используется для создания новых ресурсов?",
                options: ["POST", "GET", "PUT", "PATCH"],
                answer: "POST"
            },
            {
                question: "Что такое CRUD в контексте REST API?",
                options: ["Create, Read, Update, Delete", "Cache, Request, Upload, Download", "Call, Response, Update, Deploy", "Connect, Run, Undo, Delete"],
                answer: "Create, Read, Update, Delete"
            },
            {
                question: "Какой HTTP-статус указывает на успешное выполнение запроса?",
                options: ["200", "404", "500", "403"],
                answer: "200"
            },
            {
                question: "Какой HTTP-статус указывает на то, что ресурс не найден?",
                options: ["404", "403", "500", "200"],
                answer: "404"
            },
            {
                question: "Что такое endpoint в REST API?",
                options: ["URL для доступа к определённому ресурсу", "Метод HTTP-запроса", "Статус ответа сервера", "Формат данных"],
                answer: "URL для доступа к определённому ресурсу"
            },
            {
                question: "Какой формат данных чаще всего используется в REST API?",
                options: ["JSON", "XML", "CSV", "YAML"],
                answer: "JSON"
            },
            {
                question: "Какой HTTP-метод используется для полного обновления существующего ресурса?",
                options: ["PUT", "POST", "PATCH", "GET"],
                answer: "PUT"
            },
            {
                question: "Какой HTTP-метод используется для частичного обновления ресурса?",
                options: ["PATCH", "PUT", "POST", "DELETE"],
                answer: "PATCH"
            },
            {
                question: "Что такое HATEOAS в контексте REST API?",
                options: ["Подход, при котором API предоставляет ссылки для навигации", "Метод шифрования данных", "Формат сериализации данных", "Способ аутентификации"],
                answer: "Подход, при котором API предоставляет ссылки для навигации"
            },
            {
                question: "Какой заголовок HTTP используется для указания типа контента в запросе или ответе?",
                options: ["Content-Type", "Authorization", "Accept", "Cache-Control"],
                answer: "Content-Type"
            },
            {
                question: "Какой заголовок HTTP используется для передачи токена авторизации?",
                options: ["Authorization", "Content-Type", "Accept", "Cache-Control"],
                answer: "Authorization"
            },
            {
                question: "Что такое idempotent в контексте HTTP-методов?",
                options: ["Операция, которая даёт одинаковый результат при многократном выполнении", "Операция, которая изменяет состояние системы", "Операция, которая создаёт новые данные", "Операция, которая удаляет данные"],
                answer: "Операция, которая даёт одинаковый результат при многократном выполнении"
            },
            {
                question: "Какой HTTP-метод является идемпотентным?",
                options: ["GET", "POST", "PATCH", "DELETE"],
                answer: "GET"
            },
            {
                question: "Какой HTTP статус код означает 'Успешное создание ресурса'?",
                options: ["201", "200", "202", "204"],
                answer: "201"
            },
            {
                question: "Что означает статус код 401?",
                options: ["Unauthorized (не авторизован)", "Forbidden (доступ запрещён)", "Bad Request", "Payment Required"],
                answer: "Unauthorized (не авторизован)"
            },
            {
                question: "В чём основное различие между PUT и PATCH?",
                options: ["PUT обновляет ресурс полностью, PATCH - частично", "PUT создаёт ресурс, PATCH обновляет", "PUT безопасный метод, PATCH - нет", "PUT используется только для создания, PATCH для удаления"],
                answer: "PUT обновляет ресурс полностью, PATCH - частично"
            },
            {
                question: "Какой заголовок клиент может использовать для указания предпочитаемого формата ответа?",
                options: ["Accept", "Content-Type", "Prefer", "Accept-Language"],
                answer: "Accept"
            },
            {
                question: "Что означает статус код 500?",
                options: ["Internal Server Error", "Bad Gateway", "Service Unavailable", "Gateway Timeout"],
                answer: "Internal Server Error"
            },
            {
                question: "Какой принцип НЕ является обязательным ограничением REST?",
                options: ["SOAP", "Отсутствие состояния (Stateless)", "Клиент-сервер", "Кэширование"],
                answer: "SOAP"
            },
            {
                question: "Как правильно спроектировать endpoint для получения информации о пользователе с ID 123?",
                options: ["/users/123", "/getUser?id=123", "/user?id=123", "/users/get/123"],
                answer: "/users/123"
            },
            {
                question: "Что означает статус код 403?",
                options: ["Forbidden (доступ запрещён)", "Not Found", "Bad Request", "Method Not Allowed"],
                answer: "Forbidden (доступ запрещён)"
            },
            {
                question: "Какой HTTP метод обычно используется для удаления ресурса?",
                options: ["DELETE", "REMOVE", "ERASE", "CLEAR"],
                answer: "DELETE"
            },
            {
                question: "Что такое query параметр в URL?",
                options: ["Часть URL после ? для фильтрации данных", "Часть пути к ресурсу", "Заголовок запроса", "Метод HTTP"],
                answer: "Часть URL после ? для фильтрации данных"
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = new Array(questions.length).fill(null);

        const questionContainer = document.getElementById("question-container");
        const nextButton = document.getElementById("next-button");
        const resultContainer = document.getElementById("result-container");
        const progressBar = document.getElementById("progress");

        // Функция для перемешивания массива
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function updateProgress() {
            const progress = ((currentQuestionIndex) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            // Перемешиваем варианты ответа
            const shuffledOptions = shuffleArray([...currentQuestion.options]);
            
            // Проверяем, был ли уже выбран ответ на этот вопрос
            const previousAnswer = userAnswers[currentQuestionIndex];

            questionContainer.innerHTML = `
                <h3>${currentQuestionIndex + 1}. ${currentQuestion.question}</h3>
                <ul>
                    ${shuffledOptions.map(option => `
                        <li>
                            <label>
                                <input type="radio" name="answer" value="${option}" 
                                    ${previousAnswer === option ? 'checked' : ''}> 
                                ${option}
                            </label>
                        </li>
                    `).join("")}
                </ul>
            `;
            
            updateProgress();
        }

        nextButton.addEventListener("click", () => {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            
            if (!selectedAnswer) {
                alert("Пожалуйста, выберите ответ!");
                return;
            }

            // Сохраняем ответ пользователя
            userAnswers[currentQuestionIndex] = selectedAnswer.value;

            // Проверяем правильность ответа
            if (selectedAnswer.value === questions[currentQuestionIndex].answer) {
                score++;
            }

            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        });

        function showResult() {
            questionContainer.style.display = "none";
            nextButton.style.display = "none";
            resultContainer.style.display = "block";
            
            // Обновляем прогресс бар до 100%
            progressBar.style.width = "100%";

            const percentage = Math.round((score / questions.length) * 100);

            let level = "";
            let recommendation = "";
            let emoji = "";

            if (percentage >= 90) {
                level = "Эксперт";
                recommendation = "Ваши знания по REST API впечатляют! Вы готовы проектировать сложные API и обучать других.";
                emoji = "🏆";
            } else if (percentage >= 75) {
                level = "Продвинутый";
                recommendation = "Хорошая работа! У вас твёрдые знания, но есть ещё несколько моментов для изучения.";
                emoji = "🚀";
            } else if (percentage >= 50) {
                level = "Средний";
                recommendation = "Неплохо! Вы знаете основы, но рекомендуется углубить знания в некоторых областях.";
                emoji = "📚";
            } else if (percentage >= 25) {
                level = "Начинающий";
                recommendation = "Вы только начинаете путь в мир REST API. Продолжайте изучение!";
                emoji = "🌱";
            } else {
                level = "Новичок";
                recommendation = "Не расстраивайтесь! REST API - важная тема, и с практикой ваши знания улучшатся.";
                emoji = "💪";
            }

            // Детальный разбор результатов
            let detailedFeedback = "";
            if (score < questions.length) {
                detailedFeedback = "<h3>Вопросы для повторения:</h3><ul>";
                for (let i = 0; i < questions.length; i++) {
                    if (userAnswers[i] !== questions[i].answer) {
                        detailedFeedback += `
                            <li style="margin-bottom: 15px; text-align: left;">
                                <strong>Вопрос ${i + 1}:</strong> ${questions[i].question}<br>
                                <span style="color: #f44336;">❌ Ваш ответ: ${userAnswers[i] || 'Не отвечен'}</span><br>
                                <span style="color: #4caf50;">✅ Правильный ответ: ${questions[i].answer}</span>
                            </li>
                        `;
                    }
                }
                detailedFeedback += "</ul>";
            }

            resultContainer.innerHTML = `
                <h2>📊 Результаты теста</h2>
                <div style="font-size: 24px; margin: 20px 0;">${emoji}</div>
                <h3 style="color: #007bff;">${level}</h3>
                <p style="font-size: 20px;"><strong>Правильных ответов: ${score}/${questions.length} (${percentage}%)</strong></p>
                <p style="font-style: italic; margin: 20px 0;">${recommendation}</p>
                ${score < questions.length ? detailedFeedback : '<p style="color: #4caf50; font-size: 18px;">🎉 Поздравляем с идеальным результатом!</p>'}
                <button onclick="location.reload()" style="
                    margin-top: 20px;
                    padding: 12px 30px;
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                ">🔄 Пройти тест заново</button>
            `;
        }

        // Загружаем первый вопрос
        loadQuestion();
    </script>
</body>
</html>
