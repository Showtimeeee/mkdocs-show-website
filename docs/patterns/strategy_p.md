# Паттерн Strategy

**Strategy (Стратегия)** — это поведенческий паттерн проектирования, который определяет семейство алгоритмов, инкапсулирует каждый из них и делает их взаимозаменяемыми. Стратегия позволяет изменять алгоритм независимо от клиентов, которые его используют.

---

## Основная концепция

Суть паттерна заключается в том, что:
- **Алгоритмы выносятся в отдельные классы (стратегии)**, реализующие общий интерфейс.
- **Контекст (Context)** хранит ссылку на текущую стратегию и делегирует ей выполнение работы.
- Клиент может **динамически заменять** стратегию во время выполнения программы.
- Новые алгоритмы можно добавлять, **не изменяя** существующий код контекста.

---

## Преимущества использования

1. **Принцип открытости/закрытости (Open/Closed)**
   - Новые алгоритмы можно добавлять, не изменяя код контекста и других стратегий.

2. **Изоляция алгоритмов**
   - Каждый алгоритм живёт в своём классе, что упрощает тестирование и отладку.

3. **Избавление от условных операторов**
   - Вместо громоздких if-else или switch-case код становится чище и понятнее.

4. **Динамическая замена**
   - Алгоритм можно менять во время выполнения программы без пересоздания объектов.

5. **Повторное использование**
   - Стратегии можно переиспользовать в разных контекстах.

---

## Ключевые компоненты

1. **Strategy (Интерфейс стратегии)**
   - Объявляет метод, общий для всех поддерживаемых алгоритмов.
   - Контекст использует этот интерфейс для вызова конкретной стратегии.

2. **ConcreteStrategy (Конкретная стратегия)**
   - Реализует алгоритм, следуя интерфейсу Strategy.
   - Каждая конкретная стратегия представляет свой вариант алгоритма.

3. **Context (Контекст)**
   - Хранит ссылку на объект Strategy.
   - Может предоставлять интерфейс для замены стратегии.
   - Делегирует выполнение работы текущей стратегии.

4. **Client (Клиент)**
   - Создаёт объект контекста и передаёт ему нужную стратегию.
   - Может заменять стратегию во время выполнения.

---

## Пример: Система расчёта стоимости доставки

Предположим, у нас есть интернет-магазин, который доставляет товары разными способами. Стоимость доставки зависит от выбранного способа: обычная почта, экспресс-доставка или самовывоз.

### Без Strategy (проблемный подход)

```python
class DeliveryCalculator:
    def calculate_cost(self, method, weight, distance):
        if method == "standard":
            return weight * 0.5 + distance * 0.1
        elif method == "express":
            return weight * 1.0 + distance * 0.5 + 10
        elif method == "pickup":
            return 0
        else:
            raise ValueError("Неизвестный способ доставки")

# Проблема: при добавлении нового способа нужно менять существующий класс
```

---

### С Strategy

```python
from abc import ABC, abstractmethod

# 1. Интерфейс стратегии
class DeliveryStrategy(ABC):
    @abstractmethod
    def calculate(self, weight: float, distance: float) -> float:
        pass

# 2. Конкретные стратегии
class StandardDelivery(DeliveryStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        # Обычная доставка: базовая ставка + вес + расстояние
        return 5.0 + weight * 0.5 + distance * 0.1

class ExpressDelivery(DeliveryStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        # Экспресс-доставка: фиксированная надбавка + повышенные коэффициенты
        return 15.0 + weight * 1.0 + distance * 0.5

class PickupDelivery(DeliveryStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        # Самовывоз: бесплатно
        return 0.0

class InternationalDelivery(DeliveryStrategy):
    def calculate(self, weight: float, distance: float) -> float:
        # Международная доставка: сложный расчёт
        base_cost = weight * 2.0 + distance * 0.8
        return base_cost * 1.2  # +20% таможенные сборы

# 3. Контекст
class Order:
    def __init__(self, weight: float, distance: float, strategy: DeliveryStrategy):
        self.weight = weight
        self.distance = distance
        self._strategy = strategy

    def set_strategy(self, strategy: DeliveryStrategy):
        """Динамическая замена стратегии"""
        self._strategy = strategy

    def calculate_delivery_cost(self) -> float:
        """Делегирует расчёт текущей стратегии"""
        return self._strategy.calculate(self.weight, self.distance)

    def get_order_info(self) -> str:
        return f"Заказ: вес={self.weight}кг, расстояние={self.distance}км"

# 4. Клиентский код
def main():
    order = Order(weight=3.5, distance=10, strategy=StandardDelivery())
    
    print(order.get_order_info())
    print(f"Обычная доставка: {order.calculate_delivery_cost():.2f} руб.")
    
    # Меняем стратегию
    order.set_strategy(ExpressDelivery())
    print(f"Экспресс-доставка: {order.calculate_delivery_cost():.2f} руб.")
    
    order.set_strategy(PickupDelivery())
    print(f"Самовывоз: {order.calculate_delivery_cost():.2f} руб.")
    
    order.set_strategy(InternationalDelivery())
    print(f"Международная: {order.calculate_delivery_cost():.2f} руб.")

if __name__ == "__main__":
    main()
```

**Вывод:**
```
Заказ: вес=3.5кг, расстояние=10км
Обычная доставка: 8.75 руб.
Экспресс-доставка: 24.00 руб.
Самовывоз: 0.00 руб.
Международная: 18.00 руб.
```

---

## Более сложный пример: Графический редактор

```python
from abc import ABC, abstractmethod

# 1. Интерфейс стратегии фильтрации
class FilterStrategy(ABC):
    @abstractmethod
    def apply(self, image_data: list) -> list:
        pass

# 2. Конкретные стратегии
class BlackAndWhiteFilter(FilterStrategy):
    def apply(self, image_data: list) -> list:
        print("Применяем чёрно-белый фильтр...")
        return [pixel * 0.3 for pixel in image_data]  # упрощённо

class SepiaFilter(FilterStrategy):
    def apply(self, image_data: list) -> list:
        print("Применяем сепию...")
        return [pixel * 0.8 for pixel in image_data]  # упрощённо

class BlurFilter(FilterStrategy):
    def __init__(self, radius: int = 3):
        self.radius = radius
    
    def apply(self, image_data: list) -> list:
        print(f"Применяем размытие (радиус={self.radius})...")
        # Имитация размытия
        return [pixel * 0.5 for pixel in image_data]

# 3. Контекст
class ImageProcessor:
    def __init__(self):
        self._image = []
        self._filter = None

    def load_image(self, image_data: list):
        self._image = image_data
        print(f"Загружено изображение размером {len(image_data)} пикселей")

    def set_filter(self, filter_strategy: FilterStrategy):
        self._filter = filter_strategy
        print(f"Установлен фильтр: {filter_strategy.__class__.__name__}")

    def apply_filter(self):
        if self._filter is None:
            raise ValueError("Фильтр не установлен")
        self._image = self._filter.apply(self._image)
        print("Фильтр применён успешно")

    def display(self):
        print(f"Изображение: {self._image[:5]}...")  # Показываем первые 5 пикселей

# Клиентский код
processor = ImageProcessor()
processor.load_image([100, 120, 80, 200, 150, 90])

processor.set_filter(BlackAndWhiteFilter())
processor.apply_filter()
processor.display()

processor.set_filter(SepiaFilter())
processor.apply_filter()
processor.display()

processor.set_filter(BlurFilter(radius=5))
processor.apply_filter()
processor.display()
```

---

## Когда использовать

1. **Множество похожих алгоритмов**
   - Когда есть несколько вариантов решения одной задачи, и они отличаются только способом реализации.

2. **Избавление от условных операторов**
   - Когда класс содержит громоздкие if-else или switch-case для выбора алгоритма.

3. **Динамическое изменение поведения**
   - Когда алгоритм должен выбираться или меняться во время выполнения программы.

4. **Сложность алгоритмов**
   - Когда алгоритмы содержат много логики и лучше вынести их в отдельные классы.

5. **Тестирование**
   - Когда нужно тестировать алгоритмы изолированно друг от друга.

---

## Лучшие практики

1. **Соблюдайте единый интерфейс**
   - Все стратегии должны реализовывать один и тот же интерфейс, чтобы контекст мог работать с ними единообразно.

2. **Используйте фабрики для создания стратегий**
   - Если выбор стратегии сложный, создайте отдельную фабрику или используйте DI-контейнер.

3. **Передавайте контекст в стратегию при необходимости**
   - Иногда стратегии нужен доступ к данным контекста. Можно передавать контекст как параметр метода.

4. **Не храните состояние в стратегиях**
   - Стратегии должны быть stateless (без состояния), если это возможно. Это упрощает их переиспользование.

5. **Документируйте особенности стратегий**
   - Каждая стратегия может иметь свои предварительные условия или ограничения. Документируйте их.

---

## Альтернативы и дополнения

1. **State Pattern**
   - Похож на Strategy, но меняет поведение объекта при изменении его внутреннего состояния.

2. **Command Pattern**
   - Инкапсулирует запрос как объект, но обычно используется для очередей и отложенного выполнения.

3. **Factory Pattern**
   - Часто используется вместе со Strategy для создания подходящей стратегии.

4. **Лямбда-функции / Функции высшего порядка**
   - В языках с поддержкой функционального программирования (Python, JavaScript) простые стратегии можно реализовать как функции.

### Альтернатива с лямбда-функциями

```python
# Простой вариант с функциями вместо классов
def standard_cost(weight, distance):
    return 5.0 + weight * 0.5 + distance * 0.1

def express_cost(weight, distance):
    return 15.0 + weight * 1.0 + distance * 0.5

class Order:
    def __init__(self, weight, distance, strategy_func):
        self.weight = weight
        self.distance = distance
        self.strategy = strategy_func
    
    def calculate(self):
        return self.strategy(self.weight, self.distance)

order = Order(3.5, 10, standard_cost)
print(order.calculate())  # 8.75
```

---

## Пример из жизни: Навигатор

Представьте, что вы используете навигатор в автомобиле. Он может строить маршруты разными способами (стратегиями):
- **Самый быстрый маршрут** — учитывает пробки и скоростные ограничения
- **Самый короткий маршрут** — минимизирует расстояние
- **Экономичный маршрут** — минимизирует расход топлива
- **Живописный маршрут** — проходит через достопримечательности

Вы можете переключать эти стратегии в любой момент, не меняя сам навигатор. Навигатор просто делегирует построение маршрута текущей стратегии. При этом разработчики могут добавлять новые типы маршрутов (например, "без платных дорог"), не изменяя код основного навигатора.

---

## Вывод

**Strategy** — это элегантный способ сделать алгоритмы взаимозаменяемыми и изолированными. Паттерн позволяет выделить изменяющуюся часть поведения (алгоритм) и подставлять её в основной класс (контекст) через единый интерфейс. Это делает код более гибким, тестируемым и соответствующим принципам SOLID. Strategy особенно полезен в системах, где алгоритмы часто меняются, расширяются или выбираются динамически в зависимости от условий.