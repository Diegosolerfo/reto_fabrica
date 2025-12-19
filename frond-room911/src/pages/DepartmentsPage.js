import { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentsApi";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS_PER_PAGE = 10; // 👈 cambia aquí la cantidad

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [page, setPage] = useState(0);
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

  // 🔹 paginación frontend
  const totalPages = Math.ceil(departments.length / DEPARTMENTS_PER_PAGE);
  const start = page * DEPARTMENTS_PER_PAGE;
  const end = start + DEPARTMENTS_PER_PAGE;
  const departmentsPage = departments.slice(start, end);

  return (
    <>
      <h2>Departamentos</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/departments/new")}>
          Nuevo Departamento
        </button>
      </div>
      <table className="table table-striped table-hover">
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
              <td>{d.name}</td>
              <td>{d.description}</td>
              
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/departments/edit/${d.idDepartment}`)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 PAGINADOR */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">

          <li className={`page-item ${page === 0 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${i === page && "active"}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages - 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </li>

        </ul>
      </nav>
    </>
  );
}

export default DepartmentsPage;
