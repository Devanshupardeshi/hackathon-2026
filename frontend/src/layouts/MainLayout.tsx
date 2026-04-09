import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavBar from '../components/TopNavBar';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 bg-surface overflow-y-auto">
        <TopNavBar />
        <div className="p-8 pt-24 space-y-12 h-screen overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
