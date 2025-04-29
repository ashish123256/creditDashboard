import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReportedContent, toggleContentStatus } from '../../../../server/controllers/feed.controller';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';

const ReportedContent = () => {
  const { token } = useAuth();
  const [reportedItems, setReportedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchReportedContent = async () => {
      try {
        const content = await getReportedContent(token);
        setReportedItems(content);
      } catch (error) {
        setToast({ type: 'error', message: 'Failed to load reported content' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportedContent();
  }, [token]);

  const handleToggleStatus = async (itemId, currentStatus) => {
    try {
      await toggleContentStatus(itemId, !currentStatus, token);
      setReportedItems(reportedItems.map(item => 
        item._id === itemId ? { ...item, isActive: !currentStatus } : item
      ));
      setToast({ type: 'success', message: 'Content status updated' });
    } catch (error) {
      setToast({ type: 'error', message: error.message });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading reported content...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Reported Content</h1>

      {reportedItems.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No reported content</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportedItems.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {item.content}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.source} • {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.reportedBy.length} reports
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button
                      size="sm"
                      onClick={() => handleToggleStatus(item._id, item.isActive)}
                    >
                      {item.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ReportedContent;