import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path: `${__dirname}/../.env`,
});
import './config/db';

const app = express();
app.listen(3000, () => {
  console.log('running on port 3000');
});
