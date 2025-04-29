import Credit from '../models/Credit.model.js';
import User from '../models/User.model.js';

export const getCredits = async (req, res, next) => {
  try {
    const credit = await Credit.findOne({ user: req.user.id });
    if (!credit) {
      return res.status(404).json({ message: 'Credit account not found' });
    }

    res.json({
      balance: credit.balance,
      lastDailyCredit: credit.lastDailyCredit,
      transactions: credit.transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const addDailyCredits = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const credit = await Credit.findOne({ user: req.user.id });
    if (!credit) {
      return res.status(404).json({ message: 'Credit account not found' });
    }

    // Check if already claimed today
    if (
      credit.lastDailyCredit &&
      new Date(credit.lastDailyCredit) >= today
    ) {
      return res.json({
        message: 'Daily credits already claimed today',
        balance: credit.balance,
      });
    }

    // Add daily credits
    const dailyAmount = 10;
    credit.balance += dailyAmount;
    credit.lastDailyCredit = new Date();
    credit.transactions.push({
      amount: dailyAmount,
      type: 'daily',
      description: 'Daily login bonus',
    });

    await credit.save();

    res.json({
      message: 'Daily credits added',
      balance: credit.balance,
    });
  } catch (error) {
    next(error);
  }
};

export const addProfileCompletionCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.profileCompleted) {
      return res.json({
        message: 'Profile not completed',
      });
    }

    const credit = await Credit.findOne({ user: req.user.id });
    if (!credit) {
      return res.status(404).json({ message: 'Credit account not found' });
    }

    // Check if already awarded
    const hasProfileCredit = credit.transactions.some(
      (t) => t.type === 'profile'
    );
    if (hasProfileCredit) {
      return res.json({
        message: 'Profile completion credits already awarded',
        balance: credit.balance,
      });
    }

    // Add profile completion credits
    const profileAmount = 50;
    credit.balance += profileAmount;
    credit.transactions.push({
      amount: profileAmount,
      type: 'profile',
      description: 'Profile completion bonus',
    });

    await credit.save();

    res.json({
      message: 'Profile completion credits added',
      balance: credit.balance,
    });
  } catch (error) {
    next(error);
  }
};

export const addInteractionCredits = async (req, res, next) => {
  try {
    const { amount = 5 } = req.body;

    const credit = await Credit.findOne({ user: req.user.id });
    if (!credit) {
      return res.status(404).json({ message: 'Credit account not found' });
    }

    // Add interaction credits
    credit.balance += amount;
    credit.transactions.push({
      amount,
      type: 'interaction',
      description: 'Content interaction bonus',
    });

    await credit.save();

    res.json({
      message: 'Interaction credits added',
      balance: credit.balance,
    });
  } catch (error) {
    next(error);
  }
};

// Admin only
export const updateUserCredits = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount, description } = req.body;

    const credit = await Credit.findOne({ user: userId });
    if (!credit) {
      return res.status(404).json({ message: 'Credit account not found' });
    }

    credit.balance += amount;
    credit.transactions.push({
      amount,
      type: 'admin',
      description: description || 'Admin adjustment',
    });

    await credit.save();

    res.json({
      message: 'User credits updated',
      balance: credit.balance,
    });
  } catch (error) {
    next(error);
  }
};

// Admin only
export const getAllCredits = async (req, res, next) => {
  try {
    const credits = await Credit.find().populate('user', 'username email');
    res.json(credits);
  } catch (error) {
    next(error);
  }
};