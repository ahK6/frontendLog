import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://165.227.123.15:5000",
});

export default clienteAxios;
