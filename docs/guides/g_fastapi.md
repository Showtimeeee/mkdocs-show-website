# Гайд по FastAPI: от основ до продвинутых техник

![FastAPI Logo](https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png)

FastAPI — это современный, высокопроизводительный веб-фреймворк для создания API на Python. Он основан на стандартах **OpenAPI** и **JSON Schema**, обеспечивает автоматическую валидацию данных и интерактивную документацию. Создан для скорости разработки и продакшен-надежности.

## **1. Установка и минимальное приложение**

### Установка FastAPI и ASGI-сервера (Uvicorn):
```bash
pip install fastapi uvicorn
```

### Простейшее приложение (`main.py`):
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Привет, мир!"}
```

Запуск:
```bash
uvicorn main:app --reload
```
→ Открываем http://localhost:8000
→ Документация: http://localhost:8000/docs (Swagger UI) или /redoc

## **2. Основные концепции FastAPI**

### Маршрутизация и Path Parameters:
```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):  # Автоматическая конвертация в int
    return {"user_id": user_id}
```

### Query Parameters (параметры запроса):
```python
@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 10, q: str = None):
    # Автоматически подтягиваются из ?skip=0&limit=10&q=foo
    return {"skip": skip, "limit": limit, "q": q}
```

### Тело запроса (Request Body) с Pydantic:
```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items/")
async def create_item(item: Item):
    # FastAPI автоматически парсит JSON, валидирует типы и возвращает item
    return {"item": item, "total": item.price + (item.tax or 0)}
```

### HTTP-методы:
```python
@app.get("/endpoint")
@app.post("/endpoint")
@app.put("/endpoint")
@app.delete("/endpoint")
@app.patch("/endpoint")
```

## **3. Работа с формами и файлами**

### Формы (данные, закодированные как form-data):
```bash
pip install python-multipart
```

```python
from fastapi import Form

@app.post("/login/")
async def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}
```

### Загрузка файлов:
```python
from fastapi import File, UploadFile

@app.post("/files/")
async def create_file(file: bytes = File(...)):  # Для небольших файлов
    return {"file_size": len(file)}

@app.post("/upload/")
async def upload_file(uploaded_file: UploadFile = File(...)):  # Для потоковой загрузки
    contents = await uploaded_file.read()
    return {"filename": uploaded_file.filename}
```

## **4. Работа с базой данных (SQLAlchemy + Dependency Injection)**

### Установка:
```bash
pip install sqlalchemy databases  # databases для асинхронности
```

### Настройка (асинхронный подход):
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite+aiosqlite:///./test.db"
engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

### Dependency Injection для сессии БД:
```python
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one()
```

## **5. Аутентификация и авторизация**

### JWT (JSON Web Token) аутентификация:
```bash
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
```

### Пример защиты маршрута:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = decode_token(token)  # Ваша логика проверки
    if not user:
        raise HTTPException(status_code=401)
    return user

@app.get("/users/me/")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
```

## **6. Продвинутые возможности**

### Валидация (Pydantic v2):
```python
from pydantic import Field, EmailStr, validator

class UserCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    age: int = Field(..., ge=18, le=120)
    
    @validator('name')
    def name_must_be_alpha(cls, v):
        assert v.isalpha(), 'must be only letters'
        return v
```

### Background Tasks (фоновые задачи):
```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    # Имитация отправки
    print(f"Sending to {email}")

@app.post("/send-notification/")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email, "Hello")
    return {"message": "Notification sent in background"}
```

### WebSocket поддержка:
```python
from fastapi import WebSocket

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")
```

### Зависимости (Dependencies):
```python
async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons
```

## **7. Middleware и CORS**

### CORS (Cross-Origin Resource Sharing):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшене указывайте конкретные домены
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Кастомная Middleware:
```python
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## **8. Развёртывание (Deployment)**

### Продакшен-сервер (Gunicorn + Uvicorn workers):
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Docker:
```dockerfile
FROM python:3.11
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY ./app /code/app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
```

### Настройка для продакшена:
```python
# Используйте переменные окружения
import os
from pydantic_settings import BaseSettings  # pip install pydantic-settings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./test.db"
    secret_key: str = "change_me"

settings = Settings()

app = FastAPI()
```

## **9. Полезные библиотеки и интеграции**

| Библиотека | Назначение |
|------------|------------|
| **SQLModel** | ORM на основе Pydantic (от автора FastAPI) |
| **Alembic** | Миграции БД |
| **Celery** | Очереди задач (для тяжелых фоновых процессов) |
| **httpx** | Асинхронные HTTP-запросы (для микросервисов) |
| **fastapi-cache** | Кэширование (Redis, Memcached) |
| **prometheus-fastapi** | Метрики для мониторинга |

## **10. Лучшие практики**

1. **Структура проекта (модульность)**:
   ```
   /app
     ├── main.py          # Точка входа, создание app
     ├── core
     │    ├── config.py   # Настройки (Pydantic Settings)
     │    └── security.py # JWT, хэширование
     ├── api
     │    ├── v1
     │    │    ├── endpoints
     │    │    │    ├── users.py
     │    │    │    └── items.py
     │    │    └── router.py
     ├── models           # SQLAlchemy модели
     ├── schemas          # Pydantic схемы
     └── services         # Бизнес-логика
   ```

2. **Используйте `APIRouter` для организации кода**:
   ```python
   # api/v1/endpoints/users.py
   from fastapi import APIRouter
   router = APIRouter()

   @router.get("/")
   async def get_users():
       return [{"name": "John"}]

   # main.py
   app.include_router(users.router, prefix="/users", tags=["users"])
   ```

3. **Асинхронность vs Синхронность**:
   - Если используете асинхронные драйверы БД (`asyncpg`, `aiosqlite`) → `async def`.
   - Если используете синхронные библиотеки (обычный `psycopg2`) → лучше `def` (FastAPI сам выгрузит в thread pool).