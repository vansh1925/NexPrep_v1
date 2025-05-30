import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import { API_PATHS } from '../config/apiPaths';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await ApiService.getProfile();
      setUser(data);
      return data; // Return the data for use in login/signup
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setUser(null);
      localStorage.removeItem('token');
      throw err; // Propagate error for handling in login/signup
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await ApiService.login(credentials);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        // Fetch profile first, then navigate
        await fetchUserProfile();
        console.log('Attempting to navigate to /dashboard after login.');
        navigate('/dashboard');
        console.log('Navigation to /dashboard called after login.');
        return data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const signup = async (formData) => {
    try {
      setError(null);
      const data = await ApiService.signup(formData);
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        // Fetch profile first, then navigate
        await fetchUserProfile();
        console.log('Attempting to navigate to /dashboard after signup.');
        navigate('/dashboard');
        console.log('Navigation to /dashboard called after signup.');
        return data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(API_PATHS.AUTH.LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Logout failed');
        }
      }
    } catch (err) {
      console.error('Error during logout:', err);
      setError(err.message);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      console.log('Attempting to navigate to / after logout.');
      navigate('/');
      console.log('Navigation to / called after logout.');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const data = await ApiService.updateProfile(profileData);
      setUser(data);
      return data;
    } catch (err) {
      setError(err.message || 'Profile update failed');
      throw err;
    }
  };

  const uploadAvatar = async (formData) => {
    try {
      setError(null);
      const data = await ApiService.uploadAvatar(formData);
      if (data && data.imageUrl) {
        await fetchUserProfile();
        return data;
      } else {
         throw new Error('Image upload failed or returned invalid data.');
      }
    } catch (err) {
      setError(err.message || 'Image upload failed');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    uploadAvatar,
    fetchUserProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 