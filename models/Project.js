import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    tags: {
        type: [String],
        required: [true, 'At least one tag is required']
    },
    source_code_link: {
        type: String,
        required: [true, 'GitHub link is required']
    },
    live_link: {
        type: String
    },
    category:{
        type: "String",
        required: true
    },
    image: {
        type: [String],
        required: [true, 'At least one image is required']

    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Project', projectSchema);