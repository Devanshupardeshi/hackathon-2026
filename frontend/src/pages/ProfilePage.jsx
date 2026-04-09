import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";

const roleCopy = {
  student: "Explore placements, collaborate on projects, and let AI plan your week.",
  admin: "Manage programs, placements, and campus-wide events.",
  recruiter: "Post roles and review student applications."
};

const ProfilePage = () => {
  const { user } = useAuth();
  const blurb = roleCopy[user?.role] || roleCopy.student;

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle={blurb} />
      <Card title="Account" subtitle="Signed-in identity" className="overflow-hidden bg-gradient-to-br from-white to-indigo-50/30">
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Name</dt>
            <dd className="mt-1 font-semibold text-slate-900">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-slate-800">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</dt>
            <dd className="mt-1">
              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-800">
                {user?.role}
              </span>
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate-500">Rich profiles (bio, skills, avatar) can ship in the next iteration.</p>
      </Card>
    </div>
  );
};

export default ProfilePage;
