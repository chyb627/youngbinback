import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('running'));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('Database initialized...');
    })
    .catch((error) => console.log(error));
});
