import api from "./axiosConfig";

export const getUsers = () => {
  return api.get("/users");
};
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const importUsersCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/users/import/csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const importUsersExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/users/import/excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const getUsersPage = (page = 0, size = 10) => {
  return api.get(`/users/page?page=${page}&size=${size}`);
};
