import express from 'express';
import {
    getAllBanners,
    createOrUpdateBanner,
    deleteBanner,
    updateBannerById
} from '../controllers/bannerController.js';

const router = express.Router();

router.get('/', getAllBanners);
router.post('/', createOrUpdateBanner);
router.put('/:id', updateBannerById);
router.delete('/:id', deleteBanner);

export default router;