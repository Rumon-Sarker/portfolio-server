import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    filename: String,
    path: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Resume', resumeSchema);
