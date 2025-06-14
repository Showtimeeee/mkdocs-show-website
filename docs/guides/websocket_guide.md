# **Гайд по WebSocket: ключевые концепции и практическое применение**

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/WebSocket_colored_logo.svg/640px-WebSocket_colored_logo.svg.png" title="WebSocket" alt="WebSocket" width="222" height="222" />

WebSocket — это протокол двусторонней связи поверх TCP, позволяющий устанавливать постоянное соединение между клиентом и сервером. Широко используется для чатов, уведомлений, онлайн-игр и реальных обновлений данных. В этом гайде разберём ключевые аспекты WebSocket и примеры реализации.

---

## **1. Основные концепции WebSocket**

### **1.1. Чем отличается от HTTP?**
| Особенность       | HTTP           | WebSocket         |
|-------------------|----------------|-------------------|
| **Тип соединения** | Однонаправленное | Двустороннее      |
| **Продолжительность** | Разрывается после запроса | Постоянное |
| **Заголовки**     | Большие (каждый запрос) | Только при установке |
| **Подходит для**  | REST API       | Реальные обновления |

### **1.2. Как работает установка соединения**
1. Клиент отправляет HTTP-запрос с заголовком `Upgrade: websocket`.
2. Если сервер поддерживает WebSocket, он отвечает `101 Switching Protocols`.
3. Соединение переходит в режим WebSocket.

**Пример handshake:**
```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Version: 13
```

---

## **2. Реализация WebSocket на Python (FastAPI)**

### **2.1. Серверная часть**
```python
from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <body>
        <script>
            const ws = new WebSocket("ws://localhost:8000/ws");
            ws.onmessage = (event) => {
                console.log("Message:", event.data);
            };
        </script>
    </body>
</html>
"""

@app.get("/")
async def get():
    return HTMLResponse(html)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")
```

### **2.2. Клиентская часть (JavaScript)**
```javascript
const socket = new WebSocket("ws://localhost:8000/ws");

socket.onopen = () => {
    console.log("Connected!");
    socket.send("Hello, server!");
};

socket.onmessage = (event) => {
    console.log("Received:", event.data);
};

socket.onclose = () => {
    console.log("Disconnected");
};
```

---

## **3. Использование в реальных проектах**

### **3.1. Паттерны работы с WebSocket**
- **Pub/Sub** (подписка на события)
- **Комнаты (Rooms)** (разделение пользователей по группам)
- **Heartbeat** (проверка активности соединения)

### **3.2. Пример чата с комнатами**
```python
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        self.active_connections = {}
    
    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)
    
    async def broadcast(self, message: str, room: str):
        for connection in self.active_connections.get(room, []):
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{room}")
async def websocket_chat(websocket: WebSocket, room: str):
    await manager.connect(websocket, room)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"User in {room}: {data}", room)
    except WebSocketDisconnect:
        manager.active_connections[room].remove(websocket)
```

---

## **4. Вопросы на собеседовании**

### **4.1. Базовые вопросы**
1. **Чем WebSocket лучше HTTP для чатов?**  
   Не требует постоянных запросов, меньше задержка.

2. **Как обрабатывать разрыв соединения?**  
   Через `onclose` и переподключение с экспоненциальной задержкой.

3. **Как масштабировать WebSocket?**  
   Использовать брокеры сообщений (Redis Pub/Sub, Kafka).

### **4.2. Продвинутые вопросы**
4. **Как обеспечить безопасность?**  
   - `wss://` (WebSocket over TLS)  
   - Аутентификация через токены  

5. **Что такое STOMP?**  
   Протокол поверх WebSocket для структурированных сообщений.

6. **Как балансировать нагрузку?**  
   Через Nginx (с поддержкой `Upgrade`) или специализированные решения.

---

## **5. Альтернативы WebSocket**
- **Server-Sent Events (SSE)** — только сервер → клиент
- **Long Polling** — эмуляция реального времени через HTTP
- **gRPC-стримы** — для структурированных данных