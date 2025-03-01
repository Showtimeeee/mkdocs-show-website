# <div class="animate__animated animate__bounce">Карты</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<div id="map" style="width: 100%; height: 600px;"></div>
<script src="https://cdn.jsdelivr.net/npm/ol@v7.3.0/dist/ol.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.3.0/ol.css">
<script>
    // Инициализация карты
    const map = new ol.Map({
        target: 'map', // ID контейнера для карты
        layers: [
            new ol.layer.Tile({ // Слой тайлов OpenStreetMap
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([30.315868, 59.939095]), // Координаты центра карты (Санкт-Петербург)
            zoom: 13 // Уровень масштабирования
        })
    });

    // Добавление маркера
    const markerFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([30.315868, 59.939095])) // Координаты метки (Санкт-Петербург)
    });

    const vectorSource = new ol.source.Vector({
        features: [markerFeature]
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({ // Простой круглый маркер
                radius: 8, // Размер маркера
                fill: new ol.style.Fill({ color: 'red' }), // Заливка
                stroke: new ol.style.Stroke({ color: 'white', width: 2 }) // Обводка
            })
        })
    });

    map.addLayer(vectorLayer);

    // Добавление попапа для метки
    const container = document.createElement('div');
    container.className = 'popup'; // Класс для стилей попапа
    const overlay = new ol.Overlay({
        element: container,
        positioning: 'bottom-center',
        stopEvent: false
    });
    map.addOverlay(overlay);

    // Обработка кликов на карте
    map.on('click', function (evt) {
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
        });

        if (feature) {
            const coordinate = feature.getGeometry().getCoordinates();
            overlay.setPosition(coordinate);
            container.innerHTML = '<p>Санкт-Петербург</p>'; // Текст попапа
        } else {
            overlay.setPosition(undefined);
        }
    });
</script>