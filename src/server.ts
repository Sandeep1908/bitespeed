// src/server.ts
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contactRoutes.js';
import connectDB from './config/db.js';


// Connect to MongoDB
connectDB();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
