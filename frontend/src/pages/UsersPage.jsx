import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
        // Redirect to login if unauthorized
        if (err.message === 'Unauthorized' || err.message === 'Token is not valid') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [navigate]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Joined: {new Date(user.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
