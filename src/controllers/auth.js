import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const errorResponse = (res, error) => {
  console.error('Error in auth controller:', error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Server error',
  });
};

export const login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);

    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    console.log('User found:', user);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found.',
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );

    res.cookie('x-auth-token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      domain: '.ve3.world',
    });

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'User logged in successfully.',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message: 'Email already in use.',
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email: email.toLowerCase(),
      // password: hashedPassword,
      password,
    });

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );

    res.cookie('x-auth-token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      domain: '.ve3.world',
    });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'User not found.',
      });
    }
    return res.status(httpStatus.OK).json({
      success: true,
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};