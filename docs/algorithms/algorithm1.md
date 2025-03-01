# Пузырьковая сортировка

Пузырьковая сортировка - это простой алгоритм сортировки, который многократно проходит по списку, сравнивая смежные элементы и меняя их местами, если они расположены в неправильном порядке. Проходы повторяются до тех пор, пока список не будет отсортирован.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
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

    function renderArray() {
        container.innerHTML = '';
        arr.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value * 30}px`;
            container.appendChild(bar);
        });
    }

    async function bubbleSort() {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    renderArray();
                    await sleep(500);
                }
            }
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function startSorting() {
        bubbleSort();
    }

    function reset() {
        arr = [5, 3, 8, 4, 6];
        renderArray();
    }

    function generateRandomArray() {
        arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1);
        renderArray();
    }

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


