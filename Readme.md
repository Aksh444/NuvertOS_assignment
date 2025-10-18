# Fullstack Chemical Compounds App

A full-stack CRUD built with:
- **Backend:** Node.js + Express, Sequelize ORM, MySQL, JWT auth  
- **Frontend:** Angular v17 (standalone components, HttpClient, template-driven forms)

Users must **register/login** to obtain a JWT, then can view the paginated list of compounds, open a detail page, and edit a compound with mobile responsive view.

---

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Authentication (JWT)](#authentication-jwt)
- [Backend Usage](#backend-usage)
  - [Start the server](#start-the-server)
  - [Development mode](#development-mode)
  - [Seed the database](#seed-the-database)
- [Frontend Usage](#frontend-usage)
  - [Serve the frontend](#serve-the-frontend)
  - [Build the frontend](#build-the-frontend)
- [Dependencies](#dependencies)

---

## Installation

```bash
# 1) Clone
git clone https://github.com/Aksh444/NuvertOS_assignment.git
cd NuvertOS_assignment

# 2) Install backend deps
cd Backend
npm install

# 3) Install frontend deps
cd ../Frontend
npm install
```

---

## Configuration

### Backend

Create the MySQL database (if not created yet):

```sql
CREATE DATABASE IF NOT EXISTS compounds_db;
```

Create **Backend/.env**:

```env
JWT_SECRET=change_me
JWT_EXPIRES_IN=1d
```

If your project uses a Sequelize config file, ensure it reads from env:

```js
// Backend/config/config.js (example)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
   'compounds_db', //YOUR DATABASE NAME
   'root', //YOUR ROOT NAME
   'ak@1234', //YOUR PASSWORD
{
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
})

module.exports = sequelize
```

### Frontend

Angular v17 with strict mode. Minimal `tsconfig.json` should include:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "esModuleInterop": true
  },
  "angularCompilerOptions": {
    "strictTemplates": true
  }
}
```

## Authentication (JWT)

The compounds API is protected by JWT. You must **register** and then **login** to obtain a token. Send the token on every request:

```
Authorization: Bearer <JWT>
```

**Endpoints**
- `POST /api/auth/register`  
  Body:
  ```json
  { "email": "user@example.com", "password": "secret123" }
  ```

- `POST /api/auth/login`  
  Body:
  ```json
  { "email": "user@example.com", "password": "secret123" }
  ```
  Response (typical):
  ```json
  { "token": "<JWT>", "user": { "id": 1, "email": "user@example.com", "name": "User" } }
  ```

*(In Angular, an HTTP interceptor attaches the `Authorization` header automatically after login.)*

---

## Backend Usage

From `Backend/`:

### Start the server
```bash
npm run start
# http://localhost:3000
```

### Development mode (nodemon)
```bash
npm run dev
```

### Seed the database
```bash
npm run seed
```
Truncates `Compounds` and inserts sample data.

---

## Frontend Usage

From `Frontend/`:

### Serve the frontend (dev)
```bash
npm start
# http://localhost:4200
# with proxy:
# npm start -- --proxy-config proxy.conf.json
```

### Build the frontend (prod)
```bash
npm run build
# output in /dist
```

## Dependencies

### Backend
- express, cors, body-parser  
- sequelize, mysql2  
- jsonwebtoken, bcrypt/bcryptjs  
- express-validator  
- nodemon (dev)

### Frontend
- @angular/core, @angular/router, @angular/common/http  
- rxjs, typescript

---
