<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест по Pytest</title>
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
    <h1 class="animate__animated animate__bounce">🧪 Тест по Pytest</h1>
    <p class="description">Проверь свои знания по тестированию на Python с Pytest. 25 вопросов от основ до продвинутых тем.</p>

    <div id="quiz-container">
        <div class="progress-bar">
            <div class="progress" id="progress" style="width: 0%;"></div>
        </div>
        <div id="question-container"></div>
        <button id="next-button">Следующий вопрос →</button>
        <div id="result-container" style="display: none;"></div>
    </div>

    <script>
        // Расширенный набор вопросов по Pytest
        const questions = [
            {
                question: "Что такое Pytest?",
                options: [
                    "Фреймворк для тестирования на Python",
                    "База данных",
                    "Веб-сервер",
                    "Система контроля версий"
                ],
                answer: "Фреймворк для тестирования на Python"
            },
            {
                question: "Какой командой запускаются все тесты в текущей директории?",
                options: ["pytest", "python test.py", "run tests", "test all"],
                answer: "pytest"
            },
            {
                question: "Какое расширение файлов обычно используют для тестов Pytest?",
                options: ["test_*.py или *_test.py", "*.spec.py", "*.tests.py", "*.unittest.py"],
                answer: "test_*.py или *_test.py"
            },
            {
                question: "Какой декоратор используется для фикстур в Pytest?",
                options: ["@pytest.fixture", "@pytest.setup", "@fixture", "@pytest.prepare"],
                answer: "@pytest.fixture"
            },
            {
                question: "Что такое фикстура (fixture) в Pytest?",
                options: [
                    "Функция для подготовки данных и окружения перед тестами",
                    "Тип тестовых данных",
                    "Способ группировки тестов",
                    "Декоратор для пропуска тестов"
                ],
                answer: "Функция для подготовки данных и окружения перед тестами"
            },
            {
                question: "Какой метод используется для проверки равенства в Pytest?",
                options: ["assert", "equals", "check", "verify"],
                answer: "assert"
            },
            {
                question: "Как пропустить тест в Pytest?",
                options: [
                    "@pytest.mark.skip",
                    "@pytest.ignore",
                    "@pytest.pass",
                    "@pytest.disable"
                ],
                answer: "@pytest.mark.skip"
            },
            {
                question: "Что делает параметр `-v` при запуске Pytest?",
                options: [
                    "Увеличивает подробность вывода (verbose)",
                    "Запускает только упавшие тесты",
                    "Показывает версию",
                    "Включает отладку"
                ],
                answer: "Увеличивает подробность вывода (verbose)"
            },
            {
                question: "Какой декоратор используется для параметризации тестов?",
                options: [
                    "@pytest.mark.parametrize",
                    "@pytest.param",
                    "@pytest.mark.parameterize",
                    "@pytest.parameters"
                ],
                answer: "@pytest.mark.parametrize"
            },
            {
                question: "Что делает `tmp_path` фикстура?",
                options: [
                    "Создаёт временную директорию для теста",
                    "Очищает кэш",
                    "Сохраняет временные файлы",
                    "Создаёт резервную копию"
                ],
                answer: "Создаёт временную директорию для теста"
            },
            {
                question: "Как сгруппировать тесты по категориям?",
                options: [
                    "@pytest.mark.имя_метки",
                    "@pytest.category",
                    "@pytest.group",
                    "@pytest.tag"
                ],
                answer: "@pytest.mark.имя_метки"
            },
            {
                question: "Что такое monkeypatch в Pytest?",
                options: [
                    "Фикстура для изменения объектов и окружения во время тестов",
                    "Вид обезьяны",
                    "Декоратор для тестов",
                    "Плагин для отладки"
                ],
                answer: "Фикстура для изменения объектов и окружения во время тестов"
            },
            {
                question: "Как проверить, что код вызывает исключение?",
                options: [
                    "with pytest.raises(Исключение)",
                    "assert raises",
                    "expect exception",
                    "catch exception"
                ],
                answer: "with pytest.raises(Исключение)"
            },
            {
                question: "Что делает фикстура `capsys`?",
                options: [
                    "Захватывает вывод в stdout/stderr",
                    "Создаёт виртуальную файловую систему",
                    "Управляет системными вызовами",
                    "Кэширует результаты тестов"
                ],
                answer: "Захватывает вывод в stdout/stderr"
            },
            {
                question: "Какой файл конфигурации использует Pytest?",
                options: [
                    "pytest.ini",
                    "config.ini",
                    "pytest.config",
                    "setup.cfg (тоже может использоваться)"
                ],
                answer: "pytest.ini (или setup.cfg, tox.ini)"
            },
            {
                question: "Как запустить только тесты из конкретного файла?",
                options: [
                    "pytest test_file.py",
                    "pytest --file test_file.py",
                    "pytest -f test_file.py",
                    "pytest test_file"
                ],
                answer: "pytest test_file.py"
            },
            {
                question: "Что означает параметр `-x` при запуске Pytest?",
                options: [
                    "Остановить после первой ошибки",
                    "Включить отладку",
                    "Вывести подробный отчет",
                    "Игнорировать предупреждения"
                ],
                answer: "Остановить после первой ошибки"
            },
            {
                question: "Как отметить тест как ожидаемо падающий (ожидается ошибка)?",
                options: [
                    "@pytest.mark.xfail",
                    "@pytest.mark.fail",
                    "@pytest.mark.expected_failure",
                    "@pytest.mark.broken"
                ],
                answer: "@pytest.mark.xfail"
            },
            {
                question: "Что такое conftest.py?",
                options: [
                    "Файл для хранения общих фикстур и хуков",
                    "Конфигурационный файл",
                    "Файл с тестами",
                    "Файл зависимостей"
                ],
                answer: "Файл для хранения общих фикстур и хуков"
            },
            {
                question: "Как указать область видимости (scope) фикстуры?",
                options: [
                    "@pytest.fixture(scope='...')",
                    "@pytest.scope('...')",
                    "@fixture(scope='...')",
                    "@pytest.fixture.scope('...')"
                ],
                answer: "@pytest.fixture(scope='...')"
            },
            {
                question: "Какие области видимости (scope) бывают у фикстур?",
                options: [
                    "function, class, module, package, session",
                    "local, global, test, suite",
                    "small, medium, large",
                    "unit, integration, e2e"
                ],
                answer: "function, class, module, package, session"
            },
            {
                question: "Что делает параметр `-k` при запуске Pytest?",
                options: [
                    "Запускает тесты по имени (keyword expression)",
                    "Показывает покрытие кода",
                    "Кэширует результаты",
                    "Запускает тесты параллельно"
                ],
                answer: "Запускает тесты по имени (keyword expression)"
            },
            {
                question: "Как создать собственную метку (mark) для тестов?",
                options: [
                    "Зарегистрировать в pytest.ini и использовать @pytest.mark.имя",
                    "Просто написать @pytest.mark.имя",
                    "Создать декоратор",
                    "Добавить в conftest.py"
                ],
                answer: "Зарегистрировать в pytest.ini и использовать @pytest.mark.имя"
            },
            {
                question: "Что такое плагины в Pytest?",
                options: [
                    "Дополнительные модули, расширяющие функциональность",
                    "Встроенные функции",
                    "Тестовые данные",
                    "Фикстуры"
                ],
                answer: "Дополнительные модули, расширяющие функциональность"
            },
            {
                question: "Какой плагин используется для измерения покрытия кода тестами?",
                options: [
                    "pytest-cov",
                    "pytest-coverage",
                    "pytest-cover",
                    "pytest-codecov"
                ],
                answer: "pytest-cov"
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
                level = "Гуру тестирования";
                recommendation = "Феноменально! Вы знаете Pytest на уровне опытного разработчика. Ваши тесты будут надёжными и эффективными!";
                emoji = "🏆";
            } else if (percentage >= 75) {
                level = "Продвинутый тестировщик";
                recommendation = "Отличный результат! Вы хорошо знаете Pytest, но есть ещё несколько продвинутых тем для изучения.";
                emoji = "🚀";
            } else if (percentage >= 50) {
                level = "Средний уровень";
                recommendation = "Неплохо! Вы освоили основы Pytest. Рекомендуется изучить фикстуры и параметризацию подробнее.";
                emoji = "📚";
            } else if (percentage >= 25) {
                level = "Начинающий";
                recommendation = "Вы только начинаете знакомство с Pytest. Продолжайте практиковаться - тестирование важный навык!";
                emoji = "🌱";
            } else {
                level = "Новичок";
                recommendation = "Не расстраивайтесь! Pytest - мощный инструмент, и с практикой вы обязательно его освоите.";
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
                <h2>📊 Результаты теста по Pytest</h2>
                <div style="font-size: 24px; margin: 20px 0;">${emoji}</div>
                <h3 style="color: #007bff;">${level}</h3>
                <p style="font-size: 20px;"><strong>Правильных ответов: ${score}/${questions.length} (${percentage}%)</strong></p>
                <p style="font-style: italic; margin: 20px 0;">${recommendation}</p>
                ${score < questions.length ? detailedFeedback : '<p style="color: #4caf50; font-size: 18px;">🎉 Поздравляем с идеальным результатом! Вы настоящий эксперт по Pytest!</p>'}
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