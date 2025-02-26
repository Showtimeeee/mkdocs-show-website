## График популярности языков программирования (2023)

<canvas id="myChart" width="400" height="200"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Python', 'JavaScript', 'Java', 'C#', 'C++', 'PHP', 'TypeScript', 'Go', 'Kotlin', 'Swift'],
      datasets: [{
        label: 'Популярность (%)',
        data: [20.9, 19.7, 16.7, 10.4, 7.5, 6.3, 5.6, 4.2, 3.8, 3.1], // Примерные данные
        backgroundColor: [
          '#67C23A', // Python
          '#E6A23C', // JavaScript
          '#F56C6C', // Java
          '#409EFF', // C#
          '#324157', // C++
          '#8B008B', // PHP
          '#1E90FF', // TypeScript
          '#00CED1', // Go
          '#FF4500', // Kotlin
          '#FF8C00'  // Swift
        ],
        borderColor: '#fff',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Популярность (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Языки программирования'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
</script>
