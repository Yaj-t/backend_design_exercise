import fs from 'fs-extra'; // A file system utility package for reading/writing JSON files
import bcrypt from 'bcryptjs'; // A package for hashing passwords securely
import { v4 as uuidv4 } from 'uuid'; // Generates unique IDs for new users


const ROUNDS = 10;

/**
 * Retrieves all users from the JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export async function getUsers() {
    try {
        return await fs.readJson(path);
    } catch (err) {
        return [];
    }
}

/**
 * Saves the given users array to the JSON file.
 * @param {Array} users - The array of users to save.
 * @returns {Promise<void>}
 */
export async function saveUsers(users) {
    await fs.writeJson(path, users);
}

/**
 * Creates a new user, hashes their password, assigns a unique ID, and saves them to the JSON file.
 * @param {Object} user - The user object to create.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.email - The email of the user.
 * @returns {Promise<void>}
 */
export async function createUser(user) {
    const users = await getUsers();
    const salt = await bcrypt.genSalt(ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    user.id = uuidv4();
    users.push(user);
    await saveUsers(users);
}

/**
 * Finds a user by their email.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object|undefined>} A promise that resolves to the user object if found, otherwise undefined.
 */
export async function findUserByEmail(email) {
    const users = await getUsers();
    return users.find(user => user.email === email);
}

/**
 * Finds a user by their ID.
 * @param {string} id - The ID of the user to find.
 * @returns {Promise<Object|undefined>} A promise that resolves to the user object if found, otherwise undefined.
 */
export async function findUserById(id) {
    const users = await getUsers();
    return users.find(user => user.id === id);
}

/**
 * Finds a user by their username.
 * @param {string} username - The username of the user to find.
 * @returns {Promise<Object|undefined>} A promise that resolves to the user object if found, otherwise undefined.
 */
export async function findUserByUsername(username) {
    const users = await getUsers();
    return users.find(user => user.username === username);
}

export default { getUsers, createUser, findUserByEmail, findUserById, findUserByUsername };