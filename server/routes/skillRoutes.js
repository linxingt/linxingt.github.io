import express from 'express';
import { getAllSkills, getSkillGroupDetails } from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillGroupDetails);

export default router;
