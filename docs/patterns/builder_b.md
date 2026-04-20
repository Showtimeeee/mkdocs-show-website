# Паттерн Builder

**Builder** — это порождающий паттерн проектирования, который разделяет конструирование сложного объекта от его представления. Он позволяет создавать разные представления объекта, используя один и тот же процесс построения.

#### **Основная концепция**

Суть паттерна заключается в том, что:
- Создание сложного объекта выносится в отдельный объект-строитель
- Процесс конструирования разбивается на отдельные шаги
- Один и тот же процесс может создавать разные варианты объекта

#### **Преимущества использования**

1. **Пошаговое создание** — упрощает конструирование объектов со множеством параметров
2. **Повторное использование процесса** — один код сборки создаёт разные представления
3. **Изоляция сложной логики** — код создания отделён от бизнес-логики
4. **Читаемость** — избавляет от "телескопических" конструкторов

#### **Ключевые компоненты**

1. **Product** — сложный объект, который создаётся
2. **Builder** — интерфейс с шагами конструирования
3. **ConcreteBuilder** — реализация шагов для конкретного представления
4. **Director** (опционально) — определяет последовательность шагов
5. **Client** — управляет процессом создания

#### **Лучшие практики**

1. **Возвращай `self`** — это позволяет использовать текучий интерфейс (fluent interface)
2. **Валидируй в `build()`** — проверяй, что все обязательные поля установлены
3. **Делай продукт неизменяемым** — после создания объект не должен меняться
4. **Используй Director для типовых сценариев** — чтобы не дублировать код сборки

#### **Пример реализации**

```python
# Продукт
class Computer:
    def __init__(self):
        self.cpu = ""
        self.ram = ""
        self.storage = ""

    def __str__(self):
        return f"Computer(cpu={self.cpu}, ram={self.ram}, storage={self.storage})"

# Строитель
class ComputerBuilder:
    def __init__(self):
        self._computer = Computer()

    def set_cpu(self, cpu: str):
        self._computer.cpu = cpu
        return self

    def set_ram(self, ram: str):
        self._computer.ram = ram
        return self

    def set_storage(self, storage: str):
        self._computer.storage = storage
        return self

    def build(self):
        if not self._computer.cpu:
            raise ValueError("CPU обязателен")
        return self._computer

# Директор (опционально)
class ComputerDirector:
    @staticmethod
    def gaming_pc(builder: ComputerBuilder) -> Computer:
        return (builder
                .set_cpu("Intel i9")
                .set_ram("32GB")
                .set_storage("1TB SSD")
                .build())

    @staticmethod
    def office_pc(builder: ComputerBuilder) -> Computer:
        return (builder
                .set_cpu("Intel i5")
                .set_ram("16GB")
                .set_storage("512GB SSD")
                .build())

# Использование
builder = ComputerBuilder()
gaming = ComputerDirector.gaming_pc(builder)
print(gaming)  # Computer(cpu=Intel i9, ram=32GB, storage=1TB SSD)

# Без директора — кастомный вариант
custom = (ComputerBuilder()
          .set_cpu("AMD Ryzen 7")
          .set_ram("64GB")
          .set_storage("2TB SSD")
          .build())
print(custom)
```

#### **Когда использовать**

- Объект требует множества шагов или параметров (более 4-5)
- Один и тот же процесс конструирования должен создавать разные представления
- Конструктор становится "телескопическим" (множество перегруженных версий)
- Объект должен быть неизменяемым, но имеет много опциональных параметров

#### **Альтернативы и дополнения**

1. **Factory Method** — создаёт объект за один шаг, а не пошагово
2. **Abstract Factory** — создаёт семейства связанных объектов
3. **Step Builder** — продвинутый вариант с принудительным указанием обязательных полей

---

## Пример использования Builder для создания заказа в интернет-магазине

```python
class Order:
    def __init__(self):
        self.items = []
        self.delivery_address = ""
        self.payment_method = ""
        self.gift_wrap = False

class OrderBuilder:
    def __init__(self):
        self._order = Order()

    def add_item(self, name: str, price: float, quantity: int = 1):
        self._order.items.append({"name": name, "price": price, "qty": quantity})
        return self

    def set_delivery(self, address: str):
        self._order.delivery_address = address
        return self

    def set_payment(self, method: str):
        self._order.payment_method = method
        return self

    def add_gift_wrap(self):
        self._order.gift_wrap = True
        return self

    def build(self):
        if not self._order.items:
            raise ValueError("Заказ не может быть пустым")
        if not self._order.delivery_address:
            raise ValueError("Адрес доставки обязателен")
        return self._order

# Использование
order = (OrderBuilder()
         .add_item("Ноутбук", 75000, 1)
         .add_item("Мышь", 1500, 2)
         .set_delivery("ул. Пушкина, 10")
         .set_payment("Карта")
         .add_gift_wrap()
         .build())
```

### Как это работает

1. **Строитель** предоставляет методы для установки каждой части продукта
2. **Каждый метод возвращает `self`** — это позволяет выстраивать цепочки вызовов
3. **Метод `build()`** проверяет корректность и возвращает готовый объект
4. **Директор** (опционально) содержит готовые рецепты создания типовых объектов

### Когда использовать этот подход

- Формирование сложных заказов, запросов или конфигураций
- Создание объектов с большим количеством опциональных параметров
- Построение SQL-запросов
- Генерация email-писем с разными блоками
- Создание тестовых данных с разными комбинациями полей