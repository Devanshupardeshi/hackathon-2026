import { Navigate, Route, Routes } from "react-router-dom";
import AIPanel from "./components/AIPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import PlacementsPage from "./pages/PlacementsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";

const PrivateLayout = ({ children }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/dashboard"
      element={
        <PrivateLayout>
          <DashboardPage />
        </PrivateLayout>
      }
    />
    <Route
      path="/feed"
      element={
        <PrivateLayout>
          <FeedPage />
        </PrivateLayout>
      }
    />
    <Route
      path="/tasks"
      element={
        <PrivateLayout>
          <TasksPage />
        </PrivateLayout>
      }
    />
    <Route
      path="/placements"
      element={
        <PrivateLayout>
          <PlacementsPage />
        </PrivateLayout>
      }
    />
    <Route
      path="/events"
      element={
        <PrivateLayout>
          <EventsPage />
        </PrivateLayout>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateLayout>
          <div className="space-y-6">
            <ProfilePage />
            <AIPanel />
          </div>
        </PrivateLayout>
      }
    />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
