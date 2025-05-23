import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
      // In a real app, you would handle authentication here
    }, 1500);
  };
  
  // Animation variants for page elements
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.1),
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-slate-900 p-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl p-8 w-full">
          {/* Logo */}
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center mb-10 justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-50 blur-sm"></div>
              <div className="relative bg-slate-900 rounded-full p-2">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="ml-3">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">NexPrep</span>
              <span className="block text-xs text-slate-400">AI Interview Coach</span>
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-3xl font-bold mb-2 text-center text-white"
          >
            Welcome Back
          </motion.h2>
          
          <motion.p 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-slate-400 text-center mb-8"
          >
            Sign in to continue your interview preparation
          </motion.p>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mb-4"
            >
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>
            
            {/* Password field */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mb-3"
            >
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>
            
            {/* Forgot Password */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mb-6 text-right"
            >
              <a href="#" className="text-sm text-sky-500 hover:text-sky-400 transition-colors duration-200">
                Forgot your password?
              </a>
            </motion.div>
            
            {/* Submit button */}
            <motion.button
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
            
            {/* Sign up link */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={7}
              className="mt-6 text-center"
            >
              <p className="text-slate-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-sky-400 hover:text-sky-300 transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
