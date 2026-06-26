# 🏪 Store Rating Platform - Backend

A role-based REST API backend built using NestJS for a Store Rating System where users can rate stores from 1 to 5.

---

## 🚀 Tech Stack
- Backend: NestJS (Node.js)
- Database: PostgreSQL
- ORM: TypeORM
- Authentication: JWT (JSON Web Token)

---

## 👥 User Roles

### 🛠 System Administrator
- Add users (Admin / Normal User / Store Owner)
- Add stores
- View dashboard:
  - Total users
  - Total stores
  - Total ratings
- View all users & stores
- Apply filters (Name, Email, Address, Role)

---

### 👤 Normal User
- Register & login
- Update password
- View all stores
- Search stores by Name & Address
- Submit rating (1–5)
- Update rating
- View store average rating

---

### 🏪 Store Owner
- Login to system
- Update password
- View users who rated their store
- View average rating of store

---

## 🔥 Features
- JWT Authentication & Authorization
- Role-based access control
- CRUD operations (Users, Stores, Ratings)
- Store rating system (1–5)
- Search & filtering support
- Dashboard analytics APIs
- Secure password validation

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
- Role-based workflow testing

---

## ⚙️ Setup Instructions

```bash
npm install
npm run start:dev
🌐 Deployment
Frontend
Vercel: https://vercel.com
Build: npm run build
Output: dist
Backend
Render: https://render.com
Build: npm install && npm run build
Start: npm run start:prod
⚠️ Environment Variables
DATABASE_URL=postgresql://neondb_owner:npg_rVmq1NKyxez4@ep-rough-sky-adx8eehn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

JWT_SECRET=mySuperSecretKey123

PORT=3000

👨‍💻 Author

Shreya Shinde
Email: shreyashinde561@gmail.com
Phone: +91 9527739860
GitHub: https://github.com/shreyashinde561
Project: https://github.com/shreyashinde561/Store-Rating-Platform
