import axios from "axios";


const api = axios.create({
  baseURL: 'http://192.168.1.10:8081/api',
});

const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};




const makeRequest = {
  get,
  post
};

export default makeRequest;
