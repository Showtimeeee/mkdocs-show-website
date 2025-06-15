# Гайд по SOAP: протокол для enterprise-решений

SOAP (Simple Object Access Protocol) — протокол обмена структурированными сообщениями в распределённых системах. Широко используется в корпоративных и банковских системах благодаря строгой стандартизации и безопасности.

## **1. Ключевые особенности SOAP**

### **1.1. Основные характеристики**
- **XML-формат** сообщений
- **Работает поверх HTTP/SMTP** (но не привязан к транспортному протоколу)
- **Строгая схема (WSDL)** для описания сервисов
- **Встроенная безопасность** (WS-Security)
- **Поддержка транзакций** (WS-Transactions)

### **1.2. Когда использовать SOAP вместо REST?**
| Критерий        | SOAP                      | REST               |
|----------------|--------------------------|--------------------|
| **Стандартизация** | Строгие стандарты       | Гибкие соглашения |
| **Безопасность** | WS-Security, XML-enc     | HTTPS, JWT        |
| **Транзакции**  | Поддерживаются           | Нет поддержки     |
| **Использование** | Банки, ERP-системы      | Мобильные приложения |

## **2. Структура SOAP-сообщения**

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <!-- Опциональные метаданные -->
    <wsse:Security>
      <wsse:UsernameToken>
        <wsse:Username>admin</wsse:Username>
        <wsse:Password>12345</wsse:Password>
      </wsse:UsernameToken>
    </wsse:Security>
  </soap:Header>
  <soap:Body>
    <!-- Основные данные -->
    <m:GetUserRequest xmlns:m="http://example.com/soap-service">
      <m:UserId>42</m:UserId>
    </m:GetUserRequest>
  </soap:Body>
</soap:Envelope>
```

**Компоненты:**
- **Envelope** — корневой элемент
- **Header** — метаданные (безопасность, транзакции)
- **Body** — основное содержимое запроса/ответа
- **Fault** — информация об ошибках (аналог HTTP 500)

## **3. WSDL — интерфейс SOAP-сервиса**

WSDL (Web Services Description Language) — XML-документ, описывающий:
- Доступные операции
- Формат запросов/ответов
- Адреса endpoint'ов

**Пример WSDL:**
```xml
<definitions name="UserService"
  targetNamespace="http://example.com/wsdl">
  
  <message name="GetUserRequest">
    <part name="userId" type="xsd:int"/>
  </message>
  
  <portType name="UserPort">
    <operation name="GetUser">
      <input message="tns:GetUserRequest"/>
      <output message="tns:GetUserResponse"/>
    </operation>
  </portType>
  
  <binding name="UserBinding" type="tns:UserPort">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
  </binding>
  
  <service name="UserService">
    <port name="UserPort" binding="tns:UserBinding">
      <soap:address location="http://example.com/soap-service"/>
    </port>
  </service>
</definitions>
```

## **4. Реализация SOAP-сервиса на Python**

### **4.1. Сервер (Flask + spyne)**
```python
from spyne import Application, rpc, ServiceBase, Integer
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

class UserService(ServiceBase):
    @rpc(Integer, _returns=String)
    def get_user(ctx, user_id):
        return f"User #{user_id}"

application = Application([UserService],
    tns='http://example.com/soap-service',
    in_protocol=Soap11(validator='lxml'),
    out_protocol=Soap11()
)

wsgi_app = WsgiApplication(application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    server = make_server('0.0.0.0', 8000, wsgi_app)
    server.serve_forever()
```

### **4.2. Клиент (zeep)**
```python
from zeep import Client

client = Client('http://localhost:8000/?wsdl')
response = client.service.GetUser(42)
print(response)  # User #42
```

## **5. Безопасность в SOAP**

### **5.1. WS-Security**
- **XML-Encryption** — шифрование содержимого
- **XML-Signature** — цифровая подпись
- **UsernameToken** — аутентификация

**Пример защищённого заголовка:**
```xml
<wsse:Security>
  <wsse:UsernameToken>
    <wsse:Username>admin</wsse:Username>
    <wsse:Password Type="PasswordDigest">hashed_value</wsse:Password>
  </wsse:UsernameToken>
</wsse:Security>
```

## **6. Вопросы на собеседовании**

### **6.1. Базовые вопросы**
1. **Чем SOAP отличается от REST?**  
   SOAP — протокол (XML), REST — архитектурный стиль (любой формат).

2. **Что такое WSDL?**  
   Язык описания SOAP-сервисов (как Swagger для REST).

3. **Какие есть стили SOAP?**  
   - Document (структурные XML-документы)  
   - RPC (вызов методов)

### **6.2. Продвинутые вопросы**
4. **Как обрабатываются ошибки в SOAP?**  
   Через элемент `<soap:Fault>` в теле ответа.

5. **Что такое MTOM в SOAP?**  
   Стандарт для передачи бинарных данных (оптимизация вложений).

6. **Как кэшируются SOAP-запросы?**  
   SOAP не поддерживает кэширование на уровне протокола (в отличие от HTTP).

## **7. Плюсы и минусы SOAP**

**Преимущества:**
- Стандартизированная безопасность
- Поддержка транзакций
- Языковая независимость
- Подходит для сложных enterprise-систем

**Недостатки:**
- Избыточность XML
- Высокий оверхед
- Сложность отладки
- Менее гибкий чем REST

## **Вывод**
SOAP остаётся важным инструментом для:
- **Банковских систем** (например, протокол ISO 8583)
- **Корпоративной интеграции** (SAP, Oracle ERP)
- **Систем с жёсткими требованиями к безопасности**

Для современных микросервисов чаще выбирают REST/gRPC, но SOAP незаменим там, где требуется стандартизация и комплексная безопасность.
