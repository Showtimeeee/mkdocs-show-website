# <div class="animate__animated animate__bounce">Тест по Flask</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

Пройди тест по Flask! 15 вопросов, которые проверят твои знания. После завершения теста ты получишь оценку твоего уровня.

---

<div id="quiz-container">
  <div id="question-container"></div>
  <button id="next-button">Следующий вопрос</button>
  <div id="result-container" style="display: none;"></div>
</div>

<script>
  // Вопросы теста
  const questions = [
    {
      question: "Что такое Flask?",
      options: ["Микрофреймворк для создания веб-приложений", "База данных", "Инструмент для работы с Docker", "Язык программирования"],
      answer: "Микрофреймворк для создания веб-приложений"
    },
    {
      question: "Какая команда используется для запуска Flask-приложения?",
      options: ["flask run", "python app.py", "flask start", "run flask"],
      answer: "flask run"
    },
    {
      question: "Какой декоратор используется для определения маршрута в Flask?",
      options: ["@app.route", "@route", "@flask.route", "@web.route"],
      answer: "@app.route"
    },
    {
      question: "Как получить данные из формы в Flask?",
      options: ["request.form", "request.data", "request.json", "request.args"],
      answer: "request.form"
    },
    {
      question: "Какая функция используется для рендеринга HTML-шаблонов в Flask?",
      options: ["render_template", "render_html", "template_render", "html_render"],
      answer: "render_template"
    },
    {
      question: "Где хранятся переменные окружения в Flask?",
      options: ["os.environ", "app.config", "flask.env", "settings.py"],
      answer: "os.environ"
    },
    {
      question: "Какой метод HTTP используется для отправки данных на сервер?",
      options: ["POST", "GET", "PUT", "DELETE"],
      answer: "POST"
    },
    {
      question: "Какая библиотека используется для работы с базами данных в Flask?",
      options: ["SQLAlchemy", "Django ORM", "MongoEngine", "Peewee"],
      answer: "SQLAlchemy"
    },
    {
      question: "Как передать параметр в URL в Flask?",
      options: ["@app.route('/user/<id>')", "@app.route('/user?id=')", "@app.route('/user/:id')", "@app.route('/user/{id}')"],
      answer: "@app.route('/user/<id>')"
    },
    {
      question: "Какая команда используется для установки Flask?",
      options: ["pip install flask", "pip install django", "pip install fastapi", "pip install bottle"],
      answer: "pip install flask"
    },
    {
      question: "Какой объект используется для обработки запросов в Flask?",
      options: ["request", "response", "session", "context"],
      answer: "request"
    },
    {
      question: "Как создать секретный ключ в Flask?",
      options: ["app.secret_key = 'your_secret_key'", "app.key = 'your_secret_key'", "app.config['SECRET_KEY'] = 'your_secret_key'", "app.secret = 'your_secret_key'"],
      answer: "app.secret_key = 'your_secret_key'"
    },
    {
      question: "Какая функция используется для перенаправления пользователя на другую страницу?",
      options: ["redirect", "forward", "send_to", "move_to"],
      answer: "redirect"
    },
    {
      question: "Какая функция используется для обработки ошибок в Flask?",
      options: ["@app.errorhandler", "@errorhandler", "@app.exception", "@exceptionhandler"],
      answer: "@app.errorhandler"
    },
    {
      question: "Какая команда используется для создания миграций в Flask с SQLAlchemy?",
      options: ["flask db migrate", "flask migrate", "flask db upgrade", "flask upgrade"],
      answer: "flask db migrate"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const questionContainer = document.getElementById("question-container");
  const nextButton = document.getElementById("next-button");
  const resultContainer = document.getElementById("result-container");

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
      <h3>${currentQuestionIndex + 1}. ${currentQuestion.question}</h3>
      <ul>
        ${currentQuestion.options.map(option => `<li><label><input type="radio" name="answer" value="${option}"> ${option}</label></li>`).join("")}
      </ul>
    `;
  }

  nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
      alert("Выберите ответ!");
      return;
    }

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

    let message = "";
    if (score >= 13) {
      message = "Отлично! Вы настоящий эксперт в Flask! 🚀";
    } else if (score >= 8) {
      message = "Хорошо! У вас есть хорошие знания, но есть куда расти. 🌟";
    } else {
      message = "Попробуйте ещё раз! Возможно, стоит углубить свои знания. 💡";
    }

    resultContainer.innerHTML = `
      <h2>Результаты теста</h2>
      <p>Правильных ответов: ${score}/${questions.length}</p>
      <p>${message}</p>
    `;
  }

  loadQuestion();
</script>

<style>
  /* Общие стили */
  #quiz-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }

  #question-container ul {
    list-style-type: none;
    padding: 0;
  }

  #question-container li {
    margin: 10px 0;
  }

  #next-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #next-button:hover {
    background-color: #0056b3;
  }

  #result-container {
    text-align: center;
  }

  /* Стили для тёмной темы */
  [data-md-color-scheme="slate"] #quiz-container {
    border-color: #424242;
    background-color: #212121;
  }

  [data-md-color-scheme="slate"] .md-typeset {
    color: #e0e0e0;
  }

  [data-md-color-scheme="slate"] input[type="radio"] + label {
    color: #e0e0e0;
  }

  [data-md-color-scheme="slate"] #next-button {
    background-color: #1e88e5;
  }

  [data-md-color-scheme="slate"] #result-container {
    color: #e0e0e0;
  }
</style>

---