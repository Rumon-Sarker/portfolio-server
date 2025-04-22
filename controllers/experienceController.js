import Experience from '../models/Experience.js';

// Get all
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create
export const createExperience = async (req, res) => {
    try {
        const { title, company, date, description } = req.body;
        const experience = await Experience.create({ title, company, date, description });
        res.status(201).json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update
export const updateExperience = async (req, res) => {
    try {
        const { title, company, date, description } = req.body;
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            { title, company, date, description },
            { new: true, runValidators: true }
        );
        if (!experience) return res.status(404).json({ error: 'Experience not found' });
        res.json(experience);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// Delete
export const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(404).json({ error: 'Experience not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
