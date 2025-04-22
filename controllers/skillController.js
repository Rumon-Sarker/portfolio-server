import Skill from "../models/Skill.js";
import { uploadMultipleToImageBB } from "../config/imagebb.js";

// Create
export const createSkill = async (req, res) => {
    try {
        const { name, category, progress } = req.body;
        let imageUrl = req.body.image;

        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            imageUrl = await uploadMultipleToImageBB(base64);
        }

        const newSkill = await Skill.create({
            name,
            category,
            progress,
            image: imageUrl
        });

        console.log("New Skill created:", newSkill);
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read all
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update
export const updateSkill = async (req, res) => {
    try {
        const { name, category, progress } = req.body;
        let imageUrl = req.body.image;

        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            imageUrl = await uploadMultipleToImageBB(base64);
        }

        const updated = await Skill.findByIdAndUpdate(
            req.params.id,
            { name, category, progress, image: imageUrl },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Skill not found' });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
export const deleteSkill = async (req, res) => {
    try {
        const deleted = await Skill.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Skill not found' });
        res.json({ message: 'Skill deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
