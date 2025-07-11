import express from 'express';
import { signup, login, getProfile } from '../controllers/authController';
import { verifyToken } from '../middilewares/authMiddileware';
import upload from '../middilewares/upload';


const router = express.Router();

router.post('/signup',upload.single('photo'), signup);
router.post('/login',login);
router.get('/profile', verifyToken, getProfile);

export default router;
