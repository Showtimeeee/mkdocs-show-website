# Паттерн Abstract Factory

**Abstract Factory** — это порождающий паттерн проектирования, который позволяет создавать семейства связанных или взаимозависимых объектов, не привязываясь к их конкретным классам. Он идеально подходит для ситуаций, когда система должна быть независимой от способов создания, компоновки и представления продуктов.

#### **Основная концепция**

Суть паттерна заключается в том, что:
- Создаётся интерфейс **абстрактной фабрики**, который объявляет методы для создания каждого продукта из семейства
- Каждая **конкретная фабрика** реализует эти методы и создаёт продукты определённого семейства
- Клиент работает только с абстрактными интерфейсами и не знает, какие именно классы он использует

#### **Преимущества использования**

1. **Гарантия совместимости**
   - Продукты одного семейства всегда сочетаются друг с другом
   - Исключаются ошибки несовместимых комбинаций объектов

2. **Отделение клиента от конкретных классов**
   - Код клиента не зависит от того, какие именно классы продуктов используются
   - Легко заменять целые семейства продуктов (например, для разных платформ)

3. **Упрощение добавления новых семейств**
   - Достаточно создать новую конкретную фабрику
   - Существующий клиентский код не меняется

4. **Централизованное управление**
   - Все создания объектов собраны в одном месте
   - Упрощается тестирование и поддержка

#### **Ключевые компоненты**

1. **AbstractProduct (Абстрактный продукт)**
   - Интерфейс для каждого типа продукта (например, `Button`, `Checkbox`)
   - Определяет общие методы для всех вариантов продукта

2. **ConcreteProduct (Конкретный продукт)**
   - Реализация абстрактного продукта для конкретного семейства
   - Например, `WindowsButton`, `MacButton`

3. **AbstractFactory (Абстрактная фабрика)**
   - Интерфейс с методами для создания всех типов продуктов
   - Каждый метод возвращает абстрактный продукт

4. **ConcreteFactory (Конкретная фабрика)**
   - Реализует методы создания продуктов для конкретного семейства
   - Возвращает конкретные продукты, соответствующие друг другу

5. **Client (Клиент)**
   - Работает только с абстрактными интерфейсами
   - Получает фабрику через внедрение зависимости или конфигурацию

#### **Лучшие практики**

1. **Определяй семейства продуктов осознанно**
   - Группируй только те продукты, которые действительно должны использоваться вместе
   - Избегай создания фабрик-гигантов с десятками методов

2. **Комбинируй с паттерном Singleton**
   - Часто конкретная фабрика создаётся как синглтон
   - Это оправдано, когда для всего приложения нужна одна фабрика конкретного семейства

3. **Используй Dependency Injection**
   - Внедряй фабрику в клиент через конструктор или метод
   - Это повышает тестируемость и гибкость

4. **Применяй при проектировании кроссплатформенных систем**
   - GUI-библиотеки (Windows/Mac/Linux)
   - Поддержка разных баз данных (MySQL/PostgreSQL/Oracle)

#### **Пример реализации**

```python
from abc import ABC, abstractmethod

# ---------- Абстрактные продукты ----------
class Button(ABC):
    @abstractmethod
    def render(self) -> str:
        pass

    @abstractmethod
    def on_click(self) -> None:
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self) -> str:
        pass

    @abstractmethod
    def toggle(self) -> None:
        pass

# ---------- Конкретные продукты для Windows ----------
class WindowsButton(Button):
    def render(self) -> str:
        return "Отрисовка кнопки в стиле Windows"

    def on_click(self) -> None:
        print("Клик по Windows-кнопке")

class WindowsCheckbox(Checkbox):
    def render(self) -> str:
        return "Отрисовка чекбокса в стиле Windows"

    def toggle(self) -> None:
        print("Переключение Windows-чекбокса")

# ---------- Конкретные продукты для macOS ----------
class MacButton(Button):
    def render(self) -> str:
        return "Отрисовка кнопки в стиле macOS"

    def on_click(self) -> None:
        print("Клик по Mac-кнопке")

class MacCheckbox(Checkbox):
    def render(self) -> str:
        return "Отрисовка чекбокса в стиле macOS"

    def toggle(self) -> None:
        print("Переключение Mac-чекбокса")

# ---------- Абстрактная фабрика ----------
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

# ---------- Конкретные фабрики ----------
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

# ---------- Клиентский код ----------
def render_ui(factory: GUIFactory) -> None:
    button = factory.create_button()
    checkbox = factory.create_checkbox()

    print(button.render())
    print(checkbox.render())
    button.on_click()
    checkbox.toggle()

# ---------- Использование ----------
if __name__ == "__main__":
    # Определяем ОС (обычно из конфигурации или переменной окружения)
    os_type = "Windows"  # или "macOS"

    if os_type == "Windows":
        factory = WindowsFactory()
    else:
        factory = MacFactory()

    render_ui(factory)
```

#### **Когда использовать**

- Система должна быть независима от того, как создаются и компонуются её продукты
- Несколько семейств продуктов предназначены для использования вместе (должны быть согласованы между собой)
- Нужно предоставить библиотеку продуктов, раскрывая только их интерфейсы, но не реализацию
- В кроссплатформенных приложениях, где интерфейс должен выглядеть "родным" для каждой платформы

#### **Альтернативы и дополнения**

1. **Factory Method**
   - Создаёт один продукт, а не семейство
   - Проще, но не гарантирует совместимость продуктов между собой

2. **Builder**
   - Создаёт сложный объект пошагово
   - Подходит, когда нужен контроль над процессом конструирования

3. **Dependency Injection Container**
   - Более современный подход для управления зависимостями
   - Может заменить фабрики в некоторых сценариях

---

## Пример использования Abstract Factory для кроссплатформенного GUI

Вот практический пример, демонстрирующий, как Abstract Factory помогает создавать кроссплатформенные интерфейсы. Система автоматически выбирает нужное семейство виджетов в зависимости от операционной системы.

```python
import platform
from abc import ABC, abstractmethod

# ---------- Продукты: Модальное окно и Панель инструментов ----------
class ModalDialog(ABC):
    @abstractmethod
    def show(self, message: str) -> str:
        pass

class Toolbar(ABC):
    @abstractmethod
    def add_button(self, label: str) -> None:
        pass

# ---------- Реализация для Windows ----------
class WindowsModalDialog(ModalDialog):
    def show(self, message: str) -> str:
        return f"[Windows Modal] {message} (закрыть по кнопке 'ОК')"

class WindowsToolbar(Toolbar):
    def __init__(self):
        self.buttons = []

    def add_button(self, label: str) -> None:
        self.buttons.append(f"[WinBtn] {label}")
        print(f"Панель Windows: добавлена кнопка '{label}'")

# ---------- Реализация для macOS ----------
class MacModalDialog(ModalDialog):
    def show(self, message: str) -> str:
        return f"[macOS Alert] {message} (кнопки: 'Отмена', 'ОК')"

class MacToolbar(Toolbar):
    def __init__(self):
        self.buttons = []

    def add_button(self, label: str) -> None:
        self.buttons.append(f"[MacBtn] {label}")
        print(f"Панель macOS: добавлена кнопка '{label}'")

# ---------- Абстрактная фабрика ----------
class UIFactory(ABC):
    @abstractmethod
    def create_modal_dialog(self) -> ModalDialog:
        pass

    @abstractmethod
    def create_toolbar(self) -> Toolbar:
        pass

# ---------- Конкретные фабрики ----------
class WindowsUIFactory(UIFactory):
    def create_modal_dialog(self) -> ModalDialog:
        return WindowsModalDialog()

    def create_toolbar(self) -> Toolbar:
        return WindowsToolbar()

class MacUIFactory(UIFactory):
    def create_modal_dialog(self) -> ModalDialog:
        return MacModalDialog()

    def create_toolbar(self) -> Toolbar:
        return MacToolbar()

# ---------- Функция для автоматического определения фабрики ----------
def get_factory_for_current_os() -> UIFactory:
    system = platform.system()
    if system == "Windows":
        return WindowsUIFactory()
    elif system == "Darwin":  # macOS
        return MacUIFactory()
    else:
        # Linux или другая ОС — можно вернуть фабрику по умолчанию
        raise NotImplementedError(f"ОС {system} не поддерживается")

# ---------- Клиентский код ----------
def create_application_window(factory: UIFactory) -> None:
    print("Создание окна приложения...")
    
    modal = factory.create_modal_dialog()
    toolbar = factory.create_toolbar()

    # Используем созданные компоненты
    toolbar.add_button("Сохранить")
    toolbar.add_button("Открыть")
    print(modal.show("Вы уверены, что хотите выйти?"))

# ---------- Запуск ----------
if __name__ == "__main__":
    try:
        factory = get_factory_for_current_os()
        print(f"Активная платформа: {platform.system()}")
        create_application_window(factory)
    except NotImplementedError as e:
        print(f"Ошибка: {e}")
```

---

### Как это работает

1. **Абстрактная фамилия** (`UIFactory`) объявляет методы для создания всех нужных компонентов интерфейса (`ModalDialog`, `Toolbar`).

2. **Конкретные фабрики** (`WindowsUIFactory`, `MacUIFactory`) создают конкретные виджеты, которые гарантированно совместимы между собой.

3. **Клиент** (`create_application_window`) работает только с абстрактными типами. Он понятия не имеет, создал ли он Windows-компоненты или macOS-компоненты.

4. **Автоматическое определение** (`get_factory_for_current_os`) выбирает нужную фабрику на основе текущей операционной системы.

### Преимущества этого подхода

1. **Полная изоляция клиента** — клиентский код не содержит ни одного `if` или переключения для разных ОС.

2. **Лёгкое расширение** — чтобы добавить поддержку Linux, достаточно создать `LinuxUIFactory` и соответствующие продукты. Клиентский код останется неизменным.

3. **Гарантия совместимости** — вы никогда случайно не смешаете Windows-диалог с macOS-панелью инструментов.

### Когда использовать этот подход

- Кроссплатформенные приложения с графическим интерфейсом
- Приложения, которые должны поддерживать разные темы оформления (светлая/тёмная)
- Системы, которые работают с разными базами данных или внешними API (например, фабрика платежных систем: PayPal/Stripe/Crypto)
- В играх — разные семейства врагов, оружия или уровней для разных миров