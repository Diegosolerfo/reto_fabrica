import { useEffect, useState, useRef, useMemo } from "react";
import { getUsers, importUsersCSV } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../api/departmentsApi";
import axios from "axios";

const USERS_PER_PAGE = 12;

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
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
  const handleCsvUpload = async () => {
  if (!selectedFile) {
    alert("Selecciona un archivo CSV");
    return;
  }

  const formData = new FormData();

  formData.append("file", selectedFile);

  try {
    await axios.post(
      "http://localhost:8082/api/users/import/csv",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("CSV subido correctamente");
  } catch (error) {
    console.error("Error al subir el CSV:", error);
  }
};


  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const start = page * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const usersPage = users.slice(start, end);

  return (
    <>
      <h2 className="mb-3" style={{ float: 'left' }}>Usuarios</h2>

      {/* CSV */}
      <div className="mb-3 d-flex gap-2" style={{ float: 'right', marginLeft: '10px' }}>
  <button
    className="btn btn-primary"
    onClick={() => navigate("/users/new")}
  >
    Registrar usuario
  </button>
</div>
<div style={{ float: 'right', marginBottom: '20px' }}>
    <input style={{ display: 'inline-block', marginRight: '10px' }}
      type="file"
      accept=".csv"
      onChange={(e) => setSelectedFile(e.target.files[0])}
    />
<button className="btn btn-success" onClick={handleCsvUpload}>
  Subir CSV
</button>
</div>

      <table className="table table-striped table-hover">
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
              <td>{u.allow ? "Permitido" : "Bloqueado"}</td>
              <td>{departmentMap[u.idDepartment] || "Sin departamento"}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() =>
                    navigate(`/users/edit/${u.identificationNumber}`)
                  }
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    window.open(
                      `http://localhost:8082/api/access/pdf/${u.identificationNumber}`,
                      "_blank"
                    )
                  }
                >
                  PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINADOR */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">

          <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
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
              className={`page-item ${i === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
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

export default UsersPage;
