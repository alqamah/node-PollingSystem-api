import express from 'express';
import mongoose from  'mongoose';
import questionsRouter from './router/router.js';

const app = express();

app.use(express.json());
app.use('/questions', questionsRouter);

export default app;