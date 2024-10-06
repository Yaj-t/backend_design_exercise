import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate a user based on a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.header - The headers of the request.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a 401 status if no token is provided, a 400 status if the token is invalid, or calls the next middleware if the token is valid.
 */
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;