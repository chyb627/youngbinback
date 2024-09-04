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

// 미들웨어
app.use(cors({ origin, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
dotenv.config();

// api
app.get('/', (_, res) => {
  res.send('running ok');
});
app.use('/api/auth', authRoutes);
app.use('/api/subs', subRoutes);

app.use(express.static('public'));

// express app 실행
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`[Server On]Listening on port ${PORT}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('[DB On] Database Connected');
    })
    .catch((error) => console.log('Database Connected Error::', error));
});
