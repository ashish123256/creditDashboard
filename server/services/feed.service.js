import FeedItem from '../models/FeedItem.model.js';
import SavedContent from '../models/SavedContent.model.js';

export const saveContentForUser = async (userId, feedItemId) => {
  const savedContent = new SavedContent({
    user: userId,
    feedItem: feedItemId,
  });
  await savedContent.save();
  return savedContent;
};

export const getSavedContentForUser = async (userId) => {
  return await SavedContent.find({ user: userId })
    .populate('feedItem')
    .sort({ createdAt: -1 });
};

export const reportContentByUser = async (userId, feedItemId, reason) => {
  const feedItem = await FeedItem.findById(feedItemId);
  if (!feedItem) {
    throw new Error('Content not found');
  }

  // Check if already reported by this user
  const alreadyReported = feedItem.reportedBy.some(
    (report) => report.user.toString() === userId
  );
  if (alreadyReported) {
    throw new Error('Content already reported by this user');
  }

  // Add report
  feedItem.reportedBy.push({
    user: userId,
    reason,
  });

  // Mark as inactive if reports exceed threshold
  if (feedItem.reportedBy.length >= 5) {
    feedItem.isActive = false;
  }

  await feedItem.save();
  return feedItem;
};