import mongoose from 'mongoose';

const savedContentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeedItem',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

savedContentSchema.index({ user: 1, feedItem: 1 }, { unique: true });

const SavedContent = mongoose.model('SavedContent', savedContentSchema);

export default SavedContent;