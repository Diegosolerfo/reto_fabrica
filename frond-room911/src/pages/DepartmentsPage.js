import { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentsApi";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS_PER_PAGE = 10;

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState(""); // Estado para el filtro
  const navigate = useNavigate();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res);
    } catch (err) {
      console.error(err);
    }
  };

  // --- LÓGICA DE FILTRADO ---
  const filteredDepartments = departments.filter(d =>
    d.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // 🔹 paginación frontend sobre datos filtrados
  const totalPages = Math.ceil(filteredDepartments.length / DEPARTMENTS_PER_PAGE);
  const start = page * DEPARTMENTS_PER_PAGE;
  const end = start + DEPARTMENTS_PER_PAGE;
  const departmentsPage = filteredDepartments.slice(start, end);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Departamentos</h2>
        <button className="btn btn-primary" onClick={() => navigate("/departments/new")}>
          Nuevo Departamento
        </button>
      </div>

      {/* --- BARRA DE FILTRO POR NOMBRE --- */}
      <div className="card p-3 mb-3 shadow-sm bg-light">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar departamento por nombre..."
                value={filterName}
                onChange={(e) => {
                  setFilterName(e.target.value);
                  setPage(0); // Reset a pág 1 al filtrar
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departmentsPage.map(d => (
            <tr key={d.idDepartment}>
              <td>{d.idDepartment}</td>
              <td><strong>{d.name}</strong></td>
              <td>{d.description || <span className="text-muted italic">Sin descripción</span>}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm shadow-sm"
                  onClick={() => navigate(`/departments/edit/${d.idDepartment}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {departmentsPage.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                No se encontraron departamentos con ese nombre.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 PAGINADOR */}
      <nav className="d-flex justify-content-center mt-3">
        <ul className="pagination shadow-sm">
          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Anterior
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(i)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DepartmentsPage;