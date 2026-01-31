# 🎵 Bro-Radio

<div id="winamp-player">
    <!-- Winamp Header -->
    <div class="winamp-header">
        <div class="winamp-title">
            <span class="winamp-text">WINAMP</span>
            <span class="winamp-version">5.666</span>
        </div>
        <div class="winamp-controls">
            <button class="winamp-btn minimize">─</button>
            <button class="winamp-btn maximize">□</button>
            <button class="winamp-btn close">×</button>
        </div>
    </div>
    
    <!-- Main Player -->
    <div class="winamp-main">
        <!-- Spectrum Display -->
        <div class="spectrum-display">
            <div class="spectrum-bars"></div>
            <div class="station-info" id="station-code-display">STATION: ---</div>
        </div>
        
        <!-- Search Box -->
        <div class="search-box">
            <div class="search-icon">🔍</div>
            <input type="text" id="station-search" placeholder="Поиск станции по коду..." autocomplete="off">
            <div class="search-results" id="search-results"></div>
        </div>
        
        <!-- Station List Window -->
        <div class="station-window">
            <div class="window-header">
                <span>📻 СТАНЦИИ [A-Z]</span>
                <span class="station-count" id="station-count">00/00</span>
            </div>
            <div class="station-list" id="station-list">
                <!-- Stations will be loaded here -->
            </div>
        </div>
        
        <!-- Player Controls -->
        <div class="player-controls">
            <div class="control-row">
                <button class="ctrl-btn play" id="play-btn" title="Play">▶</button>
                <button class="ctrl-btn pause" id="pause-btn" title="Pause">⏸</button>
                <button class="ctrl-btn stop" id="stop-btn" title="Stop">⏹</button>
                <button class="ctrl-btn prev" id="prev-btn" title="Previous">⏮</button>
                <button class="ctrl-btn next" id="next-btn" title="Next">⏭</button>
            </div>
            <div class="volume-control">
                <span class="vol-label">VOL</span>
                <input type="range" id="volume-slider" min="0" max="100" value="80" class="vol-slider">
                <span id="volume-value">80%</span>
            </div>
        </div>
        
        <!-- Status Bar -->
        <div class="status-bar">
            <span id="status-text">Готов к воспроизведению</span>
            <span class="bitrate" id="bitrate-display">--- kbps</span>
        </div>
    </div>
    
    <!-- Hidden Audio Player -->
    <audio id="audio-player" preload="none"></audio>
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
    font-size: 11px;
    background: var(--winamp-bg);
    color: var(--winamp-text);
    border: 2px solid var(--winamp-border);
    border-radius: 0;
    max-width: 400px;
    margin: 20px auto;
    user-select: none;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

/* Winamp Header */
.winamp-header {
    background: linear-gradient(to right, #000066, #000033);
    color: white;
    padding: 4px 8px;
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
    font-size: 14px;
    letter-spacing: 1px;
    color: #00ff00;
    text-shadow: 0 0 5px #00ff00;
}

.winamp-version {
    font-size: 10px;
    margin-left: 5px;
    color: #cccccc;
}

.winamp-controls {
    display: flex;
    gap: 2px;
}

.winamp-btn {
    width: 20px;
    height: 16px;
    background: var(--winamp-medium);
    border: 1px solid var(--winamp-border);
    color: var(--winamp-text);
    font-size: 12px;
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
    height: 60px;
    margin: 10px;
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
    font-size: 12px;
    color: #00ff00;
    text-align: center;
    letter-spacing: 1px;
}

/* Search Box */
.search-box {
    margin: 10px;
    position: relative;
}

.search-box input {
    width: 100%;
    padding: 6px 30px 6px 30px;
    background: var(--winamp-dark);
    border: 1px solid var(--winamp-border);
    color: var(--winamp-accent);
    font-family: 'Courier New', monospace;
    font-size: 11px;
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
    top: 6px;
    color: var(--winamp-accent);
    font-size: 12px;
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
    padding: 5px 10px;
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
    margin: 10px;
    border: 1px solid var(--winamp-border);
}

.window-header {
    background: var(--winamp-medium);
    padding: 4px 8px;
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
    max-height: 200px;
    overflow-y: auto;
}

.station-item {
    padding: 6px 8px;
    border-bottom: 1px solid var(--winamp-light);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier New', monospace;
    font-size: 11px;
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
    font-size: 9px;
    color: #666;
    font-family: 'Courier New', monospace;
}

/* Player Controls */
.player-controls {
    background: var(--winamp-medium);
    margin: 10px;
    padding: 10px;
    border: 1px solid var(--winamp-border);
}

.control-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
}

.ctrl-btn {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    border: 2px solid var(--winamp-border);
    background: linear-gradient(to bottom, #333, #222);
    color: var(--winamp-text);
    font-size: 16px;
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

.ctrl-btn.stop {
    color: #ff3333;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.vol-label {
    font-weight: bold;
    min-width: 30px;
}

.vol-slider {
    flex-grow: 1;
    height: 12px;
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
    min-width: 35px;
    text-align: right;
    font-family: 'Courier New', monospace;
    color: var(--winamp-accent);
}

/* Status Bar */
.status-bar {
    background: var(--winamp-dark);
    padding: 4px 8px;
    border-top: 1px solid var(--winamp-border);
    display: flex;
    justify-content: space-between;
    font-size: 10px;
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
// Radio Stations Database - Only codes
const stations = [
    { code: "EUROPA_PLUS", url: "https://ep128.hostingradio.ru:8030/ep128", bitrate: "128" },
    { code: "DOROGNOE", url: "https://dorognoe.hostingradio.ru:8000/radio", bitrate: "128" },
    { code: "AVTORADIO", url: "https://pub0301.101.ru:8000/stream/air/aac/64/202", bitrate: "64" },
    { code: "RETRO_FM", url: "https://pub0301.101.ru:8000/stream/air/aac/64/206", bitrate: "64" },
    { code: "RUSSKOE", url: "https://pub0301.101.ru:8000/stream/air/aac/64/203", bitrate: "64" },
    { code: "HIT_FM", url: "https://pub0301.101.ru:8000/stream/air/aac/64/199", bitrate: "64" },
    { code: "HUMOR_FM", url: "https://humorfm.hostingradio.ru:8000/humor128", bitrate: "128" },
    { code: "NASHE", url: "https://nashe1.hostingradio.ru/nashe-256", bitrate: "256" },
    { code: "ENERGY", url: "https://pub0302.101.ru:8000/stream/air/aac/64/99", bitrate: "64" },
    { code: "VESTI_FM", url: "https://icecast-vgtrk.cdnvideo.ru/vestifm_mp3_128kbps", bitrate: "128" },
    { code: "BBC_1", url: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one", bitrate: "128" },
    { code: "RADIO_PARADISE", url: "https://stream.radioparadise.com/flacm", bitrate: "FLAC" },
    { code: "SOMAFM_GROOVE", url: "https://ice1.somafm.com/groovesalad-128-mp3", bitrate: "128" },
    { code: "CHILLOUT_LOUNGE", url: "https://streams.fluxfm.de/chillout/mp3-128/audio/play.m3u", bitrate: "128" },
    { code: "SWISS_JAZZ", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128", bitrate: "128" },
    { code: "ROCK_RADIO", url: "https://stream.radioparadise.com/rock-128", bitrate: "128" },
    { code: "CLASSICAL", url: "https://stream.radioparadise.com/mellow-128", bitrate: "128" },
    { code: "JAZZ24", url: "https://jazz24.streamguys1.com/jazz24-128", bitrate: "128" },
    { code: "BLUES_RADIO", url: "https://live.bluesradio.gr:8000/stream", bitrate: "128" },
    { code: "AMBIENT_CAPRICE", url: "https://radcap.ru:8000/stream/1/", bitrate: "128" },
    { code: "RADIO_DACHA", url: "https://pub0301.101.ru:8000/stream/air/aac/64/207", bitrate: "64" },
    { code: "COMEDY", url: "https://ic6.101.ru:8000/s60", bitrate: "128" },
    { code: "RECORD", url: "https://pub0301.101.ru:8000/stream/air/aac/64/100", bitrate: "64" },
    { code: "ROCK_FM", url: "https://pub0301.101.ru:8000/stream/air/aac/64/200", bitrate: "64" },
    { code: "MONTE_CARLO", url: "https://montecarlo.hostingradio.ru:8000/montecarlo128", bitrate: "128" },
    { code: "RELAX_FM", url: "https://relaxfm.hostingradio.ru:8000/relax128", bitrate: "128" }
];

// Player State
let currentStation = null;
let isPlaying = false;
let currentVolume = 0.8;

// DOM Elements
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

// Initialize Spectrum Bars
function initSpectrum() {
    spectrumBars.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const bar = document.createElement('div');
        bar.style.width = '3px';
        bar.style.height = Math.random() * 60 + 10 + '%';
        bar.style.background = `linear-gradient(to top, #00ff00, #00cc00)`;
        bar.style.animationDelay = `${i * 0.05}s`;
        bar.style.animation = `spectrumPulse ${0.5 + Math.random() * 1}s infinite`;
        spectrumBars.appendChild(bar);
    }
}

// Render Station List
function renderStationList(filter = '') {
    stationList.innerHTML = '';
    const filteredStations = stations.filter(station => 
        station.code.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredStations.forEach((station, index) => {
        const item = document.createElement('div');
        item.className = 'station-item';
        if (currentStation && currentStation.code === station.code) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <span class="station-code">${station.code}</span>
            <span class="station-url">${station.bitrate}k</span>
        `;
        
        item.addEventListener('click', () => {
            selectStation(station);
        });
        
        stationList.appendChild(item);
    });
    
    stationCount.textContent = `${filteredStations.length}/${stations.length}`;
}

// Select Station
function selectStation(station) {
    currentStation = station;
    renderStationList(searchInput.value);
    
    // Update displays
    stationCodeDisplay.textContent = `STATION: ${station.code}`;
    bitrateDisplay.textContent = `${station.bitrate} kbps`;
    statusText.textContent = `Загрузка: ${station.code}...`;
    
    // Load audio
    audioPlayer.src = station.url;
    audioPlayer.volume = currentVolume;
    
    // Update volume display
    updateVolumeDisplay();
    
    // Auto-play if already playing
    if (isPlaying) {
        audioPlayer.play().catch(e => {
            statusText.textContent = "Нажмите PLAY для начала";
        });
    } else {
        statusText.textContent = "Готов к воспроизведению";
    }
}

// Search Functionality
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        renderStationList(query);
        
        if (query.length > 0) {
            const results = stations.filter(station => 
                station.code.toLowerCase().includes(query.toLowerCase())
            );
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(station => 
                    `<div class="search-result-item" data-code="${station.code}">${station.code} [${station.bitrate}k]</div>`
                ).join('');
                
                searchResults.style.display = 'block';
                
                // Add click handlers to results
                searchResults.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const code = item.dataset.code;
                        const station = stations.find(s => s.code === code);
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
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Keyboard navigation in search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchResults.style.display = 'none';
            renderStationList('');
        }
    });
}

// Volume Control
function setupVolume() {
    volumeSlider.value = currentVolume * 100;
    updateVolumeDisplay();
    
    volumeSlider.addEventListener('input', (e) => {
        currentVolume = e.target.value / 100;
        audioPlayer.volume = currentVolume;
        updateVolumeDisplay();
    });
}

function updateVolumeDisplay() {
    volumeValue.textContent = `${Math.round(currentVolume * 100)}%`;
}

// Player Controls
function setupControls() {
    // Play
    document.getElementById('play-btn').addEventListener('click', () => {
        if (!currentStation) {
            if (stations.length > 0) {
                selectStation(stations[0]);
                setTimeout(() => playAudio(), 100);
            }
            return;
        }
        
        playAudio();
    });
    
    // Pause
    document.getElementById('pause-btn').addEventListener('click', () => {
        audioPlayer.pause();
        isPlaying = false;
        statusText.textContent = "Пауза";
        document.querySelectorAll('.ctrl-btn.play').forEach(btn => {
            btn.style.color = "#00ff00";
        });
    });
    
    // Stop
    document.getElementById('stop-btn').addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isPlaying = false;
        statusText.textContent = "Остановлено";
        stationCodeDisplay.textContent = "STATION: ---";
        bitrateDisplay.textContent = "--- kbps";
        document.querySelectorAll('.ctrl-btn.play').forEach(btn => {
            btn.style.color = "#00ff00";
        });
    });
    
    // Previous
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (!currentStation) return;
        
        const currentIndex = stations.findIndex(s => s.code === currentStation.code);
        const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
        selectStation(stations[prevIndex]);
        
        if (isPlaying) {
            audioPlayer.play();
        }
    });
    
    // Next
    document.getElementById('next-btn').addEventListener('click', () => {
        if (!currentStation) return;
        
        const currentIndex = stations.findIndex(s => s.code === currentStation.code);
        const nextIndex = (currentIndex + 1) % stations.length;
        selectStation(stations[nextIndex]);
        
        if (isPlaying) {
            audioPlayer.play();
        }
    });
    
    // Winamp control buttons
    document.querySelector('.winamp-btn.minimize').addEventListener('click', () => {
        alert("Minimize (эмуляция)");
    });
    
    document.querySelector('.winamp-btn.maximize').addEventListener('click', () => {
        alert("Maximize (эмуляция)");
    });
    
    document.querySelector('.winamp-btn.close').addEventListener('click', () => {
        if (confirm("Закрыть Winamp Player?")) {
            audioPlayer.pause();
            statusText.textContent = "Player закрыт";
        }
    });
}

function playAudio() {
    audioPlayer.play().then(() => {
        isPlaying = true;
        statusText.textContent = `Воспроизведение: ${currentStation.code}`;
        document.querySelectorAll('.ctrl-btn.play').forEach(btn => {
            btn.style.color = "#00cc00";
        });
    }).catch(e => {
        statusText.textContent = "Ошибка воспроизведения. Нажмите Play вручную";
        console.error("Play error:", e);
    });
}

// Audio Player Events
function setupAudioEvents() {
    audioPlayer.addEventListener('playing', () => {
        isPlaying = true;
        statusText.textContent = `▶ ${currentStation.code}`;
    });
    
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
    });
    
    audioPlayer.addEventListener('ended', () => {
        statusText.textContent = "Воспроизведение завершено";
        isPlaying = false;
    });
    
    audioPlayer.addEventListener('error', (e) => {
        statusText.textContent = "Ошибка загрузки станции";
        console.error("Audio error:", e);
    });
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in search
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
                statusText.textContent = audioPlayer.muted ? "Звук выключен" : "Звук включен";
                break;
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSpectrum();
    renderStationList();
    setupSearch();
    setupVolume();
    setupControls();
    setupAudioEvents();
    setupKeyboardShortcuts();
    
    // Auto-select first station
    if (stations.length > 0) {
        selectStation(stations[0]);
    }
    
    // Simulate spectrum animation
    setInterval(() => {
        if (isPlaying) {
            spectrumBars.querySelectorAll('div').forEach(bar => {
                bar.style.height = Math.random() * 80 + 20 + '%';
            });
        }
    }, 200);
});
</script>

---

### 📋 Коды станций:
- `EUROPA_PLUS` - Европа Плюс (128k)
- `DOROGNOE` - Дорожное Радио (128k)
- `AVTORADIO` - Авторадио (64k)
- `RETRO_FM` - Ретро FM (64k)
- `RUSSKOE` - Русское Радио (64k)
- `HIT_FM` - Хит FM (64k)
- `HUMOR_FM` - Юмор FM (128k)
- `NASHE` - Наше Радио (256k)
- `ENERGY` - Радио ENERGY (64k)
- `VESTI_FM` - Вести FM (128k)
- `BBC_1` - BBC Radio 1 (128k)
- `RADIO_PARADISE` - Radio Paradise (FLAC)
- `SOMAFM_GROOVE` - SomaFM Groove Salad (128k)
- `CHILLOUT_LOUNGE` - Chillout Lounge (128k)
- `SWISS_JAZZ` - Swiss Jazz (128k)
- `ROCK_RADIO` - Rock Radio (128k)
- `CLASSICAL` - Classical Radio (128k)
- `JAZZ24` - Jazz24 (128k)
- `BLUES_RADIO` - Blues Radio (128k)
- `AMBIENT_CAPRICE` - Ambient Radio Caprice (128k)
- `RADIO_DACHA` - Радио Дача (64k)
- `COMEDY` - Comedy Radio (128k)
- `RECORD` - Radio Record (64k)
- `ROCK_FM` - Rock FM (64k)
- `MONTE_CARLO` - Monte Carlo (128k)
- `RELAX_FM` - Relax FM (128k)

**Управление:**
- `ПРОБЕЛ` - Play/Pause
- `СТРЕЛКИ` - Предыдущая/Следующая
- `+/-` - Громкость
- `M` - Mute
- Поиск по коду станции