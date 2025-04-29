import mongoose from 'mongoose';

const feedItemSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ['twitter', 'reddit'],
      required: true,
    },
    sourceId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
    },
    reportedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        reason: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FeedItem = mongoose.model('FeedItem', feedItemSchema);

export default FeedItem;