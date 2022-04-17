import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/../.env`,
});
import './config/db';
import MainRouter from './routers/main.router';

const app = express();
app.use(express.json());
app.use('/api', MainRouter);

const PORT = process.env.PORT;

app.listen(3000, () => {
  console.log('running on port 3000');
});
