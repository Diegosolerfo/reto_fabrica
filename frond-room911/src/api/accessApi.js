import api from "./axiosConfig";

export const getAccessList = async () => {
  const response = await api.get("/access");
  return response.data;
};
