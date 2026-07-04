import express from 'express';
import { createContactRequest } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contacts
router.post('/', createContactRequest);

export default router;
