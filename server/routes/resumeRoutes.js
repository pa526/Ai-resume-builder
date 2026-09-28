import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createResume, deleteResume, getPublicResumeById, getUserResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getUserResumeById);
resumeRouter.get('/public/:resumeId', protect, getPublicResumeById);
resumeRouter.put('/update',upload.single('image'), protect, updateResume);

export default resumeRouter;