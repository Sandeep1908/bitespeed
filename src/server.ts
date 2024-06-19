// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config()

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);

// Start the server
app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
