# Диаграмма использования времени разработчика

<div id="treemap-container" style="width: 100%; height: 400px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
<script>
  var chartDom = document.getElementById('treemap-container');
  var myChart = echarts.init(chartDom);
  var option = {
    title: {
      text: ' ',
      subtext: 'Где код? Где обещанный код?!',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} часов ({d}%)'
    },
    series: [{
      type: 'treemap',
      data: [
        {
          name: 'Написание кода (который работает)',
          value: 5,
          itemStyle: { color: '#67C23A' } // Зеленый цвет
        },
        {
          name: 'Тестирование (или "Почему это сломалось опять?!")',
          value: 8,
          itemStyle: { color: '#E6A23C' } // Оранжевый цвет
        },
        {
          name: 'Документирование (нет)',
          value: 1,
          itemStyle: { color: '#F56C6C' } // Красный цвет
        },
        {
          name: 'Изучение новых технологий ("Я просто посмотрю, как это работает")',
          value: 12,
          itemStyle: { color: '#409EFF' } // Синий цвет
        },
        {
          name: 'Совещания (где никто не слушает, но все говорят)',
          value: 6,
          itemStyle: { color: '#909399' } // Серый цвет
        },
        {
          name: 'Багфиксинг (или "Кто сломал production? Это не я")',
          value: 10,
          itemStyle: { color: '#324157' } // Темно-синий цвет
        },
        {
          name: 'Поиск кофейного вдохновения (без кофе код не компилируется)',
          value: 7,
          itemStyle: { color: '#FFD700' } // Золотой цвет
        },
        {
          name: 'Панические атаки: (Простите, можно в команду?)',
          value: 3,
          itemStyle: { color: '#FF69B4' } // Розовый цвет
        },
        {
          name: 'Прокрастинация (я просто готовлюсь к работе!)',
          value: 15,
          itemStyle: { color: '#8B008B' } // Фиолетовый цвет
        },
        {
          name: 'Битва с магическим багом (который исчезает при запуске в дебаге)',
          value: 5,
          itemStyle: { color: '#FF4500' } // Апельсиново-красный цвет
        },
        {
          name: 'Написание TODO, которые станут частью legacy code',
          value: 4,
          itemStyle: { color: '#228B22' } // Тёмно-зелёный цвет
        },
        {
          name: 'Обсуждение инструментов (Pycharm vs VS Code — Собаки или Кошки?)',
          value: 8,
          itemStyle: { color: '#1E90FF' } // Голубой цвет
        },
        {
          name: 'Просто делал def sleep()',
          value: 2,
          itemStyle: { color: '#FF8C00' } // Коралловый цвет
        },
        {
          name: 'Гугление ошибки (Споры с ChatGpt)',
          value: 10,
          itemStyle: { color: '#8A2BE2' } // Сиреневый цвет
        },
        {
          name: 'Откладывание релиза (потому что "ещё не готово")',
          value: 3,
          itemStyle: { color: '#FF1493' } // Ярко-розовый цвет
        },
        {
          name: 'Попытки понять, почему тесты работают локально, но падают на CI',
          value: 4,
          itemStyle: { color: '#00CED1' } // Бирюзовый цвет
        },
        {
          name: 'Debugging by Staring (просто смотрю на экран и жду, ошибку)',
          value: 6,
          itemStyle: { color: '#FFDAB9' } // Персиковый цвет
        },
        {
          name: 'Убеждение коллег, что "Баг не на моей стороне"',
          value: 2,
          itemStyle: { color: '#ADFF2F' } // Лаймовый цвет
        },
        {
          name: 'Переписывание рабочего кода "потому что можно сделать лучше"',
          value: 3,
          itemStyle: { color: '#FF6347' } // Томатный цвет
        },
        {
          name: 'Придумывание причин, почему нельзя использовать Git Rebase',
          value: 1,
          itemStyle: { color: '#8B0000' } // Бордовый цвет
        }
      ],
      label: {
        show: true,
        formatter: '{b}\n{c} ч'
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 5,
            borderColor: '#fff'
          }
        }
      ]
    }]
  };
  myChart.setOption(option);
</script>

## 10% — написание кода, 20% — исправление ошибок, 30% — поиск кофе, 40% — панические атаки от того, что код не работает, 100% — попытки понять, как все это связано

_график пострен на .jsdelivr_