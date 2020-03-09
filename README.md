1. Clone repository
2. Run : npm install
3. Choose dir /src/db_service
4. Run : npm install
5. Install MSSQL SERVER switch on TCP/IP protocol in SQL Configuration Manager, swith on SQL Server authentification in server properties
6. Add user : "test Professional1", you can change connection's user, password and host in db_config.js
7. Add base Company and base User via SQL Management Console
8. Choose dir /src/db_service and Start backend via command : node index.js, run on localhost:8080
9. Choose dir / and Start frontend via command : npm start. After that you can get mistake with css file - its library DevExtreme bug. Replace in generated css files ../../ on ../../../ after that restart command. Run on localhost:3000. In this case you can change code and save after that React re-Render  your frontend.
10. If you want build small static bundle run the command: npm run build. After that you create/update "build" directory.
11. After that you can run the command: npx serve -s build ,and frontent run on localhost:5000
12. If you want add CompanyID in URL do it like this : localhost:3000/?CompanyID=1 