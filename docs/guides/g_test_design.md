# 📘 Гайд по Техникам Тест-Дизайна (для новичков)


Тест-дизайн — это процесс проектирования и создания тест-кейсов , которые обеспечивают эффективное и полное покрытие тестируемого функционала.
Цель тест-дизайна — выявить как можно больше потенциальных проблем за минимально возможное время, используя наименьшее количество проверок.

---

## 🧠 Основные понятия

| Понятие              | Описание |
|----------------------|----------|
| **Тест-кейс**        | Последовательность действий для проверки определённого функционала |
| **Тестовое покрытие**| Процент протестированного функционала |
| **Приоритизация**    | Выбор самых важных тест-кейсов при ограниченном времени |
| **Эквивалентное разделение** | Разделение входных данных на группы, где поведение системы будет одинаковым |
| **Граничные значения** | Точки, где система может сломаться — например, границы диапазонов |

---

## 🛠️ Основные техники тест-дизайна

---

### 1. **Эквивалентное разделение (Equivalence Partitioning)**

Разделить все возможные входные данные на **группы (классы эквивалентности)**. Внутри одной группы значения ведут себя одинаково → достаточно проверить одно значение из каждой группы.

Поле "Возраст" принимает значения от 18 до 99.

- **Валидный класс**: 18–99 → например, 25  
- **Невалидные классы**:  
  - Меньше 18 → например, 16  
  - Больше 99 → например, 100  

👉 Так мы тестируем минимум, но покрываем максимум.

---

### 2. **Анализ граничных значений (Boundary Value Analysis)**

Поле "Количество товаров" принимает значения от 1 до 100.

- Проверяем: **0**, **1**, **100**, **101**

👉 Это позволяет поймать ошибки, например, когда программист написал `>` вместо `>=`.

---

### 3. **Таблица принятия решений (Decision Table)**

Используется, когда нужно проверить **логические условия** и их комбинации.

Система одобрения кредита зависит от **возраста** и **дохода**:

| Возраст | Доход | Кредит одобрен? |
|--------|-------|------------------|
| <18    | любой | ❌ Нет           |
| ≥18    | <30K  | ❌ Нет           |
| ≥18    | ≥30K  | ✅ Да            |

👉 Это легко превращается в набор тест-кейсов.

---

### 4. **Попарное тестирование (Pairwise / All-Pairs Testing)**

Проверяются **все пары параметров**, а не все возможные комбинации. Это экономит много времени.

Фильтр товаров:
- Цвет: красный, зелёный
- Размер: S, M, L
- Цена: высокая, средняя, низкая

➡️ Полный перебор: 2 × 3 × 3 = 18 тестов  
➡️ Pairwise: ~6 тестов

---

### 5. **Диаграмма состояний (State Transition)**

Используется, когда система меняет своё состояние в зависимости от действий пользователя или событий.

Форма регистрации:
- Не заполнена  
- Заполнена частично  
- Заполнена полностью  
- Успешная регистрация  

Переходы между состояниями должны быть корректными.

---

## 📌 Практика: Как применять техники

### Пример: Форма регистрации

#### Поля:
- Email (формат a@b.c)
- Пароль (от 6 символов)

#### Как тестировать:
1. **Email (эквивалентное разделение):**
   - Валидный: `test@example.com`  
   - Невалидные: `test`, `test@com`, `test@.com`

2. **Пароль (граничные значения):**
   - 5 символов (невалидный)  
   - 6 символов (валидный)  
   - 7 символов (валидный)

---

### Пример: API `/users?id={X}`

| ID     | Ожидаемый ответ |
|--------|-----------------|
| 1      | 200 OK          |
| 0      | 400 Bad Request |
| -5     | 400 Bad Request |
| abc    | 400 Bad Request |
| 999999 | 404 Not Found   |

---

## 🧰 Инструменты для тест-дизайна

| Инструмент       | Описание                             |
|------------------|--------------------------------------|
| **PICT**         | Генерация тест-кейсов (pairwise)     |
| **AllPairs**     | То же, но устаревший                 |
| **TestRail**     | Управление тест-кейсами              |
| **Qase**         | Создание и хранение тест-кейсов      |
| **draw.io**      | Диаграммы состояний                  |

🔗 [PICT GitHub](https://github.com/microsoft/pict)

---

Тест-дизайн — это **ключ к качественному и быстрому тестированию**. Начни с простого:  
- Граничные значения  
- Эквивалентные классы  

Потом осваивай более продвинутые техники:  
- Попарное тестирование  
- Таблицы решений  
- Диаграммы состояний  