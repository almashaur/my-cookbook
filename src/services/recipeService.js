import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`;

// Helper to get the authorization config
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create a recipe (Protected route)
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

// Get all recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get a recipe by ID
export const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get recipes for a specific user (Protected route)
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

// Update a recipe by ID (Protected route)
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

// Delete a recipe by ID (Protected route)
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
