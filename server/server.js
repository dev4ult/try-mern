import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';

import asyncHandler from 'express-async-handler';

// ROUTES
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// MIDDLEWARE CONFIG
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(cors());

// PORT
const PORT = process.env.PORT || 3000;

// connect db
connectDB();

// HTTP METHOD

app.get(
  '/',
  asyncHandler(async (req, res) => {
    res.status(200).send('Hello World');
  })
);

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
