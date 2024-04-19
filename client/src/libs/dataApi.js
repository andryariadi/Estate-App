import apiRequest from "./apiRequest";

export const createUser = async ({ username, email, password }) => {
  try {
    const res = await apiRequest.post(`/auth/register`, {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const res = await apiRequest.post(`/auth/login`, {
      username,
      password,
    });

    localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await apiRequest.post(`/auth/logout`);
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
