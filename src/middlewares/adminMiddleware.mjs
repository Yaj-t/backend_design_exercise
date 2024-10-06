import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.role !== 'admin') {
            return res.status(403).send('Access denied. Admins only.');
        }
        next();
    } catch (error) {
        // Handle token verification errors
        return res.status(401).send('Invalid or expired token.');
    }
};

export default adminMiddleware;
