## Информация для проверки задания PostgreSQL & Typeorm:

1. Клонируйте сборку
   `git clone https://github.com/Nilender-Andrey/nodejs2021Q4-service.git`

2. Установите зависимости `npm install`
3. Запустите команду `npm run start:database_server` должна запуститься база в docker-контейнере и за ней сервер
4. Откройте новый терминал и запустите тесты npm test

**Команду `npm run start:database_server` собрал для удобства проверки, если она не сработала или вас не устроила все можно запустить по отдельности: базу данных `npm run start:database` или `docker compose up -d`, сервер `npm start`.
Важно базу данных запустите первой. Если сервер запущен первым он ожидает подключения к БД делая запрос на подключение каждые 5 сек.**

## Run application with Docker

1. install Docker
2. execute command `git clone https://github.com/Nilender-Andrey/nodejs2021Q4-service.git`
3. go to the folder with the program copy
4. open terminal with administrator rights
5. run the `docker compose up` command to run the application
6. to stop, run `docker compose down`

# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
