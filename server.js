import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/skills', skillRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);