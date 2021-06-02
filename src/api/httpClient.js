import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://trieu-django.herokuapp.com/",
});

httpClient.interceptors.request.use((requestConfigs) => {
  const { access } = JSON.parse(localStorage.getItem("session") || "{}") ;
  console.log({access})
  if (access) {
    requestConfigs.headers.Authorization = `Bearer ${access}`;
  }

  return requestConfigs;
});

export default httpClient;
