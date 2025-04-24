import fs from 'fs';
import path from 'path';
import Resume from '../models/Resume.js';

const uploadResume = async (req, res) => {
    try {
        // Delete old resume if exists
        const oldResume = await Resume.findOne();
        if (oldResume) {
            fs.unlinkSync(oldResume.path);
            await Resume.deleteOne({ _id: oldResume._id });
        }

        const resume = new Resume({
            filename: req.file.originalname,
            path: req.file.path,
        });

        const saved = await resume.save();
        res.status(200).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Upload failed', error });
    }
};

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne();
        if (!resume) return res.status(404).json({ message: 'No resume found' });
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resume', error });
    }
};

const viewResume = async (req, res) => {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).send('Resume not found');
    res.sendFile(path.resolve(resume.path));
};

const downloadResume = async (req, res) => {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).send('Resume not found');
    res.download(resume.path, resume.filename);
};

const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne();
        if (!resume) return res.status(404).send('Resume not found');

        fs.unlinkSync(resume.path);
        await Resume.deleteOne({ _id: resume._id });

        res.status(200).json({ message: 'Resume deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed', error });
    }
};

export { uploadResume, getResume, viewResume, downloadResume, deleteResume };
