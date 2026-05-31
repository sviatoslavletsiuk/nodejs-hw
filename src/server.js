import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { fileURLToPath } from 'url';
import connectMongoDB from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/notes', notesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    // eslint-disable-next-line no-console
    console.error('MONGO_URL is not defined in environment variables');
    process.exit(1);
  }

  (async () => {
    try {
      await connectMongoDB(MONGO_URL);
      app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to start server due to DB connection error');
      process.exit(1);
    }
  })();
}

export default app;
