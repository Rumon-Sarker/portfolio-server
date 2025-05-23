import Banner from '../models/Banner.js';

// GET all banners
export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: banners });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error',
            message: error.message
        });
    }
};

// POST create or update banner
export const createOrUpdateBanner = async (req, res) => {
    try {
        const { name, designation, objective } = req.body;

        // Validate required fields
        if (!name || !designation || !Array.isArray(designation) || designation.length === 0 || !objective) {
            return res.status(400).json({
                success: false,
                error: 'Name, designation (as array), and objective are required'
            });
        }

        // Check if any banner exists
        const existingBanner = await Banner.findOne();

        if (existingBanner) {
            // Update
            const updatedBanner = await Banner.findByIdAndUpdate(
                existingBanner._id,
                { name, designation, objective },
                { new: true, runValidators: true }
            );
            return res.status(200).json({
                success: true,
                message: "Banner updated successfully",
                data: updatedBanner
            });
        }

        // Create
        const newBanner = await Banner.create({ name, designation, objective });

        res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: newBanner
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to save banner",
            message: error.message
        });
    }
};


export const updateBannerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation, objective } = req.body;

        if (!name || !designation || !Array.isArray(designation) || !objective) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updated = await Banner.findByIdAndUpdate(
            id,
            { name, designation, objective },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Banner not found" });
        }

        res.status(200).json({ success: true, message: "Banner updated", data: updated });
    } catch (error) {
        res.status(500).json({ error: "Update failed", message: error.message });
    }
};



// DELETE banner
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBanner = await Banner.findByIdAndDelete(id);

        if (!deletedBanner) {
            return res.status(404).json({
                success: false,
                error: "Banner not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Banner deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to delete banner",
            message: error.message
        });
    }
};