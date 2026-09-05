import { useEffect, useState, useMemo } from "react";
import { getAccessList } from "../api/accessApi";
import { getUsers } from "../api/userApi"; 
import Swal from "sweetalert2";
import api from "../api/axiosConfig";

const ACCESSES_PER_PAGE = 12;

function AccessPage() {
  const [accesses, setAccesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  // Estados para filtros
  const [filterId, setFilterId] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [accessRes, usersRes] = await Promise.all([
        getAccessList(),
        getUsers()
      ]);
      setAccesses(accessRes);
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Error cargando datos", err);
    }
  };

  const userMap = useMemo(() => {
    const map = {};
    users.forEach(u => {
      map[u.identificationNumber] = `${u.firstName} ${u.lastName}`;
    });
    return map;
  }, [users]);

  const filteredAccesses = accesses.filter(a => {
    const idStr = a.identification != null ? a.identification.toString() : "";
    const dateStr = a.date != null ? a.date.toString() : "";
    const matchId = idStr.includes(filterId);
    const matchDate = filterDate ? dateStr.includes(filterDate) : true;
    return matchId && matchDate;
  });

  const handleDownloadPdf = async (id) => {
    try {
      const response = await api.get(`/access/pdf/${id}`, { responseType: 'blob' });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } catch (error) {
      Swal.fire("Error", "No se pudo generar el PDF.", "error");
    }
  };

  const totalPages = Math.ceil(filteredAccesses.length / ACCESSES_PER_PAGE);
  const start = page * ACCESSES_PER_PAGE;
  const end = start + ACCESSES_PER_PAGE;
  const accessesPage = filteredAccesses.slice(start, end);

  return (
    <>
      <h2 className="mb-3">Historial de Accesos</h2>

      <div className="card p-3 mb-3 shadow-sm bg-light">
        <div className="row g-2">
          <div className="col-md-6">
            <label>Cédula:</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Filtrar por la cédula..." 
              value={filterId} 
              onChange={(e) => { setFilterId(e.target.value); setPage(0); }} 
            />
          </div>
          <div className="col-md-6">
            <label>Fecha:</label>
            <input 
              type="date" 
              className="form-control" 
              value={filterDate} 
              onChange={(e) => { setFilterDate(e.target.value); setPage(0); }} 
            />
          </div>
        </div>
      </div>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Identificación</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accessesPage.map(a => (
            <tr key={a.idAccess}>
              <td>{a.idAccess}</td>
              <td>
                <strong>{userMap[a.identification] || "Desconocido"}</strong>
              </td>
              <td>{a.identification}</td>
              <td>{a.date || "Sin fecha"}</td>
              <td>{a.hour || "Sin hora"}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger shadow-sm"
                  onClick={() => handleDownloadPdf(a.identification)}
                >
                  PDF
                </button>
              </td>
            </tr>
          ))}
          {accessesPage.length === 0 && (
            <tr><td colSpan="6" className="text-center">No se encontraron registros</td></tr>
          )}
        </tbody>
      </table>

      {/* PAGINADOR */}
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

export default AccessPage;