import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { App_features } from "../../utils/data";

// Lucide Icons
import { ArrowRight, ChevronRight, Code, Brain, CheckCircle, Sparkles, Bookmark, Layers, PenTool, LayoutGrid, Trash2, UserCircle, Lock, Star, Zap, Terminal, Cpu, Lightbulb, Rocket, BookOpen, Shield, Award } from 'lucide-react'

const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map feature IDs to appropriate icons with more variety
  const getIconForFeature = (id) => {
    const iconMap = {
      'auth': <Shield className="w-7 h-7" />,
      'create-session': <Layers className="w-7 h-7" />,
      'ai-qa': <Brain className="w-7 h-7" />,
      'concept-explain': <BookOpen className="w-7 h-7" />,
      'accordion-ui': <LayoutGrid className="w-7 h-7" />,
      'pin-questions': <Bookmark className="w-7 h-7" />,
      'sessions-storage': <Cpu className="w-7 h-7" />,
      'notes': <PenTool className="w-7 h-7" />,
      'responsive-ui': <Zap className="w-7 h-7" />,
      'dashboard-summary': <Terminal className="w-7 h-7" />,
      'delete-session': <Trash2 className="w-7 h-7" />
    }
    return iconMap[id] || <Award className="w-7 h-7" />
  }

  // Alternate card styles based on index for more visual interest
  const isEven = index % 2 === 0;
  const isThird = index % 3 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden group ${isEven ? 'rounded-2xl' : 'rounded-xl'} ${isThird ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/95' : 'bg-slate-800/80'} backdrop-blur-md p-6 shadow-md border ${isEven ? 'border-blue-500/10' : 'border-sky-500/10'} hover:border-blue-500/30 transition-all duration-500 hover:shadow-lg`}
    >
      {/* Decorative elements - more subtle */}
      <div className={`absolute ${isEven ? '-right-8 -top-8' : '-left-8 -bottom-8'} w-24 h-24 bg-gradient-to-r ${isEven ? 'from-blue-600/10 to-blue-400/5' : 'from-sky-600/10 to-sky-400/5'} rounded-full blur-xl transition-all duration-500 group-hover:scale-150`}></div>
      
      <div className="relative z-10">
        <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start gap-5`}>
          <div className={`p-4 ${isEven ? 'bg-blue-500/10' : 'bg-sky-500/10'} ${isEven ? 'rounded-xl' : 'rounded-full'} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
            <div className={`text-${isEven ? 'blue' : 'sky'}-400 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
              {getIconForFeature(feature.id)}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {feature.name}
            </h3>
            <p className="text-slate-300 text-sm transition-all duration-300 group-hover:text-slate-200">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Subtle animated accent line */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '30%' }}
        transition={{ duration: 0.5 }}
        className={`h-[2px] mt-4 ${isEven ? 'bg-blue-500/30' : 'bg-sky-500/30'} rounded-full`}
      />
    </motion.div>
  )
}

function LandingPage() {
  // State for animated elements
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-rotate featured items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
  
  const floatingVariants = {
    initial: { y: 0 },
    float: { 
      y: [0, -10, 0], 
      transition: { 
        repeat: Infinity, 
        duration: 3, 
        ease: "easeInOut" 
      }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-urbanist overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10"></div>
        <div style={{ transform: `translateY(${scrollY * 0.1}px)` }} className="absolute top-20 right-[20%] w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px]"></div>
        <div style={{ transform: `translateY(${scrollY * -0.05}px)` }} className="absolute bottom-20 left-[10%] w-96 h-96 bg-sky-500/5 rounded-full filter blur-[100px]"></div>
      </div>

      {/* Navbar - Asymmetrical with animated elements */}
      <header className="relative z-50">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 px-4 md:px-8 py-4"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo area with decorative elements */}
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-50 blur-sm group-hover:opacity-70 transition duration-200"></div>
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative bg-slate-900 rounded-full p-2"
                >
                  <Brain className="h-8 w-8 text-blue-500" />
                </motion.div>
              </div>
              
              <div className="ml-3">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">NexPrep</span>
                  <span className="text-xs text-slate-400 -mt-1">AI Interview Coach</span>
                </motion.div>
              </div>
            </div>
            
            {/* Navigation Links - Hidden on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">About</a>
            </motion.div>
            
            {/* Login button with professional style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/login" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg opacity-40 blur-sm group-hover:opacity-60 transition duration-200"></div>
                <div className="relative px-5 py-2 bg-slate-900 rounded-lg flex items-center space-x-2 group-hover:bg-slate-800 transition duration-200">
                  <UserCircle className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  <span className="text-white font-medium">Login / Sign Up</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.nav>
      </header>

      {/* Hero Section - Asymmetrical and unique layout */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Decorative code snippet in background */}
          <div className="absolute -right-20 top-1/4 opacity-10 hidden lg:block">
            <pre className="text-xs text-indigo-300 rotate-6">
              <code>
{`function prepareForInterview() {
  const nexprep = new AI({
    mode: 'interview_coach',
    expertise: 'tech_interviews'
  });
  
  const questions = await nexprep.generateQuestions({
    role: 'frontend_developer',
    experience: 'mid_level',
    focus: 'react_ecosystem'
  });
  
  return questions.map(q => ({
    ...q,
    explanation: nexprep.explain(q.concept),
    examples: nexprep.provideExamples(q.topic)
  }));
}`}
              </code>
            </pre>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content - Takes 7/12 columns on large screens */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col"
            >
              {/* Animated badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex mb-6 self-start"
              >
                <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full px-4 py-1 text-sm flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>AI-Powered Interview Preparation</span>
                </span>
              </motion.div>
              
              {/* Main heading with gradient and animated typing effect */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="block">Master Tech Interviews</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400">with NexPrep AI</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-slate-300 text-lg mb-8 max-w-2xl"
              >
                Level up your interviews with AI — smarter prep, faster progress. Get personalized questions, expert explanations, and organized preparation all in one place.
              </motion.p>
              
              {/* CTA buttons with professional styling */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link to="/dashboard" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg opacity-50 blur-sm group-hover:opacity-70 transition duration-300"></div>
                  <div className="relative px-8 py-3 bg-slate-900 rounded-lg flex items-center justify-center space-x-2 group-hover:bg-slate-800/90 transition duration-300">
                    <span className="text-white font-medium">Get Started</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
                
                <a href="#features" className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg opacity-0 blur-sm group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative px-8 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg flex items-center justify-center space-x-2 group-hover:bg-slate-700/50 transition duration-300">
                    <span className="text-white font-medium">Explore Features</span>
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </a>
              </motion.div>
              
              {/* Stats/social proof section */}
              <motion.div 
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-4 max-w-lg"
              >
                <div className="text-center p-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-xs text-slate-400">Questions</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-slate-400">AI Support</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-xs text-slate-400">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* App preview - Takes 5/12 columns on large screens */}
            <motion.div 
              initial="initial"
              animate="float"
              variants={floatingVariants}
              className="lg:col-span-5 flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Animated glow effect - more subtle and professional */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-sky-500/10 rounded-2xl blur-2xl opacity-60 animate-pulse"></div>
                
                {/* Main app preview */}
                <div className="relative">
                  {/* Top decorative bar */}
                  <div className="absolute top-0 inset-x-0 h-14 bg-slate-800/90 backdrop-blur-sm rounded-t-2xl border-b border-slate-700/50 flex items-center px-6 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 flex-1 h-6 bg-slate-700/50 rounded-full"></div>
                  </div>
                  
                  {/* Main content area */}
                  <div className="pt-14 bg-slate-900 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-[4/3] w-full bg-gradient-to-b from-slate-900 to-slate-800 p-6">
                      {/* App interface mockup */}
                      <div className="h-full flex flex-col">
                        {/* Animated feature showcase */}
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={activeFeatureIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col items-center justify-center text-center p-4"
                          >
                            {activeFeatureIndex === 0 && (
                              <>
                                <Brain className="w-16 h-16 text-blue-500 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Questions</h3>
                                <p className="text-sm text-slate-300">Personalized questions based on your experience level</p>
                              </>
                            )}
                            {activeFeatureIndex === 1 && (
                              <>
                                <Sparkles className="w-16 h-16 text-sky-500 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Concept Explanations</h3>
                                <p className="text-sm text-slate-300">Detailed breakdowns of complex technical topics</p>
                              </>
                            )}
                            {activeFeatureIndex === 2 && (
                              <>
                                <Bookmark className="w-16 h-16 text-blue-400 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Save & Organize</h3>
                                <p className="text-sm text-slate-300">Pin important questions for later review</p>
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center space-x-2 mt-4">
                          {[0, 1, 2].map(idx => (
                            <button 
                              key={idx}
                              onClick={() => setActiveFeatureIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeFeatureIndex === idx ? 'bg-blue-500 w-6' : 'bg-slate-600'}`}
                              aria-label={`View feature ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Asymmetrical layout with staggered grid */}
      <section id="features" className="py-24 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute left-0 right-0 h-1/2 top-0 bg-gradient-to-b from-indigo-900/10 to-transparent"></div>
        <div className="absolute -left-20 top-1/3 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -right-20 bottom-1/3 w-40 h-40 bg-teal-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <div className="inline-flex mb-4">
                <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full px-3 py-1 text-xs">
                  FEATURE-RICH PLATFORM
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Everything you need to <span className="text-blue-400">ace</span> your next interview
              </h2>
              <p className="text-slate-300 max-w-lg">Our AI-powered platform provides all the tools you need to prepare effectively and confidently for technical interviews.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 flex items-center gap-3 text-sm text-slate-300"
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>Continuously updated with latest interview trends</span>
            </motion.div>
          </div>
          
          {/* Hexagonal grid layout for features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 relative">
            {/* Connecting lines in background */}
            <div className="absolute inset-0 hidden lg:block">
              <svg className="w-full h-full opacity-15" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,100 L500,100 L900,100 L900,400 L500,700 L100,400 Z" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M300,250 L500,400 L700,250" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M300,550 L500,400 L700,550" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="5 5" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Feature cards with staggered layout */}
            {App_features.map((feature, index) => {
              // Create a staggered layout effect
              const isSpecialPosition = index === 1 || index === 4 || index === 7 || index === 10;
              const specialClass = isSpecialPosition ? 'lg:mt-16' : '';
              
              return (
                <div key={feature.id} className={`${specialClass}`}>
                  <FeatureCard feature={feature} index={index} />
                </div>
              );
            })}
          </div>
          
          {/* Feature highlight section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-24 bg-gradient-to-br from-slate-800/70 via-slate-900/80 to-slate-800/70 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-slate-700/50 overflow-hidden relative"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-500/10 rounded-full filter blur-3xl"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your interview preparation?</h3>
                <p className="text-slate-300 mb-6">Join thousands of developers who are using NexPrep to prepare smarter and land their dream jobs.</p>
                <Link 
                  to="/dashboard" 
                  className="group relative inline-flex"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg opacity-50 blur-sm group-hover:opacity-70 transition duration-300"></div>
                  <div className="relative px-6 py-3 bg-slate-900 rounded-lg flex items-center justify-center space-x-2 group-hover:bg-slate-800/90 transition duration-300">
                    <span className="text-white font-medium">Start Preparing Now</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 rounded-xl blur-xl"></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4">
                      <Star className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">User Success Story</h4>
                      <p className="text-xs text-slate-400">Frontend Developer</p>
                    </div>
                  </div>
                  <blockquote className="text-slate-300 italic text-sm">
                    "NexPrep helped me prepare for my React interview at a top tech company. The AI-generated questions were spot-on and the concept explanations were incredibly helpful. I got the job!"
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with professional design */}
      <footer className="mt-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full filter blur-[100px]"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-sky-500/5 rounded-full filter blur-[100px]"></div>
        </div>
        
        {/* Newsletter section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/20 via-slate-900/50 to-slate-900/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-blue-500/10 shadow-xl overflow-hidden relative"
          >
            {/* Decorative code-like pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233b82f6' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '80px'
              }}></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">Ready to transform your interview prep?</h2>
                <p className="text-slate-300 mb-8">Join thousands of developers who are using NexPrep to prepare smarter and land their dream jobs.</p>
                <Link 
                  to="/dashboard" 
                  className="group relative inline-flex"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg opacity-50 blur-sm group-hover:opacity-70 transition duration-300"></div>
                  <div className="relative px-8 py-3 bg-slate-900 rounded-lg flex items-center justify-center space-x-2 group-hover:bg-slate-800/90 transition duration-300">
                    <span className="text-white font-medium">Start Preparing Now</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
              
              <div className="relative">
                <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-blue-400 mr-2" />
                    <span>Stay updated with interview trends</span>
                  </h3>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-3 bg-slate-900/70 rounded-l-lg border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
                    />
                    <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-r-lg text-white transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">We'll send occasional tips and updates. No spam ever.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Main footer content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 lg:col-span-5">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-40 blur-sm"></div>
                  <div className="relative bg-slate-900 rounded-full p-2">
                    <Brain className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">NexPrep</span>
                  <span className="block text-xs text-slate-400">AI Interview Coach</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 max-w-md">Your AI-powered companion for mastering technical interviews. Get personalized questions, expert explanations, and organized preparation all in one place.</p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                {['twitter', 'github', 'linkedin', 'youtube'].map(platform => (
                  <a key={platform} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-500/20 transition-colors duration-300">
                    <span className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">
                      {/* Simple placeholder for social icons */}
                      <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="col-span-6 md:col-span-4 lg:col-span-2">
              <h3 className="font-semibold mb-4 text-white relative inline-block">
                <span className="relative z-10">Product</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 transform -translate-x-2 transition-all duration-300"></div>
                    <span>Features</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Pricing</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>FAQ</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-6 md:col-span-4 lg:col-span-2">
              <h3 className="font-semibold mb-4 text-white relative inline-block">
                <span className="relative z-10">Resources</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Blog</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Documentation</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Community</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-6 md:col-span-4 lg:col-span-2">
              <h3 className="font-semibold mb-4 text-white relative inline-block">
                <span className="relative z-10">Company</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Blog</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Careers</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-12 md:col-span-8 lg:col-span-3">
              <h3 className="font-semibold mb-4 text-white relative inline-block">
                <span className="relative z-10">Legal</span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Terms of Service</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"></div>
                    <span>Cookie Policy</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright with professional separator */}
          <div className="mt-16 pt-8 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} NexPrep. All rights reserved.</p>
              <div className="text-sm text-slate-500 flex items-center">
                <span>Crafted with</span>
                <span className="text-blue-500 px-1">♥</span>
                <span>by NexPrep Team</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>  
  )
}

export default LandingPage