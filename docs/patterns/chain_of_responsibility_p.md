# Паттерн Chain of Responsibility

**Chain of Responsibility** — это поведенческий паттерн проектирования, который позволяет передавать запросы последовательно по цепочке обработчиков. Каждый обработчик решает, обработать запрос или передать дальше.

#### **Основная концепция**

Суть паттерна заключается в том, что:
- Несколько объектов-обработчиков выстраиваются в цепочку
- Запрос движется по цепочке, пока кто-то его не обработает
- Отправитель не знает, кто именно обработает запрос
- Обработчики могут прервать цепочку или передать запрос дальше

#### **Преимущества использования**

1. **Ослабление связности**
   - Отправитель не привязан к конкретному обработчику
   - Можно менять цепочку динамически во время работы

2. **Гибкость распределения обязанностей**
   - Легко добавлять новые обработчики без изменения существующих
   - Можно перестраивать порядок обработчиков

3. **Принцип единственной ответственности**
   - Каждый обработчик отвечает только за свой тип запросов
   - Не нужно создавать класс-монстра, который умеет всё

4. **Управление потоком запросов**
   - Можно прервать обработку в любой момент
   - Можно настроить fallback-обработчик на случай, если никто не обработал

#### **Ключевые компоненты**

1. **Handler (Обработчик)**
   - Интерфейс, объявляющий метод обработки запроса
   - Обычно содержит ссылку на следующий обработчик

2. **ConcreteHandler (Конкретный обработчик)**
   - Реализует обработку запроса, если подходит под его критерии
   - Если не подходит — передаёт запрос дальше

3. **Client (Клиент)**
   - Создаёт цепочку обработчиков и отправляет запрос
   - Не знает внутреннюю структуру цепочки

#### **Лучшие практики**

1. **Решай, нужно ли прерывать цепочку**
   - Обработка первым подходящим (как в примерах выше)
   - Или обработка всеми возможными (пропускать запрос дальше даже после обработки)

2. **Реализуй базовый класс с методом `handle`**
   - Упрощает создание новых обработчиков
   - Содержит логику передачи по цепочке

3. **Создавай цепочку динамически**
   - Порядок обработчиков может зависеть от конфигурации
   - Можно добавлять/удалять обработчики во время работы

4. **Добавь fallback-обработчик в конец**
   - Обрабатывает случаи, когда никто не справился
   - Например, логирование или выброс исключения

#### **Пример реализации**

```python
from abc import ABC, abstractmethod
from typing import Optional

# ---------- Абстрактный обработчик ----------
class Handler(ABC):
    def __init__(self):
        self._next: Optional[Handler] = None

    def set_next(self, handler: 'Handler') -> 'Handler':
        self._next = handler
        return handler

    def handle(self, request: int):
        if self._next:
            return self._next.handle(request)
        return None

# ---------- Конкретные обработчики ----------
class HundredHandler(Handler):
    def handle(self, request: int):
        if request >= 100:
            count = request // 100
            remainder = request % 100
            print(f"Выдано {count} купюр по 100")
            if remainder > 0 and self._next:
                self._next.handle(remainder)
        elif self._next:
            self._next.handle(request)

class FiftyHandler(Handler):
    def handle(self, request: int):
        if request >= 50:
            count = request // 50
            remainder = request % 50
            print(f"Выдано {count} купюр по 50")
            if remainder > 0 and self._next:
                self._next.handle(remainder)
        elif self._next:
            self._next.handle(request)

class TenHandler(Handler):
    def handle(self, request: int):
        if request >= 10:
            count = request // 10
            remainder = request % 10
            print(f"Выдано {count} купюр по 10")
            if remainder > 0 and self._next:
                self._next.handle(remainder)
        elif self._next:
            self._next.handle(request)

# ---------- Использование ----------
atm = HundredHandler()
atm.set_next(FiftyHandler()).set_next(TenHandler())

print("Сумма: 380")
atm.handle(380)

print("\nСумма: 125")
atm.handle(125)

print("\nСумма: 55")
atm.handle(55)
```

#### **Когда использовать**

- Есть несколько объектов, которые могут обработать запрос
- Нужно, чтобы отправитель не знал, какой именно обработчик нужен
- Цепочка обработчиков может меняться динамически
- Запрос должен быть обработан хотя бы одним обработчиком
- Нужно избежать жёсткой привязки отправителя к получателю

#### **Альтернативы и дополнения**

1. **Декоратор (Decorator)** — похож, но декоратор всегда дополняет поведение, а Chain ищет первого, кто может обработать
2. **Команда (Command)** — отправляет запрос конкретному получателю
3. **Наблюдатель (Observer)** — уведомляет всех подписчиков, а не первого подходящего

---

## Пример использования Chain of Responsibility для модерации контента

Вот практический пример системы модерации комментариев. Запрос проходит через цепочку фильтров: проверка на спам, цензура, проверка на длину и т.д.

```python
from abc import ABC, abstractmethod
from typing import Optional

# ---------- Запрос (комментарий) ----------
class Comment:
    def __init__(self, author: str, text: str):
        self.author = author
        self.text = text
        self.is_approved = True
        self.rejection_reason = ""

# ---------- Абстрактный обработчик ----------
class ModeratorHandler(ABC):
    def __init__(self):
        self._next: Optional[ModeratorHandler] = None

    def set_next(self, handler: 'ModeratorHandler') -> 'ModeratorHandler':
        self._next = handler
        return handler

    def handle(self, comment: Comment) -> bool:
        if self.check(comment):
            if self._next:
                return self._next.handle(comment)
            return True
        return False

    @abstractmethod
    def check(self, comment: Comment) -> bool:
        pass

# ---------- Конкретные обработчики ----------
class SpamFilter(ModeratorHandler):
    SPAM_WORDS = ["казино", "заработок", "быстрые деньги", "крипта"]

    def check(self, comment: Comment) -> bool:
        text_lower = comment.text.lower()
        for word in self.SPAM_WORDS:
            if word in text_lower:
                comment.is_approved = False
                comment.rejection_reason = f"Спам: обнаружено слово '{word}'"
                print(f"❌ Комментарий от {comment.author} отклонён: {comment.rejection_reason}")
                return False
        return True

class ProfanityFilter(ModeratorHandler):
    BAD_WORDS = ["дурак", "идиот", "тупой", "урод"]

    def check(self, comment: Comment) -> bool:
        text_lower = comment.text.lower()
        for word in self.BAD_WORDS:
            if word in text_lower:
                comment.is_approved = False
                comment.rejection_reason = f"Нецензурная лексика: слово '{word}'"
                print(f"❌ Комментарий от {comment.author} отклонён: {comment.rejection_reason}")
                return False
        return True

class LengthFilter(ModeratorHandler):
    MIN_LENGTH = 3
    MAX_LENGTH = 500

    def check(self, comment: Comment) -> bool:
        length = len(comment.text)
        if length < self.MIN_LENGTH:
            comment.is_approved = False
            comment.rejection_reason = f"Слишком короткий ({length} символов, минимум {self.MIN_LENGTH})"
            print(f"❌ Комментарий от {comment.author} отклонён: {comment.rejection_reason}")
            return False
        if length > self.MAX_LENGTH:
            comment.is_approved = False
            comment.rejection_reason = f"Слишком длинный ({length} символов, максимум {self.MAX_LENGTH})"
            print(f"❌ Комментарий от {comment.author} отклонён: {comment.rejection_reason}")
            return False
        return True

class AuthorTrustFilter(ModeratorHandler):
    TRUSTED_AUTHORS = ["admin", "moderator", "verified_user"]

    def check(self, comment: Comment) -> bool:
        # Доверенные авторы проходят без дополнительных проверок
        if comment.author in self.TRUSTED_AUTHORS:
            print(f"⭐ Доверенный автор {comment.author} — пропускаем без проверок")
            # Возвращаем True, но не передаём дальше (прерываем цепочку)
            return True
        return True  # Для обычных авторов просто передаём дальше

# ---------- Модератор (клиент) ----------
class CommentModerator:
    def __init__(self):
        # Строим цепочку: спам → плохие слова → длина → доверенные авторы
        spam_filter = SpamFilter()
        profanity_filter = ProfanityFilter()
        length_filter = LengthFilter()
        trust_filter = AuthorTrustFilter()

        spam_filter.set_next(profanity_filter).set_next(length_filter).set_next(trust_filter)
        self._chain = spam_filter

    def moderate(self, comment: Comment) -> bool:
        print(f"\n📝 Проверка комментария от '{comment.author}':")
        print(f"   Текст: \"{comment.text}\"")
        result = self._chain.handle(comment)
        if result:
            print(f"✅ Комментарий одобрен!")
        else:
            print(f"❌ Комментарий отклонён.")
        return result

# ---------- Использование ----------
moderator = CommentModerator()

# Обычный хороший комментарий
comment1 = Comment("user123", "Отличная статья! Спасибо автору.")
moderator.moderate(comment1)

# Спам
comment2 = Comment("spammer", "Заработок на крипте без вложений! Заходи на сайт!")
moderator.moderate(comment2)

# Нецензурная лексика
comment3 = Comment("angry_user", "Это полный идиот написал, ничего не понимает!")
moderator.moderate(comment3)

# Слишком короткий
comment4 = Comment("lazy", "Ок")
moderator.moderate(comment4)

# Доверенный автор (проходит даже с подозрительным текстом)
comment5 = Comment("admin", "Проверка системы модерации")
moderator.moderate(comment5)
```

### Как это работает

1. **Цепочка фильтров** — каждый фильтр проверяет свой аспект комментария
2. **Ранняя остановка** — как только один фильтр отклонил комментарий, цепочка прерывается
3. **Порядок важен** — сначала спам, потом мат, потом длина (более быстрые проверки в начале)
4. **Специальные случаи** — доверенные авторы могут пропускаться без лишних проверок

### Преимущества этого подхода

1. **Гибкость** — можно легко добавить новый фильтр (например, проверку ссылок)
2. **Переиспользование** — фильтры можно использовать в других цепочках
3. **Тестируемость** — каждый фильтр тестируется отдельно
4. **Динамическая конфигурация** — можно включать/выключать фильтры через настройки

### Когда использовать этот подход

- **Валидация данных** — проверка email, пароля, телефона, возраста
- **Логирование и мониторинг** — запрос проходит через логгеры, метрики, алерты
- **Системы согласования** — заявка проходит через менеджеров разного уровня
- **Обработка платежей** — проверка лимитов, антифрод, достаточность средств
- **Системы техподдержки** — тикеты маршрутизируются между уровнями поддержки
- **Игровые бои** — расчёт урона проходит через модификаторы (броня, щиты, уклонение)