import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';
import subRoutes from './routes/subs';

const app = express();
const origin = 'http://localhost:7000';

app.use(cors({ origin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
dotenv.config();

app.get('/', (_, res) => {
  res.send('running');
});
app.use('/api/auth', authRoutes);
app.use('/api/subs', subRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('Database initialized...');
    })
    .catch((error) => console.log(error));
});
