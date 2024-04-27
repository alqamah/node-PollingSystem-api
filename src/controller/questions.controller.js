import {Question} from '../model/schema.js';

export const createQuestion = async (req, res) => {
  try {
    const { text, options } = req.body;
    const question = new Question({ text, options });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addOption = async (req, res) => {
  try {
    const { text } = req.body;
    const question = await Question.findById(req.params.id);
    question.options.push({ text });
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOption = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.params.questionId, 'options._id': req.params.optionId },
      { $pull: { options: { _id: req.params.optionId } } },
      { new: true }
    );
    if (!question) return res.status(404).json({ error: 'Question or option not found' });
    res.status(200).json(question);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const addVote = async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { _id: req.params.questionId, 'options._id': req.params.optionId },
      { $inc: { 'options.$.votes': 1 } },
      { new: true }
    );
    if (!question) return res.status(404).json({ error: 'Question or option not found' });
    res.status(200).json(question);
  } catch (err) {    
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).lean();
    if (!question) return res.status(404).json({ error: 'Question not found' });

    // Populate the link_to_vote field dynamically
    question.options = question.options.map(option => ({
      ...option,
      link_to_vote: `http://localhost:3000/questions/options/${question._id}/${option._id}/add_vote`
    }));

    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllQuestion = async (req, res) => {
    try {
      const questions = await Question.find({});
      if (!questions) return res.status(404).json({ error: 'Questions not found' });  
      res.status(200).json(questions);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

