# 🎰 Генератор тестовых данных

<div class="generator-container">

Выберите тип данных для генерации:

<div class="generator-buttons">
    <button class="gen-btn" onclick="showGenerator('user')">
        <span class="icon">👤</span>
        <span>Тестовый пользователь</span>
    </button>
    
    <button class="gen-btn" onclick="showGenerator('json')">
        <span class="icon">📄</span>
        <span>JSON структура</span>
    </button>
    
    <button class="gen-btn" onclick="showGenerator('api')">
        <span class="icon">🌐</span>
        <span>API запрос</span>
    </button>
    
    <button class="gen-btn" onclick="showGenerator('sql')">
        <span class="icon">🗃️</span>
        <span>SQL запрос</span>
    </button>
</div>

<!-- Генератор пользователя -->
<div id="user-generator" class="generator-section hidden">
    <h3>👤 Генератор тестовых пользователей</h3>
    
    <div class="controls">
        <button onclick="generateUser()" class="action-btn">🎲 Сгенерировать</button>
        <button onclick="generateMultipleUsers()" class="action-btn">📊 Несколько пользователей</button>
        <button onclick="copyUser()" class="action-btn">📋 Копировать</button>
    </div>
    
    <div class="output-container">
        <pre id="user-output" class="code-output">// Здесь появится сгенерированный пользователь</pre>
    </div>
</div>

<!-- Генератор JSON -->
<div id="json-generator" class="generator-section hidden">
    <h3>📄 Генератор JSON структур</h3>
    
    <div class="controls">
        <select onchange="generateJSON(this.value)" class="select-input">
            <option value="">-- Выберите шаблон --</option>
            <option value="user">👤 Пользователь</option>
            <option value="product">📦 Товар</option>
            <option value="order">🛒 Заказ</option>
            <option value="article">📝 Статья</option>
        </select>
        <button onclick="copyJSON()" class="action-btn">📋 Копировать</button>
    </div>
    
    <div class="output-container">
        <pre id="json-output" class="code-output">// Выберите шаблон для генерации JSON</pre>
    </div>
</div>

<!-- Генератор API -->
<div id="api-generator" class="generator-section hidden">
    <h3>🌐 Генератор API запросов</h3>
    
    <div class="controls">
        <select onchange="updateAPIType(this.value)" class="select-input">
            <option value="rest">REST API</option>
            <option value="graphql">GraphQL</option>
        </select>
        
        <select onchange="generateAPI(this.value)" class="select-input">
            <option value="">-- Выберите метод --</option>
            <option value="get">GET - Получить данные</option>
            <option value="post">POST - Создать данные</option>
            <option value="put">PUT - Обновить данные</option>
            <option value="delete">DELETE - Удалить данные</option>
        </select>
        <button onclick="copyAPI()" class="action-btn">📋 Копировать</button>
    </div>
    
    <div class="output-container">
        <div id="api-output" class="code-output">
            // Выберите тип API и метод
        </div>
    </div>
</div>

<!-- Генератор SQL -->
<div id="sql-generator" class="generator-section hidden">
    <h3>🗃️ Генератор SQL запросов</h3>
    
    <div class="controls">
        <select onchange="generateSQL(this.value)" class="select-input">
            <option value="">-- Выберите тип запроса --</option>
            <option value="select">SELECT - Выборка</option>
            <option value="insert">INSERT - Вставка</option>
            <option value="update">UPDATE - Обновление</option>
            <option value="delete">DELETE - Удаление</option>
        </select>
        <button onclick="copySQL()" class="action-btn">📋 Копировать</button>
    </div>
    
    <div class="output-container">
        <pre id="sql-output" class="code-output">// Выберите тип SQL запроса</pre>
    </div>
</div>

</div>

<style>

.generator-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin: 20px 0;
    border-left: 4px solid #667eea;
}

.generator-section h3 {
    color: #2d3748;
    margin-bottom: 20px;
    font-size: 1.5em;
    font-weight: 600;
}

.output-container {
    background: #2d3748;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 5px;
    margin-top: 15px;
    overflow-x: auto;
}

.code-output {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
    color: #e2e8f0;
}
.generator-container {
    max-width: 900px;
    margin: 0 auto;
}

.generator-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr, #667eea));
    gap: 15px;
    margin: 20px 0;
}

.gen-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.gen-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.gen-btn .icon {
    font-size: 24px;
}

.generator-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin: 20px 0;
    border-left: 4px solid #667eea;
}

.hidden {
    display: none;
}

.controls {
    display: flex;
    gap: 15px;
    margin: 20px 0;
    flex-wrap: wrap;
    align-items: center;
}

.action-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.action-btn:hover {
    background: #218838;
}

.select-input {
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    min-width: 200px;
}

.output-container {
    background: #2d3748;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 5px;
    margin-top: 15px;
    overflow-x: auto;
}

.code-output {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
}

.copy-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-left: 10px;
}
</style>

<script>
// Показываем конкретный генератор
function showGenerator(type) {
    // Скрываем все секции
    document.querySelectorAll('.generator-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Показываем выбранную
    document.getElementById(`${type}-generator`).classList.remove('hidden');
}

// Данные для генерации
const names = ['Иван', 'Мария', 'Алексей', 'Анна', 'Дмитрий', 'Елена', 'Сергей', 'Ольга'];
const lastNames = ['Иванов', 'Петрова', 'Сидоров', 'Кузнецова', 'Смирнов', 'Попова'];
const domains = ['test.com', 'example.org', 'demo.net', 'qa-lab.io'];
const products = ['Ноутбук', 'Смартфон', 'Планшет', 'Наушники', 'Монитор'];
const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань'];

// Генератор пользователей
function generateUser() {
    const user = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: names[Math.floor(Math.random() * names.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`,
        age: Math.floor(Math.random() * 50) + 18,
        city: cities[Math.floor(Math.random() * cities.length)],
        registered: new Date().toISOString().split('T')[0],
        active: Math.random() > 0.5
    };
    
    document.getElementById('user-output').textContent = JSON.stringify(user, null, 2);
}

function generateMultipleUsers() {
    const users = [];
    for (let i = 0; i < 5; i++) {
        users.push({
            id: Math.random().toString(36).substr(2, 9),
            name: names[Math.floor(Math.random() * names.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)],
            email: `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`,
            age: Math.floor(Math.random() * 50) + 18
        });
    }
    document.getElementById('user-output').textContent = JSON.stringify(users, null, 2);
}

// Генератор JSON
function generateJSON(template) {
    const templates = {
        user: {
            id: "uuid",
            username: "string",
            email: "email",
            profile: {
                firstName: "string",
                lastName: "string",
                age: "number"
            },
            settings: {
                theme: "dark",
                notifications: true
            }
        },
        product: {
            id: "uuid",
            name: "string",
            price: "number",
            category: "string",
            inStock: "boolean",
            tags: ["array"],
            metadata: {
                createdAt: "timestamp",
                updatedAt: "timestamp"
            }
        },
        order: {
            id: "uuid",
            userId: "uuid",
            items: ["array"],
            total: "number",
            status: "string",
            createdAt: "timestamp"
        },
        article: {
            id: "uuid",
            title: "string",
            content: "string",
            author: "string",
            published: "boolean",
            tags: ["array"],
            createdAt: "timestamp"
        }
    };
    
    if (template && templates[template]) {
        document.getElementById('json-output').textContent = JSON.stringify(templates[template], null, 2);
    }
}

// Генератор API
let currentAPIType = 'rest';

function updateAPIType(type) {
    currentAPIType = type;
}

function generateAPI(method) {
    const baseURL = 'https://api.example.com';
    
    const examples = {
        get: {
            rest: `curl -X GET "${baseURL}/users/1" \\\n     -H "Authorization: Bearer token" \\\n     -H "Content-Type: application/json"`,
            graphql: `query GetUser {\n  user(id: 1) {\n    id\n    name\n    email\n  }\n}`
        },
        post: {
            rest: `curl -X POST "${baseURL}/users" \\\n     -H "Authorization: Bearer token" \\\n     -H "Content-Type: application/json" \\\n     -d '{"name": "New User", "email": "new@example.com"}'`,
            graphql: `mutation CreateUser {\n  createUser(input: {\n    name: "New User"\n    email: "new@example.com"\n  }) {\n    id\n    name\n  }\n}`
        },
        put: {
            rest: `curl -X PUT "${baseURL}/users/1" \\\n     -H "Authorization: Bearer token" \\\n     -H "Content-Type: application/json" \\\n     -d '{"name": "Updated User"}'`,
            graphql: `mutation UpdateUser {\n  updateUser(id: 1, input: {\n    name: "Updated User"\n  }) {\n    id\n    name\n  }\n}`
        },
        delete: {
            rest: `curl -X DELETE "${baseURL}/users/1" \\\n     -H "Authorization: Bearer token"`,
            graphql: `mutation DeleteUser {\n  deleteUser(id: 1) {\n    success\n  }\n}`
        }
    };
    
    if (method && examples[method]) {
        document.getElementById('api-output').textContent = examples[method][currentAPIType];
    }
}

// Генератор SQL
function generateSQL(type) {
    const examples = {
        select: `SELECT \n    id, \n    name, \n    email, \n    created_at\nFROM users\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 10;`,
        
        insert: `INSERT INTO users (name, email, age, city)\nVALUES \n    ('Иван Иванов', 'ivan@example.com', 25, 'Москва'),\n    ('Мария Петрова', 'maria@example.com', 30, 'Санкт-Петербург');`,
        
        update: `UPDATE users\nSET \n    name = 'Новое имя',\n    email = 'new@example.com',\n    updated_at = CURRENT_TIMESTAMP\nWHERE id = 1;`,
        
        delete: `DELETE FROM users\nWHERE id = 1\nAND created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);`
    };
    
    if (type && examples[type]) {
        document.getElementById('sql-output').textContent = examples[type];
    }
}

// Функции копирования
async function copyUser() {
    await copyToClipboard('user-output');
}

async function copyJSON() {
    await copyToClipboard('json-output');
}

async function copyAPI() {
    await copyToClipboard('api-output');
}

async function copySQL() {
    await copyToClipboard('sql-output');
}

async function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    try {
        await navigator.clipboard.writeText(text);
        alert('✅ Скопировано в буфер обмена!');
    } catch (err) {
        console.error('Ошибка копирования:', err);
    }
}

// Показываем первый генератор при загрузке
document.addEventListener('DOMContentLoaded', function() {
    showGenerator('user');
    generateUser();
});
</script>