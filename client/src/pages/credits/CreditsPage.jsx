import { useCredits } from '../../context/CreditContext';
import CreditBalance from '../../components/credits/CreditBalance';
import CreditHistory from '../../components/credits/CreditHistory';
import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';
import { useState } from 'react';

const CreditsPage = () => {
  const {
    credits,
    claimDailyCredits,
    claimProfileCredits,
    addCreditsForInteraction,
  } = useCredits();
  const [toast, setToast] = useState(null);

  const handleDailyClaim = async () => {
    const result = await claimDailyCredits();
    if (result.success) {
      setToast({ type: 'success', message: 'Daily credits claimed!' });
    } else {
      setToast({ type: 'error', message: result.message });
    }
  };

  const handleProfileClaim = async () => {
    const result = await claimProfileCredits();
    if (result.success) {
      setToast({ type: 'success', message: 'Profile credits claimed!' });
    } else {
      setToast({ type: 'error', message: result.message });
    }
  };

  const handleInteraction = async () => {
    const result = await addCreditsForInteraction();
    if (result.success) {
      setToast({ type: 'success', message: 'Interaction credits added!' });
    } else {
      setToast({ type: 'error', message: result.message });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Credits</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CreditBalance />
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Earn Credits</h2>
            <div className="space-y-3">
              <Button
                onClick={handleDailyClaim}
                disabled={!credits?.canClaimDaily}
                className="w-full"
              >
                Claim Daily Credits (10)
              </Button>
              <Button
                onClick={handleProfileClaim}
                disabled={!credits?.canClaimProfile}
                className="w-full"
              >
                Claim Profile Bonus (50)
              </Button>
              <Button
                onClick={handleInteraction}
                className="w-full"
              >
                Simulate Interaction (5)
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <CreditHistory />
        </div>
      </div>

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

export default CreditsPage;