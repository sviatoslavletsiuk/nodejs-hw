import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Root route to show API status (prevents 404 on homepage)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Notes API' });
});

app.use(authRoutes);
app.use(notesRoutes);

app.use(errors());

app.use(notFoundHandler);
app.use(errorHandler);

(async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      'Failed to start server due to DB connection error:',
      error?.message || error,
    );
    process.exit(1);
  }
})();

export default app;
