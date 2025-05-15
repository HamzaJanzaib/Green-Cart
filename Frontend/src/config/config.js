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
  PRODUCTS: "/products/",
  PRODUCTSBYID: (id) => `/products/${id}`,
  CATEGORY: "/Category/",

  //PRIVATE APIS
  ADMINADDPRODUCTS: "/products/addProducts",
  ADMINUPDATEPRODUCTS: (id) => `/products/updateProducts/${id}`,
  ADMINDELETEPRODUCTS: (id) => `/products/delateProducts/${id}`,
  ADMINCHANGESTOCK: (id, inStock) => `/products/changeStock/${id}/${inStock}`,


  ADMINADDCATEGORY: "/Category/addCategory",
  ADMINUPDATECATEGORY: (id) => `/Category/updateCategory/${id}}`,
  ADMINDELETECATEGORY: (id) => `/Category/deleteCategory/${id}}`,

  // LOGIN USER APIS
  ADDADDRESS: "/Address/add",
  GETUSERADDRESS: `/Address/`,
  DELETEADDRESS: (addressId) => `/Address/${addressId}`,
  UPDATEADDRESS: '/Address/update',

  // ORDERS APIS
  PLACEORDERBYCOD: "/Orders/place-order/COD",
  GETALLORDERS: "/Orders/admin/orders",
  GETUSERORDERS: `/Orders/`,
};