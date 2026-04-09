import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EventsClubs from './pages/EventsClubs';

import Dashboard from './pages/Dashboard';

import Feed from './pages/Feed';

import PlacementHub from './pages/PlacementHub';

import AIAssistant from './pages/AIAssistant';

import Settings from './pages/Settings';

// Placeholders for other routes
const Profile = () => <Settings />;
import Login from './pages/Login';

const Register = () => <Login />; // Reusing Login screen for layout

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main Application Routes inside shared Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/events" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feed" element={<Feed />} />
          <Route path="tasks" element={<AIAssistant />} />
          <Route path="placements" element={<PlacementHub />} />
          <Route path="events" element={<EventsClubs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
