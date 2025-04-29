import { createContext, useContext, useState, useEffect } from 'react';
import { getCredits, addDailyCredits, addProfileCredits, addInteractionCredits } from '../services/credits.service';
import { useAuth } from './AuthContext';

const CreditContext = createContext();

export const CreditProvider = ({ children }) => {
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchCredits();
    }
  }, [token]);

  const fetchCredits = async () => {
    try {
      const creditData = await getCredits(token);
      setCredits(creditData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const claimDailyCredits = async () => {
    try {
      const updatedCredits = await addDailyCredits(token);
      setCredits(updatedCredits);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const claimProfileCredits = async () => {
    try {
      const updatedCredits = await addProfileCredits(token);
      setCredits(updatedCredits);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const addCreditsForInteraction = async () => {
    try {
      const updatedCredits = await addInteractionCredits(token);
      setCredits(updatedCredits);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <CreditContext.Provider
      value={{
        credits,
        isLoading,
        claimDailyCredits,
        claimProfileCredits,
        addCreditsForInteraction,
        refetchCredits: fetchCredits,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => useContext(CreditContext);