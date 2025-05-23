import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Camera, Loader2, Brain, Eye, EyeOff } from 'lucide-react'

function SignUp() {
  const navigate = useNavigate();
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
      // In a real app, you would handle signup logic here
    }, 1500);
  };
  
  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MzY2ZjExMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10"></div>
        <div className="absolute top-20 right-[20%] w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-teal-500/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      {/* Main content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Header with logo */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full opacity-50 blur-sm"></div>
                <div className="relative bg-slate-900 rounded-full p-2">
                  <Brain className="h-8 w-8 text-indigo-500" />
                </div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">NexPrep</span>
                <span className="block text-xs text-slate-400">AI Interview Coach</span>
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-2xl font-bold text-center text-white mb-2"
            >
              Create Your Account
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-slate-400 text-center mb-8"
            >
              Join NexPrep to start your interview preparation journey
            </motion.p>
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <motion.div 
                variants={itemVariants}
                className="mb-6 flex flex-col items-center"
              >
                <div 
                  className="relative w-24 h-24 mb-3 cursor-pointer group"
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  {/* Profile image with gradient border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image preview or placeholder */}
                  <div className="relative w-24 h-24 rounded-full bg-slate-800 border-2 border-transparent overflow-hidden flex items-center justify-center">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-slate-500" />
                    )}
                    
                    {/* Upload overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <span className="text-sm text-slate-400">Upload profile picture</span>
              </motion.div>
              
              {/* Full Name field */}
              <motion.div 
                variants={itemVariants}
                className="mb-4"
              >
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>
              
              {/* Email field */}
              <motion.div 
                variants={itemVariants}
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
                    className="block w-full pl-10 pr-3 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </motion.div>
              
              {/* Password field */}
              <motion.div 
                variants={itemVariants}
                className="mb-6"
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
                    className="block w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition duration-200"
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
              
              {/* Submit button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>
              
              {/* Login link */}
              <motion.div 
                variants={itemVariants}
                className="mt-6 text-center"
              >
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-teal-400 hover:text-teal-300 transition-colors duration-200"
                  >
                    Login
                  </Link>
                </p>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp