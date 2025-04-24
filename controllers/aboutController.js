import About from "../models/About.js";


// GET all about entries (if you allow multiple)
export const getAllAbouts = async (req, res) => {
    try {
        const data = await About.find().sort({ createdAt: -1 });
        res.status(200).json(data);

    } catch (error) {

    }
};

// GET single about by ID
export const getAboutById = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(about);
    } catch (error) {

    }
};

// CREATE new about
export const createAbout = async (req, res,) => {
    try {
        const { title, description } = req.body;
        const newAbout = new About({ title, description });
        await newAbout.save();
        res.status(201).json(newAbout);
        console.log("about create data is", newAbout);
    } catch (error) {

    }
};

// UPDATE existing about by ID
export const updateAbout = async (req, res,) => {
    try {
        const { title, description } = req.body;
        const updated = await About.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updated);
    } catch (error) {

    }
};

// DELETE about by ID
export const deleteAbout = async (req, res,) => {
    try {
        const deleted = await About.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {

    }
};
