/* eslint-disable no-console */
"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store';
import router from '../router'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "https://ytkeno.top:4447",
  // baseURL: process.env.baseURL || process.env.apiUrl,
  // timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};

const _axios = axios.create(config);
// eslint-disable-next-line no-unused-vars
_axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers.authorization = store.state.token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // eslint-disable-next-line
    console.log(response.data);
    if (response.data.code == 20001) {
      router.push('/');
    }
    return response;
  },
  function (error) {
    // Do something with response error
    console.log(error.message);
    if (error.message.indexOf('401') != -1) {
      console.log('not auth')
      router.push('/');
    }
    return Promise.reject(error);
  }
);
// eslint-disable-next-line
Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
