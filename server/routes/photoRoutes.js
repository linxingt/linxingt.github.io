import express from 'express';
import { getAllPhotos } from '../controllers/photoController.js';

const router = express.Router();

router.get('/', getAllPhotos);

export default router;