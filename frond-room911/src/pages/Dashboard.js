import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AccessPage from "./AccessPage";
import UsersPage from "./UsersPage";
import DepartmentsPage from "./DepartmentsPage";

function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h2 className="mb-4">Dashboard</h2>
        <Routes>
          <Route path="access" element={<AccessPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
