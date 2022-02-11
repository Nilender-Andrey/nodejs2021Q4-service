**Информация для проверки задания NestJS**

Добрый день!

1. Клонируйте сборку `https://github.com/Nilender-Andrey/nodejs2021Q4-service.git`
2. Перейдите в ветку "Task-10.-NestJS" `git checkout Task-10.-NestJS`
3. Установите зависимости `npm i`
4. Запустите приложение через "doker" командой `npm run start:docker`
   Дождитесь загрузки приложения (!стартует иногда довольно долго!)
5. Тесты можно запустить двумя способами:   
   a) открыть еще один терминал и ввести команду `npm run test:auth`   
   б) открыть CLI контейнера и ввести команду `npm run test:auth`   
6. Остановить приложение и удалить все "volume" командой `npm run stop:docker`

Собирал и проверил на Windows 10 x64

**!!! В случае проблем с запуском приложения в docker можно попробовать следующий альтернативный сценарий:**

1. Установить зависимости для приложения локально `npm i`
2. В файле .env поменять `POSTGRES_HOST=postgres` на `POSTGRES_HOST=localhost`
3. Запустить только базу данных командой `npm run db`
4. Запустить приложение локально командой `start:dev`  
   Дождаться запуска...
5. Открыть еще один терминал и запустить тесты командой `npm run test:auth`

## **Fastify vs. Express**

<table>
           <tr>
              <td>
                <table>
                  <tr>
                    <th colspan="2">Fastify</th>
                  </tr>
                  <tr>
                    <td>http.codes.200:</td>
                    <td>2000</td>
                  </tr>
                  <tr>
                    <td>http.codes.201:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>http.request_rate:</td>
                    <td>80/sec</td>
                  </tr>
                  <tr>
                    <td>http.requests:</td>
                    <td>2400</td>
                  </tr>
                  <tr>
                    <td colspan="2">http.response_time:</td>
                  </tr>
                  <tr>
                    <td>min:</td>
                    <td>22</td>
                  </tr>
                  <tr>
                    <td>max:</td>
                    <td>9519</td>
                  </tr>
                  <tr>
                    <td>median:</td>
                    <td>2836.2</td>
                  </tr>
                  <tr>
                    <td>p95:</td>
                    <td>9230.4</td>
                  </tr>
                  <tr>
                    <td>p99:</td>
                    <td>9416.8</td>
                  </tr>
                  <tr>
                    <td>http.responses:</td>
                    <td>2400</td>
                  </tr>
                  <tr>
                    <td>vusers.completed:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>vusers.created:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>vusers.created_by_name.0:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td colspan="2">vusers.session_length:</td>
                  </tr>
                  <tr>
                    <td>min:</td>
                    <td>8936.6</td>
                  </tr>
                  <tr>
                    <td>max:</td>
                    <td>25309.8</td>
                  </tr>
                  <tr>
                    <td>median:</td>
                    <td>23630.3</td>
                  </tr>
                  <tr>
                    <td>p95:</td>
                    <td>25091.6</td>
                  </tr>
                  <tr>
                    <td>p99:</td>
                    <td>25091.6</td>
                  </tr>
                </table>
              </td>
              <td>
                <table>
                  <tr>
                    <th colspan="2">Express</th>
                  </tr>
                  <tr>
                    <td>http.codes.200:</td>
                    <td>2000</td>
                  </tr>
                  <tr>
                    <td>http.codes.201:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>http.request_rate:</td>
                    <td>80/sec</td>
                  </tr>
                  <tr>
                    <td>http.requests:</td>
                    <td>2400</td>
                  </tr>
                  <tr>
                    <td colspan="2">http.response_time:</td>
                  </tr>
                  <tr>
                    <td>min:</td>
                    <td>35</td>
                  </tr>
                  <tr>
                    <td>max:</td>
                    <td>9704</td>
                  </tr>
                  <tr>
                    <td>median:</td>
                    <td>3011.6</td>
                  </tr>
                  <tr>
                    <td>p95:</td>
                    <td>9416.8</td>
                  </tr>
                  <tr>
                    <td>p99:</td>
                    <td>9607.1</td>
                  </tr>
                  <tr>
                    <td>http.responses:</td>
                    <td>2400</td>
                  </tr>
                  <tr>
                    <td>vusers.completed:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>vusers.created:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>vusers.created_by_name.0:</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td colspan="2">vusers.session_length:</td>
                  </tr>
                  <tr>
                    <td>min:</td>
                    <td>13760.4</td>
                  </tr>
                  <tr>
                    <td>max:</td>
                    <td>26641.7</td>
                  </tr>
                  <tr>
                    <td>median:</td>
                    <td>25091.6</td>
                  </tr>
                  <tr>
                    <td>p95:</td>
                    <td>26643.2</td>
                  </tr>
                  <tr>
                    <td>p99:</td>
                    <td>26643.2</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
