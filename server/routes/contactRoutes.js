import express from 'express';
import { createContactRequest, getAllContacts, deleteContact } from '../controllers/contactController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/contacts        — public: submit contact form
router.post('/', createContactRequest);

// GET  /api/contacts        — admin only: list all submissions
router.get('/', protect, getAllContacts);

// DELETE /api/contacts/:id  — admin only: remove a submission
router.delete('/:id', protect, deleteContact);

export default router;
