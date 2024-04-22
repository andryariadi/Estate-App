import apiRequest from "./apiRequest";

// User
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

export const updatedUser = async ({ id, username, email, password, avatar }) => {
  try {
    const res = await apiRequest.put(`/user/${id}`, {
      username,
      email,
      password,
      avatar,
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

    // localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await apiRequest.post(`/auth/logout`);
    // localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
};
