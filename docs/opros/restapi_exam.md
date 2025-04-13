# <div class="animate__animated animate__bounce">Тест по REST API</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

Пройди тест по REST API 15 вопросов, которые проверят твои знания. После завершения теста ты получишь оценку твоего уровня.

<div id="quiz-container">
  <div id="question-container"></div>
  <button id="next-button">Следующий вопрос</button>
  <div id="result-container" style="display: none;"></div>
</div>

<script>
  // Вопросы теста
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
      options: ["200 OK", "404 Not Found", "500 Internal Server Error", "403 Forbidden"],
      answer: "200 OK"
    },
    {
      question: "Какой HTTP-статус указывает на то, что ресурс не найден?",
      options: ["404 Not Found", "403 Forbidden", "500 Internal Server Error", "200 OK"],
      answer: "404 Not Found"
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
      question: "Какой HTTP-метод используется для обновления существующего ресурса?",
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
      options: ["GET", "POST", "DELETE", "PATCH"],
      answer: "GET"
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
      message = "Отлично! Вы настоящий эксперт в REST API 🚀";
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
