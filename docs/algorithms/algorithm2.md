# Быстрая сортирока

Быстрая сортировка – это эффективный и часто используемый алгоритм сортировки, который относится к классу "разделяй и властвуй". Он работает путем выбора "опорного элемента" (pivot) из массива и разделения остальных элементов на две подгруппы: элементы меньше опорного элемента и элементы больше опорного элемента. Затем эти подгруппы рекурсивно сортируются.

```python
def quicksort(nums):
   if len(nums) <= 1:
       return nums
   else:
       q = random.choice(nums)
       s_nums = []
       m_nums = []
       e_nums = []
       for n in nums:
           if n < q:
               s_nums.append(n)
           elif n > q:
               m_nums.append(n)
           else:
               e_nums.append(n)
       return quicksort(s_nums) + e_nums + quicksort(m_nums)
```

## Визуализация 

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
</div>

<script>
    const container = document.getElementById('container');
    let arr = [5, 3, 8, 4, 6, 1, 11, 2];

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

    // Функция для задержки
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Быстрая сортировка
    async function quickSort(start = 0, end = arr.length - 1) {
        if (start >= end) return;

        const pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
    }

    // Функция для разделения массива
    async function partition(start, end) {
        const pivotValue = arr[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                pivotIndex++;
                renderArray();
                await sleep(500); // Задержка для анимации
            }
        }

        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        renderArray();
        await sleep(500); // Задержка для анимации

        return pivotIndex;
    }

    // Функция для запуска сортировки
    function startSorting() {
        quickSort();
    }

    // Функция для сброса массива
    function reset() {
        arr = [5, 3, 8, 4, 6, 1, 11, 2];
        renderArray();
    }

    // Функция для генерации случайного массива
    function generateRandomArray() {
        arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1);
        renderArray();
    }

    // Инициализация
    renderArray();
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 300px;
        margin: 20px 0;
    }

    .bar {
        width: 20px;
        margin: 0 2px;
        background-color: #67C23A;
        transition: height 0.3s ease;
    }

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
        background-color: rgb(130, 18, 182);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .btn:hover {
        background-color: #66b1ff;
    }

    .btn:active {
        background-color: #3a8ee6;
    }

    .icon {
        font-size: 18px;
    }
</style>

