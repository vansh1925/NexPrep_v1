import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './context/userContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import CreateSession from './pages/CreateSession';
import PracticeResources from './pages/PracticeResources';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
}

const AppContent = () => {
  const { user, loading: userLoading } = useUser();

  console.log('AppContent rendering:', { user, userLoading });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/session/:sessionId" element={<SessionDetail />} />
        <Route path="/practice" element={<PracticeResources />} />
        <Route path="profile" element={<div>Profile Page (Coming Soon)</div>} />
      </Routes>
    </div>
  );
};

export default App;
