import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import aboutRoutes from './routes/aboutRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js'; // Import the testimonials route
import bannerRoutes from './routes/bannerRoutes.js'; // Import the testimonials route
import resumeRoutes from './routes/resumeRoutes.js';


dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://portfolio-websites-virid.vercel.app',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/testimonials', testimonialRoutes); // Add this line to include the testimonials route
app.use('/api/banner', bannerRoutes); // Add this line to include the testimonials route
app.use('/api/resume', resumeRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);