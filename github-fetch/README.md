# GitHub Fetch

Сервис должен по крону ходить в GitHub за пулл-реквестам через GraphQL API v4 и посылать данные в другие сервисы (предварительно только в Event generator)

Настройки:

Добавьте (можно скопировать `default.json`) `./config/local.json` где укажите ваши:
- GitHub Auth Token 
- Repository name
- Owner name
