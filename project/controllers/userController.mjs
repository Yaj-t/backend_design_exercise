import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByUsername, findUserById } from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';
import { validateRequest } from '../utils/validation.mjs';
import { userRegistrationSchema, userLoginSchema } from '../schemas/userSchemas.mjs';

/**
 * Registers a new user by validating input, checking for duplicate users, hashing the password,
 * and assigning a unique ID. If the registration is successful, the user is saved in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user (will be hashed before saving).
 * @param {string} req.body.repeat_password - The repeated password for confirmation.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
export const registerUser = async (req, res) => {
    const validationErrors = validateRequest(userRegistrationSchema, req.body);
    if (validationErrors) return res.status(400).send(validationErrors);

    const userExists = await findUserByEmail(req.body.email);
    if (userExists) return res.status(400).send('User already exists');

    const usernameExists = await findUserByUsername(req.body.username);
    if (usernameExists) return res.status(400).send('Username already taken');

    const { repeat_password, ...userData } = req.body;

    await createUser(userData);

    res.status(201).send('User registered successfully');
};

/**
 * Logs in a user by validating their credentials (email and password), 
 * and generates a JWT token for authentication.
 * If the credentials are invalid, an error is returned.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - Sends a response with a JWT token if credentials are valid, otherwise sends an error message.
 */
export const loginUser = async (req, res) => {
    const validationErrors = validateRequest(userLoginSchema, req.body);
    if (validationErrors) return res.status(400).send(validationErrors);


    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(400).send('Invalid credentials');


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send(token);
};

/**
 * Retrieves the profile of the currently authenticated user based on the email
 * stored in the JWT token. The JWT token is decoded in the authentication middleware,
 * and the decoded user information is attached to `req.user`.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object, which was decoded and attached by the auth middleware.
 * @param {string} req.user.email - The email of the authenticated user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the profile is sent or an error occurs.
 */
export const getProfile = async (req, res) => {
    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).send('User not found');

    res.send({ id: user.id, name: user.name, username: user.username, email: user.email });
};

export default { registerUser, loginUser, getProfile };