import mongoose from 'mongoose';

//schema for options
const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
  link_to_vote: { type: String }
});

//schema for questions, linked with array of [options]
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema]
});

export const Question = mongoose.model('Question', questionSchema);

