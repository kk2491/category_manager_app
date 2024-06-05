import axios from "axios";
const API_URL = "http://localhost:13000/v1/";

export const getCategories = async () => {
  try {
    console.log("getCategories");
    const getCategoriesApi = API_URL + "categories";
    const response = await axios.get(getCategoriesApi);
    return response.data;
  } catch (err) {
    console.log("getCategories error : ", err);
    throw err;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    console.log("getCategoryById");
    const getCategoryByIdApi = API_URL + "categories/" + categoryId;
    const response = await axios.get(getCategoryByIdApi);
    return response.data;
  } catch (err) {
    console.log("getCategoryById error : ", err);
    throw err;
  }
};

export const createCategory = async (categoryInput) => {
  try {
    console.log("createCategory");
    const createCategoryApi = API_URL + "categories";
    const response = await axios.post(createCategoryApi, categoryInput);
    return response.data;
  } catch (err) {
    console.log("createCategory error : ", err);
    throw err;
  }
};

export const updateCategory = async (categoryId, categoryUpdate) => {
  try {
    console.log("updateCategory");
    const updateCategoryApi = API_URL + "categories/" + categoryId;
    const response = await axios.patch(updateCategoryApi, categoryUpdate);
    return response.data;
  } catch (err) {
    console.log("updateCategory error : ", err);
    throw err;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    console.log("deleteCategory");
    const deleteCategoryApi = API_URL + "categories/" + categoryId;
    const response = await axios.delete(deleteCategoryApi);
    return response.data;
  } catch (err) {
    console.log("deleteCategory error : ", err);
    throw err;
  }
};
