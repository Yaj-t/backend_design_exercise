import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import loggingMiddleware from './middlewares/loggingMiddleware.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});