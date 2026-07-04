import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import hiringRequestRoutes from './routes/hiringRequestRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from uploads directory
app.use('/uploads', express.static('uploads'));

// DB Connection
connectDB();

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Sofzenix IT Solutions LLP API is running smoothly',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/hiring-requests', hiringRequestRoutes);
app.use('/api/contacts', contactRoutes);

// Skeleton placeholder routes
app.use('/api/auth', (req, res) => {
  res.status(501).json({ message: 'Auth routes are under development in Phase 2' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});
