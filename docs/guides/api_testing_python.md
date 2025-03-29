# API тестирование на Python с использованием requests

В этом руководстве я покажу, как писать API тесты на Python с использованием библиотеки requests. Мы будем тестировать реальное публичное API (JSONPlaceholder) и выполнять CRUD операции.

## 1. Установка необходимых библиотек

```python
pip install requests pytest
```

## 2. Базовые примеры API тестов
Создадим файл test_api.py:

```python
import requests
import pytest

# Базовый URL JSONPlaceholder API
BASE_URL = "https://jsonplaceholder.typicode.com"

# Тест для GET запроса (получение списка постов)
def test_get_posts():
    response = requests.get(f"{BASE_URL}/posts")
    
    # Проверка статус кода
    assert response.status_code == 200
    
    # Проверка, что ответ - список
    posts = response.json()
    assert isinstance(posts, list)
    
    # Проверка структуры первого поста
    if len(posts) > 0:
        first_post = posts[0]
        assert "id" in first_post
        assert "title" in first_post
        assert "body" in first_post
        assert "userId" in first_post

# Тест для GET запроса (получение одного поста)
def test_get_single_post():
    post_id = 1
    response = requests.get(f"{BASE_URL}/posts/{post_id}")
    
    assert response.status_code == 200
    
    post = response.json()
    assert post["id"] == post_id
    assert isinstance(post["title"], str)
    assert isinstance(post["body"], str)
    assert isinstance(post["userId"], int)

# Тест для POST запроса (создание поста)
def test_create_post():
    new_post = {
        "title": "foo",
        "body": "bar",
        "userId": 1
    }
    
    response = requests.post(f"{BASE_URL}/posts", json=new_post)
    
    assert response.status_code == 201
    
    created_post = response.json()
    
    # Проверяем, что сервер вернул наши данные
    assert created_post["title"] == new_post["title"]
    assert created_post["body"] == new_post["body"]
    assert created_post["userId"] == new_post["userId"]
    
    # ID должен быть сгенерирован сервером
    assert "id" in created_post

# Тест для PUT запроса (обновление поста)
def test_update_post():
    post_id = 1
    updated_data = {
        "id": post_id,
        "title": "updated title",
        "body": "updated body",
        "userId": 1
    }
    
    response = requests.put(f"{BASE_URL}/posts/{post_id}", json=updated_data)
    
    assert response.status_code == 200
    
    updated_post = response.json()
    assert updated_post == updated_data

# Тест для PATCH запроса (частичное обновление поста)
def test_patch_post():
    post_id = 1
    patch_data = {
        "title": "patched title"
    }
    
    response = requests.patch(f"{BASE_URL}/posts/{post_id}", json=patch_data)
    
    assert response.status_code == 200
    
    patched_post = response.json()
    assert patched_post["title"] == patch_data["title"]
    # Остальные поля должны остаться неизменными (но в этом тестовом API они перезаписываются)

# Тест для DELETE запроса (удаление поста)
def test_delete_post():
    post_id = 1
    response = requests.delete(f"{BASE_URL}/posts/{post_id}")
    
    assert response.status_code == 200
    # Для этого API DELETE возвращает пустой объект
    assert response.json() == {}
```

## 3. Запуск тестов
```python
pytest test_api.py -v
```

## 4. Более сложный пример с фикстурами
Давайте улучшим наши тесты, используя фикстуры pytest:
```python
import requests
import pytest

BASE_URL = "https://jsonplaceholder.typicode.com"

# Фикстура для создания временного поста
@pytest.fixture
def temp_post():
    new_post = {
        "title": "Test Post",
        "body": "This is a test post",
        "userId": 1
    }
    response = requests.post(f"{BASE_URL}/posts", json=new_post)
    assert response.status_code == 201
    post_data = response.json()
    yield post_data  # Это будет возвращено тесту
    
    # После теста удаляем пост (хотя в этом API изменения не сохраняются)
    response = requests.delete(f"{BASE_URL}/posts/{post_data['id']}")
    assert response.status_code == 200

def test_with_temp_post(temp_post):
    # Проверяем, что пост был создан правильно
    assert isinstance(temp_post["id"], int)
    assert temp_post["title"] == "Test Post"
    
    # Делаем GET запрос для проверки, что пост существует
    response = requests.get(f"{BASE_URL}/posts/{temp_post['id']}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Post"
```

## 5. Пример с сериализацией и проверкой данных
Добавим класс для работы с постами и сериализации:
```python
class Post:
    def __init__(self, post_id, title, body, user_id):
        self.id = post_id
        self.title = title
        self.body = body
        self.user_id = user_id
    
    @classmethod
    def from_dict(cls, data):
        return cls(
            post_id=data["id"],
            title=data["title"],
            body=data["body"],
            user_id=data["userId"]
        )
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "userId": self.user_id
        }
    
    def __eq__(self, other):
        if not isinstance(other, Post):
            return False
        return (self.id == other.id and 
                self.title == other.title and 
                self.body == other.body and 
                self.user_id == other.user_id)

def test_post_serialization():
    # Создаем тестовые данные
    post_data = {
        "id": 1,
        "title": "Test Title",
        "body": "Test Body",
        "userId": 1
    }
    
    # Десериализация из словаря
    post = Post.from_dict(post_data)
    
    # Проверяем поля
    assert post.id == 1
    assert post.title == "Test Title"
    assert post.body == "Test Body"
    assert post.user_id == 1
    
    # Сериализация в словарь
    assert post.to_dict() == post_data
    
    # Проверка равенства
    post2 = Post.from_dict(post_data)
    assert post == post2

def test_api_with_post_class(temp_post):
    # Получаем пост через API
    response = requests.get(f"{BASE_URL}/posts/{temp_post['id']}")
    api_post = Post.from_dict(response.json())
    
    # Создаем локальный пост с теми же данными
    local_post = Post(
        post_id=temp_post["id"],
        title=temp_post["title"],
        body=temp_post["body"],
        user_id=temp_post["userId"]
    )
    
    # Проверяем, что они равны
    assert api_post == local_post
    
    # Модифицируем локальный пост
    local_post.title = "Modified Title"
    
    # Отправляем изменения на сервер
    response = requests.put(
        f"{BASE_URL}/posts/{local_post.id}",
        json=local_post.to_dict()
    )
    assert response.status_code == 200
    
    # Проверяем, что изменения применились
    updated_post = Post.from_dict(response.json())
    assert updated_post == local_post
```

## 6. Дополнительные проверки
Добавим проверки заголовков и времени ответа:
```python
def test_response_headers():
    response = requests.get(f"{BASE_URL}/posts")
    
    # Проверяем заголовки
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"
    assert "Date" in response.headers
    
    # Проверяем время ответа (должно быть меньше 1 секунды)
    assert response.elapsed.total_seconds() < 1.0

def test_pagination():
    params = {
        "_page": 1,
        "_limit": 5
    }
    response = requests.get(f"{BASE_URL}/posts", params=params)
    
    assert response.status_code == 200
    posts = response.json()
    assert len(posts) <= 5  # В этом API пагинация работает условно
```

## 7. Обработка ошибок
```python
def test_nonexistent_post():
    # Используем заведомо несуществующий ID
    response = requests.get(f"{BASE_URL}/posts/999999")
    assert response.status_code == 404

def test_invalid_post_creation():
    # Пытаемся создать пост с неполными данными
    invalid_post = {
        "title": "Invalid Post"
    }
    response = requests.post(f"{BASE_URL}/posts", json=invalid_post)
    
    # В этом API такая проверка не реализована, но в реальном API должен быть 400
    # assert response.status_code == 400
    # Для этого API:
    assert response.status_code == 201  # Неожиданно, но это тестовый API
```

## Заключение
Эти примеры покрывают основные аспекты тестирования API:

* CRUD операции (Create, Read, Update, Delete)
* Проверка статус кодов
* Проверка структуры ответа
* Сериализация/десериализация данных
* Работа с заголовками
* Обработка ошибок
* Для реального проекта вы можете:
* Вынести базовый URL и общие функции в отдельный модуль
* Добавить логирование
* Реализовать более сложные проверки
* Добавить тесты для авторизации (если API требует аутентификации)
* Использовать библиотеки для более удобного тестирования (например, pytest-requests)
