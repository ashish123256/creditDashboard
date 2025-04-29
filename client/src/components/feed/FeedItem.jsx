import { FaBookmark, FaShare, FaFlag, FaTwitter, FaReddit, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';
import Button from '../ui/Button';

const FeedItem = ({ item, onSave, onReport, compact = false }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const getSourceIcon = () => {
    switch (item.source) {
      case 'twitter':
        return <FaTwitter className="text-blue-400" />;
      case 'reddit':
        return <FaReddit className="text-orange-500" />;
      case 'linkedin':
        return <FaLinkedin className="text-blue-600" />;
      default:
        return null;
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    onSave(item._id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(item.url);
    alert('Link copied to clipboard!');
  };

  const handleReport = () => {
    setIsReporting(true);
  };

  const submitReport = () => {
    onReport(item._id, reportReason);
    setIsReporting(false);
    setReportReason('');
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${compact ? '' : 'hover:shadow-lg transition-shadow'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getSourceIcon()}
            <span className="text-sm text-gray-500">{item.author || 'Unknown'}</span>
          </div>
          <span className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className={`text-gray-800 ${compact ? 'line-clamp-2' : 'mb-4'}`}>{item.content}</p>

        {!compact && (
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className={`${isSaved ? 'text-indigo-600' : 'text-gray-500'} hover:text-indigo-600 transition-colors`}
                aria-label="Save"
                disabled={isSaved}
              >
                <FaBookmark />
              </button>
              <button
                onClick={handleShare}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="Share"
              >
                <FaShare />
              </button>
            </div>
            <button
              onClick={handleReport}
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label="Report"
            >
              <FaFlag />
            </button>
          </div>
        )}

        {isReporting && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Reason
            </label>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">Select a reason</option>
              <option value="spam">Spam or misleading</option>
              <option value="inappropriate">Inappropriate content</option>
              <option value="hate">Hate speech or symbols</option>
              <option value="harassment">Harassment or bullying</option>
            </select>
            <div className="flex justify-end space-x-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReporting(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={submitReport}
                disabled={!reportReason}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedItem;