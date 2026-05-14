# 🔐 Authentication Backend API

A professional Node.js Authentication Backend API built with Express.js, MongoDB, and JWT.

This project includes:

- User Registration
- Login & Logout
- Access Token & Refresh Token
- Email Verification
- Forgot Password & Reset Password
- Profile Upload with Cloudinary
- Role-Based Authorization
- Secure Password Hashing
- Cookie Authentication
- MVC Architecture
- Error Handling Middleware
- Validation & Security Best Practices

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Cloudinary
- Multer
- Nodemailer
- Cookie Parser
- dotenv

---

# 📁 Project Structure

`bash
src/
│
├── app.js
├── server.js
│
├── config/
│   ├── db.js
│   ├── env.js
│   └── cloudinary.js
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.service.js
│   │   ├── auth.routes.js
│   │   ├── auth.validation.js
│   │   └── auth.model.js
│   │
│   ├── user/
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.routes.js
│   │   └── user.model.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── multer.middleware.js
│   ├── validate.middleware.js
│   └── error.middleware.js
│
├── utils/
│   ├── ApiError.js
│   ├── catchAsync.js
│   ├── sendEmail.js
│   ├── generateToken.js
│   └── cloudinaryUpload.js
│
└── routes/
    └── index.js
