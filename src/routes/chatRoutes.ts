import express from 'express';
import { authenticateToken } from '../middlewares/auth';
import { fileUpload, uploadExcel, getChats } from '../controllers/chatController';

const router = express.Router();

router.post('/import', authenticateToken, fileUpload, uploadExcel);
router.get('/', authenticateToken, getChats);

export default router;
