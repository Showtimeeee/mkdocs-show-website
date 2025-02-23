# Линейный график изменения цены биткоина



<canvas id="line-chart-container" width="400" height="400"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('line-chart-container').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'], // Годы
      datasets: [{
        label: 'Цена биткоина ($)', // Название графика
        data: [69000, 20000, 35000, 73000, 95000], // Цены биткоина
        borderColor: 'rgb(73, 45, 235)', // Цвет линии
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Фон под линией
        borderWidth: 1 // Толщина линии
      }]
    },
    options: {
      responsive: true, // Адаптивность
      scales: {
        y: {
          beginAtZero: false // Ось Y не начинается с нуля
        }
      }
    }
  });
</script>

_Построен с помощью Chart.js._