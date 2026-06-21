document.addEventListener("DOMContentLoaded", function () {
    // Создаем левую полосу
    const leftStripe = document.createElement("div");
    leftStripe.className = "body-side-effects body-side-left";
    document.body.appendChild(leftStripe);
  
    // Создаем правую полосу
    const rightStripe = document.createElement("div");
    rightStripe.className = "body-side-effects body-side-right";
    document.body.appendChild(rightStripe);
  });

  function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
  
    // Форматируем время: часы, минуты, секунды
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Отображаем время
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Обновляем часы каждую секунду
  setInterval(updateClock, 1000);
  
  // Инициализируем часы сразу после загрузки страницы
  updateClock();
