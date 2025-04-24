import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: [String], required: true },
    objective: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);



