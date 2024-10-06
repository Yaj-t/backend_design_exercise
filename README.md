# Table of Contents
1. [Description](#description)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
    1. [User Registration](#user-registration)
    2. [User Login](#user-login)
    3. [Get User Profile](#get-user-profile)
7. [Middleware](#middleware)
8. [Data](#data)
9. [Utilities](#utilities)
10. [Schema](#schema)
11. [Additional Information](#additional-information)
12. [License](#license)

## Description
This project is a simple backend system designed for user management with JWT-based authentication. It includes user registration, login, and access to protected routes. The backend is built using **Node.js** and **Express**, with **JWT** (JSON Web Token) used to manage user authentication. Passwords are securely hashed using **bcrypt**, and user data is stored in a JSON file for simplicity.

To ensure data integrity and security, **Joi** is used for validating user input, ensuring that only properly formatted data is processed by the system. File operations (e.g., storing and retrieving user data) are handled using **fs-extra**. The authentication middleware ensures that only authenticated users can access protected routes.

## Project Structure
```
backend_design_exercise/
├── project/
│   ├── controllers/
│   │   └── userController.mjs          # Contains user-related logic (registration, login, etc.)
│   ├── data/
│   │   └── users.json                  # Stores user data in JSON format
│   ├── middlewares/
│   │   ├── authMiddleware.mjs          # Middleware for JWT token authentication
│   │   └── loggingMiddleware.mjs       # Middleware for logging requests
│   ├── models/
│   │   └── userModel.mjs               # Manages user data (reading/writing users.json)
│   ├── routes/
│   │   └── userRoutes.mjs              # Defines user-related routes
│   ├── schemas/
│   │   └── userSchemas.mjs             # Joi validation schemas for user data
│   ├── utils/
│   │   └── validation.mjs              # Utility functions for validation
├── .env                                # Environment variables (JWT_SECRET, PORT, etc.)
├── app.mjs                             # Entry point of the application
├── package.json                        # Project dependencies and scripts
└── README.md                           # Project documentation
```

## Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd project
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables
Define the following environment variables in the `.env` file:
- `PORT`: Port number for the server
- `JWT_SECRET`: Secret for JWT

## Usage
1. Start the application:
    ```sh
    npm start
    ```
2. The application will be running on `http://localhost:3000` by default.

## API Endpoints

### User Registration

**Endpoint**: `/api/users/register`

**Method**: `POST`

**Description**: Registers a new user by validating input, checking for duplicate users, hashing the password, and assigning a unique ID.

**Request Body**:

```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "repeat_password": "string"
}
```

**Response**:

- **201 Created**: User successfully created.
  - Example: `{ "message": "User created" }`
- **400 Bad Request**: Validation error or user already exists.

---

### User Login

**Endpoint**: `/api/users/login`

**Method**: `POST`

**Description**: Logs in a user by validating their credentials (email and password), and generates a JWT token for authentication.

**Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:

- **200 OK**: User successfully authenticated.
  - Example: `{ "token": "string" }`
- **400 Bad Request**: Invalid credentials.

---

### Get User Profile

**Endpoint**: `/api/users/profile`

**Method**: `GET`

**Description**: Retrieves the profile of the currently authenticated user based on the email stored in the JWT token.

**Headers**:

- `Authorization`: `Bearer <JWT token>`

**Response**:

- **200 OK**: User profile retrieved successfully.
  - Example: `{ "id": "string", "name": "string", "username": "string", "email": "string" }`
- **404 Not Found**: User not found.

---

### Notes
- **Authentication**: The `/api/users/profile` endpoint requires a valid JWT token.
- **Error Handling**: All endpoints return appropriate status codes and error messages in case of failures.

## Middleware
- **Authentication Middleware**: Handles authentication in [project/middlewares/authMiddleware.mjs](project/middlewares/authMiddleware.mjs)
- **Logging Middleware**: Logs requests in [project/middlewares/loggingMiddleware.mjs](project/middlewares/loggingMiddleware.mjs)

## Data
- **User Data**: Stored in [project/data/users.json](project/data/users.json)

## Utilities
- **Validation**: Utility functions for validation in [project/utils/validation.mjs](project/utils/validation.mjs)

## Schema
The user schema is defined in [project/schemas/userSchemas.mjs](project/schemas/userSchemas.mjs).

## Additional Information

### User Registration and Login Logic
- The `registerUser` function is responsible for registering a new user. It validates the input data using `Joi`, checks for duplicate users by email and username, hashes the password using **bcrypt**, and saves the user to the JSON file. This function is defined in [project/controllers/userController.mjs](project/controllers/userController.mjs).
- The `loginUser` function handles user login by validating credentials, checking if the email and password match, and generating a JWT token if the credentials are valid. This token is used for subsequent authenticated requests.

### Authentication Middleware
- The authentication middleware (`authMiddleware`) is responsible for verifying the JWT token. If the token is valid, it attaches the decoded user information to `req.user` and allows access to protected routes. If the token is invalid or missing, it returns an error. This middleware is defined in [project/middlewares/authMiddleware.mjs](project/middlewares/authMiddleware.mjs).

### Logging Middleware
- The logging middleware (`loggingMiddleware`) logs the HTTP method and URL of each incoming request along with a timestamp. This is useful for debugging and tracking application usage. This middleware is defined in [project/middlewares/loggingMiddleware.mjs](project/middlewares/loggingMiddleware.mjs).

### User Model and Data Management
- User data is managed using functions defined in [project/models/userModel.mjs](project/models/userModel.mjs). These functions include:
  - `getUsers()`: Retrieves all users from the JSON file.
  - `createUser(user)`: Creates a new user by hashing their password, assigning a unique ID, and saving the user to the JSON file.
  - `findUserByEmail(email)`, `findUserByUsername(username)`, `findUserById(id)`: Functions to find users by their email, username, or ID.

### JWT Token
- The application uses **jsonwebtoken** to generate JWT tokens for user authentication. Tokens are signed with a secret key (`JWT_SECRET`) defined in the `.env` file and are set to expire in 1 hour.

### Password Hashing
- User passwords are hashed using **bcrypt** to ensure secure storage of passwords.

### Validation
- The user registration and login data are validated using **Joi** schemas, which are defined in [project/schemas/userSchemas.mjs](project/schemas/userSchemas.mjs). The `validateRequest` function in [project/utils/validation.mjs](project/utils/validation.mjs) is used to validate incoming data against these schemas.

## License
This project is licensed under the MIT License.
