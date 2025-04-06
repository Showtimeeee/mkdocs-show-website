# Гайд по Locust: нагрузочное тестирование на Python  

![Логотип Locust](images/locust-logo.png)  

**Locust** — это мощный инструмент для нагрузочного тестирования, написанный на Python. Он позволяет легко моделировать поведение тысяч пользователей, которые одновременно взаимодействуют с вашим веб-сервисом, API или другим HTTP-сервисом.  

Locust отличается простотой настройки, возможностью писать тесты на Python и удобным веб-интерфейсом для мониторинга нагрузки.  

Если вам нужно проверить, как ваш сервис поведет себя под высокой нагрузкой, Locust — отличный выбор!  

---

## 1. **Основные концепции Locust**  

Перед началом работы разберем ключевые понятия:  

- **User (Пользователь)** – Виртуальный пользователь, который выполняет HTTP-запросы.  
- **Task (Задача)** – Действие, которое выполняет пользователь (например, GET или POST запрос).  
- **Load Test (Нагрузочный тест)** – Процесс, при котором множество пользователей одновременно атакуют сервер.  
- **Web UI** – Веб-интерфейс Locust для управления тестом и мониторинга.  

Locust использует **event-driven** подход (через gevent), что делает его очень эффективным даже на одном сервере.  

---

## 2. **Установка Locust**  

Установка через `pip`:  
```bash
pip install locust
```  

Проверка установки:  
```bash
locust --version
```  

---

## 3. **Создание простого теста**  

Создадим файл `locustfile.py` для тестирования REST API (например, того, что мы делали в гайде по REST API).  

### **Пример `locustfile.py`**  
```python
from locust import HttpUser, task, between

class ApiUser(HttpUser):
    wait_time = between(1, 3)  # Пауза между запросами (1-3 сек)

    @task(3)  # Вес задачи (частота выполнения)
    def get_users(self):
        self.client.get("/users")

    @task(1)
    def create_user(self):
        self.client.post(
            "/users",
            json={"id": 10, "name": "LocustUser"}
        )
```  

### **Запуск теста**  
```bash
locust -f locustfile.py
```  

После запуска откроется веб-интерфейс:  
- `http://localhost:8089`  

---

## 4. **Настройка теста через Web UI**  

1. **Указываем параметры теста:**  
   - Number of users (peak) – Максимальное число пользователей.  
   - Spawn rate – Сколько пользователей добавлять в секунду.  
   - Host – URL тестируемого сервиса (например, `http://localhost:5000`).  

2. **Запускаем тест:**  
   - Кнопка **Start swarming** начинает нагрузку.  

3. **Мониторинг в реальном времени:**  
   - **Requests/s** – Количество запросов в секунду.  
   - **Response times** – График времени ответа.  
   - **Failures** – Ошибки (если сервер не справляется).  

---

## 5. **Расширенные возможности**  

### **Аутентификация и заголовки**  
```python
class AuthUser(HttpUser):
    @task
    def login_and_access_protected(self):
        # Логинимся и получаем токен
        response = self.client.post(
            "/login",
            json={"username": "admin", "password": "123"}
        )
        token = response.json()["access_token"]
        
        # Используем токен для доступа к защищенному API
        self.client.get(
            "/protected",
            headers={"Authorization": f"Bearer {token}"}
        )
```  

### **Параметризация запросов**  
```python
from random import randint

class RandomUser(HttpUser):
    @task
    def get_random_user(self):
        user_id = randint(1, 100)
        self.client.get(f"/users/{user_id}", name="/users/[id]")
```  

### **Запуск без Web UI (в командной строке)**  
```bash
locust -f locustfile.py --headless -u 100 -r 10 -t 1m --host=http://localhost:5000
```  
- `-u 100` – 100 пользователей.  
- `-r 10` – 10 пользователей в секунду.  
- `-t 1m` – Тест на 1 минуту.  

---

## 6. **Анализ результатов**  

После теста можно:  
1. **Экспортировать статистику** (CSV или JSON).  
2. **Сравнивать тесты** (например, до и после оптимизации сервера).  
3. **Искать узкие места** – Если `95% percentile` растет при увеличении нагрузки, сервер не справляется.  

---

## 7. **Интеграция с CI/CD**  

Locust можно запускать автоматически, например, в GitHub Actions:  

```yaml
name: Load Test
on: [push]
jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Locust
        run: pip install locust
      - name: Run Locust
        run: locust -f locustfile.py --headless -u 100 -r 10 -t 1m --host=http://api.example.com
```  

---

## **Заключение**  

Locust — это мощный и гибкий инструмент для нагрузочного тестирования, который легко интегрируется в Python-проекты.  

**Попробуйте:**  
1. Запустите тест для своего API.  
2. Посмотрите, как сервер справляется с нагрузкой.  
3. Оптимизируйте код и повторите тест!  

Готовы "нагрузить" свой сервис? Тогда вперед! 🚀  

---  

Этот гайд поможет вам начать работу с Locust и проводить нагрузочные тесты как профессионал. Удачи в тестировании!