/**
 * Middleware function to log HTTP requests.
 *
 * Logs the HTTP method and URL of each incoming request along with a timestamp.
 *
 * @param {Object} req - The request object.
 * @param {string} req.method - The HTTP method of the request.
 * @param {string} req.url - The URL of the request.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const loggingMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} - ${url}`);
    next();
};

export default loggingMiddleware;