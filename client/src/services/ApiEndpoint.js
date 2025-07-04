import axios from 'axios'

const instance = axios.create({
    baseURL:'https://authentication-plugin.onrender.com',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

export const get = (url, params) =>
  instance.get(url, { params, withCredentials: true });

export const post = (url, data) =>
  instance.post(url, data, { withCredentials: true });

export const put = (url, data) =>
  instance.put(url, data, { withCredentials: true });

export const deleteUser = (url) =>
  instance.delete(url, { withCredentials: true });



  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
        console.log('intercpert reponse',response)
    return response;
  }, function (error) {
    console.log('intercpert reponse',error)
    return Promise.reject(error);
  });