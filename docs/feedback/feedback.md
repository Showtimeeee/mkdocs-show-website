<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<div id="feedback-container">
  <form id="feedback-form">
    <label for="name"><i class="material-icons">person</i> Имя:</label><br>
    <textarea id="name" name="name" placeholder="Как к вам обращаться? 😊" required></textarea><br>

    <label for="message"><i class="material-icons">message</i> Сообщение:</label><br>
    <textarea id="message" name="message" placeholder="Что хотите сказать? 🚀" required></textarea><br>

    <button type="button" onclick="sendEmail()">Отправить 💬</button>
  </form>

  <p id="status"></p>
</div>

<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
<script>
  // Инициализация EmailJS с вашим Public Key
  (function () {
    emailjs.init('t-4DbFO8bP-JMx9aT');
  })();

  function sendEmail() {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      document.getElementById('status').textContent = 'Пожалуйста, заполните все поля! 😅';
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
    };

    // Отправка с вашими Service ID и Template ID
    emailjs.send('service_i1rejo2', 'template_lynygyr', templateParams)
      .then(function (response) {
        document.getElementById('status').textContent = 'Сообщение успешно отправлено! Спасибо за обратную связь! 😊';
        document.getElementById('feedback-form').reset();
      }, function (error) {
        document.getElementById('status').textContent = 'Ошибка при отправке сообщения. Попробуйте еще раз! 😔';
        console.error('Error:', error);
      });
  }
</script>


---

<details>
<summary>💬 Комментарии (29)</summary>

— Анна<br>
Спасибо за статью про Крабов😂<br><br>

— Lexoid<br>
Очень полезный сайт! Буду рекомендовать коллегам.<br><br>

— Александр<br>
Про SDLC ТОП!<br><br>

— скуф<br>
Наконец-то нашел понятное объяснение по Docker!<br><br>

— Fetis<br>
Материалы очень качественные, спасибо.<br><br>

* Скрыто 24 комментария.
</details>
