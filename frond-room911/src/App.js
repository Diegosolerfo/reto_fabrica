import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import UsersPage from "./pages/UsersPage";
import UserFormPage from "./pages/UserFormPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentFormPage from "./pages/DepartmentFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
        path="/dashboard/*"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UserFormPage />} />
      <Route path="/users/edit/:id" element={<UserFormPage />} />

      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/departments/new" element={<DepartmentFormPage />} />
      <Route path="/departments/edit/:id" element={<DepartmentFormPage />} />

      <Route path="/departments" element={<DepartmentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;