import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_API_HOST || 'http://localhost:3000'}/api`;
axios.interceptors.response.use(responseSuccess, responseError);

function responseSuccess(response) {
  return response;
}

function responseError(error) {
  // const { response } = error
  return Promise.reject(error);
}

export default axios;
