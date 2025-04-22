import express from 'express';

import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
} from '../controllers/testimonialController.js';
import upload from '../utils/upload.js';


const router = express.Router();


router.get('/', getTestimonials);
router.post('/', upload.single('image'), createTestimonial);
router.put('/:id', upload.single('image'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
