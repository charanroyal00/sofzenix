import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc    Admin login — validates credentials from .env and returns a JWT
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
    }

    const adminEmail    = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ status: 'error', message: 'Admin credentials not configured on server.' });
    }

    // Case-insensitive email comparison
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    // Support both plain-text and bcrypt-hashed passwords stored in .env
    let passwordMatch = false;
    if (adminPassword.startsWith('$2')) {
      passwordMatch = await bcrypt.compare(password, adminPassword);
    } else {
      passwordMatch = password === adminPassword;
    }

    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      token,
      admin: { email: adminEmail, role: 'admin' }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ status: 'error', message: 'An error occurred during login.' });
  }
};
