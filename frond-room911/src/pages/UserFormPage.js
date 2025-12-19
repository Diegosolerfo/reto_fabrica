import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../api/userApi";
import { getDepartments } from "../api/departmentsApi";

function UserFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 si existe → editar
  const isEdit = Boolean(id);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(data => setDepartments(data));
  }, []);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    identificationNumber: "",
    usertype: "",
    firstName: "",
    lastName: "",
    password: "",
    idDepartment: "",
    allow: false,
  });

  // 🔹 Cargar usuario si es edición
  useEffect(() => {
    if (isEdit) {
      getUserById(id).then(user => {
        setForm({
          identificationNumber: user.identificationNumber,
          usertype: user.usertype,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          idDepartment: user.idDepartment,
          allow: user.allow,
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Validaciones
  const validate = () => {
    if (!/^\d+$/.test(form.identificationNumber)) {
      return "El documento debe ser numérico";
    }

    if (form.firstName.length < 2 || form.firstName.length > 30) {
      return "Nombre inválido (2–30 caracteres)";
    }

    if (form.lastName.length < 2 || form.lastName.length > 30) {
      return "Apellido inválido (2–30 caracteres)";
    }

    if (!isEdit && (form.password.length < 6 || form.password.length > 15)) {
      return "Contraseña inválida (6–15 caracteres)";
    }

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
      console.log(form);
      const payload = {
        identificationNumber: Number(form.identificationNumber),
        usertype: form.usertype === "admin_room_911" ? "admin_room_911" : "empleado",
        firstName: form.firstName,
        lastName: form.lastName,
        idDepartment: Number(form.idDepartment),
        password: form.password,
        allow: form.allow,
        };

        if (isEdit) {
        await updateUser(id, payload);
        } else {
        await createUser(payload);
        }
        navigate("/dashboard/users");
    } catch (err) {
        setError("Ocurrio un error al intentar hacer la acción");
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Editar usuario" : "Registrar usuario"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          name="identificationNumber"
          className="form-control mb-2"
          placeholder="Documento"
          disabled={isEdit}
          value={form.identificationNumber}
          onChange={handleChange}
        />

        <input
          name="firstName"
          className="form-control mb-2"
          placeholder="Nombre"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          className="form-control mb-2"
          placeholder="Apellido"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          name="usertype" type="hidden"
          value={form.usertype}
          onChange={handleChange}
        />

        <select
        name="idDepartment"
        className="form-control mb-2"
        value={form.idDepartment}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione departamento</option>
        {departments.map(d => (
          <option key={d.idDepartment} value={d.idDepartment}>
            {d.name}
          </option>
        ))}
      </select>

        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder={isEdit ? "Contraseña actual" : "Contraseña"}
          value={form.password}
          onChange={handleChange}
        />

        <label className="form-check mb-3">
          <input
            type="checkbox"
            name="allow"
            checked={form.allow}
            onChange={handleChange}
          />
          Permitir acceso
        </label>

        <button className="btn btn-primary">
          {isEdit ? "Actualizar" : "Registrar"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/dashboard/users")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default UserFormPage;
