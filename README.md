# Backend Creator

A robust Node.js backend for managing creator content, equipped with secure authentication and asset management capabilities.

## Features

- **Authentication**: 
  - User Signup & Login (JWT-based).
  - OTP Verification for secure account actions.
  - Password hashing with Bcrypt.
- **Asset Management**: 
  - Upload images/videos to Cloudinary.
  - View public assets.
  - Manage personal assets.
  - Search and pagination support.
- **Security**: 
  - HttpOnly Cookies for token storage.
  - Protected routes middleware.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT, BcryptJS
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI
- Cloudinary Account
- Email Service Credentials (for Nodemailer)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/debaprakash2021/creator-connect-backend.git
   cd backend-creator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=8090
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the Server

```sh
npm start
```
The server will start on `http://localhost:8090`.

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |
| POST | `/logout` | Logout user |
| GET | `/me` | Get current user profile (Protected) |
| POST | `/send-otp` | Send OTP to email |
| POST | `/verify-otp` | Verify OTP |

### Asset Routes (`/api/assets`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Upload a new asset (Protected, Multipart/Form-Data) |
| GET | `/` | Get all public assets (Pagination, Search) |
| GET | `/my` | Get my assets (Protected, Pagination) |

## Folder Structure

```
src/
├── config/         # Database and third-party configs
├── controllers/    # Route logic
├── middleware/     # Auth and upload middleware
├── models/         # Mongoose models
├── routes/         # API route definitions
├── services/       # Business logic
├── utils/          # Helper functions
└── server.js       # App entry point
```

## License

This project is open source and available under the [ISC License](LICENSE).
