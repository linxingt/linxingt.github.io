import express from 'express';
import { showAllMessages, showOneMessage, sendMessage, deleteMessage, updateMessage } from '../controllers/guestbookController.js';

const router = express.Router();

router.get('/', showAllMessages);
router.get('/:id', showOneMessage);
router.post('/', sendMessage);
router.delete('/:id', deleteMessage);
router.put('/:id', updateMessage);

export default router;