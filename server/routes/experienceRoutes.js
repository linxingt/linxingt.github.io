import express from 'express';
import { getAllExperiences, getExperienceById } from '../controllers/experienceController.js';

const router = express.Router();

router.get('/:id', getExperienceById);
router.get('/', getAllExperiences);

export default router;