import Project from '../models/Project.js';
import { uploadMultipleToImageBB } from '../config/imagebb.js';

// Create Project
export const createProject = async (req, res) => {
    try {
        const projectData = req.body;

        // Handle image uploads if files are present
        if (req.files && req.files.length > 0) {
            const imageFiles = req.files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
            const imageUrls = await uploadMultipleToImageBB(imageFiles);
            projectData.image = imageUrls;
        }

        const project = await Project.create(projectData);
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Get All Projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get Single Project
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    try {
        const projectData = req.body;

        // Handle image uploads if files are present
        if (req.files && req.files.length > 0) {
            const imageFiles = req.files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
            const imageUrls = await uploadMultipleToImageBB(imageFiles);
            projectData.image = imageUrls;
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            projectData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};