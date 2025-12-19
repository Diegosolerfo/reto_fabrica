import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que ingresar de nuevo",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear(); 
        window.location.href = "/"; 
      }
    });
  };
function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#111",
      color: "#fff",
      padding: "20px"
    }}>
      <h3>ROOM 911</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/dashboard/access" style={linkStyle}>Accesos</Link>
        </li>
        <li>
          <Link to="/dashboard/users" style={linkStyle}>Usuarios</Link>
        </li>
        <li>
          <Link to="/dashboard/departments" style={linkStyle}>Departamentos</Link>
        </li>
        <li>
          <Link to="/dashboard" style={linkStyle}>Resumen</Link>
        </li>

        <li>
          <Link to="#" onClick={handleLogout} style={linkStyle}>Cerrar Sesión</Link>
        </li>
      </ul>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  margin: "10px 0"
};

export default Sidebar;
