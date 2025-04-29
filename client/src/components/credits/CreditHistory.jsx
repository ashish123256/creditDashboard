import { useCredits } from '../../context/CreditContext';

const CreditHistory = () => {
  const { credits } = useCredits();

  const getTransactionColor = (type) => {
    switch (type) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'profile':
        return 'bg-purple-100 text-purple-800';
      case 'interaction':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Credit History</h2>
      {credits?.transactions?.length > 0 ? (
        <div className="space-y-3">
          {credits.transactions
            .slice()
            .reverse()
            .map((transaction, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm px-2 py-1 rounded-full ${getTransactionColor(transaction.type)}`}>
                    {transaction.type}
                  </span>
                  <span className="ml-2 font-medium">
                    +{transaction.amount}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No transactions yet</p>
      )}
    </div>
  );
};

export default CreditHistory;