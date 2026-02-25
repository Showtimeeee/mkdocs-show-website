<div>
  <h1 class="neon-text-purple" style="font-size: 3rem; margin-bottom: 10px;"
      onmouseout="this.textContent='Welcome! ☕'">
    Welcome! ☕
  </h1>
</div>

---
<style>
  .avatar {
    border-radius: 11%; /* Круглая рамка */
    border: 2px solid #333; /* Тёмная граница */
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.2); /* Тень */
    transition: transform 1.3s ease; /* Эффект при наведении */
  }

  .avatar:hover {
    transform: scale(1.1); /* Увеличение при наведении */
  }
</style>

<div style="text-align: center;">
  <img src="images/haker2.jpg" alt="Хакер" class="avatar" style="width: 800px;">
</div>

<!-- <div style="text-align: center;">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com/?lines=Этот+сайт+-+практический+справочник+по+IT.;Здесь+нет+воды+-+только+применимые+знания,;которые+помогут+вам.&center=true&width=600&height=60&duration=4000&pause=1000&color=B57EDC" alt="Typing SVG" />
  </a>
</div> -->

<div style="text-align: center; margin: 10px 0; font-family: 'Fira Code', monospace;">
  <div id="current-datetime" style="font-size: 0.9rem; color: #888; padding: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); display: inline-block;">
    <!-- Здесь будет отображаться время и дата -->
  </div>
</div>

<script>
  function updateDateTime() {
    const now = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    const dateStr = now.toLocaleDateString('ru-RU', dateOptions);
    const timeStr = now.toLocaleTimeString('ru-RU', timeOptions);
    
    document.getElementById('current-datetime').innerHTML = `${dateStr} | ${timeStr}`;
  }
  
  updateDateTime();
  setInterval(updateDateTime, 1000);
</script>

## <h2 class="neon-text-pink">Что вас ждёт на этом сайте?</h2>
- Полезные материалы по разработке, тестированию и оптимизации процессов.
- Примеры реальных проектов с разбором их реализации.
- Обзор популярных архитектурных решений и их применение.
- Разбор алгоритмов и их реализация на практике.
- Рекомендации по книгам для углубления знаний.
- Практика на тренажёрах.
- И многое другое.

---

## <h2 class="neon-text-green">Мой топ команд</h2>

_Я их постоянно забываю_😅
```
python -m venv venv
```
```
venv\Scripts\activate
```
```
python -m http.server 8000 (http://localhost:8000/)
```
```
pip freeze > requirements.txt
```
```
pip install -r requirements.txt
```
```
pytest -v -s --tb=long -rA --color=yes --durations=10
```

![гифка](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWc2czluZThxZXl6NGk3NG82djZ4cWZ0bWY0NGVjeG5mZjR1eWR2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xRICW5msyoRUv6/giphy.gif)

---

## <h2 class="neon-text-purple">Open-source / Инструменты</h2>


Это open-source проект, исходный код сайта доступен на GitHub

```
MkDocs, JavaScript, Python, HTML & CSS, Markdown, GitHub Actions
```

---


## <h2 class="neon-text-orange">Обратная связь <img src="images/Z5cP.gif" alt="Анимация" class="gif-background"></h2>

📧 **[seevaa57@gmail.com](mailto:seevaa57@gmail.com)**  

🐙 **[GitHub](https://github.com/Showtimeeee)**  

**[✍️ Форма обратной связи](feedback/feedback.md)**

---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Главная страница</title>
    <!-- Подключение CSS -->
    <link rel="stylesheet" href="css/styles.css"> <!-- Путь к папке css -->
</head>
<body>
    <!-- Блок для случайной цитаты -->
<div id="random-quote" class="quote">
    <blockquote>"Здесь будет случайная цитата."</blockquote>
    <cite>— Автор</cite>
</div>

<!-- Подключение JavaScript -->
<script src="js/script.js"></script>
</body>
</html>

---

<div class="version-container">
    <div class="version-info">
        v4.3
    </div>
</div>
