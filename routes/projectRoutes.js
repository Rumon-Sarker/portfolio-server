import express from 'express';
import {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    getProjectById
} from '../controllers/projectController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.route('/')
    .get(getProjects)
    .post(upload.array('image', 5), createProject);

router.route('/:id')
    .get(getProjectById)
    .put(upload.array('image', 5), updateProject)
    .delete(deleteProject);

export default router;