# 🏪 Store Rating Platform - Backend

A scalable REST API backend built using NestJS for a role-based Store Rating System.

---

## 🚀 Tech Stack
- Backend: NestJS (Node.js)
- Database: PostgreSQL
- Authentication: JWT
- ORM: TypeORM

---

## 👥 User Roles

### Admin
- Manage users
- Manage stores
- View dashboard analytics

### Normal User
- Register & login
- View stores
- Submit & update ratings

### Store Owner
- View ratings for their store
- See average rating
- View user feedback

---

## 🔥 Features
- JWT Authentication
- Role-based authorization
- CRUD APIs for Users, Stores, Ratings
- Store rating system (1–5)
- Search & filtering support
- Dashboard analytics APIs

---

## 📡 API Endpoints

### Auth
- POST /auth/login

### Users
- POST /users
- GET /users
- PATCH /users/:id/password

### Stores
- POST /stores
- GET /stores
- GET /stores/:id

### Ratings
- POST /ratings
- GET /ratings
- PATCH /ratings/:storeId

### Admin
- GET /admin/dashboard
- GET /admin/store-owner/:id

---

## 🧪 Testing
- Manual Testing
- API Testing using Postman
- Database validation using SQL queries

---

## ⚙️ Setup

```bash
npm install
npm run start:dev
