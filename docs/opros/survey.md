# <div class="animate__animated animate__bounce">Пройти тест🧪</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

Пройди тест по кибербезопасности! 15 вопросов, которые проверят твои знания. После завершения теста ты получишь оценку твоего уровня.

<div id="quiz-container">
  <div id="question-container"></div>
  <button id="next-button">Следующий вопрос</button>
  <div id="result-container" style="display: none;"></div>
</div>

<script>
  // Вопросы теста
  const questions = [
    {
      question: "Какой модуль в Python используется для работы с криптографическими хэш-функциями?",
      options: ["hashlib", "cryptography", "crypto", "ssl"],
      answer: "hashlib"
    },
    {
      question: "Что делает функция os.urandom() в Python?",
      options: ["Генерирует случайное число", "Генерирует криптографически безопасные случайные байты", "Шифрует данные", "Дешифрует данные"],
      answer: "Генерирует криптографически безопасные случайные байты"
    },
    {
      question: "Какая уязвимость связана с использованием eval() в Python?",
      options: ["SQL-инъекция", "XSS", "Code Injection", "CSRF"],
      answer: "Code Injection"
    },
    {
      question: "Какой протокол обеспечивает безопасное соединение между клиентом и сервером?",
      options: ["HTTP", "FTP", "SMTP", "HTTPS"],
      answer: "HTTPS"
    },
    {
      question: "Какой метод в Python используется для безопасного сравнения строк (например, паролей)?",
      options: ["==", "is", "str.compare()", "hmac.compare_digest()"],
      answer: "hmac.compare_digest()"
    },
    {
      question: "Что такое XSS?",
      options: ["Уязвимость, позволяющая внедрять скрипты в веб-страницы", "Метод шифрования данных", "Библиотека для работы с базами данных", "Формат передачи данных"],
      answer: "Уязвимость, позволяющая внедрять скрипты в веб-страницы"
    },
    {
      question: "Какой модуль в Python используется для работы с SSL/TLS?",
      options: ["ssl", "http", "socket", "requests"],
      answer: "ssl"
    },
    {
      question: "Какой метод аутентификации считается наиболее безопасным?",
      options: ["Basic Auth", "OAuth 2.0", "Digest Auth", "Token Auth"],
      answer: "OAuth 2.0"
    },
    {
      question: "Что такое CSRF?",
      options: ["Атака, при которой злоумышленник выполняет действия от имени пользователя", "Метод шифрования данных", "Уязвимость в базах данных", "Формат передачи данных"],
      answer: "Атака, при которой злоумышленник выполняет действия от имени пользователя"
    },
    {
      question: "Какой метод в Python используется для генерации надёжных паролей?",
      options: ["random.choice()", "secrets.token_hex()", "os.urandom()", "string.random()"],
      answer: "secrets.token_hex()"
    },
    {
      question: "Что такое SQL-инъекция?",
      options: ["Атака, при которой злоумышленник внедряет вредоносный SQL-код", "Метод шифрования данных", "Уязвимость в базах данных", "Формат передачи данных"],
      answer: "Атака, при которой злоумышленник внедряет вредоносный SQL-код"
    },
    {
      question: "Какой метод в Python используется для безопасной сериализации данных?",
      options: ["pickle", "json", "marshal", "yaml"],
      answer: "json"
    },
    {
      question: "Что такое JWT?",
      options: ["Формат токена для аутентификации", "Метод шифрования данных", "Уязвимость в базах данных", "Формат передачи данных"],
      answer: "Формат токена для аутентификации"
    },
    {
      question: "Какой метод в Python используется для проверки целостности данных?",
      options: ["hashlib.sha256()", "hmac.new()", "os.urandom()", "secrets.compare_digest()"],
      answer: "hmac.new()"
    },
    {
      question: "Какой метод в Python используется для безопасного выполнения команд в системе?",
      options: ["os.system()", "subprocess.run()", "exec()", "eval()"],
      answer: "subprocess.run()"
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
      message = "Отлично! Вы настоящий эксперт в Python и безопасности!🐘";
    } else if (score >= 8) {
      message = "Хорошо! У вас есть хорошие знания, но есть куда расти.🐺";
    } else {
      message = "Попробуйте ещё раз! Возможно, стоит углубить свои знания.🐹";
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
