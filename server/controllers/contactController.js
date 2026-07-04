import ContactRequest from '../models/ContactRequest.js';
import mongoose from 'mongoose';

// @desc    Submit a new contact request
// @route   POST /api/contacts
// @access  Public
export const createContactRequest = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      country,
      serviceRequired,
      projectBudget,
      projectTimeline,
      message,
      attachment
    } = req.body;

    // Simple validation check
    if (!fullName || !email || !phone || !country || !serviceRequired || !projectBudget || !projectTimeline || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields.'
      });
    }

    // Check database connection state
    const isDbConnected = mongoose.connection.readyState === 1;

    let savedRequest = null;
    let responseMessage = 'Your message has been processed successfully.';

    if (isDbConnected) {
      savedRequest = await ContactRequest.create({
        fullName,
        companyName,
        email,
        phone,
        country,
        serviceRequired,
        projectBudget,
        projectTimeline,
        message,
        attachment
      });
      console.log(`Contact request saved to MongoDB: ID ${savedRequest._id}`);
    } else {
      console.warn('MongoDB is not connected. Simulating database write for contact request:');
      console.log({
        fullName,
        companyName,
        email,
        phone,
        country,
        serviceRequired,
        projectBudget,
        projectTimeline,
        message,
        attachment: attachment ? { fileName: attachment.fileName, fileSize: attachment.fileSize, fileType: attachment.fileType } : null,
        simulatedAt: new Date()
      });
      responseMessage = 'Contact request received successfully (development simulation mode).';
    }

    return res.status(201).json({
      status: 'success',
      message: responseMessage,
      data: savedRequest || {
        fullName,
        companyName,
        email,
        phone,
        country,
        serviceRequired,
        projectBudget,
        projectTimeline,
        message,
        attachment
      }
    });

  } catch (error) {
    console.error('Error in createContactRequest:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'An error occurred while processing your message.'
    });
  }
};
