import Testimonial from '../models/Testimonial.js';
import { uploadMultipleToImageBB } from '../config/imagebb.js';

// Create
export const createTestimonial = async (req, res) => {
    try {
        const { testimonial, name, designation, company } = req.body;
        let imageUrl = req.body.image;


        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            imageUrl = await uploadMultipleToImageBB(base64);
        }

        const newTestimonial = await Testimonial.create({
            testimonial,
            name,
            designation,
            company,
            image: imageUrl
        });
        console.log("New testimonails", newTestimonial);
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read all
export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update
export const updateTestimonial = async (req, res) => {
    try {
        const { testimonial, name, designation, company } = req.body;
        let imageUrl = req.body.image;

        if (req.file) {
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            imageUrl = await uploadMultipleToImageBB(base64);
        }

        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { testimonial, name, designation, company, image: imageUrl },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Not found' });

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
export const deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
