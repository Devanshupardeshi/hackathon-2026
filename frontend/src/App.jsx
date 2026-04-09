import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AIPanel from "./components/AIPanel";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import PlacementsPage from "./pages/PlacementsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";

const PrivatePage = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<PrivatePage><DashboardPage /></PrivatePage>} />
      <Route path="/feed" element={<PrivatePage><FeedPage /></PrivatePage>} />
      <Route path="/tasks" element={<PrivatePage><TasksPage /></PrivatePage>} />
      <Route path="/placements" element={<PrivatePage><PlacementsPage /></PrivatePage>} />
      <Route path="/events" element={<PrivatePage><EventsPage /></PrivatePage>} />
      <Route path="/profile" element={<PrivatePage><div className="space-y-4"><ProfilePage /><AIPanel /></div></PrivatePage>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
