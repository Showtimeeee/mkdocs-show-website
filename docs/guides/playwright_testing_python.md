# Гайд по Playwright (Python)

<div><img src="https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/playwright/playwright-original.svg" title="Playwright" alt="Playwright" width="500" height="500" />&nbsp;
</div>

Playwright — это современный фреймворк для автоматизации тестирования веб-приложений, разработанный Microsoft. Он поддерживает все современные браузеры (Chromium, Firefox, WebKit) и предоставляет мощный API для автоматизации взаимодействия с веб-страницами. Playwright на Python сочетает в себе простоту использования с богатыми возможностями для тестирования сложных веб-приложений.

## 1. **Основные концепции Playwright**

Прежде чем начать работу с Playwright, важно понять его ключевые компоненты:

- **Браузерный контекст**: Изолированная сессия браузера (аналог профиля пользователя)
- **Страницы (Pages)**: Отдельные вкладки/окна в браузере
- **Селекторы**: Механизмы поиска элементов на странице (CSS, XPath, text и др.)
- **Автоматические ожидания**: Встроенные механизмы ожидания элементов и состояний
- **Перехват сетевых запросов**: Возможность мониторинга и мокирования API-запросов
- **Генерация событий**: Эмуляция действий пользователя (клики, ввод текста и т.д.)

## 2. **Установка Playwright**

Для начала работы установите Playwright через pip:

```bash
pip install pytest-playwright
```

Установите необходимые браузеры:

```bash
playwright install
```

## 3. **Написание первого теста**

Создайте файл `test_example.py` с базовым тестом:

```python
from playwright.sync_api import expect, Page

def test_example(page: Page):
    page.goto("https://playwright.dev/")
    expect(page).to_have_title("Playwright")
    
    search_button = page.get_by_role("button", name="Search")
    search_button.click()
    
    search_box = page.get_by_placeholder("Search docs")
    search_box.fill("locators")
    
    first_result = page.locator(".search-results li").first
    expect(first_result).to_contain_text("Locators")
```

Запустите тест:

```bash
pytest test_example.py
```

## 4. **Система локаторов в Playwright**

Playwright предлагает современный подход к поиску элементов, который значительно отличается от традиционных методов Selenium. Вот полный обзор возможностей:

### 4.1. **Основные типы локаторов**

#### **Текстовые локаторы**
```python
# Точное совпадение текста
page.get_by_text("Submit Form").click()

# Частичное совпадение (регистронезависимое)
page.get_by_text("mit for", exact=False).hover()
```

#### **Ролевые локаторы (ARIA-роли)**
```python
# Стандартные роли WAI-ARIA
page.get_by_role("button", name="Close").click()
page.get_by_role("checkbox", name="Agree").check()

# Комбинирование с атрибутами
page.get_by_role("textbox", name="Email", disabled=False).fill("test@example.com")
```

#### **Локаторы по атрибутам**
```python
# Placeholder
page.get_by_placeholder("Enter your name").fill("Alex")

# Title
page.get_by_title("Tooltip content").hover()

# Label
page.get_by_label("Password *").fill("secret123")

# Alt текст изображений
page.get_by_alt_text("Company logo").click()
```

#### **Специальные локаторы**
```python
# data-testid (рекомендуемый подход)
page.get_by_test_id("nav-menu").get_by_text("Home").click()

# CSS и XPath (как fallback)
page.locator("#main > .btn-primary:visible").click()
page.locator("//button[contains(@class, 'submit')]").click()
```

### 4.2. **Композитные локаторы**

#### **Фильтрация элементов**
```python
# По тексту
page.locator("tr").filter(has_text="Pending").click()

# По дочерним элементам
page.locator("div.card").filter(has=page.locator(".priority-high")).click()

# Комбинированные условия
page.locator("li.item").filter(
    has_text="Order",
    has=page.get_by_role("button", name="Details")
).click()
```

#### **Цепочки локаторов**
```python
# Иерархический поиск
modal = page.locator(".modal-content")
modal.get_by_label("Username").fill("user1")

# Реляционные локаторы
page.locator("div.item").locator("..")  # Родительский элемент
```

### 4.3. **Работа с динамическими элементами**

#### **Локаторы с учетом состояния**
```python
# Только видимые элементы
page.locator("button:visible").click()

# Элементы с определенным состоянием
page.locator("input:enabled").fill("text")
page.locator("checkbox:checked").uncheck()
```

#### **Кастомные CSS-псевдоклассы**
```python
# Элементы, содержащие другие элементы
page.locator("div:has(.icon-warning)").click()

# Элементы рядом с другими
page.locator("input:right-of(:text('Username'))").first.click()
```

### 4.4. **Лучшие практики**

1. **Приоритетность стратегий**:
   ```
   1. get_by_role() + get_by_text()
   2. get_by_test_id()
   3. get_by_label()/get_by_placeholder()
   4. CSS/XPath (только когда другие не работают)
   ```

2. **Паттерны именования**:
   ```python
   # Хорошо
   submit_btn = page.get_by_role("button", name=re.compile(r"Submit", re.IGNORECASE))
   
   # Плохо
   btn = page.locator("//*[@id='app']/div[3]/button[2]")
   ```

3. **Переиспользование локаторов**:
   ```python
   # В conftest.py
   @pytest.fixture
   def search_input(page):
       return page.get_by_placeholder("Search products...")
   
   # В тестах
   def test_search(search_input):
       search_input.fill("Playwright")
   ```

4. **Отладка локаторов**:
   ```python
   # Проверка количества найденных элементов
   print(page.locator(".item").count())
   
   # Визуализация поиска
   page.locator("button").highlight()
   ```

## 5. **Система проверок и утверждений**

Playwright предоставляет две основные системы проверок: `expect` и автоматические ожидания.

### 5.1. **API Expect (основной подход)**

#### **Базовые проверки**
```python
expect(page.locator(".status")).to_have_text("Payment successful")
expect(page).to_have_url(re.compile(r"/order/\d+$"))
expect(page.locator("img.logo")).to_have_attribute("src", "logo.png")
```

#### **Проверки видимости и состояния**
```python
expect(page.locator(".popup")).to_be_visible()
expect(page.locator(".loader")).to_be_hidden()
expect(page.locator("input#agree")).to_be_checked()
expect(page.get_by_role("button")).to_be_disabled()
```

#### **Проверки коллекций**
```python
rows = page.locator("table tr")
expect(rows).to_have_count(5)
expect(rows).not_to_have_count(0)
expect(rows.first).to_have_text("First item")
expect(rows).to_contain_text(["Item 1", "Item 2"])
```

### 5.2. **Автоматические ожидания**

Все действия Playwright автоматически ожидают готовности элементов:

```python
# Автоматически ждет:
# - пока элемент появится в DOM
# - станет видимым
# - перестанет быть анимированным
# - будет получать события
page.click("button.submit")
```

### 5.3. **Продвинутые проверки**

#### **Проверки снимков**
```python
# Текстовые снимки
expect(page.locator(".output")).to_have_text("Expected result")

# Визуальные снимки (требует playwright-screenshot)
expect(page).to_have_screenshot("homepage.png")
```

#### **Проверки сети**
```python
# Ожидание запроса
with page.expect_request("**/api/data") as req:
    page.click("button.fetch-data")
assert req.value.method == "GET"

# Ожидание ответа
with page.expect_response("**/api/save") as resp:
    page.click("button.save")
assert resp.value.status == 200
```

#### **Кастомные условия**
```python
def is_loading_complete(page):
    return page.evaluate("() => !window.isLoading")

page.wait_for_function(is_loading_complete)
```

### 5.4. **Лучшие практики проверок**

1. **Принцип одной проверки на тест**:
   ```python
   # Хорошо
   def test_order_complete(page):
       complete_msg = page.locator(".order-complete")
       expect(complete_msg).to_be_visible()
       expect(complete_msg).to_contain_text("Thank you")
   
   # Плохо (множество несвязанных проверок)
   def test_multiple_things(page):
       expect(...).to_be_visible()
       expect(...).to_have_text()
       expect(...).to_have_count()
   ```

2. **Именованные проверки**:
   ```python
   def assert_order_status(page, status):
       expect(page.locator(".order-status")).to_have_text(status)
   
   def test_orders(..., assert_order_status):
       assert_order_status("Processing")
   ```

3. **Гибкие таймауты**:
   ```python
   # Глобальный таймаут
   expect.set_options(timeout=15_000)
   
   # Локальный таймаут
   expect(locator).to_have_text("Done", timeout=30_000)
   ```

4. **Информативные сообщения**:
   ```python
   expect(search_results, message="Should display 10 search results").to_have_count(10)
   ```

5. **Негативные проверки**:
   ```python
   expect(page.locator(".error")).not_to_be_visible()
   expect(page).not_to_have_url("/error")
   ```

Эти системы проверок делают тесты Playwright максимально читаемыми и устойчивыми к изменениям в приложении.


## 6. **Локаторы и поиск элементов**

Playwright предлагает несколько способов поиска элементов:

### 6.1. **Основные методы поиска**

```python
# По тексту
page.get_by_text("Submit").click()

# По атрибуту [placeholder]
page.get_by_placeholder("Username").fill("user")

# По label
page.get_by_label("Password").fill("secret")

# По роли ARIA
page.get_by_role("button", name="Sign in").click()

# По title атрибуту
page.get_by_title("Info").hover()

# По CSS или XPath
page.locator("button.submit").click()
page.locator("//button[contains(text(),'Submit')]").click()
```

### 6.2. **Цепочки локаторов**

```python
# Ищем форму, затем поле внутри нее
form = page.locator(".auth-form")
form.get_by_role("textbox", name="username").fill("test")

# Фильтрация элементов
active_items = page.locator("li.item").filter(has_text="Active")
```

### 6.3. **Лучшие практики локаторов**

1. **Приоритеты методов**:
   - `get_by_role()` - лучший выбор для доступных элементов
   - `get_by_text()` - для элементов с уникальным текстом
   - `get_by_test_id()` - для специальных data-атрибутов
   - CSS/XPath - когда другие методы не подходят

2. **Избегайте хрупких селекторов**:
   ```python
   # Плохо - зависит от структуры DOM
   page.locator("body > div > div > button").click()
   
   # Хорошо - использует семантические атрибуты
   page.get_by_role("button", name="Submit").click()
   ```

3. **Используйте пользовательские атрибуты**:
   ```html
   <button data-testid="submit-button">Submit</button>
   ```
   ```python
   page.get_by_test_id("submit-button").click()
   ```

## 7. **Автоматические ожидания**

Playwright автоматически ожидает готовности элементов перед действиями. Дополнительные возможности:

### 7.1. **Явные ожидания**

```python
# Ожидание появления элемента
page.locator(".loading-spinner").wait_for(state="hidden")

# Ожидание текста в элементе
expect(page.locator(".status")).to_have_text("Success")

# Ожидание URL
expect(page).to_have_url(re.compile(r"/success$"))

# Ожидание загрузки страницы
page.wait_for_url("**/dashboard")
```

### 7.2. **Кастомные ожидания**

```python
# Ожидание кастомного условия
def is_loading_finished(page):
    return page.evaluate("() => window.isLoading === false")

page.wait_for_function(is_loading_finished)
```

## 8. **Работа с сетевыми запросами**

Playwright позволяет перехватывать и мокировать API-запросы:

### 8.1. **Перехват запросов**

```python
def test_api_intercept(page: Page):
    # Перехватываем все запросы к API
    with page.expect_request("**/api/users/*") as request:
        page.click("button.load-users")
    
    intercepted_request = request.value
    assert intercepted_request.method == "GET"
```

### 8.2. **Мокирование ответов**

```python
def test_api_mock(page: Page):
    # Мокируем API ответ
    page.route("**/api/users", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body=json.dumps([{"id": 1, "name": "Mocked User"}]),
    ))
    
    page.goto("/users-page")
    expect(page.locator(".user-name")).to_have_text("Mocked User")
```

## 9. **Параметризация тестов**

Как и в Pytest, тесты можно параметризировать:

```python
import pytest

@pytest.mark.parametrize("username,password", [
    ("user1", "pass1"),
    ("test_user", "secure_pass"),
])
def test_login(page: Page, username, password):
    page.goto("/login")
    page.get_by_label("Username").fill(username)
    page.get_by_label("Password").fill(password)
    page.get_by_role("button", name="Login").click()
    expect(page).to_have_url("/dashboard")
```

## 10. **Плагины и интеграции**

### 10.1. **Популярные плагины**

- **pytest-playwright**: Основная интеграция Playwright с pytest
- **pytest-base-url**: Управление базовыми URL для тестов
- **pytest-parallel**: Параллельное выполнение тестов
- **allure-pytest**: Генерация отчетов Allure

### 10.2. **Пример конфигурации**

`conftest.py`:
```python
import pytest
from playwright.sync_api import Playwright

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {"width": 1920, "height": 1080},
        "ignore_https_errors": True,
    }
```

## 11. **Советы по оптимизации**

1. **Используйте один браузер для всех тестов**:
   ```python
   @pytest.fixture(scope="session")
   def browser(playwright):
       return playwright.chromium.launch()
   ```

2. **Включайте трассировку для отладки**:
   ```bash
   pytest --tracing=on
   ```

3. **Используйте storage state для аутентификации**:
   ```python
   def test_auth(browser):
       context = browser.new_context()
       page = context.new_page()
       # Выполняем логин
       context.storage_state(path="auth.json")
   ```

4. **Параллелизация тестов**:
   ```bash
   pytest --numprocesses=auto
   ```

5. **Генерация отчетов**:
   ```bash
   pytest --html=report.html --self-contained-html
   ```

## 12. **Пример комплексного теста**

```python
import re
import pytest
from playwright.sync_api import expect

@pytest.mark.e2e
def test_complete_flow(page):
    # Навигация и проверка заголовка
    page.goto("https://demo.playwright.dev/todomvc")
    expect(page).to_have_title("React • TodoMVC")
    
    # Добавление задач
    new_todo = page.get_by_placeholder("What needs to be done?")
    new_todo.fill("Buy milk")
    new_todo.press("Enter")
    new_todo.fill("Pay bills")
    new_todo.press("Enter")
    
    # Проверка добавленных задач
    todo_items = page.get_by_test_id("todo-item")
    expect(todo_items).to_have_count(2)
    expect(todo_items.first).to_have_text("Buy milk")
    
    # Отметка задачи как выполненной
    todo_items.first.get_by_role("checkbox").check()
    
    # Фильтрация задач
    page.get_by_role("link", name="Active").click()
    expect(todo_items).to_have_count(1)
    
    # Очистка выполненных задач
    page.get_by_role("link", name="Completed").click()
    page.get_by_text("Clear completed").click()
    expect(todo_items).to_have_count(0)
```

Этот гайд охватывает основные аспекты работы с Playwright на Python. Фреймворк продолжает развиваться, поэтому рекомендуется следить за обновлениями в [официальной документации](https://playwright.dev/python/docs/intro).