import express from 'express';
import { signup, login, getProfile } from '../controllers/authController';
import { verifyToken } from '../middilewares/authMiddileware';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile', verifyToken, getProfile);

export default router;