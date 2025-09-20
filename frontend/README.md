# 🍭 Sweet Shop Management System

A full-stack AI-assisted project that manages a sweet shop’s inventory.
Users can register, log in, view available sweets, and purchase items,
which reduces the quantity in real time.

---

## 🌟 Features
- **User Authentication** (Register & Login using JWT)
- **Inventory Management** (View sweets, update quantity on purchase)
- **Responsive Frontend** (React + Vite + CSS sweet theme)
- **SQLite Database** with Prisma ORM
- **AI Assisted Development** (ChatGPT helped scaffold and refine code)

---

## 🏗️ Tech Stack
| Layer      | Technology        |
|------------|--------------------|
| Frontend   | React + Vite + Axios |
| Styling    | Custom CSS (sweet pastel theme) |
| Backend    | Node.js + Express |
| Database   | SQLite with Prisma |
| Auth       | JWT (jsonwebtoken) |

---

## ⚡️ Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone <your-repo-url>
cd sweet-shop


cd backend
npm install
npx prisma migrate dev --name init   # creates SQLite db
npm run dev                          # runs on http://localhost:4000


cd frontend
npm install
npm run dev                          # runs on http://localhost:5173


💡 Usage

Open http://localhost:5173

Register a new user → Login → View sweets

Click Purchase to reduce sweet quantity (inventory update happens in DB)

🤖 My AI Usage

I used ChatGPT to:

Scaffold backend routes & Prisma schema

Create frontend React components

Design a sweet-shop themed UI

I reviewed all code suggestions and manually adapted logic to meet the assignment requirements.

✅ Assignment Requirements Covered

Database update on purchase ✔️

Frontend ↔ Backend communication ✔️

User Authentication ✔️

Inventory control ✔️

AI involvement explained ✔️

