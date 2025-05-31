import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, Target, Sparkles, Linkedin, Github } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { App_features } from '../utils/data';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6"
            >
              Master Your Interview Skills with{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                AI-Powered Practice
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-600 mb-8"
            >
              Get personalized feedback, real-time analysis, and comprehensive preparation for your next interview.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="group" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleLearnMore}>
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section (Updated to use data) */}
      <section id="features" className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore the powerful tools and capabilities NexPrep offers to elevate your interview preparation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {App_features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 text-primary-600" style={{ fontSize: '2.5rem' }}>{feature.icon || '✨'}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.name}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8"
          >
            Connect with the Developer
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8"
          >
            <a href="https://www.linkedin.com/in/vansh-puri-300377315/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-blue-600 transition-colors duration-300">
              <Linkedin size={48} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com/vansh1925" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-gray-800 transition-colors duration-300">
              <Github size={48} />
              <span className="sr-only">GitHub</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 