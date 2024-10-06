import rateLimit from 'express-rate-limit';

/**
 * Middleware to limit repeated requests to APIs.
 *
 * @constant
 * @type {Object}
 * @property {number} windowMs - Time frame for which requests are checked/remembered in milliseconds.
 * @property {number} max - Maximum number of connections during `windowMs` milliseconds before sending a rate limit response.
 * @property {Object} message - Response message sent when the rate limit is exceeded.
 * @property {number} message.status - HTTP status code for the rate limit response.
 * @property {string} message.error - Error message for the rate limit response.
 */
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
});

export default limiter;