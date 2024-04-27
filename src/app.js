import express from 'express';
import mongoose from  'mongoose';
import questionsRouter from './router/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/questions', questionsRouter);

export default app;