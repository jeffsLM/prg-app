import axios from "axios";

const api = axios.create({
  baseURL: "https://prg-back.herokuapp.com",
});

export { api };
