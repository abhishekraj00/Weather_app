import axios from "axios";

export const getApiData = (url: string) => {
  return axios.get(url);
};
