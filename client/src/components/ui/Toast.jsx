import { useEffect } from 'react';


const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const icon =
    type === 'success' ? "text-green-400" : "text-red-400";
     

  return (
    <div className={`fixed bottom-4 right-4 rounded-md p-4 ${bgColor} shadow-lg z-50`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className={`rounded-md inline-flex ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'success' ? 'focus:ring-green-500' : 'focus:ring-red-500'
            }`}
          >
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;