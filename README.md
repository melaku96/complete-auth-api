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
- joi
- helmet
- morgan
- express-rate-limit
- Multer
- Nodemailer
- Cookie Parser
- dotenv

---
# Environment Variables

PORT=your_port
MONGO_URI=your_mongodb_connection
CLIENT_URL=your_client_url
JWT_ACCESS_TOKEN_SECRET=your_secret
EMAIL_USER=your_user_email
EMAIL_USER_PASS=your_email_password

----
## Run the Project
# Development mode:
npm run dev
# Production mode:
npm start

-----
# API Endpoints
Authentication Routes

Method| Endpoint| Description
POST| /api/auth/register| Register user
POST| /api/auth/login| Login user
GET| /api/auth/verify-email| Verify email
POST| /api/auth/resend-verification| Resend email verification
POST| /api/auth/refresh-token| Refresh accessbtoken
POST| /api/auth/forgot-password| Request password reset
PUT| /api/auth/reset-password/:token| Reset password
GET| /api/user/me| Protected fetch of current user
PATCH| /api/user/upload-profile| Protected upload of profile image
PATCH| /api/user/update-user| Protected update of current user
PATCH| /api/user/change-password| Protected chane password of user
DELETE| /api/user/delete-user| Protected delete of current user

----------
# File Upload

This project supports profile image upload using Multer.
Uploaded files are stored in:
/uploads

Static access is enabled through:
app.use("/uploads", express.static("uploads"));

--- 

# Security Features

Password hashing using bcrypt
JWT token authentication
Protected middleware routes
Environment variable protection
HTTP security with Helmet
Email verification
---
#Author
Developed by Melaku Belew

