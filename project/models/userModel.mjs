import fs from 'fs-extra';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
const path = './project/data/users.json';

const ROUNDS = 10;

export async function getUsers() {
    try {
        return await fs.readJson(path);
    } catch (err) {
        return [];
    }
}

export async function saveUsers(users) {
    await fs.writeJson(path, users);
}

export async function createUser(user) {
    const users = await getUsers();
    const salt = await bcrypt.genSalt(ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    user.id = uuidv4();
    users.push(user);
    user.role = user.role || 'user'
    await saveUsers(users);
}

export async function findUserByEmail(email) {
    const users = await getUsers();
    return users.find(user => user.email === email);
}

export async function findUserById(id) {
    const users = await getUsers();
    return users.find(user => user.id === id);
}

export async function findUserByUsername(username) {
    const users = await getUsers();
    return users.find(user => user.username === username);
}

export default { getUsers, createUser, findUserByEmail, findUserById, findUserByUsername };