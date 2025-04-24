import Contact from "../models/Contact.js";


export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const createContact = async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create contact' });
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update contact' });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
