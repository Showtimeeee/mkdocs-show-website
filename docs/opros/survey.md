<form action="https://formspree.io/your-email@example.com" method="POST">
    <h2>Опрос по Python и безопасности</h2>

    <label for="experience">Как давно вы используете Python?</label>
    <select id="experience" name="experience" required>
        <option value="Менее года">Менее года</option>
        <option value="1-3 года">1-3 года</option>
        <option value="Более 3 лет">Более 3 лет</option>
    </select>
    <br><br>

    <label for="versions">Какие версии Python вы используете?</label>
    <select id="versions" name="versions" required>
        <option value="Python 2.x">Python 2.x</option>
        <option value="Python 3.x">Python 3.x</option>
        <option value="Обе версии">Обе версии</option>
    </select>
    <br><br>

    <label for="libraries">Какие библиотеки Python вы используете чаще всего?</label>
    <input type="text" id="libraries" name="libraries" required>
    <br><br>

    <label for="issues">Какие проблемы вы сталкиваетесь при использовании Python?</label>
    <input type="text" id="issues" name="issues" required>
    <br><br>

    <label for="virtualenv">Используете ли вы виртуальные окружения для управления зависимостями?</label>
    <select id="virtualenv" name="virtualenv" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="testing">Какие инструменты вы используете для тестирования кода?</label>
    <input type="text" id="testing" name="testing" required>
    <br><br>

    <label for="security">Какие меры безопасности вы применяете в своем коде на Python?</label>
    <input type="text" id="security" name="security" required>
    <br><br>

    <label for="vulnerabilities">Какие уязвимости в Python вы считаете наиболее критичными?</label>
    <input type="text" id="vulnerabilities" name="vulnerabilities" required>
    <br><br>

    <label for="best_practices">Какие лучшие практики безопасности вы используете при разработке на Python?</label>
    <input type="text" id="best_practices" name="best_practices" required>
    <br><br>

    <label for="encryption">Используете ли вы шифрование для защиты данных?</label>
    <select id="encryption" name="encryption" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="authentication">Какие методы аутентификации вы используете в своих приложениях?</label>
    <input type="text" id="authentication" name="authentication" required>
    <br><br>

    <label for="dependencies">Как вы управляете зависимостями в своих проектах?</label>
    <input type="text" id="dependencies" name="dependencies" required>
    <br><br>

    <label for="code_review">Проводите ли вы code review для выявления уязвимостей?</label>
    <select id="code_review" name="code_review" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="static_analysis">Используете ли вы инструменты статического анализа кода?</label>
    <select id="static_analysis" name="static_analysis" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="logging">Как вы организуете логирование в своих приложениях?</label>
    <input type="text" id="logging" name="logging" required>
    <br><br>

    <label for="error_handling">Какие подходы к обработке ошибок вы используете?</label>
    <input type="text" id="error_handling" name="error_handling" required>
    <br><br>

    <label for="data_validation">Как вы выполняете валидацию данных?</label>
    <input type="text" id="data_validation" name="data_validation" required>
    <br><br>

    <label for="api_security">Какие меры безопасности вы применяете для защиты API?</label>
    <input type="text" id="api_security" name="api_security" required>
    <br><br>

    <label for="database_security">Как вы защищаете данные в базе данных?</label>
    <input type="text" id="database_security" name="database_security" required>
    <br><br>

    <label for="secure_communication">Как вы обеспечиваете безопасность передачи данных?</label>
    <input type="text" id="secure_communication" name="secure_communication" required>
    <br><br>

    <label for="user_input">Как вы обрабатываете пользовательский ввод для предотвращения атак?</label>
    <input type="text" id="user_input" name="user_input" required>
    <br><br>

    <label for="security_updates">Как часто вы обновляете зависимости для исправления уязвимостей?</label>
    <input type="text" id="security_updates" name="security_updates" required>
    <br><br>

    <label for="security_testing">Проводите ли вы тестирование безопасности своего кода?</label>
    <select id="security_testing" name="security_testing" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="incident_response">Есть ли у вас план реагирования на инциденты безопасности?</label>
    <select id="incident_response" name="incident_response" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="compliance">Соблюдаете ли вы какие-либо стандарты безопасности (например, GDPR, HIPAA)?</label>
    <select id="compliance" name="compliance" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="training">Проходите ли вы или ваша команда обучение по безопасности?</label>
    <select id="training" name="training" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="open_source">Используете ли вы open-source библиотеки?</label>
    <select id="open_source" name="open_source" required>
        <option value="Да">Да</option>
        <option value="Нет">Нет</option>
    </select>
    <br><br>

    <label for="security_tools">Какие инструменты безопасности вы используете?</label>
    <input type="text" id="security_tools" name="security_tools" required>
    <br><br>

    <label for="feedback">Есть ли у вас дополнительные предложения по улучшению безопасности в Python?</label>
    <textarea id="feedback" name="feedback" required></textarea>
    <br><br>

    <button type="submit">Отправить</button>
</form>
