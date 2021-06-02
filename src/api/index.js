import httpClient from "./httpClient";

export const register = (params) => {
  return httpClient.post("user/register/", params);
};

export const login = (params) => {
  return httpClient.post("user/api/token/", params);
};

export const addProduct = (params) => {
  return httpClient.post('user/add-product/', params)
}

export const listProduct = () => {
  return httpClient.get('user/list-product/')
}
