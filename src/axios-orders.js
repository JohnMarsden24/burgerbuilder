import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-7b4b9-default-rtdb.firebaseio.com/",
});

export default instance;
