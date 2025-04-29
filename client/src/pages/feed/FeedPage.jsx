import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFeed, saveContent, reportContent } from '../../services/feed.service';
import FeedItem from '../../components/feed/FeedItem';
import ReportModal from '../../components/feed/ReportModel';
import Toast from '../../components/ui/Toast';

const FeedPage = () => {
  const { token } = useAuth();
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feedData = await getFeed(token);
        setFeed(feedData);
      } catch (error) {
        setToast({ type: 'error', message: 'Failed to load feed' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, [token]);

  const handleSave = async (itemId) => {
    try {
      await saveContent(itemId, token);
      setToast({ type: 'success', message: 'Content saved successfully' });
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  const handleReport = (item) => {
    setSelectedItem(item);
    setShowReportModal(true);
  };

  const handleSubmitReport = async (reason) => {
    try {
      await reportContent(selectedItem._id, reason, token);
      setToast({ type: 'success', message: 'Content reported successfully' });
      setShowReportModal(false);
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading feed...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Content Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((item) => (
          <FeedItem
            key={item._id}
            item={item}
            onSave={() => handleSave(item._id)}
            onReport={() => handleReport(item)}
          />
        ))}
      </div>

      {showReportModal && (
        <ReportModal
          item={selectedItem}
          onSubmit={handleSubmitReport}
          onClose={() => setShowReportModal(false)}
        />
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

export default FeedPage;