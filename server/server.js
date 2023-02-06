import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(cors());

const PORT = process.env.PORT || 3000;
const dbName = 'yourMongoDatabaseName';
mongoose.set({ strictQuery: false });
mongoose.connect(process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${dbName}`);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
