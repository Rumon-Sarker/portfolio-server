import express from 'express';
import {
    getAllBanners,
    createOrUpdateBanner,
    deleteBanner
} from '../controllers/bannerController.js';

const router = express.Router();

router.get('/', getAllBanners);
router.post('/', createOrUpdateBanner);
router.delete('/:id', deleteBanner);

export default router;