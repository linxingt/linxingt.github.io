import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db.js';

import skillRoutes from './routes/skillRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  // origin: 'https://attend-vercel-frontend.vercel.app',
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
