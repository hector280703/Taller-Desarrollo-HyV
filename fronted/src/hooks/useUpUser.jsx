import { useState } from 'react';
import instance from '../services/root.service';

export const useUpUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userId, userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.patch(`/users?id=${userId}`, userData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar usuario';
      setError(errorMessage);
      console.error('Error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
