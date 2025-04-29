import { useState } from 'react';
import Button from '../ui/Button';

const ReportModal = ({ item, onSubmit, onClose }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Report Content</h3>
        <p className="mb-4">Why are you reporting this content?</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam or misleading</option>
            <option value="inappropriate">Inappropriate content</option>
            <option value="hate">Hate speech or symbols</option>
            <option value="harassment">Harassment or bullying</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!reason}>
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;