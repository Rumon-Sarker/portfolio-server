import Contact from "../models/Contact.js";
import nodemailer from 'nodemailer';

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



export const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    try {
        // Setup transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,   // your Gmail address
                pass: process.env.MAIL_PASS    // your Gmail app password (not account password)
            }
        });

        // Setup mail options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL, // where you want to receive messages
            subject: "New Contact Form Submission",
            html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
        };

        // Send mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to send email",
            message: error.message
        });
    }
};
