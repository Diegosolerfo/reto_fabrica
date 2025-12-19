import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentForm from "../components/DepartmentForm";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment
} from "../api/departmentsApi";

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
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateDepartment(id, form);
      } else {
        await createDepartment(form);
      }

      navigate("/dashboard/departments");
    } catch (err) {
      alert("Error al guardar el departamento");
    }
  };

  return (
    <>
      <h2>{isEdit ? "Editar departamento" : "Registrar departamento"}</h2>

      <DepartmentForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </>
  );
}

export default DepartmentFormPage;
