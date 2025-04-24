import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    phone: String,
    email: String,
    location: String,
    facebookLink: String,
    linkedinLink: String,
    githubLink: String,
    instagram: String,
}, {
    timestamps: true
});

export default mongoose.model('Contact', contactSchema);
