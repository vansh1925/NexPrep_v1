import { API_PATHS } from '../config/apiPaths';

class ApiService {
  static async signup(formData) {
    try {
      console.log('Attempting to connect to:', API_PATHS.AUTH.SIGNUP);
      const response = await fetch(API_PATHS.AUTH.SIGNUP, {
        method: 'POST',
        body: formData, // FormData will automatically set the correct Content-Type
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.SIGNUP);
      }
      throw error;
    }
  }

  static async login(credentials) {
    try {
      console.log('Attempting to connect to:', API_PATHS.AUTH.LOGIN);
      const response = await fetch(API_PATHS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.LOGIN);
      }
      throw error;
    }
  }

  static async uploadAvatar(formData) {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.USER.UPLOAD_AVATAR);
      const response = await fetch(API_PATHS.USER.UPLOAD_AVATAR, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Image upload failed');
      }

      return data;
    } catch (error) {
      console.error('Upload avatar error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.USER.UPLOAD_AVATAR);
      }
      throw error;
    }
  }

  static async getProfile() {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.AUTH.PROFILE);
      const response = await fetch(API_PATHS.AUTH.PROFILE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.AUTH.PROFILE);
      }
      throw error;
    }
  }

  static async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      console.log('Attempting to connect to:', API_PATHS.USER.UPDATE_PROFILE);
      const response = await fetch(API_PATHS.USER.UPDATE_PROFILE, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.USER.UPDATE_PROFILE);
      }
      throw error;
    }
  }

  static async getAllSessions() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_PATHS.SESSION.GET_ALL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json(); // Get the full response object

      console.log('Response status:', response.status);
      console.log('Response data:', responseData); // Log the full response object

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch sessions');
      }

      // Check if the response data object has a 'data' property that is an array
      if (!responseData || typeof responseData !== 'object' || !Array.isArray(responseData.data)) {
        console.error('API response for sessions is not in the expected format:', responseData);
        throw new Error('Invalid data format from server: Expected an object with a data array.');
      }

      // Return the array inside the 'data' property
      return responseData.data;
    } catch (error) {
      console.error('Get all sessions error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running at ' + API_PATHS.SESSION.GET_ALL);
      }
      throw error;
    }
  }

  static async deleteSession(sessionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.SESSION.DELETE(sessionId);
      console.log('Attempting to connect to:', url);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const data = await response.json().catch(() => ({})); // Attempt to parse error body
        throw new Error(data.message || 'Failed to delete session');
      }

      return true;
    } catch (error) {
      console.error('Delete session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async getOneSession(sessionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.SESSION.GET_ONE(sessionId);
      console.log('Attempting to connect to:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json(); // Get the full response object
      console.log('Response status:', response.status);
      console.log('Response data:', responseData); // Log the full response object

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch session details');
      }

      // Check if the response data object has a 'data' property that is an object (and not an array)
      if (!responseData || typeof responseData !== 'object' || !responseData.data || typeof responseData.data !== 'object' || Array.isArray(responseData.data)) {
         console.error('API response for single session is not in the expected format:', responseData);
         throw new Error('Invalid data format from server: Expected an object with a single session object in the data property.');
      }

      // Return the single session object inside the 'data' property
      return responseData.data;
    } catch (error) {
      console.error('Get one session error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }

  static async pinQuestion(questionId) {
    try {
      const token = localStorage.getItem('token');
      const url = API_PATHS.QUESTION.PIN(questionId);
      console.log('Attempting to pin question:', url);
      const response = await fetch(url, {
        method: 'PUT', // Assuming PUT for toggling pin status
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      const responseData = await response.json();
      console.log('Pin question response status:', response.status);
      console.log('Pin question response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to pin/unpin question');
      }

      // Assuming the backend returns the updated question or a success message
      return responseData;
    } catch (error) {
      console.error('Pin question error:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the server is running.');
      }
      throw error;
    }
  }
}

export default ApiService; 