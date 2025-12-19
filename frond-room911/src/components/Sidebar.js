import { Link } from "react-router-dom";

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
          <Link to="/dashboard/access" style={linkStyle}>Access</Link>
        </li>
        <li>
          <Link to="/dashboard/users" style={linkStyle}>Users</Link>
        </li>
        <li>
          <Link to="/dashboard/departments" style={linkStyle}>Departments</Link>
        </li>
        <li>
          <Link to="http://localhost:3000/" style={linkStyle}>Cerrar Sesión</Link>
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
