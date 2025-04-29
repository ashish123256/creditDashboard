import Credit from '../models/Credit.model.js';

export const initializeCreditsForUser = async (userId) => {
  const credit = new Credit({ user: userId });
  await credit.save();
  return credit;
};

export const getUserCredits = async (userId) => {
  return await Credit.findOne({ user: userId });
};

export const addCredits = async (userId, amount, type, description) => {
  const credit = await Credit.findOne({ user: userId });
  if (!credit) {
    throw new Error('Credit account not found');
  }

  credit.balance += amount;
  credit.transactions.push({
    amount,
    type,
    description,
  });

  if (type === 'daily') {
    credit.lastDailyCredit = new Date();
  }

  await credit.save();
  return credit;
};