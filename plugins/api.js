import Axios from "axios";
import Vue from "vue";
import nuxtConfig from '@/nuxt.config';

const isDev = !!nuxtConfig?.dev
const hostname = isDev ? 'http://localhost:3000' : 'https://www.aoe4stats.net';

Vue.prototype.$get = async (apiPath, params) => {
  let response = await Axios.get(`${hostname}/api/${apiPath}`, {
    params,
  });
  return response.data;
};

Vue.prototype.$post = async (apiPath, data) => {
  let response = await Axios.post(`${hostname}/api/${apiPath}`, data);
  return response.data;
}
