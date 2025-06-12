# **Гайд по REST API: принципы, создание и лучшие практики**  

![REST API](images/restapi.png)  

**REST API** (Representational State Transfer) — архитектурный стиль для создания веб-сервисов, использующий стандартные HTTP-методы (`GET`, `POST`, `PUT`, `DELETE` и др.). Благодаря простоте, масштабируемости и независимости от платформы, REST остается одним из самых популярных подходов к разработке API.  

В этом руководстве разберем:  
✅ Основные принципы RESTful-приложений  
✅ Создание API на Python (Flask)  
✅ Документирование с OpenAPI/Swagger  
✅ Аутентификация (JWT, OAuth 2.0)  
✅ Оптимизация и безопасность  

---

## **1. Основные концепции REST API**  

### **🔹 7 принципов RESTful-приложений**  
1. **Единообразие интерфейса** – URL для ресурсов, HTTP-методы для действий, JSON/XML для данных.  
2. **Клиент-серверная архитектура** – Четкое разделение логики клиента и сервера.  
3. **Stateless (без состояния)** – Каждый запрос самодостаточен, сервер не хранит сессии.  
4. **Кэшируемость** – Ответы могут кэшироваться для повышения производительности.  
5. **Многоуровневая система** – Возможность добавления прокси и балансировщиков.  
6. **Код по требованию (опционально)** – Сервер может отправлять исполняемый код (например, JS).  
7. **Гипермедиа (HATEOAS, опционально)** – Ответы содержат ссылки на связанные ресурсы.  

### **🔹 Ключевые элементы REST API**  
- **Ресурсы** – Доступны по URL (например, `/users`, `/products`).  
- **HTTP-методы** – Определяют действия:  
  - `GET` – получение данных  
  - `POST` – создание ресурса  
  - `PUT/PATCH` – обновление (полное/частичное)  
  - `DELETE` – удаление  
- **Формат данных** – JSON (реже XML).  
- **Stateless** – Сервер не хранит состояние клиента.  

---

## **2. Создание REST API на Python (Flask)**  

### **🛠 Установка Flask**  
```bash
pip install flask
```

### **📂 Пример API для управления пользователями (`server.py`)**  
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

# Mock-база данных
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
]

# Получить всех пользователей (GET)
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

# Получить пользователя по ID (GET)
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    return jsonify(user) if user else (jsonify({"error": "Not found"}), 404)

# Создать пользователя (POST)
@app.route('/users', methods=['POST'])
def create_user():
    new_user = request.json
    users.append(new_user)
    return jsonify(new_user), 201

# Обновить пользователя (PUT)
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({"error": "Not found"}), 404
    user.update(request.json)
    return jsonify(user)

# Удалить пользователя (DELETE)
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    users = [u for u in users if u['id'] != user_id]
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
```

### **🔍 Тестирование API через cURL**  
```bash
# Получить всех пользователей
curl http://localhost:5000/users

# Создать пользователя
curl -X POST -H "Content-Type: application/json" -d '{"id":3,"name":"Charlie"}' http://localhost:5000/users

# Обновить пользователя
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Bobby"}' http://localhost:5000/users/2

# Удалить пользователя
curl -X DELETE http://localhost:5000/users/3
```

---

## **3. Документирование API (OpenAPI/Swagger)**  

**Популярные инструменты:**  
- **Swagger/OpenAPI** – Стандарт для описания REST API.  
- **Postman** – Коллекции для тестирования и документации.  

### **📄 Пример OpenAPI-спецификации**  
```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: List of users
    post:
      summary: Create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id: { type: integer }
                name: { type: string }
      responses:
        '201':
          description: User created
```

---

## **4. Аутентификация и безопасность**  

### **🔐 Методы защиты API**  
- **JWT (JSON Web Tokens)** – Токены для аутентификации.  
- **OAuth 2.0** – Авторизация через Google/GitHub и др.  
- **HTTPS** – Обязательное шифрование трафика.  

### **🛡 Пример JWT в Flask**  
```python
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app.config['JWT_SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username == 'admin' and password == '123':
        token = create_access_token(identity=username)
        return jsonify(access_token=token)
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="Доступ разрешен!")
```

---

## **5. Оптимизация и лучшие практики**  

- **🚀 Кэширование** – Используйте заголовки `Cache-Control` и `ETag`.  
- **📊 Пагинация** – Разбивка данных: `/users?page=1&limit=10`.  
- **🛡 Валидация** – Проверка входных данных (например, через Pydantic).  
- **📝 Логирование** – Мониторинг запросов и ошибок (ELK, Prometheus).  
- **⏱ Rate Limiting** – Защита от DDoS (например, `flask-limiter`).  
