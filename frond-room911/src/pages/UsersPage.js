import { useEffect, useState, useMemo } from "react";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../api/departmentsApi";
import api from "../api/axiosConfig";
import Swal from "sweetalert2";

const USERS_PER_PAGE = 12;

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterAllow, setFilterAllow] = useState("");

  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const response = await getUsers(); 
      setUsers(response.data); 
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res);
    } catch (error) {
      console.error("Error cargando departamentos", error);
    }
  }

  useEffect(() => {
    loadUsers();
    loadDepartments();
  }, []);

  const departmentMap = useMemo(() => {
    const map = {};
    departments.forEach(d => {
      map[d.idDepartment] = d.name;
    });
    return map;
  }, [departments]);

  const filteredUsers = users.filter(u => {
    const matchId = u.identificationNumber.toString().includes(filterId);
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchName = fullName.includes(filterName.toLowerCase());
    const matchDept = filterDept === "" || u.idDepartment.toString() === filterDept;
    const matchAllow = filterAllow === "" || u.allow.toString() === filterAllow;

    return matchId && matchName && matchDept && matchAllow;
  });

  const handleCsvUpload = async () => {
  if (!selectedFile) {
    alert("Selecciona un archivo primero");
    return;
  }
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    await api.post("/users/import/csv", formData); 
    
    alert("CSV subido correctamente");
    loadUsers();
  } catch (error) {
    const message = error.response?.data?.message || (typeof error.response?.data === "string" ? error.response?.data : "Error al subir el CSV");
    Swal.fire("Error", message, "error");
    console.error("Error al subir el CSV:", error);
  }
};
  const handleDownloadPdf = async (id) => {
    try {
      const response = await api.get(`/access/pdf/${id}`, { responseType: 'blob' });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      Swal.fire("Error", "No se pudo generar el PDF.", "error");
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const start = page * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const usersPage = filteredUsers.slice(start, end);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Usuarios</h2>
        <div className="mb-3 d-flex gap-2" style={{ marginLeft: '10px' }}>
<button className="btn btn-primary" style={{ float: 'right', marginBottom: '20px' }} onClick={() => navigate("/dashboard/users/new")}>
Registrar usuario
</button>
</div>
<div style={{ float: 'right', marginBottom: '20px' }}>
<input style={{ marginRight: '10px' }} type="file" accept=".csv" onChange={(e) => setSelectedFile(e.target.files[0])} />
<button className="btn btn-success" onClick={handleCsvUpload}>Subir CSV</button>
</div>
      </div>
      <div className="card p-3 mb-3 shadow-sm bg-light">
        <div className="row g-2">
          <div className="col-md-3">
            <label>Filtrar por Cédula:</label>
            <input 
              type="text" className="form-control" placeholder="Filtrar por Cédula..." 
              value={filterId} onChange={(e) => { setFilterId(e.target.value); setPage(0); }} 
            />
          </div>
          <div className="col-md-3">
            <label>Filtrar por Nombre:</label>
            <input 
              type="text" className="form-control" placeholder="Filtrar por Nombre..." 
              value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(0); }} 
            />
          </div>
          <div className="col-md-3">
            <label>Filtrar por Departamento:</label>
            <select className="form-select" value={filterDept} onChange={(e) => { setFilterDept(e.target.value); setPage(0); }}>
              <option value="">Todos los Departamentos</option>
              {departments.map(d => (
                <option key={d.idDepartment} value={d.idDepartment}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label>Filtrar por Permisos:</label>
            <select className="form-select" value={filterAllow} onChange={(e) => { setFilterAllow(e.target.value); setPage(0); }}>
              <option value="">Todos los Permisos</option>
              <option value="true">Permitido</option>
              <option value="false">Bloqueado</option>
            </select>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Permiso</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersPage.map(u => (
            <tr key={u.identificationNumber}>
              <td>{u.identificationNumber}</td>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.usertype}</td>
              <td>
                <span className={`badge ${u.allow ? "bg-success" : "bg-danger"}`}>
                  {u.allow ? "Permitido" : "Bloqueado"}
                </span>
              </td>
              <td>{departmentMap[u.idDepartment] || "Sin departamento"}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/dashboard/users/edit/${u.identificationNumber}`)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDownloadPdf(u.identificationNumber)}>PDF</button>
              </td>
            </tr>
          ))}
          {usersPage.length === 0 && <tr><td colSpan="6" className="text-center">No se encontraron usuarios</td></tr>}
        </tbody>
      </table>

      <nav className="d-flex justify-content-center mt-3">
        <ul className="pagination shadow-sm">
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(i)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Siguiente</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UsersPage;