import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userContext';
import SessionCard from '../components/SessionCard';
import ApiService from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: userLoading, error: userError } = useUser();
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState(null);
  const navigate = useNavigate();

  console.log('Dashboard component rendered.', { user, userLoading, userError, sessions, loadingSessions, sessionsError });

  useEffect(() => {
    console.log('Dashboard useEffect running.', { user, userLoading });
    // Redirect to login if user is not loading and not authenticated
    if (!userLoading && !user) {
      console.log('User not loading and not authenticated, redirecting to login.');
      navigate('/login');
    } else if (user) {
      // If we have a user, fetch sessions
      console.log('User is logged in, attempting to fetch sessions.');
      fetchSessions();
    }
  }, [user, userLoading, navigate]); // Simplified dependencies

  const fetchSessions = async () => {
    console.log('fetchSessions function called.');
    try {
      setLoadingSessions(true);
      setSessionsError(null);
      const data = await ApiService.getAllSessions();
      console.log('Sessions fetched successfully:', data);
      // Sort sessions by creation date in descending order (most recent first)
      const sortedSessions = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSessions(sortedSessions);
    } catch (err) {
      console.error('Error in fetchSessions:', err);
      setSessionsError(err.message);
    } finally {
      setLoadingSessions(false);
      console.log('fetchSessions finished.');
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      // Optional: Add a confirmation dialog here
      if (window.confirm('Are you sure you want to delete this session?')) {
        await ApiService.deleteSession(sessionId);
        // Remove the deleted session from the state
        setSessions(sessions.filter(session => session._id !== sessionId));
        console.log(`Session ${sessionId} deleted successfully.`);
      }
    } catch (err) {
      console.error('Error deleting session:', err);
      // Handle the error, maybe show a message to the user
      alert('Failed to delete session: ' + err.message);
    }
  };

  // Show loading state only when user is loading or sessions are loading
  if (userLoading || loadingSessions) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {userError}</div>;
  }

  if (sessionsError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error fetching sessions: {sessionsError}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* User Info Section */}
      {user && (
        <div className="bg-white rounded-xl shadow p-6 mb-8 flex items-center gap-6">
          <img
            src={user.profileImageUrl || 'default-avatar.png'} // Use default avatar if none exists
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-green-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
            {/* You can add more user info here if needed */}
          </div>
        </div>
      )}

      {/* Sessions Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Sessions</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sessions.length > 0 ? (
          sessions.map(session => (
            <SessionCard
              key={session._id}
              sessionId={session._id}
              sessionTitle={session.role}
              skills={session.topicsToFocus || 'N/A'}
              experience={session.experience || 'N/A'}
              qnaCount={session.questions ? session.questions.length : 0}
              lastUpdated={new Date(session.updatedAt).toLocaleDateString() || 'N/A'}
              description={session.description || 'No description provided'}
              profileImageUrl={user.profileImageUrl || 'default-avatar.png'}
              username={user.name}
              onDelete={() => handleDeleteSession(session._id)}
            />
          ))
        ) : (
          <div className="text-gray-600">No sessions found. Create your first session!</div>
        )}
      </div>

      {/* Create New Session Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/create-session')} // Assuming a route for creating sessions
          className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition shadow-lg"
        >
          Create New Session
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 