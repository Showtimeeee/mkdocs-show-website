# Паттерн Factory Method

**Фабричный метод** — это порождающий паттерн проектирования, который определяет интерфейс для создания объектов, но позволяет подклассам решать, какой именно класс инстанцировать. Он делегирует создание объектов дочерним классам, обеспечивая гибкость и ослабление связанности кода.

#### **Основная концепция**

Суть паттерна заключается в том, что:
- Базовый класс объявляет абстрактный "фабричный метод" для создания объектов
- Подклассы переопределяют этот метод, возвращая конкретные типы объектов
- Клиентский код работает с общим интерфейсом, не завися от конкретных классов

#### **Преимущества использования**

1. **Гибкость и расширяемость**
   - Новые типы продуктов можно добавлять без изменения существующего кода
   - Система легко адаптируется к новым требованиям

2. **Ослабление связанности**
   - Клиентский код зависит только от интерфейсов, а не от конкретных классов
   - Упрощается тестирование и модификация

3. **Единая точка создания объектов**
   - Централизованное управление процессом инстанцирования
   - Упрощается добавление дополнительной логики при создании объектов

#### **Ключевые компоненты**

1. **Продукт (Product)**
   - Общий интерфейс для всех объектов, которые создает фабрика
   - Определяет методы, которые будут доступны клиенту

2. **Конкретный продукт (Concrete Product)**
   - Реализует интерфейс продукта
   - Конкретный класс, экземпляры которого создаются фабрикой

3. **Создатель (Creator)**
   - Объявляет фабричный метод, возвращающий объект типа продукта
   - Может содержать базовую реализацию фабричного метода

4. **Конкретный создатель (Concrete Creator)**
   - Переопределяет фабричный метод, возвращая конкретный продукт
   - Реализует специфическую логику создания объекта

#### **Лучшие практики**

1. **Параметризация фабричного метода**
   - Передача параметров для определения типа создаваемого объекта
   - Упрощение клиентского кода при небольшом количестве вариаций

2. **Использоваение хуков**
   - Предоставление стандартной реализации по умолчанию
   - Возможность переопределения только при необходимости

3. **Соблюдение принципа подстановки Лисков**
   - Все конкретные продукты должны быть взаимозаменяемы
   - Сохранение контракта базового интерфейса

#### **Пример реализации**

```python
from abc import ABC, abstractmethod

# Продукт
class Transport(ABC):
    @abstractmethod
    def deliver(self) -> str:
        pass

# Конкретные продукты
class Truck(Transport):
    def deliver(self) -> str:
        return "Доставка по суше (грузовик)"

class Ship(Transport):
    def deliver(self) -> str:
        return "Доставка по морю (корабль)"

class Drone(Transport):
    def deliver(self) -> str:
        return "Доставка по воздуху (дрон)"

# Создатель
class Logistics(ABC):
    @abstractmethod
    def create_transport(self) -> Transport:
        """Фабричный метод"""
        pass
    
    def plan_delivery(self) -> str:
        """Бизнес-логика, использующая фабричный метод"""
        transport = self.create_transport()
        return f"Планирование доставки: {transport.deliver()}"

# Конкретные создатели
class RoadLogistics(Logistics):
    def create_transport(self) -> Transport:
        return Truck()

class SeaLogistics(Logistics):
    def create_transport(self) -> Transport:
        return Ship()

class AirLogistics(Logistics):
    def create_transport(self) -> Transport:
        return Drone()
```

#### **Когда использовать**

- Когда заранее неизвестно, объекты каких классов нужно создавать
- Когда система должна быть независимой от процесса создания объектов
- Когда необходимо делегировать создание объектов подклассам
- При добавлении новых типов продуктов без изменения существующего кода

#### **Альтернативы и дополнения**

1. **Simple Factory**
   - Более простой, но менее гибкий подход
   - Использует отдельный класс с условными операторами

2. **Abstract Factory**
   - Создает семейства связанных объектов
   - Более сложный паттерн для масштабных систем

3. **Dependency Injection**
   - Передача готовых зависимостей извне
   - Еще более слабая связанность

---

## Пример использования Factory Method для создания уведомлений

Вот пример использования паттерна Factory Method для системы уведомлений, которая поддерживает различные каналы доставки сообщений. Это демонстрирует гибкость паттерна и его преимущества на практике.

### Реализация

```python
from abc import ABC, abstractmethod
from typing import Dict, Any

# ----- Продукты -----
class Notification(ABC):
    """Интерфейс уведомления"""
    
    @abstractmethod
    def send(self, recipient: str, message: str) -> bool:
        pass
    
    @abstractmethod
    def get_status(self) -> Dict[str, Any]:
        pass

class EmailNotification(Notification):
    """Уведомление по электронной почте"""
    
    def __init__(self):
        self._status = {"type": "email", "sent": False, "error": None}
    
    def send(self, recipient: str, message: str) -> bool:
        try:
            # Симуляция отправки email
            print(f"[EMAIL] Отправка на {recipient}: {message}")
            self._status["sent"] = True
            return True
        except Exception as e:
            self._status["error"] = str(e)
            return False
    
    def get_status(self) -> Dict[str, Any]:
        return self._status

class SMSNotification(Notification):
    """SMS-уведомление"""
    
    def __init__(self):
        self._status = {"type": "sms", "sent": False, "error": None}
    
    def send(self, recipient: str, message: str) -> bool:
        try:
            # Ограничение длины SMS
            if len(message) > 160:
                message = message[:157] + "..."
            print(f"[SMS] Отправка на {recipient}: {message}")
            self._status["sent"] = True
            return True
        except Exception as e:
            self._status["error"] = str(e)
            return False
    
    def get_status(self) -> Dict[str, Any]:
        return self._status

class PushNotification(Notification):
    """Push-уведомление для мобильных устройств"""
    
    def __init__(self):
        self._status = {"type": "push", "sent": False, "error": None}
    
    def send(self, recipient: str, message: str) -> bool:
        try:
            print(f"[PUSH] Отправка устройству {recipient}: {message}")
            self._status["sent"] = True
            return True
        except Exception as e:
            self._status["error"] = str(e)
            return False
    
    def get_status(self) -> Dict[str, Any]:
        return self._status

# ----- Создатели -----
class NotificationFactory(ABC):
    """Абстрактная фабрика уведомлений"""
    
    @abstractmethod
    def create_notification(self) -> Notification:
        """Фабричный метод создания уведомления"""
        pass
    
    def send_notification(self, recipient: str, message: str) -> bool:
        """Шаблонный метод для отправки уведомления"""
        notification = self.create_notification()
        result = notification.send(recipient, message)
        
        # Дополнительная логика (логирование, статистика и т.д.)
        status = notification.get_status()
        print(f"Статус отправки: {status}")
        
        return result

class EmailFactory(NotificationFactory):
    def create_notification(self) -> Notification:
        return EmailNotification()

class SMSFactory(NotificationFactory):
    def create_notification(self) -> Notification:
        return SMSNotification()

class PushFactory(NotificationFactory):
    def create_notification(self) -> Notification:
        return PushNotification()
```

### Пример использования

```python
def client_code(factory: NotificationFactory, recipient: str, message: str):
    """Клиентский код работает с любой фабрикой через общий интерфейс"""
    print(f"\n--- Отправка через {factory.__class__.__name__} ---")
    success = factory.send_notification(recipient, message)
    print(f"Результат: {'Успешно' if success else 'Ошибка'}")

# Использование
if __name__ == "__main__":
    # Создание различных фабрик
    email_factory = EmailFactory()
    sms_factory = SMSFactory()
    push_factory = PushFactory()
    
    # Отправка уведомлений через разные каналы
    client_code(email_factory, "user@example.com", "Ваш заказ подтвержден!")
    client_code(sms_factory, "+79123456789", "Код подтверждения: 123456")
    client_code(push_factory, "device_token_123", "Новое сообщение в чате")
    
    # Легко добавить новый тип уведомления
    # class TelegramNotification...
    # class TelegramFactory...
```

### Как это работает

1. **Единый интерфейс для всех уведомлений**:
   - Базовый класс `Notification` определяет контракт для всех типов уведомлений
   - Клиентский код работает только с этим интерфейсом

2. **Делегирование создания подклассам**:
   - Каждая конкретная фабрика (`EmailFactory`, `SMSFactory`) решает, какой именно объект создавать
   - Базовый класс `NotificationFactory` содержит общую бизнес-логику

3. **Легкое расширение**:
   - Для добавления нового типа уведомлений (Telegram, WhatsApp, Viber) достаточно:
     - Создать новый класс продукта (`TelegramNotification`)
     - Создать новую фабрику (`TelegramFactory`)
   - Никакой существующий код менять не нужно

4. **Централизованная логика**:
   - Метод `send_notification` содержит общую логику для всех уведомлений
   - Каждый конкретный продукт реализует только свою специфику

### Преимущества этого подхода

1. **Расширяемость без изменений**:
   ```python
   # Добавление нового типа без изменения существующего кода
   class TelegramNotification(Notification):
       # реализация...
   
   class TelegramFactory(NotificationFactory):
       def create_notification(self) -> Notification:
           return TelegramNotification()
   ```

2. **Гибкость на стороне клиента**:
   - Клиент может решать, какую фабрику использовать во время выполнения
   - Легко переключаться между разными типами уведомлений

3. **Упрощение тестирования**:
   - Можно создавать mock-фабрики для тестирования
   - Логика создания изолирована от бизнес-логики

4. **Соответствие принципам SOLID**:
   - **Open/Closed Principle**: Классы открыты для расширения, закрыты для изменения
   - **Liskov Substitution**: Все продукты взаимозаменяемы
   - **Dependency Inversion**: Зависимости направлены на абстракции

### Когда использовать этот подход

- Приложения с несколькими способами отправки уведомлений (email, SMS, push, мессенджеры)
- Системы, где типы создаваемых объектов могут изменяться или расширяться
- Когда нужно отделить логику создания объектов от их использования
- В платежных системах с разными платежными шлюзами
- В играх для создания разных типов врагов, уровней или бонусов