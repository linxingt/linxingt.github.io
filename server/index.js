import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db.js';

import skillRoutes from './routes/skillRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  process.env.ORIGIN, 
  'http://localhost:5173',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/skills', skillRoutes);
// app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
