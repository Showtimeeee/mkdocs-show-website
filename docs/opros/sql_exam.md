<div class="animate__animated animate__bounce">Тест по SQL</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

Пройди тест по SQL! 15 вопросов, которые проверят твои знания. После завершения теста ты получишь оценку твоего уровня.

<div id="quiz-container">
  <div id="question-container"></div>
  <button id="next-button">Следующий вопрос</button>
  <div id="result-container" style="display: none;"></div>
</div>

<script>
  // Вопросы теста
  const questions = [
    {
      question: "Какая команда используется для создания новой таблицы в SQL?",
      options: ["INSERT INTO", "CREATE TABLE", "SELECT", "UPDATE"],
      answer: "CREATE TABLE"
    },
    {
      question: "Какая команда используется для выборки данных из таблицы?",
      options: ["DELETE", "INSERT INTO", "SELECT", "DROP"],
      answer: "SELECT"
    },
    {
      question: "Что делает оператор WHERE в SQL?",
      options: ["Группирует данные", "Фильтрует строки по условию", "Объединяет таблицы", "Сортирует данные"],
      answer: "Фильтрует строки по условию"
    },
    {
      question: "Какой оператор используется для удаления таблицы из базы данных?",
      options: ["REMOVE TABLE", "DROP TABLE", "DELETE TABLE", "CLEAR TABLE"],
      answer: "DROP TABLE"
    },
    {
      question: "Какая функция используется для подсчёта количества строк в таблице?",
      options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
      answer: "COUNT()"
    },
    {
      question: "Какой тип JOIN возвращает только те строки, которые есть в обеих таблицах?",
      options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      answer: "INNER JOIN"
    },
    {
      question: "Какая команда используется для добавления новых записей в таблицу?",
      options: ["CREATE", "ADD RECORD", "INSERT INTO", "UPDATE"],
      answer: "INSERT INTO"
    },
    {
      question: "Что делает оператор ORDER BY?",
      options: ["Фильтрует данные", "Группирует данные", "Сортирует данные", "Удаляет данные"],
      answer: "Сортирует данные"
    },
    {
      question: "Какой оператор используется для изменения существующих записей в таблице?",
      options: ["ALTER", "MODIFY", "UPDATE", "CHANGE"],
      answer: "UPDATE"
    },
    {
      question: "Какая функция возвращает максимальное значение в столбце?",
      options: ["MIN()", "AVG()", "MAX()", "SUM()"],
      answer: "MAX()"
    },
    {
      question: "Что такое PRIMARY KEY в SQL?",
      options: ["Внешний ключ", "Уникальный идентификатор записи", "Индекс для поиска", "Ограничение на значения"],
      answer: "Уникальный идентификатор записи"
    },
    {
      question: "Какой оператор используется для группировки данных?",
      options: ["ORDER BY", "GROUP BY", "FILTER BY", "SORT BY"],
      answer: "GROUP BY"
    },
    {
      question: "Какой тип JOIN возвращает все строки из левой таблицы и совпадающие строки из правой?",
      options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
      answer: "LEFT JOIN"
    },
    {
      question: "Какой оператор используется для удаления записей из таблицы?",
      options: ["DROP", "REMOVE", "DELETE", "CLEAR"],
      answer: "DELETE"
    },
    {
      question: "Что делает оператор DISTINCT?",
      options: ["Сортирует данные", "Фильтрует данные", "Удаляет дубликаты из результатов", "Группирует данные"],
      answer: "Удаляет дубликаты из результатов"
    },
    {
      question: "Какой оператор используется для объединения результатов двух или более SELECT запросов?",
      options: ["MERGE", "JOIN", "UNION", "COMBINE"],
      answer: "UNION"
    }
  ];

  // Перемешиваем варианты ответов
  questions.forEach(question => {
    question.options.sort(() => Math.random() - 0.5);
  });

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
      message = "Отлично! Вы настоящий эксперт в SQL! 🐘";
    } else if (score >= 8) {
      message = "Хорошо! У вас есть хорошие знания, но есть куда расти. 🐺";
    } else {
      message = "Попробуйте ещё раз! Возможно, стоит углубить свои знания. 🐹";
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
