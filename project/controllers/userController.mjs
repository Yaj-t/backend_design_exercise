import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByUsername, getUsers } from '../models/userModel.mjs';
import bcrypt from 'bcryptjs';


export const registerUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        repeat_password: Joi.ref('password'),
        role: Joi.string().valid('user', 'admin')
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await findUserByEmail(req.body.email);
    if (userExists) return res.status(400).send('User already exists');

    const usernameExists = await findUserByUsername(req.body.username);
    if (usernameExists) return res.status(400).send('Username already taken');

    await createUser(req.body);
    res.status(201).send('User registered successfully');
};

export const loginUser = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send(token);
};

export const getProfile = async (req, res) => {
    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).send('User not found');
    res.send({ id: user.id, name: user.name, username: user.username, email: user.email, role: user.role });
};

export const getAllUsers = async (req, res) => {
    const users = await getUsers();
    res.send(users);
};

export default { registerUser, loginUser, getProfile, getAllUsers };