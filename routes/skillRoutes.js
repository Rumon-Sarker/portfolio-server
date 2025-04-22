import express from 'express';
import {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

router.route('/')
    .get(getSkills)
    .post(createSkill);

router.route('/:id')
    .put(updateSkill)
    .delete(deleteSkill);

export default router;
