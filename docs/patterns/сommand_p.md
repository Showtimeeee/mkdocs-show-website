# Паттерн Command

**Command (Команда)** — это поведенческий паттерн проектирования, который превращает запросы в объекты, позволяя передавать их как аргументы, ставить в очередь, логировать, а также поддерживать отмену операций (undo). Команда инкапсулирует все необходимые данные для выполнения действия и, при необходимости, его отката.

---

## Основная концепция

Суть паттерна заключается в том, что:
- **Запрос упаковывается в объект (команду)**, который содержит метод `execute()`.
- **Отправитель (Invoker)** ничего не знает о том, как выполняется запрос — он просто вызывает `execute()` у команды.
- **Получатель (Receiver)** содержит реальную бизнес-логику и выполняет действие.
- Команда может хранить состояние для **отмены операции** (undo/redo).

---

## Преимущества использования

1. **Отделение отправителя от получателя**
   - Отправитель не знает, кто и как выполняет запрос. Это снижает связанность кода.

2. **Поддержка отмены (Undo/Redo)**
   - Команда может хранить информацию для отката выполненного действия.

3. **Очередование и отложенное выполнение**
   - Команды можно ставить в очередь, планировать или передавать по сети.

4. **Композиция команд**
   - Можно создавать составные команды (макрокоманды), которые выполняют несколько действий.

5. **Логирование и аудит**
   - Каждая команда может логировать своё выполнение для последующего анализа.

---

## Ключевые компоненты

1. **Command (Интерфейс команды)**
   - Объявляет метод `execute()` и обычно метод `undo()`.
   - Может содержать другие методы для поддержки дополнительной функциональности.

2. **ConcreteCommand (Конкретная команда)**
   - Реализует методы интерфейса.
   - Хранит ссылку на получателя (Receiver) и параметры запроса.
   - В методе `execute()` вызывает нужные методы получателя.
   - В методе `undo()` откатывает изменения.

3. **Receiver (Получатель)**
   - Содержит бизнес-логику и реальные методы для выполнения операций.
   - Может быть общим для нескольких команд.

4. **Invoker (Отправитель)**
   - Вызывает команду через метод `execute()`.
   - Не знает о конкретной реализации команды.
   - Может хранить историю выполненных команд для отмены.

5. **Client (Клиент)**
   - Создаёт конкретные команды и связывает их с получателями.
   - Передаёт команды отправителю.

---

## Пример: Умный дом с пультом управления

Предположим, у нас есть система умного дома с различными устройствами (свет, кондиционер, музыка). Мы хотим управлять ими с помощью пульта, который поддерживает отмену последней операции.

### Без Command (проблемный подход)

```python
class RemoteControl:
    def __init__(self):
        self.light = Light()
        self.ac = AirConditioner()
    
    def press_light_on(self):
        self.light.on()
    
    def press_light_off(self):
        self.light.off()
    
    def press_ac_on(self):
        self.ac.on()
    
    def press_ac_off(self):
        self.ac.off()

# Проблема: каждая кнопка требует отдельного метода
# Нет поддержки отмены, макрокоманд, программирования кнопок
```

---

### С Command

```python
from abc import ABC, abstractmethod
from typing import List, Optional

# 1. Интерфейс команды
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass
    
    @abstractmethod
    def undo(self):
        pass

# 2. Получатели (устройства)
class Light:
    def __init__(self, location: str = "комната"):
        self.location = location
        self._is_on = False
    
    def on(self):
        self._is_on = True
        print(f"💡 Свет в {self.location} включён")
    
    def off(self):
        self._is_on = False
        print(f"💡 Свет в {self.location} выключен")
    
    def is_on(self) -> bool:
        return self._is_on

class AirConditioner:
    def __init__(self):
        self._temperature = 22
        self._is_on = False
    
    def on(self):
        self._is_on = True
        print(f"❄️  Кондиционер включён, температура {self._temperature}°C")
    
    def off(self):
        self._is_on = False
        print(f"❄️  Кондиционер выключен")
    
    def set_temperature(self, temp: int):
        self._temperature = temp
        print(f"❄️  Температура установлена на {temp}°C")
    
    def get_temperature(self) -> int:
        return self._temperature

class Stereo:
    def __init__(self):
        self._volume = 10
        self._is_on = False
    
    def on(self):
        self._is_on = True
        print(f"🎵 Музыкальный центр включён, громкость {self._volume}")
    
    def off(self):
        self._is_on = False
        print(f"🎵 Музыкальный центр выключен")
    
    def set_volume(self, volume: int):
        self._volume = volume
        print(f"🎵 Громкость установлена на {volume}")
    
    def set_cd(self):
        print(f"🎵 CD установлен")
    
    def set_dvd(self):
        print(f"🎵 DVD установлен")
    
    def set_radio(self):
        print(f"🎵 Радио включено")

# 3. Конкретные команды
class LightOnCommand(Command):
    def __init__(self, light: Light):
        self.light = light
    
    def execute(self):
        self.light.on()
    
    def undo(self):
        self.light.off()

class LightOffCommand(Command):
    def __init__(self, light: Light):
        self.light = light
    
    def execute(self):
        self.light.off()
    
    def undo(self):
        self.light.on()

class AirConditionerOnCommand(Command):
    def __init__(self, ac: AirConditioner):
        self.ac = ac
    
    def execute(self):
        self.ac.on()
    
    def undo(self):
        self.ac.off()

class AirConditionerOffCommand(Command):
    def __init__(self, ac: AirConditioner):
        self.ac = ac
    
    def execute(self):
        self.ac.off()
    
    def undo(self):
        self.ac.on()

class SetTemperatureCommand(Command):
    def __init__(self, ac: AirConditioner, temperature: int):
        self.ac = ac
        self.temperature = temperature
        self.previous_temperature = None
    
    def execute(self):
        self.previous_temperature = self.ac.get_temperature()
        self.ac.set_temperature(self.temperature)
    
    def undo(self):
        if self.previous_temperature is not None:
            self.ac.set_temperature(self.previous_temperature)

class StereoOnWithCDCommand(Command):
    def __init__(self, stereo: Stereo):
        self.stereo = stereo
        self.previous_volume = None
    
    def execute(self):
        self.previous_volume = 10  # Сохраняем предыдущее состояние
        self.stereo.on()
        self.stereo.set_cd()
        self.stereo.set_volume(10)
    
    def undo(self):
        self.stereo.off()

# 4. Макрокоманда (композиция команд)
class MacroCommand(Command):
    def __init__(self, commands: List[Command]):
        self.commands = commands
    
    def execute(self):
        for command in self.commands:
            command.execute()
    
    def undo(self):
        # Отменяем в обратном порядке
        for command in reversed(self.commands):
            command.undo()

# 5. Пустая команда для неинициализированных кнопок
class NoCommand(Command):
    def execute(self):
        pass
    
    def undo(self):
        pass

# 6. Отправитель (Пульт управления)
class RemoteControl:
    def __init__(self, slots: int = 7):
        self.slots = slots
        self.on_commands = [NoCommand() for _ in range(slots)]
        self.off_commands = [NoCommand() for _ in range(slots)]
        self.undo_command = NoCommand()
        self.command_history = []  # Стек для поддержки множественной отмены
    
    def set_command(self, slot: int, on_command: Command, off_command: Command):
        self.on_commands[slot] = on_command
        self.off_commands[slot] = off_command
    
    def press_on_button(self, slot: int):
        if slot < len(self.on_commands):
            self.on_commands[slot].execute()
            self.undo_command = self.on_commands[slot]
            self.command_history.append(self.on_commands[slot])
    
    def press_off_button(self, slot: int):
        if slot < len(self.off_commands):
            self.off_commands[slot].execute()
            self.undo_command = self.off_commands[slot]
            self.command_history.append(self.off_commands[slot])
    
    def press_undo_button(self):
        print("\n↩️  Отмена последней операции:")
        self.undo_command.undo()
    
    def press_multi_undo(self, steps: int = 1):
        """Отмена нескольких последних операций"""
        print(f"\n↩️  Отмена {steps} последних операций:")
        for _ in range(min(steps, len(self.command_history))):
            command = self.command_history.pop()
            command.undo()
    
    def __str__(self):
        result = "\n=== Пульт управления ===\n"
        for i in range(self.slots):
            if not isinstance(self.on_commands[i], NoCommand):
                result += f"[{i}] {self.on_commands[i].__class__.__name__} / {self.off_commands[i].__class__.__name__}\n"
        result += f"[Отмена] {self.undo_command.__class__.__name__}\n"
        return result

# 7. Клиентский код
def main():
    # Создаём устройства (получатели)
    living_room_light = Light("гостиная")
    kitchen_light = Light("кухня")
    ac = AirConditioner()
    stereo = Stereo()
    
    # Создаём команды
    living_light_on = LightOnCommand(living_room_light)
    living_light_off = LightOffCommand(living_room_light)
    kitchen_light_on = LightOnCommand(kitchen_light)
    kitchen_light_off = LightOffCommand(kitchen_light)
    ac_on = AirConditionerOnCommand(ac)
    ac_off = AirConditionerOffCommand(ac)
    set_temp_23 = SetTemperatureCommand(ac, 23)
    stereo_cd = StereoOnWithCDCommand(stereo)
    
    # Создаём макрокоманду для вечеринки
    party_commands = [
        living_light_on,
        stereo_cd,
        ac_on,
        set_temp_23
    ]
    party_macro = MacroCommand(party_commands)
    
    # Создаём пульт (отправитель)
    remote = RemoteControl(slots=5)
    
    # Программируем кнопки
    remote.set_command(0, living_light_on, living_light_off)
    remote.set_command(1, kitchen_light_on, kitchen_light_off)
    remote.set_command(2, ac_on, ac_off)
    remote.set_command(3, set_temp_23, set_temp_23)  # для температуры
    remote.set_command(4, party_macro, NoCommand())   # макрокоманда
    
    print(remote)
    
    # Используем пульт
    remote.press_on_button(0)      # Включить свет в гостиной
    remote.press_on_button(1)      # Включить свет на кухне
    remote.press_on_button(2)      # Включить кондиционер
    remote.press_on_button(3)      # Установить температуру 23°C
    
    remote.press_off_button(0)     # Выключить свет в гостиной
    remote.press_undo_button()     # Отменить последнее действие (вернуть свет)
    
    print("\n--- Вечеринка ---")
    remote.press_on_button(4)      # Макрокоманда: всё для вечеринки
    
    print("\n--- Отмена вечеринки ---")
    remote.press_undo_button()     # Отменить макрокоманду
    
    # Множественная отмена
    print("\n--- Множественная отмена ---")
    remote.press_on_button(0)
    remote.press_on_button(1)
    remote.press_on_button(2)
    remote.press_multi_undo(3)     # Отменить последние 3 операции

if __name__ == "__main__":
    main()
```

---

## Пример: Текстовый редактор с поддержкой Undo/Redo

```python
from abc import ABC, abstractmethod
from typing import List

# 1. Получатель (документ)
class TextDocument:
    def __init__(self):
        self._content = ""
    
    def write(self, text: str):
        self._content += text
        print(f"📝 Документ: '{self._content}'")
    
    def delete(self, length: int):
        if length > len(self._content):
            length = len(self._content)
        deleted = self._content[-length:]
        self._content = self._content[:-length]
        print(f"🗑️  Удалено '{deleted}'. Документ: '{self._content}'")
        return deleted
    
    def get_content(self) -> str:
        return self._content

# 2. Команды
class TextCommand(ABC):
    @abstractmethod
    def execute(self):
        pass
    
    @abstractmethod
    def undo(self):
        pass

class WriteCommand(TextCommand):
    def __init__(self, document: TextDocument, text: str):
        self.document = document
        self.text = text
    
    def execute(self):
        self.document.write(self.text)
    
    def undo(self):
        # Удаляем добавленный текст
        self.document.delete(len(self.text))

class DeleteCommand(TextCommand):
    def __init__(self, document: TextDocument, length: int):
        self.document = document
        self.length = length
        self.deleted_text = ""
    
    def execute(self):
        self.deleted_text = self.document.delete(self.length)
    
    def undo(self):
        self.document.write(self.deleted_text)

# 3. Отправитель (редактор с историей)
class TextEditor:
    def __init__(self):
        self.document = TextDocument()
        self.history: List[TextCommand] = []
        self.redo_stack: List[TextCommand] = []
    
    def execute_command(self, command: TextCommand):
        command.execute()
        self.history.append(command)
        self.redo_stack.clear()  # Новая команда очищает redo
    
    def undo(self):
        if self.history:
            command = self.history.pop()
            command.undo()
            self.redo_stack.append(command)
            print("↩️  Отменено")
    
    def redo(self):
        if self.redo_stack:
            command = self.redo_stack.pop()
            command.execute()
            self.history.append(command)
            print("↪️  Повторено")

# Использование
editor = TextEditor()
editor.execute_command(WriteCommand(editor.document, "Hello "))
editor.execute_command(WriteCommand(editor.document, "World!"))
editor.undo()   # Удаляет "World!"
editor.redo()   # Возвращает "World!"
editor.execute_command(WriteCommand(editor.document, " How are you?"))
```

---

## Когда использовать

1. **Поддержка Undo/Redo**
   - Когда нужно откатывать или повторять операции (текстовые редакторы, графические редакторы).

2. **Очередование запросов**
   - Когда запросы нужно ставить в очередь, логировать или выполнять позже.

3. **Параметризация объектов операциями**
   - Когда нужно передавать операции как аргументы (callback-и в ООП стиле).

4. **Макрокоманды**
   - Когда нужно объединять несколько операций в одну (макросы).

5. **Удалённое выполнение**
   - Когда команды нужно передавать по сети (например, в распределённых системах).

---

## Лучшие практики

1. **Храните достаточно информации для Undo**
   - Команда должна хранить не только параметры, но и предыдущее состояние получателя.

2. **Используйте стек для истории**
   - Для поддержки множественной отмены храните выполненные команды в стеке.

3. **Обрабатывайте ошибки**
   - При ошибке в execute() команда не должна добавляться в историю.

4. **Реализуйте NoCommand**
   - Для неинициализированных слотов используйте пустую команду вместо проверки на None.

5. **Управляйте памятью**
   - В долго работающих приложениях ограничивайте размер истории, чтобы избежать утечек памяти.

---

## Альтернативы и дополнения

1. **Strategy Pattern**
   - Strategy меняет алгоритм, Command инкапсулирует запрос как объект.

2. **Chain of Responsibility**
   - Может комбинироваться с Command для передачи команд по цепочке обработчиков.

3. **Composite Pattern**
   - Используется для создания макрокоманд (как в примере с MacroCommand).

4. **Memento Pattern**
   - Альтернативный подход для Undo — сохранение полного состояния объекта.

5. **Функциональный подход**
   - В языках с поддержкой функций высшего порядка команды можно реализовать как лямбда-функции.

```python
# Простой функциональный вариант
from typing import Callable

class SimpleCommand:
    def __init__(self, execute: Callable, undo: Callable):
        self.execute = execute
        self.undo = undo

# Использование
light = Light()
light_on = SimpleCommand(
    execute=lambda: light.on(),
    undo=lambda: light.off()
)
```

---

## Пример из жизни: Ресторан

Представьте, что вы в ресторане. Официант (отправитель) принимает заказ и передаёт его на кухню. Заказ (команда) содержит все детали: что приготовить, особые пожелания и т.д. Повар (получатель) выполняет заказ, не зная, кто именно его передал. Если клиент передумал, заказ можно отменить (отмена). А если нужно приготовить несколько блюд одновременно, можно объединить их в один общий заказ (макрокоманда). Официант может ставить заказы в очередь, если кухня занята, и даже передавать заказы по радиосвязи (удалённое выполнение).

---

## Вывод

**Command** — это мощный паттерн, который превращает действия в объекты первого класса. Он позволяет создавать гибкие системы с поддержкой отмены операций, очередей запросов, макрокоманд и логирования. Паттерн особенно ценен в UI-фреймворках (где каждая кнопка может быть связана с командой), текстовых и графических редакторах (где нужен Undo/Redo), а также в системах, где запросы нужно передавать между компонентами или по сети. Command строго следует принципам SOLID, особенно принципу единственной ответственности (каждая команда отвечает за одну операцию) и принципу открытости/закрытости (новые команды можно добавлять без изменения существующего кода).