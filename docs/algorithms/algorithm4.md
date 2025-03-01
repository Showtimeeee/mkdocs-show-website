# Сортировка слиянием

Сортировка слиянием — это эффективный, универсальный и стабильный алгоритм сортировки, основанный на принципе "разделяй и властвуй". Он разбивает список на более мелкие подсписки, сортирует их по отдельности и затем объединяет отсортированные подсписки в один отсортированный список

## Код:

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2  
        left_half = arr[:mid]  
        right_half = arr[mid:]
        merge_sort(left_half)  
        merge_sort(right_half)  
        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
    return arr
```


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Визуализация</title>
    <style>
        /* Стили для контейнера */
        .container {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 300px;
            margin: 20px 0;
        }

        /* Стили для столбцов (баров) */
        .bar {
            width: 20px;
            margin: 0 2px;
            background-color: #67C23A; /* Зеленый цвет */
            transition: height 0.3s ease;
        }

        /* Стили для кнопок */
        .buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }

        .btn {
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: rgb(130, 18, 182); /* Темно-фиолетовый цвет */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn:hover {
            background-color: #66b1ff; /* Голубой цвет при наведении */
        }

        .btn:active {
            background-color: #3a8ee6; /* Ярко-синий цвет при нажатии */
        }

        .icon {
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>Визуализация</h1>
    <div class="container" id="container"></div>
    <div class="buttons">
        <button class="btn" onclick="startSorting()">
            <span class="icon">▶️</span> Начать сортировку
        </button>
        <button class="btn" onclick="reset()">
            <span class="icon">🔄</span> Сбросить
        </button>
        <button class="btn" onclick="generateRandomArray()">
            <span class="icon">🎲</span> Случайный массив
        </button>
        <!-- Кнопка "Назад" -->
        <button class="btn" onclick="goBack()">
            <span class="icon">⬅️</span> Назад
        </button>
    </div>

    <script>
        const container = document.getElementById('container');
        let arr = [8, 4, 6, 1, 3, 8, 4, 6, 1, 11, 2]; // Исходный массив

        // Функция для отрисовки массива
        function renderArray() {
            container.innerHTML = '';
            arr.forEach(value => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${value * 30}px`;
                container.appendChild(bar);
            });
        }

        // Основная функция сортировки вставками
        async function insertionSort() {
            for (let i = 1; i < arr.length; i++) {
                let key = arr[i];
                let j = i - 1;

                // Перемещаем элементы больше key на одну позицию вперед
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;

                    // Обновляем отображение и добавляем задержку
                    renderArray();
                    await sleep(500);
                }

                // Вставляем key в правильную позицию
                arr[j + 1] = key;
                renderArray();
                await sleep(500);
            }
        }

        // Функция для создания задержки
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Функция для запуска сортировки
        function startSorting() {
            insertionSort();
        }

        // Функция для сброса массива к исходному состоянию
        function reset() {
            arr = [5, 3, 8, 4, 6, 1, 11, 2];
            renderArray();
        }

        // Функция для генерации случайного массива
        function generateRandomArray() {
            arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1);
            renderArray();
        }

        // Функция для возврата на предыдущую страницу
        function goBack() {
            window.history.back();
        }

        // Инициализация отображения массива
        renderArray();
    </script>
</body>
</html>