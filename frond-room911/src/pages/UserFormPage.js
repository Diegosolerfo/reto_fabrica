import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { getDepartments } from "../api/departmentsApi";
import Swal from "sweetalert2";

function UserFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEdit = Boolean(id);

  const adminData = JSON.parse(localStorage.getItem("admin"));
  const isEditingSelf = isEdit && adminData && String(adminData.identificationNumber) === String(id);

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    identificationNumber: "",
    usertype: "empleado",
    firstName: "",
    lastName: "",
    password: "",
    idDepartment: "",
    allow: false,
  });

  useEffect(() => {
    getDepartments()
      .then(data => setDepartments(data))
      .catch(err => console.error("Error cargando departamentos", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      getUserById(id)
        .then(user => {
          setForm({
            identificationNumber: user.identificationNumber || "",
            usertype: user.usertype || "empleado",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            password: user.password || "", 
            idDepartment: user.idDepartment || "",
            allow: user.allow || false,
          });
        })
        .catch(err => {
          console.error("Error cargando usuario", err);
          Swal.fire("Error", "No se pudo cargar la información del usuario", "error");
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!/^\d+$/.test(form.identificationNumber)) return "El documento debe ser numérico";
    if (form.firstName.trim().length < 2) return "El nombre es demasiado corto";
    if (form.lastName.trim().length < 2) return "El apellido es demasiado corto";
    if (!isEdit && (form.password.length < 6)) return "La contraseña debe tener al menos 6 caracteres";
    if (!form.idDepartment) return "Debe seleccionar un departamento";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (isEdit) {
        await updateUser(id, form);
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
      } else {
        await createUser(form);
        Swal.fire("Creado", "Usuario registrado correctamente", "success");
      }
      navigate("/dashboard/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Error al procesar la solicitud";
      Swal.fire("Error", msg, "error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2>{isEdit ? "Editar usuario" : "Registrar usuario"}</h2>
        <hr />

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-2">
            <label className="form-label">Documento</label>
            <input name="identificationNumber" className="form-control" disabled={isEdit} value={form.identificationNumber} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Nombre</label>
            <input name="firstName" className="form-control" value={form.firstName} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Apellido</label>
            <input name="lastName" className="form-control" value={form.lastName} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Departamento</label>
            <select name="idDepartment" className="form-control" value={form.idDepartment} onChange={handleChange} required>
              <option value="">Seleccione departamento</option>
              {departments.map((d) => (
                <option key={d.idDepartment} value={d.idDepartment}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">
              {isEdit ? "Nueva Contraseña (dejar igual para no cambiar)" : "Contraseña"}
            </label>
            <input type="text" name="password" className="form-control" value={form.password} onChange={handleChange} />
          </div>

          {!isEditingSelf ? (
            <div className="form-check mb-3 mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="allowCheck"
                name="allow"
                checked={form.allow}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="allowCheck">
                Permitir acceso al sistema
              </label>
            </div>
          ) : (
            <div className="alert alert-info mt-3 py-2" style={{ fontSize: '0.9rem' }}>
              Estás editando tu propio perfil. El permiso de acceso no puede ser modificado.
            </div>
          )}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Actualizar" : "Registrar"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard/users")}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormPage;