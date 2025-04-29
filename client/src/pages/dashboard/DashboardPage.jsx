import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCredits } from '../../context/CreditContext';
import CreditBalance from '../../components/credits/CreditBalance';
import SavedContent from '../../components/feed/SavedContent';

import Button from '../../components/ui/Button';
import Toast from '../../components/ui/Toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const { credits, claimDailyCredits, claimProfileCredits } = useCredits();
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

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.username}!</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleDailyClaim} disabled={!credits?.canClaimDaily}>
                Claim Daily Credits
              </Button>
              {user?.profileCompleted && (
                <Button onClick={handleProfileClaim} disabled={credits?.hasProfileBonus}>
                  Claim Profile Bonus
                </Button>
              )}
            </div>
          </div>

          
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CreditBalance />
          <SavedContent />
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

export default DashboardPage;