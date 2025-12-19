import api from "../api/axiosConfig";

export const login = async (identificationNumber, password) => {
  const response = await api.post("/auth/login", {
    identificationNumber,
    password
  });

  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
