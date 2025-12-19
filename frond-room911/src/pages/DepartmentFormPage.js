import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentForm from "../components/DepartmentForm";
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

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (isEdit) {
      getDepartmentById(id).then(data => {
        setForm({
          name: data.name,
          description: data.description
        });
      }).catch(err => {
        console.error("Error al cargar departamento", err);
        Swal.fire("Error", "No se pudo cargar la información del departamento", "error");
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateDepartment(id, form);
        Swal.fire("Actualizado", "Departamento actualizado con éxito", "success");
      } else {
        await createDepartment(form);
        Swal.fire("Creado", "Departamento registrado con éxito", "success");
      }
      navigate("/dashboard/departments");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Hubo un problema al procesar la solicitud", "error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center">{isEdit ? "Editar departamento" : "Registrar departamento"}</h2>
        <hr />

        <DepartmentForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isEdit={isEdit}
          navigate={navigate} // Pasamos navigate para el botón cancelar
        />
      </div>
    </div>
  );
}

export default DepartmentFormPage;