require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pino = require("pino-http")();

const app = express();

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
  if (req && req.log && typeof req.log.error === "function") req.log.error(err);
  res.status(500).json({ message: err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
