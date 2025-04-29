import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Register from '../../components/auth/Register';
import Toast from '../../components/ui/Toast';

const RegisterPage = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleRegister = async (userData) => {
    setIsLoading(true);
    try {
      const result = await register(userData);
      if (!result.success) {
        setToast({ type: 'error', message: result.message });
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Register onSubmit={handleRegister} isLoading={isLoading} />
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

export default RegisterPage;