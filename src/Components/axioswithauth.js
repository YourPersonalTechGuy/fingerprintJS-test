import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    headers: {
      "Auth-token": "EoaDEifytrYzG7tca3df",
    },
    baseURL: "https://api.fpjs.io",
  });
};
