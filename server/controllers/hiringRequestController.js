import HiringRequest from '../models/HiringRequest.js';
import mongoose from 'mongoose';

// @desc    Submit a new hiring request
// @route   POST /api/hiring-requests
// @access  Public
export const createHiringRequest = async (req, res) => {
  try {
    const {
      fullName,
      company,
      email,
      phone,
      country,
      techNeeded,
      hiringModel,
      projectDuration,
      projectRequirements,
      agreedToPrivacy
    } = req.body;

    // Simple validation check
    if (!fullName || !company || !email || !phone || !country || !hiringModel || !projectDuration || !projectRequirements) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields.'
      });
    }

    if (!agreedToPrivacy) {
      return res.status(400).json({
        status: 'error',
        message: 'You must agree to the privacy policy.'
      });
    }

    // Check database connection state
    const isDbConnected = mongoose.connection.readyState === 1;

    let savedRequest = null;
    let message = 'Hiring request processed successfully.';

    if (isDbConnected) {
      savedRequest = await HiringRequest.create({
        fullName,
        company,
        email,
        phone,
        country,
        techNeeded,
        hiringModel,
        projectDuration,
        projectRequirements,
        agreedToPrivacy
      });
      console.log(`Hiring request saved to MongoDB: ID ${savedRequest._id}`);
    } else {
      console.warn('MongoDB is not connected. Simulating database write for debugging / development:');
      console.log({
        fullName,
        company,
        email,
        phone,
        country,
        techNeeded,
        hiringModel,
        projectDuration,
        projectRequirements,
        agreedToPrivacy,
        simulatedAt: new Date()
      });
      message = 'Hiring request received successfully (development simulation mode).';
    }

    return res.status(201).json({
      status: 'success',
      message,
      data: savedRequest || {
        fullName,
        company,
        email,
        phone,
        country,
        techNeeded,
        hiringModel,
        projectDuration,
        projectRequirements
      }
    });

  } catch (error) {
    console.error('Error in createHiringRequest:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'An error occurred while processing your request.'
    });
  }
};
