import { useState, useEffect } from 'react';
import instance from '../services/root.service';

export const useGetUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get('/users');
      setUsers(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener usuarios');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};
