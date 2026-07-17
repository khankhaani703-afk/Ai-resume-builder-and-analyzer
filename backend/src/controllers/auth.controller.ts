import { Response } from 'express';
import { AuthRequest, generateToken } from '../middleware/auth';
import User, { IUser } from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    });
    return;
  }

  // Create new user
  const user = new User({
    email,
    password,
    firstName,
    lastName
  });

  await user.save();
  const token = generateToken(user._id.toString());

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(400).json({
      success: false,
      message: 'Invalid email or password'
    });
    return;
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    res.status(400).json({
      success: false,
      message: 'Invalid email or password'
    });
    return;
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
});
