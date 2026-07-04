import mongoose from 'mongoose';

const ContactRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  serviceRequired: {
    type: String,
    required: [true, 'Service required is required'],
    enum: ['Custom Software', 'Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI & Machine Learning', 'Enterprise Software', 'IT Consulting', 'Digital Transformation', 'Internships/Careers', 'Business Partnerships']
  },
  projectBudget: {
    type: String,
    required: [true, 'Project budget is required']
  },
  projectTimeline: {
    type: String,
    required: [true, 'Project timeline is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  attachment: {
    fileName: String,
    fileSize: Number,
    fileType: String,
    fileData: String // base64 payload if sent
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ContactRequest', ContactRequestSchema);
