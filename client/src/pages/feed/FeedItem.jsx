import { FaBookmark, FaShare, FaFlag, FaTwitter, FaReddit, FaLinkedin } from 'react-icons/fa';

const FeedItem = ({ item, onSave, onReport }) => {
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

  const handleShare = () => {
    navigator.clipboard.writeText(item.url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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

        <p className="text-gray-800 mb-4">{item.content}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              className="text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="Save"
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
            onClick={onReport}
            className="text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Report"
          >
            <FaFlag />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;