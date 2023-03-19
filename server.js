import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import UserRouter from './routers/UserRouter.js';
import TodoRouter from './routers/TodoRouter.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

app.use('/api/user', UserRouter);
app.use('/api/todo', TodoRouter);

app.all('*', (_req, res) => {
  res.status(404).json({ message: 'Page Not Found!' });
});

export default app;
