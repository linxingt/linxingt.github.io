import express from 'express';
import { getAllSkillCategory, getSkillGroupDetails } from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkillCategory);
router.get('/:id', getSkillGroupDetails);

export default router;
