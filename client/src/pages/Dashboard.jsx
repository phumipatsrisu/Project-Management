import { useEffect, useState } from "react";
import api from "../../api";

const Dashboard = () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const res = await api.get("/projects");
      console.log("projects:", res.data.projects);
      setProjectList(res.data.projects);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {projectList.map((item) => {
        return (
          <div key={item._id}>
            <ul>
              <li>Project Name: {item.projectName}</li>
              <li>description: {item.description}</li>
              <li>
                Owner: {item.owner.name} Email: {item.owner.email}
              </li>
              <li>Members: {item.members}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
