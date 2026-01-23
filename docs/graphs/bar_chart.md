## График популярности языков программирования (2026)

<canvas id="myChart" width="400" height="200"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Python', 'JavaScript', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Kotlin', 'Rust', 'Swift'],
      datasets: [{
        label: 'Популярность (%)',
        data: [23.5, 21.2, 15.8, 10.3, 8.1, 7.6, 6.4, 5.2, 4.7, 3.2],
        backgroundColor: [
          '#67C23A', // Python
          '#E6A23C', // JavaScript
          '#F56C6C', // Java
          '#1E90FF', // TypeScript
          '#324157', // C++
          '#409EFF', // C#
          '#00CED1', // Go
          '#FF4500', // Kotlin
          '#FF8C00', // Rust
          '#8B008B'  // Swift
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

<div style="margin-top: 20px; padding: 12px; background-color: #2c3e50; border-radius: 5px; font-size: 14px; color: #ecf0f1;">
  <strong style="color: #f1c40f;">Источники данных:</strong><br>
  <span style="color: #3498db;">TIOBE Index</span> (2025–2026): Python лидер, SQL вне топ-10, рост Rust и Go.<br>
  <span style="color: #3498db;">IEEE Spectrum</span> и <span style="color: #3498db;">Stack Overflow</span>: Python, JavaScript, TypeScript, Go в лидерах.<br>
  <span style="color: #3498db;">Анализ рынка труда 2026</span>: Python и JavaScript — лучший выбор для начинающих.
</div>
