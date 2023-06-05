import axios from "axios";

export const BASE_URL = "https://localhost:7171/";

export const ENDPOINTS = {
  todo: "Todo",
  user: "User",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "api/" + endpoint + "/";
  return {
    authorize: (newRecord) => axios.post(url + "authorize", newRecord),
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + "GetById/" + id),
    fetchByEmail: (email) => axios.post(url + "userbymail", email),
    post: (newRecord) => axios.post(url, newRecord),
    put: (updatedRecord) => axios.put(url, updatedRecord),
    putById: (id) => axios.put(url + "TodoDone/" + id),
    delete: (id) => axios.delete(url + id),
  };
};
