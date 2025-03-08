# Хакер-мод 💻

## Terminal-Showtime-Bro

<style>
  /* Стили для эффекта Матрицы */
  body {
    background: black;
    color: lime;
    font-family: monospace;
    margin: 0;
    overflow: hidden;
  }

  #matrix-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none; /* Чтобы клики проходили сквозь эффект */
  }

  .matrix-char {
    position: absolute;
    color: lime;
    font-family: monospace;
    font-size: 16px;
    user-select: none; /* Запрет выделения текста */
    animation: fall linear infinite;
    opacity: 0.8;
  }

  @keyframes fall {
    0% {
      transform: translateY(-100%);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  /* Стили для основного контента */
  .content {
    position: relative;
    z-index: 10000;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7); /* Полупрозрачный фон для текста */
    border-radius: 10px;
    margin: 20px;
  }

  /* Стили для аудиоплеера */
  audio {
    width: 100%;
    margin-top: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    padding: 10px;
  }

  audio::-webkit-media-controls-panel {
    background-color: rgba(0, 0, 0, 0.7);
  }

  audio::-webkit-media-controls-play-button,
  audio::-webkit-media-controls-mute-button {
    filter: invert(1); /* Инвертировать цвет кнопок для лучшей видимости */
  }

  /* Стили для терминала */
  #terminal {
    background: black;
    color: lime;
    font-family: monospace;
    padding: 20px;
    border-radius: 5px;
    height: 300px;
    overflow-y: auto;
    border: 1px solid lime;
    position: relative;
    z-index: 10001;
  }

  #terminal-output {
    white-space: pre-wrap;
    word-break: break-all;
  }

  #terminal-input {
    background: transparent;
    border: none;
    color: lime;
    font-family: monospace;
    outline: none;
    width: 80%;
    padding-left: 5px; /* Добавляем отступ для текста */
  }
</style>
<div id="matrix-effect"></div>
<div class="content">

- исопльзуйте команду help


  <div id="terminal">
    <div id="terminal-output"></div>
    <div>
      <span>></span>
      <input id="terminal-input" autofocus>
    </div>
  </div>


<script>
  // Скрипт для эффекта Матрицы
  const matrixEffect = document.getElementById('matrix-effect');

  function createMatrixChar() {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = String.fromCharCode(Math.random() * 128); // Случайный символ
    char.style.left = `${Math.random() * 100}vw`; // Случайная горизонтальная позиция
    char.style.animationDuration = `${Math.random() * 2 + 1}s`; // Случайная скорость
    char.style.opacity = Math.random() * 0.8 + 0.2; // Случайная прозрачность
    matrixEffect.appendChild(char);

    // Удаление символа после завершения анимации
    char.addEventListener('animationend', () => {
      char.remove();
    });
  }

  // Запуск эффекта
  function startMatrixEffect() {
    setInterval(createMatrixChar, 30); // Создаем новый символ каждые 30 мс
  }

  // Остановка эффекта
  function stopMatrixEffect() {
    matrixEffect.innerHTML = ''; // Очищаем контейнер
  }

  // Запуск эффекта при загрузке страницы
  startMatrixEffect();

  // Остановка эффекта при переходе на другую страницу
  window.addEventListener('beforeunload', stopMatrixEffect);

  // Скрипт для терминала
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  // Устанавливаем фокус на поле ввода при загрузке страницы
  terminalInput.focus();

  // Перехватываем все нажатия клавиш
  document.addEventListener('keydown', (e) => {
    // Если поле ввода не в фокусе, устанавливаем фокус на него
    if (document.activeElement !== terminalInput) {
      terminalInput.focus();
    }
  });

  // Обработка ввода команды
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      if (command) {
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        handleCommand(command);
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Прокрутка вниз
      }
    }
  });

  function handleCommand(command) {
  let output = '';
  switch (command.toLowerCase()) {
    case 'help':
      output = `Доступные команды:
- clear: Очистить терминал
- about: Информация о проекте
- hack: Запустить процесс взлома
- admin: Код доступа к admin
- ip: Показать ваш IP-адрес 
- encrypt: Зашифровать данные
- decrypt: Расшифровать данные
- ping: Проверить соединение
- exit: Закрыть терминал 
- sudo: Получить root-доступ 
- hackThePen: Взломать об`;
      break;
    case 'clear':
      terminalOutput.innerHTML = '';
      return;
    case 'about':
      output = 'Хакер-мод v1.6\n Веб-приложение v3.1';
      break;
    case 'hack':
      output = 'Запуск процесса взлома...\nВзлом завершен!';
      break;
    case 'admin':
      output = `01010100 01101000 01100101 00100000 01001101 01100001 01110100 01110010 01101001 01111000 00100000 01101001 01110011 00100000 01100101 01110110 01100101 01110010 01111001 01110111 01101000 01100101 01110010 01100101`;
      break;
    case 'ip':
      output = 'Ваш IP-адрес: 127.0.0.1';
      break;
    case 'encrypt':
      output = 'Данные зашифрованы: X5gH$2kL@9qW';
      break;
    case 'decrypt':
      output = 'Данные расшифрованы: Hello, World!';
      break;
    case 'ping':
      output = 'Pinging 8.8.8.8...\nОтвет от 8.8.8.8: время=10мс';
      break;
    case 'exit':
      output = 'Закрытие терминала...\nТерминал нельзя закрыть!)';
      break;
    case 'sudo':
      output = 'Ошибка: недостаточно прав. Обратитесь к admin.';
      break;
    case 'hackThePen':
      output = 'Запуск глобального взлома...\nВзлом завершен!';
      break;
    default:
      output = `Ошибка: команда "${command}" не найдена. Введите "help" для списка команд.`;
  }
  terminalOutput.innerHTML += `<div>${output}</div>`;
}
</script>

<audio controls preload="metadata" style="width: 100%" autoplay>
  <source src="../audio/mat.mp3" type="audio/mpeg">
  Ваш браузер не поддерживает воспроизведение звука на странице.
</audio>