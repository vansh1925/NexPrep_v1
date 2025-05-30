import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApiService from '../services/api';

const CreateSession = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create initial session with empty questions array
      const sessionData = {
        ...formData,
        questions: [], // Start with empty questions array
      };

      const response = await ApiService.createSession(sessionData);
      
      if (response && response._id) {
        // Navigate to the session detail page
        navigate(`/session/${response._id}`);
      } else {
        throw new Error('Failed to create session');
      }
    } catch (err) {
      console.error('Error creating session:', err);
      setError(err.message || 'An unexpected error occurred while creating the session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 max-w-2xl"
    >
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Interview Session</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role/Position
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer, Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="text"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g., 2-3 years"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="topicsToFocus" className="block text-sm font-medium text-gray-700 mb-1">
              Topics to Focus On
            </label>
            <input
              type="text"
              id="topicsToFocus"
              value={formData.topicsToFocus}
              onChange={handleChange}
              placeholder="e.g., React, JavaScript, System Design"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any specific details about your interview preparation..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateSession; 