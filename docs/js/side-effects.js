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