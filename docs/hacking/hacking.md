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
    clip-path: inset(50px 0 0 0);
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
    max-width: 1000px;
    width: 100%;
    max-height: 80vh;
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
    height: 500px;
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

  /* Новые стили */
  #terminal-input::after {
    content: '_';
    animation: blink 1s infinite;
    color: lime;
    margin-left: 2px;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .output-line {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .system-msg {
    color: #ff00ff;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }

  .error-msg {
    animation: glitch 0.3s infinite;
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

  let matrixInterval;

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
    matrixInterval = setInterval(createMatrixChar, 50);
  }

  function stopMatrixEffect() {
    clearInterval(matrixInterval);
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

  // Новые фичи
  const systemMessages = [
    'KERNEL: Memory allocation optimized',
    'FIREWALL: Breach detected in sector 7',
    'CRYPTO: AES-256 encryption active',
    'NETWORK: Proxy connection established',
    'CPU: Overclocking to 4.2GHz'
  ];

  function showRandomSystemMessage() {
    const randomMsg = systemMessages[Math.floor(Math.random() * systemMessages.length)];
    const msgElement = document.createElement('div');
    msgElement.className = 'system-msg output-line';
    msgElement.textContent = `[SYS] ${randomMsg}`;
    terminalOutput.appendChild(msgElement);
    scrollToBottom();
  }

  setInterval(showRandomSystemMessage, Math.random() * 110000 + 110000);

  const originalSimulateTyping = simulateTyping;
  simulateTyping = function(output) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = output;
    tempDiv.querySelectorAll('div').forEach(line => {
      line.classList.add('output-line');
      if (line.textContent.startsWith('Ошибка')) {
        line.classList.add('error-msg');
      }
    });
    originalSimulateTyping.apply(this, arguments);
  };

  const originalHandleCommand = handleCommand;
  handleCommand = function(command) {
    const loader = document.createElement('div');
    loader.className = 'system-msg';
    loader.textContent = '[...] Processing command...';
    loader.style.background = 'linear-gradient(90deg, #00ff00, #00ffff)';
    loader.style.height = '2px';
    terminalOutput.appendChild(loader);
    
    setTimeout(() => {
      loader.remove();
      originalHandleCommand.apply(this, arguments);
    }, Math.random() * 1000 + 500);
  };

  // Оригинальные функции
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      if (command) {
        terminalOutput.innerHTML += `<div>> ${command}</div>`;
        handleCommand(command);
        terminalInput.value = '';
        scrollToBottom();
      }
    }
  });

  function handleCommand(command) {
    let output = '';
    switch (command.toLowerCase()) {
      case 'help':
        output = `Доступные команды:\n- clear: Очистить терминал\n- about: Информация о проекте\n- ip: Показать ваш IP-адрес\n- hidden: список скрытых команд \n- ping: Проверить соединение\n- sudo: Получить root-доступ\n- sql: Выполнить SQL-инъекцию\n- scan: Сканировать порты\n- brute: Запустить brute force атаку\n- ddos: Запустить DDoS атаку \n- matrix: Включить/выключить эффект матрицы\n- `;
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        return;
      case 'about':
        output = 'Terminal-Showtime-Bro v1.6\nВеб-приложение v3.1';
        break;
      case 'ip':
        output = 'Ваш IP-адрес: 197.0.0.1';
        break;
      case 'hidden':
        output = 'Требуются права доступа!';
        break;
      case 'ping':
        output = 'Pinging 8.8.8.8...\nОтвет от 8.8.8.8: время=10мс';
        break;
      case 'sudo':
        output = 'Ошибка: недостаточно прав. Обратитесь к admin.';
        break;
      case 'sql':
        output = 'Выполнение SQL-инъекции...\nУспешно! Данные извлечены: users_table';
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
        output = 'Попытка обхода защиты...\nНе указан url!';
        break;
      case 'matrix':
        if (matrixInterval) {
          stopMatrixEffect();
          output = 'Эффект матрицы отключен.';
          matrixInterval = null;
        } else {
          startMatrixEffect();
          output = 'Эффект матрицы включен.';
        }
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
      scrollToBottom();
      if (i >= output.length) {
        clearInterval(interval);
        terminalOutput.innerHTML += '<br>';
        scrollToBottom();
      }
    }, 25);
  }

  // Функция для автоматической прокрутки вниз
  function scrollToBottom() {
    setTimeout(() => {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }, 10); // Небольшая задержка для гарантии прокрутки
  }
</script>
<script>
    function updateClock() {
      const clockElement = document.getElementById('clock');
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
</script>

<audio controls preload="metadata" style="width: 100%" autoplay>
  <source src="../audio/mat.mp3" type="audio/mpeg">
  Ваш браузер не поддерживает воспроизведение звука на странице.
</audio>

<div class="clock-container animate__animated animate__fadeInDown">
  <div id="clock" class="clock"></div>
</div>
</body>
</html>
