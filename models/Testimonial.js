import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    testimonial: {
        type: String,
        required: true
    },
    name: String,
    designation: String,
    company: String,
    image: String, // URL after upload to ImageBB
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Testimonial', testimonialSchema);
