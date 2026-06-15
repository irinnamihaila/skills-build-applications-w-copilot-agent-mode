import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'backend', port: PORT });
});

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running.');
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB at', MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
