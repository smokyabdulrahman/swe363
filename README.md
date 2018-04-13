# swe363
faculty members portfolio system
hello slack
What to do?
========
1. [download nodejs](https://nodejs.org/en/)
2. [download npm _node package management_](https://www.npmjs.com/get-npm)
3. download project
4. download dependinces ``` npm install ```
5. ?????
6. profit

File structure
======
1. Database files: the file where you define models (define: fields, hooks, mothods, relations)
  1. how to name? modelSingular .js
2. Service files: the file where you implement functional requiremnt (signup, register, CRUD ... etc)
  - how to name? modelPrular + Service .js
3. Repository files: the file where you implement queries for the functional requirment, no queries should appear in service files.
  - how to name? modelSingular + Repository .js
4. Helpers: any helper set of methods, static information that is used globally.
5. Auth: responsible for maintaing Passportjs library for authenticating users.
6. Routes: each route file is responsible for one model, define routes to specific model service to satisfiy user needs.


Important Links
=====
1. https://github.com/sequelize/sequelize/issues/4282 
if entery is already there use add[enteryPrimaryKey]
if entery is not yet stored in db use create[enteryData]