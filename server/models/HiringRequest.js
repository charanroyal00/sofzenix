import mongoose from 'mongoose';

const HiringRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
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
  techNeeded: {
    type: [String],
    default: []
  },
  hiringModel: {
    type: String,
    required: [true, 'Hiring model is required'],
    enum: ['Dedicated Developer', 'Dedicated Team', 'Project-Based Development', 'Hourly Hiring', 'Monthly Hiring', 'Intern Hiring']
  },
  projectDuration: {
    type: String,
    required: [true, 'Project duration is required']
  },
  projectRequirements: {
    type: String,
    required: [true, 'Project requirements are required'],
    trim: true
  },
  agreedToPrivacy: {
    type: Boolean,
    required: [true, 'You must agree to the privacy policy'],
    enum: [true]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('HiringRequest', HiringRequestSchema);
