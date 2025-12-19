import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment
} from "../api/departmentsApi";
import Swal from "sweetalert2";

function DepartmentFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Estado inicial coincidiendo con tu estructura de BD
  const [form, setForm] = useState({
    name: "", // Si en tu BD es name_, cámbialo aquí a name_
    description: ""
  });

  // 1. Cargar datos si es edición
  useEffect(() => {
    if (isEdit) {
      getDepartmentById(id)
        .then(data => {
          setForm({
            name: data.name || data.name_ || "", 
            description: data.description || ""
          });
        })
        .catch(err => {
          console.error("Error al cargar:", err);
          Swal.fire("Error", "No se encontró el departamento", "error");
          navigate("/dashboard/departments");
        });
    }
  }, [id, isEdit, navigate]);

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateDepartment(id, form);
        await Swal.fire("¡Actualizado!", "Departamento actualizado con éxito", "success");
      } else {
        await createDepartment(form);
        await Swal.fire("¡Registrado!", "Departamento creado con éxito", "success");
      }
      // IMPORTANTE: Ruta completa para evitar página en blanco
      navigate("/dashboard/departments");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo guardar la información", "error");
    }
  };

  // 3. Diseño del componente (Presentación)
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <div className="card-header bg-white py-3">
          <h3 className="mb-0 text-center text-primary">
            {isEdit ? "Editar Departamento" : "Nuevo Departamento"}
          </h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre del Departamento</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Ej: Recursos Humanos"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Breve descripción del área..."
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              ></textarea>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-light px-4" 
                onClick={() => navigate("/dashboard/departments")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary px-5">
                {isEdit ? "Guardar Cambios" : "Registrar Departamento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DepartmentFormPage;