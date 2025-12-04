const container = document.getElementById('container');
let arr = [5, 3, 8, 4, 6, 3, 9, 1];

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