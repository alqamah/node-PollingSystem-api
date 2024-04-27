import mongoose from "mongoose";
import app from './src/app.js';

mongoose.connect('mongodb://localhost/polling-system')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Server is running on port 3000...`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });