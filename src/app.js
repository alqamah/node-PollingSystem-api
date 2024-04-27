import express from 'express';
import questionsRouter from './router/router.js';

const app = express();

app.use(express.json());
//using router for questions
app.use('/questions', questionsRouter);

export default app;