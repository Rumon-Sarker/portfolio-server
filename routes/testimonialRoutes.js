import express from 'express';

import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
} from '../controllers/testimonialController.js';



const router = express.Router();


router.get('/', getTestimonials);
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
