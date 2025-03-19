// Функция для получения текущего количества лайков из localStorage
function getLikeCount() {
  return parseInt(localStorage.getItem('siteLikes')) || 13; // Начальное значение 13
}

// Функция для обновления отображаемого счетчика
function updateLikeCount(count) {
  document.getElementById('like-count').textContent = `${count}`;
}

// Инициализация счетчика при загрузке страницы
const initialCount = getLikeCount();
updateLikeCount(initialCount);

// Обработка клика по сердечку
document.getElementById('like-heart').addEventListener('click', function () {
  const currentCount = getLikeCount();
  const newCount = currentCount + 1;

  // Сохраняем новое значение в localStorage
  localStorage.setItem('siteLikes', newCount);

  // Обновляем отображение
  updateLikeCount(newCount);

  // Анимация сердечка
  this.style.transform = 'scale(1.5)';
  this.style.color = 'darkred';
  setTimeout(() => {
    this.style.transform = '';
    this.style.color = 'red';
  }, 500);

  // Анимация счетчика
  const countElement = document.getElementById('like-count');
  countElement.style.transition = 'all 0.3s ease';
  countElement.style.transform = 'scale(1.2)';
  setTimeout(() => {
    countElement.style.transform = '';
  }, 300);
});
