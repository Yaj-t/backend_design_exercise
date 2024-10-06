import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';
import dotenv from 'dotenv';
import limiter from './middlewares/rateLimiter.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);
app.use(limiter);

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});