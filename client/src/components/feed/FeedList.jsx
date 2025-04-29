import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFeed, saveContent, reportContent } from '../../services/feed.service';
import FeedItem from './FeedItem';
import Loader from '../ui/Loader';
import Button from '../ui/Button';
import Toast from '../ui/Toast';

const FeedList = ({ showFilters = true, limit = null, compact = false }) => {
  const { token } = useAuth();
  const [feed, setFeed] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feedData = await getFeed(token);
        setFeed(feedData);
        setFilteredFeed(feedData);
      } catch (error) {
        setToast({ type: 'error', message: 'Failed to load feed' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [token]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredFeed(feed);
    } else {
      setFilteredFeed(feed.filter(item => item.source === activeFilter));
    }
  }, [activeFilter, feed]);

  const handleSave = async (itemId) => {
    try {
      await saveContent(itemId, token);
      setToast({ type: 'success', message: 'Content saved successfully' });
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const handleReport = async (itemId, reason) => {
    try {
      await reportContent(itemId, reason, token);
      setToast({ type: 'success', message: 'Content reported successfully' });
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const displayedFeed = limit ? filteredFeed.slice(0, limit) : filteredFeed;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          <Button
            variant={activeFilter === 'twitter' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('twitter')}
          >
            Twitter
          </Button>
          <Button
            variant={activeFilter === 'reddit' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('reddit')}
          >
            Reddit
          </Button>
          <Button
            variant={activeFilter === 'linkedin' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('linkedin')}
          >
            LinkedIn
          </Button>
        </div>
      )}

      {displayedFeed.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No content found{activeFilter !== 'all' ? ` from ${activeFilter}` : ''}
        </div>
      ) : (
        <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {displayedFeed.map((item) => (
            <FeedItem
              key={item._id}
              item={item}
              onSave={handleSave}
              onReport={handleReport}
              compact={compact}
            />
          ))}
        </div>
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FeedList;