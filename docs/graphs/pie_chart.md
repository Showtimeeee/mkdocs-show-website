# Круговая диаграмма рецепта блинов
---
<div id="pie-chart-container" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script>
  var chartDom = document.getElementById('pie-chart-container');
  var myChart = echarts.init(chartDom);
  var option = {
    title: {
      text: ' ',
      subtext: 'В граммах',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} г ({d}%)'
    },
    series: [{
      name: 'Ингредиенты',
      type: 'pie',
      radius: ['40%', '70%'], // Внутренний и внешний радиус
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: {c} г'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold'
        }
      },
      data: [
        { value: 120, name: 'Пшеничная мука' },
        { value: 250, name: 'Кефир' },
        { value: 250, name: 'Кипяток' },
        { value: 100, name: 'Куриное яйцо' },
        { value: 3, name: 'Соль' },
        { value: 1, name: 'Сода' },
        { value: 12, name: 'Сахар' },
        { value: 24, name: 'Растительное масло' }
      ]
    }]
  };
  myChart.setOption(option);
</script>
---

## Ингредиенты в граммах, для удобства сравнения:

* Пшеничная мука: 1 стакан ≈ 120 г
* Кефир: 1 стакан ≈ 250 г
* Кипяток: 1 стакан ≈ 250 г
* Куриное яйцо: 2 штуки ≈ 100 г
* Соль: ½ чайной ложки ≈ 3 г
* Сода: на кончике ножа ≈ 1 г
* Сахар: 1 столовая ложка ≈ 12 г
* Растительное масло: 2 столовые ложки ≈ 24 г

---
_Построен с помощью ECharts._
