import express from 'express';
import {
    getAllAbouts,
    getAboutById,
    createAbout,
    updateAbout,
    deleteAbout
} from '../controllers/aboutController.js';


const router = express.Router();

router.get('/', getAllAbouts);                // Get all
router.get('/:id', getAboutById);             // Get one by ID
router.post('/', createAbout);   // Create
router.put('/:id', updateAbout); // Update
router.delete('/:id', deleteAbout); // Delete

export default router;
