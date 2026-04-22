# Паттерн State

**State** — это поведенческий паттерн проектирования, который позволяет объекту изменять своё поведение в зависимости от внутреннего состояния. Создаётся впечатление, что объект изменил свой класс.

#### **Основная концепция**

Суть паттерна заключается в том, что:
- Поведение объекта выносится в отдельные классы-состояния
- Объект делегирует выполнение методов текущему объекту-состоянию
- При смене состояния объект начинает вести себя по-другому
- Избавляет от огромных условных конструкций (`if/elif/else` или `match/case`)

#### **Преимущества использования**

1. **Избавление от условной логики**
   - Вместо десятков проверок состояния — вызов метода текущего состояния
   - Код становится чище и понятнее

2. **Локализация поведения**
   - Поведение для каждого состояния собрано в одном классе
   - Легко добавлять новые состояния, не меняя существующие

3. **Упрощение поддержки**
   - Нужно изменить поведение для состояния — идёшь в один класс
   - Не нужно искать по всему коду проверки на это состояние

4. **Явные переходы между состояниями**
   - Сами состояния могут управлять переходами
   - Все возможные переходы легко отследить

#### **Ключевые компоненты**

1. **Context (Контекст)**
   - Объект, чьё поведение меняется
   - Хранит ссылку на текущий объект-состояние
   - Делегирует вызовы текущему состоянию

2. **State (Состояние)**
   - Интерфейс, объявляющий методы, характерные для всех состояний
   - Обычно содержит ссылку на контекст для смены состояния

3. **ConcreteState (Конкретные состояния)**
   - Реализуют поведение для конкретного состояния
   - Сами могут решать, когда и в какое состояние перейти

#### **Лучшие практики**

1. **Передавай контекст в состояние**
   - Чтобы состояние могло сменить состояние контекста
   - Обычно передаётся через конструктор или метод

2. **Состояния могут быть синглтонами**
   - Если у состояния нет своих полей — создавать каждый раз новый не нужно
   - Можно хранить статические экземпляры

3. **Определяй переходы в состояниях**
   - Лучше, когда состояние само решает, куда перейти
   - Контекст остаётся простым и глупым

4. **Используй для конечных автоматов**
   - Паттерн идеально подходит для реализации автоматов
   - Особенно если состояний много (больше 3-4)

#### **Пример реализации**

```python
from abc import ABC, abstractmethod

# ---------- Контекст ----------
class CoffeeMachine:
    def __init__(self):
        self._state: State = OffState(self)
        self.cups_brewed = 0

    def set_state(self, state):
        self._state = state

    def turn_on(self):
        self._state.turn_on()

    def turn_off(self):
        self._state.turn_off()

    def brew(self):
        self._state.brew()

# ---------- Абстрактное состояние ----------
class State(ABC):
    def __init__(self, machine: CoffeeMachine):
        self._machine = machine

    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass

    @abstractmethod
    def brew(self):
        pass

# ---------- Конкретные состояния ----------
class OffState(State):
    def turn_on(self):
        print("Кофемашина включается...")
        self._machine.set_state(ReadyState(self._machine))

    def turn_off(self):
        print("Кофемашина уже выключена")

    def brew(self):
        print("Не могу приготовить кофе: машина выключена. Включите её.")

class ReadyState(State):
    def turn_on(self):
        print("Кофемашина уже включена")

    def turn_off(self):
        print("Кофемашина выключается...")
        self._machine.set_state(OffState(self._machine))

    def brew(self):
        print("Начинаю приготовление кофе...")
        self._machine.set_state(BrewingState(self._machine))

class BrewingState(State):
    def __init__(self, machine: CoffeeMachine):
        super().__init__(machine)
        self._steps = 0
        self._brew()

    def _brew(self):
        if self._steps < 3:
            self._steps += 1
            print(f"Шаг {self._steps}/3: готовлю кофе...")
            import threading
            threading.Timer(1.0, self._brew).start()
        else:
            self._machine.cups_brewed += 1
            print(f"Кофе готов! Всего сварено: {self._machine.cups_brewed} чашек")
            self._machine.set_state(ReadyState(self._machine))

    def turn_on(self):
        print("Уже готовлю кофе, подождите")

    def turn_off(self):
        print("Не могу выключиться во время готовки")

    def brew(self):
        print("Уже готовлю кофе!")

# ---------- Использование ----------
machine = CoffeeMachine()

machine.brew()        # Не могу: машина выключена
machine.turn_on()     # Включаемся
machine.brew()        # Готовим кофе (запустится асинхронно)
machine.brew()        # Уже готовим
machine.turn_off()    # Не выключится во время готовки

# Через пару секунд кофе сварится и машина вернётся в ReadyState
```

#### **Когда использовать**

- Поведение объекта зависит от его состояния и меняется во время работы
- В коде много условных операторов, проверяющих состояние объекта
- Состояний достаточно много (больше 3) и логика для каждого сложная
- Нужно явно управлять переходами между состояниями

#### **Альтернативы и дополнения**

1. **Условные операторы** — для 2-3 простых состояний это проще
2. **Стратегия (Strategy)** — похож, но стратегия не знает о контексте, а состояние знает
3. **Конечный автомат (Finite State Machine)** — более формальная модель
4. **Перечисления (Enum) + switch** — для очень простых случаев

---

## Пример использования State для заказа в интернет-магазине

Заказ в интернет-магазине проходит разные стадии: новый, оплачен, в доставке, доставлен, отменён. Поведение заказа (что можно сделать) зависит от текущего состояния.

```python
from abc import ABC, abstractmethod

# ---------- Контекст (Заказ) ----------
class Order:
    def __init__(self, order_id: int):
        self.order_id = order_id
        self._state: OrderState = NewState(self)

    def set_state(self, state):
        self._state = state
        print(f"Заказ {self.order_id}: состояние изменено на {state.__class__.__name__}")

    def pay(self):
        self._state.pay()

    def ship(self):
        self._state.ship()

    def deliver(self):
        self._state.deliver()

    def cancel(self):
        self._state.cancel()

# ---------- Абстрактное состояние ----------
class OrderState(ABC):
    def __init__(self, order: Order):
        self._order = order

    @abstractmethod
    def pay(self):
        pass

    @abstractmethod
    def ship(self):
        pass

    @abstractmethod
    def deliver(self):
        pass

    @abstractmethod
    def cancel(self):
        pass

# ---------- Конкретные состояния ----------
class NewState(OrderState):
    def pay(self):
        print("Оплата принята. Заказ можно отправлять.")
        self._order.set_state(PaidState(self._order))

    def ship(self):
        print("Сначала нужно оплатить заказ!")

    def deliver(self):
        print("Сначала нужно оплатить и отправить заказ!")

    def cancel(self):
        print("Заказ отменён до оплаты.")
        self._order.set_state(CancelledState(self._order))

class PaidState(OrderState):
    def pay(self):
        print("Заказ уже оплачен.")

    def ship(self):
        print("Заказ передан в доставку.")
        self._order.set_state(ShippedState(self._order))

    def deliver(self):
        print("Заказ ещё не отправлен!")

    def cancel(self):
        print("Возврат средств. Заказ отменён.")
        self._order.set_state(CancelledState(self._order))

class ShippedState(OrderState):
    def pay(self):
        print("Заказ уже оплачен и отправлен.")

    def ship(self):
        print("Заказ уже в пути!")

    def deliver(self):
        print("Заказ доставлен получателю.")
        self._order.set_state(DeliveredState(self._order))

    def cancel(self):
        print("Нельзя отменить: заказ уже в пути. Дождитесь доставки для возврата.")

class DeliveredState(OrderState):
    def pay(self):
        print("Заказ уже доставлен и оплачен.")

    def ship(self):
        print("Заказ уже доставлен.")

    def deliver(self):
        print("Заказ уже доставлен.")

    def cancel(self):
        print("Оформляем возврат. Заказ будет отменён.")
        self._order.set_state(CancelledState(self._order))

class CancelledState(OrderState):
    def pay(self):
        print("Отменённый заказ нельзя оплатить.")

    def ship(self):
        print("Отменённый заказ нельзя отправить.")

    def deliver(self):
        print("Отменённый заказ нельзя доставить.")

    def cancel(self):
        print("Заказ уже отменён.")

# ---------- Использование ----------
order = Order(12345)

order.pay()      # Оплата принята → переходим в PaidState
order.ship()     # Заказ передан в доставку → ShippedState
order.deliver()  # Заказ доставлен → DeliveredState
order.cancel()   # Оформляем возврат → CancelledState

print("\n--- Пробуем неверные действия ---")
order2 = Order(67890)
order2.ship()    # Сначала нужно оплатить!
order2.cancel()  # Отменяем
order2.pay()     # Отменённый заказ нельзя оплатить
```

### Как это работает

1. **Контекст (Order)** — заказ, который меняет своё поведение
2. **Состояния** — New, Paid, Shipped, Delivered, Cancelled
3. **Каждое состояние** реализует методы `pay()`, `ship()`, `deliver()`, `cancel()`
4. **Переходы** — состояние само решает, когда и куда перейти
5. **Некорректные действия** — состояние выдаёт ошибку или игнорирует их

### Преимущества этого подхода

1. **Нет условной логики** — ни одного `if` по состоянию в классе `Order`
2. **Простота добавления нового состояния** — создаём новый класс и определяем переходы
3. **Лёгкость отладки** — всё поведение для каждого состояния в одном месте
4. **Наглядность** — сразу видно, какие действия разрешены в каждом состоянии

### Когда использовать этот подход

- **Заказы/биллинг** — оплата, доставка, возвраты
- **Аутентификация** — гость, авторизован, заблокирован
- **Подключение к БД** — disconnected, connecting, connected, error
- **Воспроизведение медиа** — stop, playing, paused, buffering
- **Транспортное средство** — parked, driving, refueling, broken
- **Игровой персонаж** — idle, running, jumping, attacking, dead