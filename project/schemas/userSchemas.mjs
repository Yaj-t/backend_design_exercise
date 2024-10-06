import Joi from 'joi';

/**
 * Schema for user registration validation using Joi.
 * 
 * @constant {Object} userRegistrationSchema - Joi schema object for validating user registration data.
 * @property {string} name - User's name, required, must be between 2 and 30 characters.
 * @property {string} username - User's username, required, alphanumeric, must be between 2 and 20 characters.
 * @property {string} email - User's email, required, must be a valid email format.
 * @property {string} password - User's password, required, must be at least 6 characters long.
 * @property {string} repeat_password - Confirmation of the user's password, required, must match the password field.
 */
export const userRegistrationSchema = Joi.object({
    name: Joi.string().
        required().
        min(2).
        max(30),
    username: Joi.string().
        required().
        alphanum().
        min(2).
        max(20),
    email: Joi.string().
        email().
        required(),
    password: Joi.string().
        min(6).
        required(),
    repeat_password: Joi.any().
        valid(Joi.ref('password')).
        required().
        messages({
            'any.only': 'Passwords do not match',
        }),
});

/**
 * Schema for user login validation.
 * 
 * This schema validates the following fields:
 * - `email`: A required string that must be a valid email address.
 * - `password`: A required string.
 * 
 * @type {Object}
 * @property {Joi.StringSchema} email - The email address of the user.
 * @property {Joi.StringSchema} password - The password of the user.
 */
export const userLoginSchema = Joi.object({
    email: Joi.string().
        email().
        required(),
    password: Joi.
        string().
        required()
});
