import { useState } from "react";
import { login } from "../services/authService";
import Swal from "sweetalert2";

function Login() {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  const result = await login(identificationNumber, password);

  if (!result.success) {
    Swal.fire("Error", result.message, "error");
    return;
  }

  if (result.role === "ADMIN") {
  localStorage.setItem("admin", JSON.stringify({
    identificationNumber: result.identificationNumber,
    role: result.role
  }));
  Swal.fire("Bienvenido Admin", result.message, "success")
    .then(() => {
      window.location.href = "/dashboard";
    });
}
else {
    Swal.fire("Ingreso correcto", result.message, "success");
  }

} catch (error) {
  Swal.fire("Error", "Error datos incorrectos", "error");
}

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Identificación</label>
          <input
            type="number"
            className="form-control"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
