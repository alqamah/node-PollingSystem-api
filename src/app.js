import express from 'express';
import mongoose from  'mongoose';
import questionsRouter from './router/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/questions', questionsRouter);

mongoose.connect('mongodb://localhost/polling-system')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });