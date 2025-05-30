import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // To store the uploaded image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic file size validation (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Profile image size should be less than 5MB.');
        setProfileImage(null);
        setProfileImageUrl(null);
        return;
      }
      setProfileImage(file);
      setError(null);
      // Optional: Display a local preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result); // For local preview
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      setProfileImageUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      // 1. Upload image first if selected
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('image', profileImage);
        const uploadResponse = await ApiService.uploadAvatar(imageFormData);
        if (uploadResponse && uploadResponse.imageUrl) {
          imageUrl = uploadResponse.imageUrl;
        } else {
          throw new Error('Image upload failed.'); // Handle upload failure
        }
      }

      // 2. Prepare registration data with image URL
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profileImageUrl: imageUrl, // Include the uploaded image URL
      };

      // 3. Call signup API with registration data (as JSON)
      const signupResponse = await ApiService.signup(registrationData);

      if (signupResponse && signupResponse.token) {
        localStorage.setItem('token', signupResponse.token);
        // Assuming signup also returns user data or fetch profile after signup
        // await fetchUserProfile(); // If UserContext has a fetchProfile function
        navigate('/dashboard'); // Navigate on successful signup
      } else {
        throw new Error('Signup failed. Invalid response from server.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="text-gray-500" size={60} />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
            >
              {passwordShown ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={confirmPasswordShown ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
            >
              {confirmPasswordShown ? 'Hide' : 'Show'}
            </button>
          </div>

          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image (Optional)</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {/* Optional: Add an image preview here */}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-green-600 hover:text-green-500">Log In</Link></p>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup; 