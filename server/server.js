import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/errorMiddleware.js';

import asyncHandler from 'express-async-handler';

import goalModel from './models/goalModel.js';

// ROUTES
import goalRoutes from './routes/goalRoutes.js';

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
    res.send('Hello World');
    const data = await goalModel.find({});
    console.log(data);
  })
);

app.use('/api/goals', goalRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
