import axios from "axios";

const Api = axios.create({
  baseURL: "https://prg-back.herokuapp.com",
});

export { Api };
