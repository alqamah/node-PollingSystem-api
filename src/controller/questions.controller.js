import {Question} from '../model/schema.js';


//handling the create-question route
export const createQuestion = async (req, res) => {
  try {
    //getting the data from the request body
    const { text, options } = req.body;
    //creating a new question object
    const question = new Question({ text, options });
    await question.save();
    //returning the response
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//handling the route to create a new option for a question
export const addOption = async (req, res) => {
  try {
    const { text } = req.body;
    //retrieving the question from the db
    const question = await Question.findById(req.params.id);
    if(!question) res.status(404).json({ error: 'Question not found (or invalid Question-ID entered in URL)' });
    //inserting the new option in the options array of the question object
    question.options.push({ text });
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//handling the deletion of question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//handling the deletion of option
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

//handling the add-vote to the option
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

//handling the get-question route
export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).lean();
    if (!question) return res.status(404).json({ error: 'Question not found' });

    // Populating the link_to_vote field
    question.options = question.options.map(option => ({
      ...option,
      link_to_vote: `http://localhost:3000/questions/options/${question._id}/${option._id}/add_vote`
    }));

    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//get-all questions route
export const getAllQuestion = async (req, res) => {
    try {
      const questions = await Question.find({});
      if (!questions) return res.status(404).json({ error: 'Questions not found' });  
      res.status(200).json(questions);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};

