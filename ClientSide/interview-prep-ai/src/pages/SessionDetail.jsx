import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../services/api';
import { useUser } from '../context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPushOutline, IoPushSharp, IoChevronDown, IoChevronUp, IoSparklesOutline, IoCloseCircleOutline } from 'react-icons/io5';

const SessionDetail = () => {
  const { sessionId } = useParams(); // Get the session ID from the URL
  const { user, loading: userLoading, error: userError } = useUser();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [generatingQuestions, setGeneratingQuestions] = useState(false); // State for loading spinner

  // New state for Learn More side menu
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [explanationData, setExplanationData] = useState(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false); // Loading for explanation
  const [explanationError, setExplanationError] = useState(null); // Error for explanation

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
        // Sort questions to bring pinned ones to the top, maintaining creation order otherwise
        updatedQuestions.sort((a, b) => {
            const pinCompare = (b.isPinned || 0) - (a.isPinned || 0);
            if (pinCompare !== 0) return pinCompare;
            // Secondary sort by creation date if pin status is the same (older first)
            return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        });
        
        console.log('State after pinning/unpinning and sorting:', updatedQuestions);
        
        return { ...prevSession, questions: updatedQuestions };
      });
    } catch (err) {
      console.error('Error toggling pin:', err);
      alert('Failed to update pin status: ' + err.message); // Provide user feedback
    }
  };

  // Handle generating new questions
  const handleGenerateQuestions = async () => {
    if (!session) return;
    setGeneratingQuestions(true);
    try {
      const sessionDetails = {
        role: session.role,
        experience: session.experience,
        topicsToFocus: session.topicsToFocus,
      };
      const numberOfQuestions = 5; // You can make this dynamic later
      // 1. Generate questions using the AI
      const newQuestions = await ApiService.generateQuestions(sessionDetails, numberOfQuestions);

      if (newQuestions && newQuestions.length > 0) {
         // 2. Save the newly generated questions to the session in the backend
         // The backend will return the updated session object with the new questions including their _id
         // Ensure ApiService.addQuestionsToSession exists and handles this correctly
         const updatedSession = await ApiService.addQuestionsToSession(session._id, newQuestions);

         // 3. Update the frontend state with the updated session data
         // This ensures the newly added questions in the state have their _id and are part of the main session data
         setSession(updatedSession);

      } else {
          console.log('No new questions generated.');
      }

    } catch (err) {
      console.error('Error generating or adding questions:', err);
      alert('Failed to generate or add questions: ' + err.message); // Provide user feedback
    } finally {
      setGeneratingQuestions(false);
    }
  };

  // Handle fetching and showing concept explanation
  const handleLearnMore = async (questionText) => {
    setLoadingExplanation(true);
    setExplanationError(null);
    setExplanationData(null); // Clear previous explanation
    setIsLearnMoreOpen(true); // Open the side menu

    try {
      const data = await ApiService.generateConceptExplanation({ question: questionText });
      setExplanationData(data);
    } catch (err) {
      console.error('Error fetching explanation:', err);
      setExplanationError(err.message || 'Failed to load explanation.');
      setExplanationData(null); // Ensure data is null on error
    } finally {
      setLoadingExplanation(false);
    }
  };

  // Close the side menu
  const closeLearnMore = () => {
    setIsLearnMoreOpen(false);
    setExplanationData(null); // Clear data when closing
    setExplanationError(null); // Clear error when closing
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
    <div className="container mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-100 min-h-screen rounded-lg shadow-lg relative">
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
              <QuestionItem // Use a separate component for each question
                key={question._id}
                question={question}
                index={index}
                openQuestionId={openQuestionId}
                toggleAnswer={toggleAnswer}
                handlePinToggle={handlePinToggle}
                handleLearnMore={handleLearnMore}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-700 text-center py-12 text-lg">No questions in this session yet. Time to add some!</div>
        )
      }

      {/* Generate Questions Button */}
      <div className="mt-10 text-center">
        <motion.button
          onClick={handleGenerateQuestions}
          className={`px-8 py-4 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-lg ${generatingQuestions ? 'opacity-60 cursor-not-allowed' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={generatingQuestions}
        >
          {generatingQuestions ? (
            'Generating...'
          ) : (
            <span className="flex items-center"><IoSparklesOutline className="mr-2" size={24} /> Generate More Questions</span>
          )}
        </motion.button>
      </div>

      {/* Learn More Side Menu */}
      <AnimatePresence>
        {isLearnMoreOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-xl z-50 p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Concept Explanation</h2>
              <button onClick={closeLearnMore} className="text-gray-500 hover:text-gray-700">
                <IoCloseCircleOutline size={30} />
              </button>
            </div>

            {loadingExplanation && <div className="text-center text-gray-600">Loading explanation...</div>}
            {explanationError && <div className="text-red-500 text-center">Error: {explanationError}</div>}

            {explanationData && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{explanationData.title}</h3>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: explanationData.explanation.replace(/```javascript\n([^\n]*)\n```/g, '<pre><code class="language-javascript">$1</code></pre>').replace(/```solidity\n([^\n]*)\n```/g, '<pre><code class="language-solidity">$1</code></pre>').replace(/```([^\n]*)\n([^\n]*)\n```/g, '<pre><code class="language-$1">$2</code></pre>') }}>
                  {/* Explanation content will be rendered here */}
                   {/* Using dangerouslySetInnerHTML for now to handle potential HTML/markdown in explanation */} 
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* You can add more sections */}
    </div>
  );
};

// Extracting the question item into its own component
const QuestionItem = ({ question, index, openQuestionId, toggleAnswer, handlePinToggle, handleLearnMore }) => {
    return (
        <motion.div
            key={question._id}
            layout
            className="bg-white p-7 rounded-xl shadow-lg border border-gray-200 transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:border-green-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }} // Adjusted delay for potential performance
        >
            {/* Question and buttons */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(question._id)}
            >
                <h3 className="text-xl font-semibold text-gray-800 pr-4 flex-1">{index + 1}. {question.question}</h3>
                <div className="flex-shrink-0 flex items-center space-x-4">
                    {/* Pin Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent answer toggle
                            handlePinToggle(question._id);
                        }}
                        className={`p-2 rounded-full transition-colors duration-200 ${question.isPinned ? 'text-red-500 hover:bg-red-100' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={question.isPinned ? 'Unpin Question' : 'Pin Question'}
                    >
                        {question.isPinned ? <IoPushSharp size={20} /> : <IoPushOutline size={20} />}
                    </button>
                    {/* Learn More Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent answer toggle
                            handleLearnMore(question.question);
                        }}
                        className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
                        title="Learn More"
                    >
                        Learn More
                    </button>
                    {/* Toggle Answer Button */}
                    <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200">
                        {openQuestionId === question._id ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                    </button>
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
    );
};

export default SessionDetail; 