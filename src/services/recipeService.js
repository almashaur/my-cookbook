import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`;

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const createRecipe = async (recipeData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create`,
      recipeData,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserRecipes = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/${userId}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateRecipe = async (recipeId, recipeData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${recipeId}`,
      recipeData,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${recipeId}`,
      getAuthConfig()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
