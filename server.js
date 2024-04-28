import mongoose from "mongoose";
import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();
//mongo-db connection config
mongoose.connect(process.env.MONGOURL)
  .then(() => {
    console.log('Connected to MongoDB');
    //starting the server
    app.listen(3000, () => {
      console.log(`Server is running on port 3000...`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });