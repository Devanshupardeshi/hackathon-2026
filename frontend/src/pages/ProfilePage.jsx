import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <Card title="My Profile">
      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Role:</b> {user?.role}</p>
      <p className="text-sm text-slate-600 mt-3">Profile editing can be extended in Phase 2.</p>
    </Card>
  );
};

export default ProfilePage;
