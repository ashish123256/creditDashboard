import FeedItem from '../models/FeedItem.model.js';
import SavedContent from '../models/SavedContent.model.js';
import { addInteractionCredits } from './credit.controller.js';

// You can populate this from your own DB content
export const getFeed = async (req, res, next) => {
  try {
    const feedItems = await FeedItem.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(feedItems);
  } catch (error) {
    next(error);
  }
};

export const saveContent = async (req, res, next) => {
  try {
    const { feedItemId } = req.params;

    const existingSave = await SavedContent.findOne({
      user: req.user.id,
      feedItem: feedItemId,
    });
    if (existingSave) {
      return res.status(400).json({ message: 'Content already saved' });
    }

    const savedContent = new SavedContent({
      user: req.user.id,
      feedItem: feedItemId,
    });
    await savedContent.save();

    await addInteractionCredits(req, res, next);

    res.json({ message: 'Content saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const getSavedContent = async (req, res, next) => {
  try {
    const savedContent = await SavedContent.find({ user: req.user.id })
      .populate('feedItem')
      .sort({ createdAt: -1 });

    res.json(savedContent.map(sc => sc.feedItem));
  } catch (error) {
    next(error);
  }
};

export const reportContent = async (req, res, next) => {
  try {
    const { feedItemId } = req.params;
    const { reason } = req.body;

    const feedItem = await FeedItem.findById(feedItemId);
    if (!feedItem) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const alreadyReported = feedItem.reportedBy.some(
      report => report.user.toString() === req.user.id
    );
    if (alreadyReported) {
      return res.status(400).json({ message: 'You have already reported this content' });
    }

    feedItem.reportedBy.push({ user: req.user.id, reason });

    if (feedItem.reportedBy.length >= 5) {
      feedItem.isActive = false;
    }

    await feedItem.save();

    res.json({ message: 'Content reported successfully' });
  } catch (error) {
    next(error);
  }
};

// Admin only
export const getReportedContent = async (req, res, next) => {
  try {
    const reportedContent = await FeedItem.find({
      'reportedBy.0': { $exists: true },
    }).populate('reportedBy.user', 'username email');

    res.json(reportedContent);
  } catch (error) {
    next(error);
  }
};

// Admin only
export const toggleContentStatus = async (req, res, next) => {
  try {
    const { feedItemId } = req.params;
    const { isActive } = req.body;

    const feedItem = await FeedItem.findById(feedItemId);
    if (!feedItem) {
      return res.status(404).json({ message: 'Content not found' });
    }

    feedItem.isActive = isActive;
    await feedItem.save();

    res.json({
      message: `Content ${isActive ? 'activated' : 'deactivated'}`,
      feedItem,
    });
  } catch (error) {
    next(error);
  }
};
