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

    if (!fullName || !email || !phone || !country || !serviceRequired || !projectBudget || !projectTimeline || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields.'
      });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    let savedRequest = null;
    let responseMessage = 'Your message has been received. We will get back to you within 24 hours.';

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
      console.warn('MongoDB not connected. Logging contact request:');
      console.log({ fullName, companyName, email, phone, country, serviceRequired, projectBudget, projectTimeline, message });
      responseMessage = 'Contact request received (offline mode).';
    }

    return res.status(201).json({
      status: 'success',
      message: responseMessage,
      data: savedRequest || { fullName, companyName, email, phone, country, serviceRequired, projectBudget, projectTimeline, message }
    });
  } catch (error) {
    console.error('Error in createContactRequest:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'An error occurred while processing your message.'
    });
  }
};

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contacts
// @access  Private (Admin)
export const getAllContacts = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(503).json({ status: 'error', message: 'Database not connected.' });
    }

    const page     = parseInt(req.query.page)  || 1;
    const limit    = parseInt(req.query.limit) || 20;
    const skip     = (page - 1) * limit;
    const search   = req.query.search || '';
    const service  = req.query.service || '';

    const filter = {};
    if (search) {
      filter.$or = [
        { fullName:    { $regex: search, $options: 'i' } },
        { email:       { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
      ];
    }
    if (service) filter.serviceRequired = service;

    const [contacts, total] = await Promise.all([
      ContactRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-attachment.fileData'), // strip heavy base64 from list view
      ContactRequest.countDocuments(filter)
    ]);

    return res.status(200).json({
      status: 'success',
      data: contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    return res.status(500).json({ status: 'error', message: error.message || 'Server error.' });
  }
};

// @desc    Delete a contact submission (admin only)
// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await ContactRequest.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ status: 'error', message: 'Contact not found.' });
    }
    return res.status(200).json({ status: 'success', message: 'Contact deleted.' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
