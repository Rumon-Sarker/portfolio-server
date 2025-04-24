import express from 'express';
import {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    sendMessage
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.post("/message", sendMessage);

export default router;
