# Review

Для локальной разработки:

1. Добавьте в /etc/hosts
    ```
    127.0.0.1 events
    127.0.0.1 mongodb
    127.0.0.1 front
    127.0.0.1 bff
    ```
2. Сконфигурируйте [@review/github-fetch](github-fetch/README.md)
2. Запустите mongodb - `yarn mongodb`
3. Запустите @review/events - `yarn events`
4. Запустите @review/github-fetch - `yarn github-fetch`
5. Запустите @review/ui/front - `yarn front`
6. Запустите @review/ui/back - `yarn bff`

Для локального запуска: `docker-compose up`

**Важен порядок**

---

### Архитектура

- `mongodb` - используется для хранения данных  
- `@review/github-fetch` - сервис ходит в GitHub и отправляет данные в `@review/events`
- `@review/events` - сервис сравнивает хранимые в `mongodb` данные с полученными от `@review/github-fetch` и генерирует события для других сервисов
- `@review/ui/back` - сервис который собирает данные для `@review/ui/front`
- `@review/ui/front` - основной UI приложения

<img src="./docs/arch.svg" width="600" />
