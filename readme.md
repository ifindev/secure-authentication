# Secure Auth

Exploration of secure JWT Authentication with Access and Refresh Tokens using TypeScript, React, and Express

## Implementation Plan

### Backend (Express with TypeScript)

#### Project Setup
- Initialize a Node.js project with TypeScript.
- Install dependencies: `express`, `jsonwebtoken`, `bcrypt` (for password hashing), `dotenv` (for environment variables), and TypeScript-related packages.
- Set up a basic Express server with middleware for JSON parsing and error handling.

#### Environment Configuration
- Use a `.env` file to store sensitive data like JWT secrets and token expiration times.
- Define two secrets: one for access tokens (short-lived) and one for refresh tokens (longer-lived).

#### Mock Database
- Create a simple in-memory database (e.g., an array or object) to store users and refresh tokens.
- Simulate user data (ID, username, password hash) and refresh token storage with expiration.

#### Data Validation
- Use `zod` for schema-based validation of incoming request data (e.g., login credentials).
- Validate username and password for the login endpoint.

#### JWT Token Management
- **Access Token**: Short-lived (e.g., 15 minutes), signed with a secret, contains user ID as payload.
- **Refresh Token**: Longer-lived (e.g., 7 days), stored securely, signed with a separate secret, and rotated on each use.
- Implement token signing and verification utilities.

#### Endpoints
- **Login Endpoint (POST /api/auth/login)**:
  - Validate credentials, check against mock DB, generate access and refresh tokens, return them to the client, and store the refresh token securely.
- **Refresh Token Endpoint (POST /api/auth/refresh)**:
  - Accept a refresh token, verify it, invalidate the old one, issue a new access token and a new refresh token (rotation), and update the stored refresh token.
- **Protected Profile Endpoint (GET /api/user/profile)**:
  - Middleware to verify the access token, extract user ID, fetch user data from the mock DB, and return it.

#### Security Considerations
- Use HTTP-only, Secure, SameSite cookies for refresh tokens to prevent XSS and enhance CSRF protection.
- Hash passwords with `bcrypt`.
- Rotate refresh tokens to limit reuse.
- Include error handling for invalid/expired tokens.

### Frontend (React with TypeScript)

#### Project Setup
- Create a React app with TypeScript using Vite or Create React App.
- Install `react-query` for data fetching and state management, plus TypeScript types.

#### API Client
- Build a modular fetch-based API client with TypeScript types for requests and responses.
- Handle token storage in memory (access token) and cookies (refresh token via backend).

#### Authentication Logic
- **Login View**: Form with username/password, validated client-side, calls login endpoint, stores tokens.
- **Token Refresh Mechanism**: Use React Query’s `useQuery` with a custom hook to monitor access token expiration, trigger refresh when needed, and retry failed requests.
- **Protected Data Fetching**: Fetch user profile data with access token, handle 401 errors by refreshing the token.

#### State Management
- Use a global auth context to store the access token and provide login/logout functionality.
- React Query will handle caching and refetching of protected data.

#### Security
- Avoid storing refresh tokens in `localStorage` (rely on HTTP-only cookies).
- Handle token expiration gracefully with automatic refresh.

### Workflow Summary
User logs in → receives access and refresh tokens → access token used for API calls → when it expires, refresh token is sent to get a new access token → refresh token rotates → protected endpoint accessed seamlessly.