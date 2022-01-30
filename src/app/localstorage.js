export const setToken = (token) => {
  localStorage.setItem("swToken", token);
};

export const getToken = () => localStorage.getItem("swToken");

export const removeToken = () => localStorage.removeItem("swToken");
