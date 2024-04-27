import express from 'express';
import {
  createQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
  addVote,
  getQuestion,
  getAllQuestion
} from '../controller/questions.controller.js';

const router = express.Router();

router.post('/create', createQuestion);
router.post('/:id/options/create', addOption);
router.delete('/:id', deleteQuestion);
router.delete('/:questionId/options/:optionId', deleteOption);
router.put('/options/:questionId/:optionId/add_vote', addVote);
router.get('/:id', getQuestion);
router.get('/', getAllQuestion);

export default router;