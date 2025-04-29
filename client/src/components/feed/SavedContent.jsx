import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSavedContent } from '../../services/feed.service';
import FeedItem from './FeedItem';

const SavedContent = () => {
  const { token } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedContent = async () => {
      try {
        const content = await getSavedContent(token);
        setSavedItems(content);
      } catch (error) {
        console.error('Error fetching saved content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedContent();
  }, [token]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Saved Content</h2>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : savedItems.length > 0 ? (
        <div className="space-y-4">
          {savedItems.slice(0, 3).map((item) => (
            <FeedItem key={item._id} item={item} compact />
          ))}
          {savedItems.length > 3 && (
            <button className="text-sm text-indigo-600 hover:underline">
              View all ({savedItems.length})
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No saved content yet</p>
      )}
    </div>
  );
};

export default SavedContent;