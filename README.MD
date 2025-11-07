# 🔐 Token Management API

An API for managing users and authentication tokens, allowing you to **create, update, list, and delete users** and **generate JWT tokens** for authentication.  
Built with **Node.js**, **Express**, and **TypeScript**.

---

## 🧰 Technologies

- **Node.js** 20+
- **TypeScript**
- **Express.js**
- **JWT (jsonwebtoken)**
- **bcrypt** (Password Hashing)
- **Zod** (Validation)
- **Swagger/OpenAPI** (Documentation)
- **tsyringe** (Dependency Injection)
- **Jest** (Unit Tests)
- **Docker** (Optional)

---

## ⚙️ Features

- ✅ Register a new user  
- ✅ List all users  
- ✅ Get user by ID  
- ✅ Update existing user data  
- ✅ Delete a user  
- ✅ Generate and validate JWT tokens  
- ✅ Input validation with Zod  
- ✅ Automatic documentation with Swagger  
- ✅ Dependency Injection  
- ✅ Unit Testing

---

## 📋 Requirements

- Node.js >= 20  
- npm or yarn  
- Docker (optional)

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/mateusrodri12/token-api.git
cd token-api

# Install dependencies
npm install
# or
yarn install
```

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
npm run dev
# or
yarn dev
```

The API will run at:  
👉 **http://localhost:3000**

---

## 📚 API Documentation

Interactive Swagger documentation is available at:  
👉 **http://localhost:3000/api-docs**

---

## 📡 API Endpoints

### 👤 User Routes

| Method | Route | Description |
|--------|--------|-------------|
| `POST` | `/users` | Create a new user |
| `POST` | `/auth/login` | Login to system |
| `GET` | `/auth/users` | List all users |
| `GET` | `/auth/users/:id` | Get user by ID |
| `PUT` | `/auth/users/:id` | Update user |
| `DELETE` | `/auth/users/:id` | Delete user |

**Example — Create User**

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "1234"
}
```

Response:
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### 🔐 Auth Routes

| Method | Route | Description |
|--------|--------|-------------|
| `POST` | `/auth/login` | Authenticate and receive a JWT token |

**Example — Login**

Request:
```json
{
  "email": "john@example.com",
  "password": "1234"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## 🧪 Running Tests (optional)

```bash
npm test
# or
yarn test
```

---

## 🧠 How Authentication Works

After logging in, the user receives a **JWT token**.  
Protected routes require the token to be included in the request header:

```
Authorization: Bearer <your_token_here>
```

---

## 🧩 Project Structure

```
src/
 ┣ controllers/
 ┃ ┣ auth.Controller.ts
 ┃ ┗ user.Controller.ts
 ┣ routes/
 ┃ ┗ routes.ts
 ┣ services/
 ┃ ┗ user.service.ts
 ┣ validations/
 ┃ ┗ user.validation.ts
 ┣ swagger.ts
 ┗ app.ts
```

---

## 🧑‍💻 Author

Developed by **Mateus dos Santos Rodrigues** 💻  
📦 [GitHub](https://github.com/MateusRodr)

---

## 📄 License

This project is licensed under the **MIT License**.