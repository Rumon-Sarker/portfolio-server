import express from 'express';
import {
    uploadResume,
    getResume,
    viewResume,
    downloadResume,
    deleteResume,
} from '../controllers/resumeController.js';
import upload from '../middleware/resumeUpload.js';

const router = express.Router();

router.get('/', getResume);
router.post('/', upload, uploadResume);
router.get('/view', viewResume);
router.get('/download', downloadResume);
router.delete('/', deleteResume);

export default router;
