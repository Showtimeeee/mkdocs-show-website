<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hacker Mode</title>
<style>
  body {
    background: black;
    color: lime;
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    overflow: hidden;
    display: flex;
    height: 100vh;
  }

  #matrix-effect {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    pointer-events: none;
    clip-path: inset(50px 0 0 0); /* Prevent symbols from overlapping the top panel */
  }

  .matrix-char {
    position: absolute;
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
    user-select: none;
    animation: fall linear infinite;
    opacity: 0.8;
    color: lime;
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

  .content {
    position: relative;
    z-index: 10000;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    margin: 20px;
    max-width: 1200px; /* ← Добавьте это для ограничения ширины */
    width: 100%; /* ← Или это для процентной ширины */
}

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
    filter: invert(1);
  }

  #terminal {
    background: black;
    color: lime;
    font-family: 'Courier New', Courier, monospace;
    padding: 20px;
    border-radius: 5px;
    height: 500px; /* Increased height for a more rectangular shape */
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
    font-family: 'Courier New', Courier, monospace;
    outline: none;
    width: 80%;
    padding-left: 5px;
  }

  @keyframes glitch {
    0%, 100% {
      text-shadow: 0.05em 0 0 lime, -0.05em 0 0 lime;
    }
    20% {
      text-shadow: 0.05em 0 0 lime, -0.05em -0.05em 0 lime;
    }
    40% {
      text-shadow: 0.05em -0.05em 0 lime, -0.05em 0.05em 0 lime;
    }
    60% {
      text-shadow: 0.05em 0.05em 0 lime, -0.05em 0 0 lime;
    }
    80% {
      text-shadow: 0.05em 0 0 lime, -0.05em -0.05em 0 lime;
    }
  }

  .glitch {
    animation: glitch 0.2s infinite;
  }
</style>
</head>
<body>
<div id="matrix-effect"></div>
<div class="content">
  <h1 class="glitch">Хакер-мод💻</h1>
  <span class="glitch">Terminal-Showtime-Bro</span> 
  <p>Используйте команду help</p>
  <div id="terminal">
    <div id="terminal-output"></div>
    <div>
      <span>></span>
      <input id="terminal-input" autofocus>
    </div>
  </div>
</div>

<script>
  const matrixEffect = document.getElementById('matrix-effect');
  const matrixChars = 'アァカサタナハマヤャラザワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';

  function createMatrixChar() {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    char.style.left = `${Math.random() * 100}vw`;
    char.style.animationDuration = `${Math.random() * 3 + 2}s`;
    char.style.animationDelay = `${Math.random() * 5}s`;
    matrixEffect.appendChild(char);

    char.addEventListener('animationend', () => {
      char.remove();
    });
  }

  function startMatrixEffect() {
    setInterval(createMatrixChar, 50);
  }

  function stopMatrixEffect() {
    matrixEffect.innerHTML = '';
  }

  startMatrixEffect();

  window.addEventListener('beforeunload', stopMatrixEffect);

  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  terminalInput.focus();

  document.addEventListener('keydown', (e) => {
    if (document.activeElement !== terminalInput) {
      terminalInput.focus();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      if (command) {
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        handleCommand(command);
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
- admin: Получить доступ к админке
- ip: Показать ваш IP-адрес
- encrypt: Зашифровать данные
- decrypt: Расшифровать данные
- ping: Проверить соединение
- sudo: Получить root-доступ
- sql: Выполнить SQL-инъекцию
- scan: Сканировать порты
- brute: Запустить brute force атаку
- ddos: Запустить DDoS атаку
- bypass: Обойти защиту
- hacktheworld: Взломать весь мир`;
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        return;
      case 'about':
        output = 'Terminal-Showtime-Bro v1.6\nВеб-приложение v3.1';
        break;
      case 'hack':
        output = 'Запуск процесса взлома...\nВзлом завершен!';
        break;
      case 'admin':
        output = 'Поиск уязвимостей в админке...\nДоступ получен: admin:password123';
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
      case 'sudo':
        output = 'Ошибка: недостаточно прав. Обратитесь к admin.';
        break;
      case 'sql':
        output = 'Выполнение SQL-инъекции...\nУспешно! Данные извлечены: users table';
        break;
      case 'scan':
        output = 'Сканирование портов...\nОткрытые порты: 22 (SSH), 80 (HTTP), 443 (HTTPS)';
        break;
      case 'brute':
        output = 'Запуск brute force атаки...\nПароль подобран: qwerty123';
        break;
      case 'ddos':
        output = 'Запуск DDoS атаки...\nСервер недоступен!';
        break;
      case 'bypass':
        output = 'Попытка обхода защиты...\nЗащита успешно обойдена!';
        break;
      case 'hacktheworld':
        output = 'Запуск глобального взлома...\nВзлом завершен! Мир теперь ваш!';
        break;
      default:
        output = `Ошибка: команда "${command}" не найдена. Введите "help" для списка команд.`;
    }
    simulateTyping(output);
  }

  function simulateTyping(output) {
    let i = 0;
    const interval = setInterval(() => {
      terminalOutput.innerHTML += output[i++];
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      if (i >= output.length) {
        clearInterval(interval);
        terminalOutput.innerHTML += '<br>';
      }
    }, 25); // Adjust speed of typing here
  }
</script>

<audio controls preload="metadata" style="width: 100%" autoplay>
  <source src="../audio/mat.mp3" type="audio/mpeg">
  Ваш браузер не поддерживает воспроизведение звука на странице.
</audio>
</body>
</html>
