import express from 'express';
import { createHiringRequest } from '../controllers/hiringRequestController.js';

const router = express.Router();

// POST /api/hiring-requests
router.post('/', createHiringRequest);

export default router;
