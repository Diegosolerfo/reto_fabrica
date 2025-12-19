import api from "./axiosConfig";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

export const getDepartmentById = async (id) => {
  const res = await api.get(`/departments/${id}`);
  return res.data;
};

export const createDepartment = async (data) => {
  const res = await api.post("/departments", data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  const res = await api.put(`/departments/${id}`, data);
  return res.data;
};