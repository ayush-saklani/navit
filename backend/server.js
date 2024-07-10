//  Server.js version 2.1
import cors from 'cors'; // Import the cors middleware
import express from 'express'
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
// import navitmodel from 'model/navit-models.model.js';
dotenv.config();

const app = express();   // Create an express app (handler function)
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
// Middleware to parse JSON bodies





app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
