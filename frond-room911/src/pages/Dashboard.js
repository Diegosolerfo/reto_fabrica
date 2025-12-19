import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AccessPage from "./AccessPage";
import UsersPage from "./UsersPage";
import UserFormPage from "./UserFormPage"; // Importa tus formularios
import DepartmentsPage from "./DepartmentsPage";
import DepartmentFormPage from "./DepartmentFormPage";
import DashboardHome from "./DashboardHome";

function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
        <Routes>
          {/* Al ser el index, carga en /dashboard */}
          <Route index element={<DashboardHome />} />
          
          {/* Rutas de Usuarios (Cargarán en /dashboard/users...) */}
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<UserFormPage />} />
          <Route path="users/edit/:id" element={<UserFormPage />} />

          {/* Rutas de Departamentos (Cargarán en /dashboard/departments...) */}
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="departments/new" element={<DepartmentFormPage />} />
          <Route path="departments/edit/:id" element={<DepartmentFormPage />} />

          {/* Ruta de Acceso (Cargará en /dashboard/access) */}
          <Route path="access" element={<AccessPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;