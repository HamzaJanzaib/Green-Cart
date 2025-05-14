export const BASE_URL = import.meta.BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  // AUTH APIS
  REGISTER: "/user/register",
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  CHECK_AUTH: "/user/check-auth",
  ADMINLOGIN: "/admin/login",
  ADMINLOGOUT: "/admin/logout",
  ADMINCHECK_AUTH: "/admin/check-auth",

  //PUBLIC APIS
  PRODUCTS: "/api/products/",
  PRODUCTSBYID: (id) => `/api/products/${id}`,
  CATEGORY: "/api/Category/",

  //PRIVATE APIS
  ADMINADDPRODUCTS: "/api/products/addProducts",
  ADMINUPDATEPRODUCTS: (id) => `/api/products/updateProducts/${id}`,
  ADMINDELETEPRODUCTS: (id) => `/api/products/updateProducts/${id}`,
  ADMINCHANGESTOCK: (id, inStock) => `/api/products/updateProducts/${id} / ${inStock}`,


  ADMINADDCATEGORY: "/api/Category/addCategory",
  ADMINUPDATECATEGORY: (id) => `/api/Category/updateCategory/${id}}`,
  ADMINDELETECATEGORY: (id) => `/api/Category/deleteCategory/${id}}`,

  // LOGIN USER APIS
  ADDADDRESS: "/api/Address/add",
  GETUSERADDRESS: (userId) => `/api/Address/${userId}`,
  DELETEADDRESS: (userId, addressId) => `/api/Address/${userId}/${addressId}`,
  UPDATEADDRESS: '/api/Address/update',

  // ORDERS APIS
  PLACEORDERBYCOD: "/api/Orders/place-order/COD",
  GETALLORDERS: "/api/Orders/admin/orders",
  GETUSERORDERS: (userId) => `/api/Orders/${userId}`,
};