# Secure Auth

A full-stack authentication system implementing secure JWT-based authentication with refresh token rotation using TypeScript, React, and Express.

## Project Overview

The project consists of two main parts:
- **Backend**: Express.js server with TypeScript implementing JWT authentication
- **Frontend**: React application with TypeScript handling secure authentication flows

### Key Features
- 🔐 Secure JWT-based authentication with access and refresh tokens
- 🔄 Refresh token rotation for enhanced security
- 🍪 HTTP-only cookies for secure token storage
- ⚡️ Rate limiting on sensitive endpoints
- 📝 TypeScript for type safety
- 🔄 React Query for efficient data fetching and caching
- ✅ Zod for runtime type validation

## Backend Architecture

### Core Components
- **Authentication Service**: Handles token generation, validation, and rotation
- **User Management**: Handles user data and profile operations
- **Security Middleware**: Implements rate limiting and token verification
- **Repository Layer**: Manages data persistence for users and tokens

### Security Features
- Access tokens expire in 15 minutes
- Refresh tokens expire in 4 hours
- Rate limiting:
  - Login: 5 attempts/15min
  - Refresh token: 10 requests/15min
  - General API: 100 requests/15min
- Secure cookie configuration with HTTP-only, Secure, and SameSite flags
- Password hashing using bcrypt
- Input validation using Zod schemas

### API Endpoints
- **Authentication**
  - POST `/api/auth/login`: User login
  - POST `/api/auth/refresh-token`: Token refresh
  - POST `/api/auth/logout`: User logout
- **User**
  - GET `/api/users/profile`: Get user profile (protected)

## Frontend Architecture

### Core Features
- Global authentication state management
- Automatic token refresh handling
- Protected route implementation
- Form validation
- Error handling

### Security Measures
- Access token stored in memory
- Refresh token handled via HTTP-only cookies
- Automatic token refresh on expiration
- Protected route guards

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript

### Installation

1. Clone the repository
```bash
git clone https://github.com/ifindev/secure-authentication
```

2. Install dependencies for both frontend and backend
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env` in both server and client directories
- Configure the variables according to your needs

4. Start the development servers
```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

## Development Workflow

1. Backend runs on `http://localhost:5000`
2. Frontend runs on `http://localhost:5173`
3. API requests from frontend to backend are proxied through CORS configuration

## Security Best Practices

- Never store sensitive data in localStorage
- Use HTTP-only cookies for refresh tokens
- Implement proper error handling
- Validate all inputs
- Use rate limiting for sensitive endpoints
- Rotate refresh tokens after use
- Set proper CORS configuration

## License

MIT License
