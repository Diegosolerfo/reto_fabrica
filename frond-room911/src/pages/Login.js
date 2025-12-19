import { useState, useEffect } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";

function Login() {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(identificationNumber, password);
      if (!result.success) {
        Swal.fire("Error", result.message, "error");
        return;
      }
      localStorage.setItem("token", result.token);
      if (result.role === "ADMIN") {
        localStorage.setItem("admin", JSON.stringify({
          identificationNumber: result.identificationNumber,
          role: result.role
        }));
        Swal.fire("Bienvenido Admin", result.message, "success")
          .then(() => {
            window.location.href = "/dashboard";
          });
      } else {
        Swal.fire("Ingreso correcto", result.message, "success");
      }
    } catch (error) {

      Swal.fire("Error", "Error datos incorrectos", "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">ROOM 911</h2>
        <p className="text-center text-muted">Inicia sesión para continuar</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Identificación</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa tu número"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100 mt-3" style={{ height: "45px" }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;