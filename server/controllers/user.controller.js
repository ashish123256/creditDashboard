import User from '../models/User.model.js';
import Credit from '../models/Credit.model.js';

// Admin only
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Admin only
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Admin only
export const getUserActivity = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const [user, credit, savedContent] = await Promise.all([
      User.findById(userId).select('-password'),
      Credit.findOne({ user: userId }),
      SavedContent.find({ user: userId }).countDocuments(),
    ]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user,
      creditBalance: credit?.balance || 0,
      savedContentCount: savedContent,
      lastLogin: user.lastLogin,
      profileCompleted: user.profileCompleted,
    });
  } catch (error) {
    next(error);
  }
};

// Admin only
export const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: 'User role updated',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};