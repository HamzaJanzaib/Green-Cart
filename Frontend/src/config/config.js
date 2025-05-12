export const BASE_URL = import.meta.BASE_URL || "http://localhost:5000/api/V1";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  CREATE_BLOG: "/blogs/create",
  GET_MY_BLOGS: "/blogs/my-blogs",
  GET_ALL_BLOGS: "/blogs",
  UPDATE_BLOG: (id) => `/blogs/${id}`,
  DELETE_BLOG: (id) => `/blogs/${id}`,
};