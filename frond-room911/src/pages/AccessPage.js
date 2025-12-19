import { useEffect, useState } from "react";
import { getAccessList } from "../api/accessApi";

const ACCESSES_PER_PAGE = 15; // 👈 cambia aquí cuántos quieres ver

function AccessPage() {
  const [accesses, setAccesses] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadAccesses();
  }, []);

  const loadAccesses = async () => {
    try {
      const res = await getAccessList();
      setAccesses(res);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 paginación frontend
  const totalPages = Math.ceil(accesses.length / ACCESSES_PER_PAGE);
  const start = page * ACCESSES_PER_PAGE;
  const end = start + ACCESSES_PER_PAGE;
  const accessesPage = accesses.slice(start, end);

  return (
    <>
      <h2>Historial de Accesos</h2>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
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
              <td>{a.identification}</td>
              <td>{a.date}</td>
              <td>{a.hour}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    window.open(
                      `http://localhost:8082/api/access/pdf/${a.identification}`,
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

export default AccessPage;
