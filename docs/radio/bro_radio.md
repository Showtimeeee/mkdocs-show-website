<div style="max-width: 420px; margin: 0 auto; position: relative;">
    <!-- Winamp Player с масштабированием -->
    <div id="winamp-player" style="transform: scale(1.1); transform-origin: top center; margin: 25px auto 60px auto;">
        <!-- Winamp Header -->
        <div class="winamp-header">
            <div class="winamp-title">
                <span class="winamp-text" style="font-size: 18px;">WINAMP</span>
                <span class="winamp-version" style="font-size: 13px;">5.666</span>
            </div>
            <div class="winamp-controls">
                <button class="winamp-btn minimize" style="width: 22px; height: 18px; font-size: 13px;">─</button>
                <button class="winamp-btn maximize" style="width: 22px; height: 18px; font-size: 13px;">□</button>
                <button class="winamp-btn close" style="width: 22px; height: 18px; font-size: 15px;">×</button>
            </div>
        </div>
        
        <!-- Main Player -->
        <div class="winamp-main">
            <!-- Spectrum Display -->
            <div class="spectrum-display" style="height: 70px; margin: 12px; border-width: 1px;">
                <div class="spectrum-bars"></div>
                <div class="station-info" id="station-code-display" style="font-size: 14px; padding: 5px 10px;">STATION: ---</div>
            </div>
            
            <!-- Search Box -->
            <div class="search-box" style="margin: 12px;">
                <div class="search-icon" style="font-size: 14px; left: 9px; top: 7px;"></div>
                <input type="text" id="station-search" placeholder="Поиск станции по коду..." autocomplete="off" style="padding: 8px 30px 8px 30px; font-size: 13px; border-width: 1px;">
                <div class="search-results" id="search-results"></div>
            </div>
            
            <!-- Station List Window -->
            <div class="station-window" style="margin: 12px; border-width: 1px;">
                <div class="window-header" style="padding: 6px 10px; font-size: 14px; border-bottom-width: 1px;">
                    <span>📻 СТАНЦИИ [A-Z]</span>
                    <span class="station-count" id="station-count" style="font-size: 14px;">00/00</span>
                </div>
                <div class="station-list" id="station-list" style="max-height: 220px; font-size: 13px;">
                    <!-- Stations will be loaded here -->
                </div>
            </div>
            
            <!-- Player Controls -->
            <div class="player-controls" style="margin: 12px; padding: 12px; border-width: 1px;">
                <div class="control-row" style="gap: 12px; margin-bottom: 12px;">
                    <button class="ctrl-btn play" id="play-btn" title="Play" style="width: 48px; height: 48px; font-size: 20px; border-width: 2px;">▶</button>
                    <button class="ctrl-btn pause" id="pause-btn" title="Pause" style="width: 48px; height: 48px; font-size: 20px; border-width: 2px;">⏸</button>
                    <button class="ctrl-btn stop" id="stop-btn" title="Stop" style="width: 48px; height: 48px; font-size: 20px; border-width: 2px; color: var(--winamp-text);">⏹</button>
                    <button class="ctrl-btn prev" id="prev-btn" title="Previous" style="width: 48px; height: 48px; font-size: 20px; border-width: 2px;">⏮</button>
                    <button class="ctrl-btn next" id="next-btn" title="Next" style="width: 48px; height: 48px; font-size: 20px; border-width: 2px;">⏭</button>
                </div>
                <div class="volume-control" style="gap: 12px; margin-top: 12px;">
                    <span class="vol-label" style="min-width: 32px; font-size: 13px;">VOL</span>
                    <input type="range" id="volume-slider" min="0" max="100" value="80" class="vol-slider" style="height: 13px; border-width: 1px;">
                    <span id="volume-value" style="min-width: 40px; font-size: 13px;">80%</span>
                </div>
            </div>
            
            <!-- Status Bar -->
            <div class="status-bar" style="padding: 6px 10px; border-top-width: 1px;">
                <span id="status-text" style="font-size: 11px;">Готов к воспроизведению</span>
                <span class="bitrate" id="bitrate-display" style="font-size: 11px;">--- kbps</span>
            </div>
        </div>
        
        <!-- Hidden Audio Player -->
        <audio id="audio-player" preload="none"></audio>
    </div>

    <div style="text-align: center; margin: 0 auto 20px auto; padding: 12px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #cccccc; font-size: 14px; background: var(--winamp-dark); border: 2px solid var(--winamp-border); width: 100%; box-sizing: border-box; position: relative; z-index: 10; clear: both;">
        Полная версия Радио: 
        <a href="https://bro-radio.onrender.com/" target="_blank" style="color: #00cc00; text-decoration: none; font-weight: bold; font-family: 'Courier New', monospace;">
            https://bro-radio.onrender.com/
        </a>
    </div>
</div>

<style>
/* Winamp Dark Theme */
:root {
    --winamp-bg: #1a1a1a;
    --winamp-dark: #0d0d0d;
    --winamp-medium: #2d2d2d;
    --winamp-light: #404040;
    --winamp-highlight: #505050;
    --winamp-text: #cccccc;
    --winamp-accent: #00cc00;
    --winamp-red: #ff3333;
    --winamp-yellow: #ffff00;
    --winamp-blue: #3399ff;
    --winamp-border: #666666;
}

#winamp-player {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--winamp-bg);
    color: var(--winamp-text);
    border: 2px solid var(--winamp-border);
    border-radius: 0;
    max-width: 420px;
    margin: 20px auto 0 auto;
    user-select: none;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

/* Winamp Header */
.winamp-header {
    background: linear-gradient(to right, #000066, #000033);
    color: white;
    padding: 5px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--winamp-border);
}

.winamp-title {
    display: flex;
    align-items: baseline;
    font-weight: bold;
}

.winamp-text {
    letter-spacing: 1px;
    color: #00ff00;
    text-shadow: 0 0 5px #00ff00;
}

.winamp-version {
    margin-left: 5px;
    color: #cccccc;
}

.winamp-controls {
    display: flex;
    gap: 2px;
}

.winamp-btn {
    background: var(--winamp-medium);
    border: 1px solid var(--winamp-border);
    color: var(--winamp-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.winamp-btn:hover {
    background: var(--winamp-highlight);
}

.winamp-btn.close {
    color: var(--winamp-red);
}

/* Spectrum Display */
.spectrum-display {
    background: black;
    border: 1px solid var(--winamp-border);
    position: relative;
    overflow: hidden;
}

.spectrum-bars {
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 5px;
    gap: 2px;
}

.spectrum-bars::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
        transparent 0%, 
        rgba(0, 255, 0, 0.1) 20%,
        rgba(0, 255, 0, 0.3) 50%,
        rgba(0, 255, 0, 0.1) 80%,
        transparent 100%);
}

.station-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 3px 8px;
    font-family: 'Courier New', monospace;
    color: #00ff00;
    text-align: center;
    letter-spacing: 1px;
}

/* Search Box */
.search-box {
    position: relative;
}

.search-box input {
    width: 100%;
    background: var(--winamp-dark);
    border: 1px solid var(--winamp-border);
    color: var(--winamp-accent);
    font-family: 'Courier New', monospace;
}

.search-box input::placeholder {
    color: #666;
}

.search-box input:focus {
    outline: none;
    border-color: var(--winamp-accent);
}

.search-icon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--winamp-accent);
}

.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--winamp-dark);
    border: 1px solid var(--winamp-border);
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    z-index: 1000;
}

.search-result-item {
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid var(--winamp-light);
}

.search-result-item:hover {
    background: var(--winamp-medium);
    color: var(--winamp-accent);
}

/* Station Window */
.station-window {
    background: var(--winamp-dark);
    border: 1px solid var(--winamp-border);
}

.window-header {
    background: var(--winamp-medium);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--winamp-border);
    font-weight: bold;
}

.station-count {
    color: var(--winamp-accent);
    font-family: 'Courier New', monospace;
}

.station-list {
    overflow-y: auto;
}

.station-item {
    padding: 8px 10px;
    border-bottom: 1px solid var(--winamp-light);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier New', monospace;
}

.station-item:hover {
    background: var(--winamp-medium);
}

.station-item.active {
    background: var(--winamp-accent);
    color: black;
    font-weight: bold;
}

.station-code {
    color: var(--winamp-accent);
    letter-spacing: 1px;
}

.station-item.active .station-code {
    color: black;
}

.station-url {
    color: #666;
    font-family: 'Courier New', monospace;
}

/* Player Controls */
.player-controls {
    background: var(--winamp-medium);
    border: 1px solid var(--winamp-border);
}

.control-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
}

.ctrl-btn {
    border-radius: 3px;
    border: 2px solid var(--winamp-border);
    background: linear-gradient(to bottom, #333, #222);
    color: var(--winamp-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ctrl-btn:hover {
    background: linear-gradient(to bottom, #444, #333);
    border-color: var(--winamp-accent);
}

.ctrl-btn:active {
    background: linear-gradient(to bottom, #222, #111);
}

.ctrl-btn.play {
    color: #00ff00;
}

/* Убрал красный цвет у кнопки стоп */
.ctrl-btn.stop {
    color: var(--winamp-text); /* Обычный цвет как у остальных кнопок */
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.vol-label {
    font-weight: bold;
}

.vol-slider {
    flex-grow: 1;
    -webkit-appearance: none;
    background: var(--winamp-dark);
    border: 1px solid var(--winamp-border);
    outline: none;
}

.vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 20px;
    background: var(--winamp-accent);
    cursor: pointer;
    border: 1px solid var(--winamp-border);
}

.vol-slider::-moz-range-thumb {
    width: 12px;
    height: 20px;
    background: var(--winamp-accent);
    cursor: pointer;
    border: 1px solid var(--winamp-border);
}

#volume-value {
    text-align: right;
    font-family: 'Courier New', monospace;
    color: var(--winamp-accent);
}

/* Status Bar */
.status-bar {
    background: var(--winamp-dark);
    border-top: 1px solid var(--winamp-border);
    display: flex;
    justify-content: space-between;
}

#status-text {
    color: var(--winamp-text);
}

.bitrate {
    color: var(--winamp-accent);
    font-family: 'Courier New', monospace;
}

/* Scrollbar Styling */
.station-list::-webkit-scrollbar,
.search-results::-webkit-scrollbar {
    width: 10px;
}

.station-list::-webkit-scrollbar-track {
    background: var(--winamp-dark);
}

.station-list::-webkit-scrollbar-thumb {
    background: var(--winamp-light);
    border: 1px solid var(--winamp-border);
}

.station-list::-webkit-scrollbar-thumb:hover {
    background: var(--winamp-highlight);
}

/* Animations */
@keyframes spectrumPulse {
    0% { height: 20%; }
    50% { height: 80%; }
    100% { height: 20%; }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.blink {
    animation: blink 1s infinite;
}
</style>

<script>
// РАБОЧИЕ СТАНЦИИ - BBC заменены
const stations = [
    // ========== РУССКИЕ РАДИОСТАНЦИИ ==========
    { code: "ЭНЕРДЖИ", url: "https://radio.garden/api/ara/content/listen/dl0Hcgba/channel.mp3?1770045872993", bitrate: "128" },
    { code: "ЕВРОПА ПЛЮС", url: "https://ep128.hostingradio.ru:8030/ep128", bitrate: "128" },
    { code: "НАШЕ РАДИО", url: "https://nashe1.hostingradio.ru/nashe-256", bitrate: "256" },
    { code: "Новое Радио", url: "https://radio.garden/api/ara/content/listen/hTfe1XIo/channel.mp3?1770046301109", bitrate: "128" },
    { code: "Кавказ Хит", url: "https://radio.garden/api/ara/content/listen/NOchthUJ/channel.mp3?1770046399996", bitrate: "128" },
    { code: "Радио Книга", url: "https://radio.garden/api/ara/content/listen/8SZLRTtq/channel.mp3?1770046457214", bitrate: "128" },
    { code: "DNB FM", url: "https://radio.garden/api/ara/content/listen/Ze7ZWy4i/channel.mp3?1770046557935", bitrate: "128" },
    { code: "ВЕСТИ ФМ", url: "https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_128kbps", bitrate: "128" },

    // ========== radio.garden ==========
    { code: "Юмор ФМ. Stand-ups", url: "https://radio.garden/api/ara/content/listen/RBQ5JmK8/channel.mp3?1769978483974", bitrate: "128" },
    { code: "Cyber Space", url: "https://radio.garden/api/ara/content/listen/fZylWF8k/channel.mp3?1769978366553", bitrate: "128" },
    { code: "ARENA RADIO", url: "https://radio.garden/api/ara/content/listen/MJ6nKSDY/channel.mp3?1769976700875", bitrate: "128" },
    { code: "Nuclear Fallout Radio", url: "https://radio.garden/api/ara/content/listen/jNdh1upw/channel.mp3?1770049011591", bitrate: "128" },
    { code: "Metal", url: "https://radio.garden/api/ara/content/listen/WOjOFzmS/channel.mp3?1769978539192", bitrate: "128" },
    { code: "Nature", url: "https://radio.garden/api/ara/content/listen/U5e8t9Mq/channel.mp3?1769978577694", bitrate: "128" },
    { code: "Russian Folk", url: "https://radio.garden/api/ara/content/listen/PYsw1APK/channel.mp3?1769978651180", bitrate: "128" },
    { code: "Агата Кристи", url: "https://radio.garden/api/ara/content/listen/OiPZ8jY5/channel.mp3?1769978730249", bitrate: "128" },
    { code: "Русское Регги", url: "https://radio.garden/api/ara/content/listen/3PKzsSgL/channel.mp3?1769978772952", bitrate: "128" },
    { code: "Французский Рэп", url: "https://radio.garden/api/ara/content/listen/PMV58Y70/channel.mp3?1769978817353", bitrate: "128" },

    // ========== SOMA FM ========== 
    { code: "SOMA_GROOVE", url: "https://ice1.somafm.com/groovesalad-128-mp3", bitrate: "128" },
    { code: "SOMA_DRONE", url: "https://ice1.somafm.com/dronezone-128-mp3", bitrate: "128" },
    { code: "SOMA_SPACE", url: "https://ice1.somafm.com/spacestation-128-mp3", bitrate: "128" },
    { code: "SOMA_SECRET", url: "https://ice1.somafm.com/secretagent-128-mp3", bitrate: "128" },
    { code: "SOMA_LUSH", url: "https://ice1.somafm.com/lush-128-mp3", bitrate: "128" },
    { code: "SOMA_CHILL", url: "https://ice1.somafm.com/defcon-128-mp3", bitrate: "128" },
    { code: "SOMA_BAGEL", url: "https://ice1.somafm.com/bagel-128-mp3", bitrate: "128" },
    { code: "SOMA_CLIQHOP", url: "https://ice1.somafm.com/cliqhop-128-mp3", bitrate: "128" },
    { code: "SOMA_INDIE", url: "https://ice1.somafm.com/indiepop-128-mp3", bitrate: "128" },
    { code: "SOMA_FOLK", url: "https://ice1.somafm.com/folkfwd-128-mp3", bitrate: "128" },
    { code: "SOMA_BEATS", url: "https://ice1.somafm.com/thetrip-128-mp3", bitrate: "128" },
    { code: "SOMA_METAL", url: "https://ice1.somafm.com/metal-128-mp3", bitrate: "128" },
    { code: "SOMA_THISTLE", url: "https://ice1.somafm.com/thistle-128-mp3", bitrate: "128" },
    { code: "SOMA_SYNTH", url: "https://ice1.somafm.com/synphaera-128-mp3", bitrate: "128" },

    // ========== JAZZ MANIAK ==========
    { code: "SMOOTH JAZZ", url: "https://smoothjazz.cdnstream1.com/2634_128.mp3", bitrate: "128" },
    { code: "JAZZ_RADIO", url: "https://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3", bitrate: "128" },
    { code: "CLASSIC_FM", url: "https://media-ssl.musicradio.com/ClassicFM", bitrate: "128" },
    { code: "RADIO_MEUH_RAP", url: "https://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3", bitrate: "128" },
    { code: "TSF_JAZZ_HIPHOP", url: "https://tsfjazz.ice.infomaniak.ch/tsfjazz-high.mp3", bitrate: "128" },

    // ========== ВЫСОКОЕ КАЧЕСТВО ==========
    { code: "SOMA_SPACE_320", url: "https://ice1.somafm.com/spacestation-320-mp3", bitrate: "320" },
];

let currentStation = null;
let isPlaying = false;
let currentVolume = 0.8;

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const stationList = document.getElementById('station-list');
    const searchInput = document.getElementById('station-search');
    const searchResults = document.getElementById('search-results');
    const stationCount = document.getElementById('station-count');
    const stationCodeDisplay = document.getElementById('station-code-display');
    const bitrateDisplay = document.getElementById('bitrate-display');
    const statusText = document.getElementById('status-text');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const spectrumBars = document.querySelector('.spectrum-bars');
    
    function initSpectrum() {
        spectrumBars.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const bar = document.createElement('div');
            bar.style.width = '3px';
            bar.style.height = Math.random() * 60 + 10 + '%';
            bar.style.background = 'linear-gradient(to top, #00ff00, #00cc00)';
            bar.style.animationDelay = (i * 0.05) + 's';
            bar.style.animation = 'spectrumPulse ' + (0.5 + Math.random() * 1) + 's infinite';
            spectrumBars.appendChild(bar);
        }
    }
    
    function renderStationList(filter) {
        if (!filter) filter = '';
        stationList.innerHTML = '';
        const filteredStations = stations.filter(function(station) {
            return station.code.toLowerCase().includes(filter.toLowerCase());
        });
        
        filteredStations.forEach(function(station) {
            const item = document.createElement('div');
            item.className = 'station-item';
            if (currentStation && currentStation.code === station.code) {
                item.classList.add('active');
            }
            
            item.innerHTML = '<span class="station-code">' + station.code + '</span><span class="station-url">' + station.bitrate + 'k</span>';
            
            item.addEventListener('click', function() {
                selectStation(station);
            });
            
            stationList.appendChild(item);
        });
        
        stationCount.textContent = filteredStations.length + '/' + stations.length;
    }
    
    function selectStation(station) {
        currentStation = station;
        renderStationList(searchInput.value);
        
        stationCodeDisplay.textContent = 'STATION: ' + station.code;
        bitrateDisplay.textContent = station.bitrate + ' kbps';
        statusText.textContent = 'Загрузка: ' + station.code + '...';
        
        audioPlayer.src = station.url;
        audioPlayer.volume = currentVolume;
        updateVolumeDisplay();
        
        if (isPlaying) {
            audioPlayer.play().catch(function(e) {
                statusText.textContent = 'Нажмите PLAY для начала';
            });
        } else {
            statusText.textContent = 'Готов к воспроизведению';
        }
    }
    
    function setupSearch() {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value;
            renderStationList(query);
            
            if (query.length > 0) {
                const results = stations.filter(function(station) {
                    return station.code.toLowerCase().includes(query.toLowerCase());
                });
                
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(function(station) {
                        return '<div class="search-result-item" data-code="' + station.code + '">' + station.code + ' [' + station.bitrate + 'k]</div>';
                    }).join('');
                    
                    searchResults.style.display = 'block';
                    
                    searchResults.querySelectorAll('.search-result-item').forEach(function(item) {
                        item.addEventListener('click', function() {
                            const code = item.dataset.code;
                            const station = stations.find(function(s) {
                                return s.code === code;
                            });
                            if (station) {
                                selectStation(station);
                                searchInput.value = '';
                                searchResults.style.display = 'none';
                                searchInput.blur();
                            }
                        });
                    });
                } else {
                    searchResults.innerHTML = '<div class="search-result-item">Станция не найдена</div>';
                    searchResults.style.display = 'block';
                }
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchResults.style.display = 'none';
                renderStationList('');
            }
        });
    }
    
    function setupVolume() {
        volumeSlider.value = currentVolume * 100;
        updateVolumeDisplay();
        
        volumeSlider.addEventListener('input', function(e) {
            currentVolume = e.target.value / 100;
            audioPlayer.volume = currentVolume;
            updateVolumeDisplay();
        });
    }
    
    function updateVolumeDisplay() {
        volumeValue.textContent = Math.round(currentVolume * 100) + '%';
    }
    
    function setupControls() {
        document.getElementById('play-btn').addEventListener('click', function() {
            if (!currentStation) {
                if (stations.length > 0) {
                    selectStation(stations[0]);
                    setTimeout(function() {
                        playAudio();
                    }, 100);
                }
                return;
            }
            playAudio();
        });
        
        document.getElementById('pause-btn').addEventListener('click', function() {
            audioPlayer.pause();
            isPlaying = false;
            statusText.textContent = 'Пауза';
        });
        
        document.getElementById('stop-btn').addEventListener('click', function() {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            isPlaying = false;
            statusText.textContent = 'Остановлено';
            stationCodeDisplay.textContent = 'STATION: ---';
            bitrateDisplay.textContent = '--- kbps';
        });
        
        document.getElementById('prev-btn').addEventListener('click', function() {
            if (!currentStation) return;
            
            const currentIndex = stations.findIndex(function(s) {
                return s.code === currentStation.code;
            });
            const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
            selectStation(stations[prevIndex]);
            
            if (isPlaying) {
                audioPlayer.play();
            }
        });
        
        document.getElementById('next-btn').addEventListener('click', function() {
            if (!currentStation) return;
            
            const currentIndex = stations.findIndex(function(s) {
                return s.code === currentStation.code;
            });
            const nextIndex = (currentIndex + 1) % stations.length;
            selectStation(stations[nextIndex]);
            
            if (isPlaying) {
                audioPlayer.play();
            }
        });
        
        document.querySelector('.winamp-btn.minimize').addEventListener('click', function() {
            statusText.textContent = 'Минимизировано';
        });
        
        document.querySelector('.winamp-btn.maximize').addEventListener('click', function() {
            const player = document.getElementById('winamp-player');
            if (player.style.maxWidth === '800px') {
                player.style.maxWidth = '420px';
                statusText.textContent = 'Обычный размер';
            } else {
                player.style.maxWidth = '800px';
                statusText.textContent = 'Полный экран';
            }
        });
        
        document.querySelector('.winamp-btn.close').addEventListener('click', function() {
            audioPlayer.pause();
            statusText.textContent = 'Player закрыт';
            stationCodeDisplay.textContent = 'PLAYER OFF';
        });
    }
    
    function playAudio() {
        if (!audioPlayer.src) {
            statusText.textContent = 'Сначала выберите станцию';
            return;
        }
        
        audioPlayer.play().then(function() {
            isPlaying = true;
            statusText.textContent = '▶ ' + currentStation.code;
        }).catch(function(e) {
            statusText.textContent = 'Ошибка. Выберите другую станцию.';
        });
    }
    
    function setupAudioEvents() {
        audioPlayer.addEventListener('playing', function() {
            isPlaying = true;
            statusText.textContent = '▶ ' + currentStation.code;
        });
        
        audioPlayer.addEventListener('pause', function() {
            isPlaying = false;
        });
        
        audioPlayer.addEventListener('error', function() {
            statusText.textContent = 'Ошибка загрузки. Пробуем следующую...';
            setTimeout(function() {
                document.getElementById('next-btn').click();
            }, 1500);
        });
    }
    
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.target === searchInput) return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    if (isPlaying) {
                        audioPlayer.pause();
                    } else {
                        playAudio();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    document.getElementById('prev-btn').click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    document.getElementById('next-btn').click();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    currentVolume = Math.min(1, currentVolume + 0.1);
                    audioPlayer.volume = currentVolume;
                    volumeSlider.value = currentVolume * 100;
                    updateVolumeDisplay();
                    break;
                case '-':
                    e.preventDefault();
                    currentVolume = Math.max(0, currentVolume - 0.1);
                    audioPlayer.volume = currentVolume;
                    volumeSlider.value = currentVolume * 100;
                    updateVolumeDisplay();
                    break;
                case 'm':
                    e.preventDefault();
                    audioPlayer.muted = !audioPlayer.muted;
                    statusText.textContent = audioPlayer.muted ? 'Звук выключен' : 'Звук включен';
                    break;
            }
        });
    }
    
    initSpectrum();
    renderStationList();
    setupSearch();
    setupVolume();
    setupControls();
    setupAudioEvents();
    setupKeyboardShortcuts();
    
    if (stations.length > 0) {
        selectStation(stations[0]);
    }
    
    setInterval(function() {
        if (isPlaying) {
            spectrumBars.querySelectorAll('div').forEach(function(bar) {
                bar.style.height = Math.random() * 80 + 20 + '%';
            });
        }
    }, 200);
});
</script>
