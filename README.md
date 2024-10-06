# Project Name

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

## Usage
1. Start the application:
    ```sh
    npm start
    ```
2. The application will be running on `http://localhost:3000`.

## JWT Token Handling
- When a user successfully logs in, a JWT token will be returned by the /login endpoint.
- This token should be stored on the front end in a secure location.
- The JWT token should be included in the request headers for routes that require authentication.
- Add the token to the Authorization header as follows:
```sh
  Authorization: Bearer <your_jwt_token>
```
## Endpoints
- **User Routes**: Defined in [project/routes/userRoutes.mjs](project/routes/userRoutes.mjs)
- **User Controller**: Handles user-related logic in [project/controllers/userController.mjs](project/controllers/userController.mjs)
- **User Model**: Defines the user schema in [project/models/userModel.mjs](project/models/userModel.mjs)

## Middleware
- **Authentication Middleware**: Handles authentication in [project/middlewares/authMiddleware.mjs](project/middlewares/authMiddleware.mjs)
- **Logging Middleware**: Logs requests in [project/middlewares/loggingMiddleware.mjs](project/middlewares/loggingMiddleware.mjs)

## Data
- **User Data**: Stored in [project/data/users.json](project/data/users.json)

## Utilities
- **Validation**: Utility functions for validation in [project/utils/validation.mjs](project/utils/validation.mjs)

## Schema
The user schema is defined in [project/schemas/userSchemas.mjs](project/schemas/userSchemas.mjs). 

## Environment Variables
Define the following environment variables in the `.env` file:
- `PORT`: Port number for the server
- `JWT_SECRET`: Secret for JWT

## License
This project is licensed under the MIT License.
