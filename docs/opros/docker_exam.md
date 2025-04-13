# <div class="animate__animated animate__bounce">Тест по Docker🐳</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

Пройди тест по Docker! 15 вопросов, которые проверят твои знания. После завершения теста ты получишь оценку твоего уровня.

<div id="quiz-container">
  <div id="question-container"></div>
  <button id="next-button">Следующий вопрос</button>
  <div id="result-container" style="display: none;"></div>
</div>

<script>
  // Вопросы теста
  const questions = [
    {
      question: "Что такое Docker?",
      options: ["Платформа для контейнеризации приложений", "Язык программирования", "База данных", "Фреймворк"],
      answer: "Платформа для контейнеризации приложений"
    },
    {
      question: "Как называется файл, который используется для создания Docker-образа?",
      options: ["Dockerfile", "docker-compose.yml", "container.json", "image.yaml"],
      answer: "Dockerfile"
    },
    {
      question: "Какая команда используется для сборки Docker-образа?",
      options: ["docker build", "docker run", "docker start", "docker create"],
      answer: "docker build"
    },
    {
      question: "Какая команда используется для запуска контейнера из образа?",
      options: ["docker run", "docker start", "docker exec", "docker launch"],
      answer: "docker run"
    },
    {
      question: "Что такое Docker Hub?",
      options: ["Реестр Docker-образов", "Интерфейс для управления контейнерами", "Локальное хранилище контейнеров", "Утилита командной строки"],
      answer: "Реестр Docker-образов"
    },
    {
      question: "Какая команда используется для просмотра запущенных контейнеров?",
      options: ["docker ps", "docker list", "docker show", "docker inspect"],
      answer: "docker ps"
    },
    {
      question: "Что такое Docker Compose?",
      options: ["Инструмент для управления многоконтейнерными приложениями", "Средство для сборки образов", "Интерфейс для работы с Docker Hub", "Утилита для мониторинга контейнеров"],
      answer: "Инструмент для управления многоконтейнерными приложениями"
    },
    {
      question: "Какой формат файла используется в Docker Compose?",
      options: ["YAML", "JSON", "XML", "TOML"],
      answer: "YAML"
    },
    {
      question: "Какая команда используется для остановки контейнера?",
      options: ["docker stop", "docker kill", "docker pause", "docker remove"],
      answer: "docker stop"
    },
    {
      question: "Что такое Volume в Docker?",
      options: ["Механизм для хранения данных вне контейнера", "Файл конфигурации контейнера", "Образ контейнера", "Логи контейнера"],
      answer: "Механизм для хранения данных вне контейнера"
    },
    {
      question: "Какая команда используется для удаления Docker-образа?",
      options: ["docker rmi", "docker rm", "docker delete", "docker remove"],
      answer: "docker rmi"
    },
    {
      question: "Что такое Docker Network?",
      options: ["Сеть для взаимодействия между контейнерами", "Интерфейс для управления контейнерами", "Логи контейнера", "Файл конфигурации сети"],
      answer: "Сеть для взаимодействия между контейнерами"
    },
    {
      question: "Какая команда используется для входа в работающий контейнер?",
      options: ["docker exec", "docker attach", "docker run", "docker start"],
      answer: "docker exec"
    },
    {
      question: "Что такое Layer (слой) в Docker?",
      options: ["Уровень в файловой системе образа", "Контейнер", "Образ", "Лог контейнера"],
      answer: "Уровень в файловой системе образа"
    },
    {
      question: "Какая команда используется для просмотра логов контейнера?",
      options: ["docker logs", "docker inspect", "docker debug", "docker trace"],
      answer: "docker logs"
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
      message = "Отлично! Вы настоящий эксперт в Docker! 🐳";
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