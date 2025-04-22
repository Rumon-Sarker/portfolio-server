import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    progress: { type: Number, required: true },
    image: { type: String, required: true },
});

export default mongoose.model("Skill", skillSchema);
