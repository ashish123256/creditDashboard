import { useCredits } from '../../context/CreditContext';

const CreditBalance = () => {
  const { credits } = useCredits();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Credits</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-indigo-600">
            {credits?.balance || 0}
          </p>
          <p className="text-sm text-gray-500">Total credits</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CreditBalance;