import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/api';
import { useUser } from '../context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPushOutline, IoPushSharp, IoChevronDown, IoChevronUp } from 'react-icons/io5';

const SessionDetail = () => {
  const { sessionId } = useParams(); // Get the session ID from the URL
  const { user, loading: userLoading, error: userError } = useUser();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setError('No session ID provided.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await ApiService.getOneSession(sessionId);
        setSession(data);
      } catch (err) {
        console.error('Error fetching session details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user) { // Fetch details only if user is loaded and logged in
        fetchSessionDetails();
    } else if (!userLoading && !user) {
        // Optional: Redirect to login if user is not authenticated
        // navigate('/login');
        setError('User not authenticated.'); // Or handle as a protected route
        setLoading(false);
    }

  }, [sessionId, user, userLoading]); // Re-run effect if sessionId, user, or userLoading changes

  // Toggle answer visibility
  const toggleAnswer = (questionId) => {
    setOpenQuestionId(openQuestionId === questionId ? null : questionId);
  };

  // Handle pinning/unpinning a question
  const handlePinToggle = async (questionId) => {
    try {
      // Call the API to toggle pin status
      const updatedQuestion = await ApiService.pinQuestion(questionId);
      
      // Update the sessions state locally to reflect the change
      setSession(prevSession => {
        if (!prevSession) return null;
        const updatedQuestions = prevSession.questions.map(q =>
          q._id === updatedQuestion._id ? updatedQuestion : q
        );
        // Optional: Sort questions to bring pinned ones to the top
        updatedQuestions.sort((a, b) => (b.isPinned - a.isPinned));
        return { ...prevSession, questions: updatedQuestions };
      });
    } catch (err) {
      console.error('Error toggling pin:', err);
      alert('Failed to update pin status: ' + err.message); // Provide user feedback
    }
  };

  if (loading || userLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading session details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  if (!session) {
      return <div className="flex justify-center items-center min-h-screen text-gray-600">Session not found or could not be loaded.</div>;
  }

  // Render session details here
  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-100 min-h-screen rounded-lg shadow-lg">
      <motion.h1
        className="text-5xl font-extrabold text-gray-800 mb-10 pb-3 border-b-4 border-green-600 inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Session Details: <span className="text-green-700">{session.role}</span>
      </motion.h1>

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 mb-10 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-xl text-gray-700 mb-4"><strong>Experience:</strong> <span className="font-semibold text-purple-700">{session.experience} years</span></p>
        <p className="text-xl text-gray-700 mb-4"><strong>Topics:</strong> <span className="font-semibold text-teal-600">{session.topicsToFocus}</span></p>
        <p className="text-xl text-gray-700"><strong>Description:</strong> <span className="text-gray-800">{session.description}</span></p>
        {/* You can add more details here as needed */}
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">Questions ({session.questions.length})</h2>
      {
        session.questions && session.questions.length > 0 ? (
          <div className="space-y-8">
            {session.questions.map((question, index) => (
              <motion.div
                key={question._id}
                className="bg-white p-7 rounded-xl shadow-lg border border-gray-200 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:border-green-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Question and buttons */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAnswer(question._id)}
                >
                  <p className="font-semibold text-xl text-gray-900 pr-6 flex-grow">Q{index + 1}: {question.question}</p>
                  <div className="flex items-center space-x-4 flex-shrink-0">
                    {/* Pin Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinToggle(question._id);
                      }}
                      className="p-2.5 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200 shadow-md"
                      title={question.isPinned ? 'Unpin Question' : 'Pin Question'}
                    >
                      {question.isPinned ? <IoPushSharp className="text-blue-700" size={24} /> : <IoPushOutline className="text-gray-600" size={24} />}
                    </button>
                    {/* Learn More Button (Placeholder) */}
                    <button
                      onClick={(e) => e.stopPropagation()} // Prevent toggling answer
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors duration-200 shadow-md"
                      title="Learn More"
                    >
                      Learn More
                    </button>
                    {/* Dropdown Arrow */}
                    {openQuestionId === question._id ? <IoChevronUp size={24} className="text-gray-700"/> : <IoChevronDown size={24} className="text-gray-700"/>}
                  </div>
                </div>

                {/* Answer Dropdown */}
                <AnimatePresence>
                  {openQuestionId === question._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="mt-8 text-gray-800 border-t border-gray-300 pt-8 leading-relaxed"
                    >
                      <p><strong>Answer:</strong> {question.answer}</p>
                      {/* You can add notes section here later */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-gray-700 text-center py-12 text-lg">No questions in this session yet. Time to add some!</div>
        )
      }

      {/* You can add more sections */}
    </div>
  );
};

export default SessionDetail; 