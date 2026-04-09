import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../services/api";

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">{data.welcome}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Upcoming Events">
          {data.upcomingEvents.map((e) => <p key={e._id}>{e.title}</p>)}
        </Card>
        <Card title="Your Tasks">
          {data.tasks.map((t) => <p key={t._id}>{t.title}</p>)}
        </Card>
        <Card title="Placements">
          {data.placements.map((p) => <p key={p._id}>{p.company} - {p.title}</p>)}
        </Card>
      </div>
      <Card title="AI Productivity Suggestions">
        {data.aiSuggestions.map((s, idx) => <p key={idx}>- {s}</p>)}
      </Card>
    </div>
  );
};

export default DashboardPage;
