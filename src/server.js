import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const pino = pinoHttp();
const PORT = process.env.PORT || 3000;

app.use(pino);
app.use(cors());
app.use(express.json());

app.get("/notes", (req, res) => {
  res.status(200).json({ message: "Retrieved all notes" });
});

app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

app.get("/test-error", (req, res) => {
  throw new Error("Simulated server error");
});

// 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (req && req.log && typeof req.log.error === 'function') req.log.error(err);
  res.status(500).json({ message: err.message });
});

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
