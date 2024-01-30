import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user-routes.js';
import adviceRoutes from './routes/advice-routes.js';

import dbConnect from './config/db.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/advice', adviceRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
  dbConnect();
});
