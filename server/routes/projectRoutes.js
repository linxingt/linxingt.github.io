import express from 'express';
import { getAllProjects, getFilterOptions, getProjectById } from '../controllers/projectController.js';

const router = express.Router();

router.get('/options', getFilterOptions);
router.get('/:id', getProjectById);
router.get('/', getAllProjects);

export default router;