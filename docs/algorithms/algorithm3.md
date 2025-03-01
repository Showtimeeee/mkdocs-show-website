# Сортировка вставками

Сортировка вставками — строит отсортированный список, вставляя каждый новый элемент в правильное место в уже отсортированной части.

## Код:

```python
def insertion_sort_concise(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >=0 and key < arr[j] :
                arr[j+1] = arr[j]
                j -= 1
        arr[j+1] = key
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
        let arr = [5, 3, 8, 4, 6, 1, 11, 2]; // Исходный массив

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