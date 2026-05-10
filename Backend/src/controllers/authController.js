const db = require('../db');
const bcrypt = require('bcrypt');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, first_name, last_name, phone, city, country, additional_info, photo } = validatedData;

    // Check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${first_name} ${last_name}`;
    
    const result = await db.query(
      'INSERT INTO users (email, password_hash, name, first_name, last_name, phone, city, country, additional_info, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, email, name, first_name, last_name, is_admin',
      [email, hashedPassword, fullName, first_name, last_name, phone, city, country, additional_info, photo]
    );

    const user = result.rows[0];
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(201).json({
      success: true,
      data: { user, accessToken, refreshToken },
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // ✅ Fixed: user.password_hash instead of user.password
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // ✅ Fixed: password_hash instead of password
    const { password_hash: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: { user: userWithoutPassword, accessToken, refreshToken },
      message: 'Login successful',
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  // In a real production app, you might want to blacklist the refresh token in Redis
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

const forgotPassword = async (req, res) => {
  // Mock forgot password
  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent.',
  });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
};
