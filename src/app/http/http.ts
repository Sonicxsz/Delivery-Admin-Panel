import axios from 'axios'


export const base = "http://localhost:8080"
const apiBase = base + "/api/v1"


export const http = axios.create({
    baseURL:apiBase,
    responseType: 'json',
    withCredentials:true,
})


http.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    console.log("refresh or authorize")
  }

  throw error;
})

http.interceptors.response.use(async(response) => {
    return response.data
}, 
async (error) => {
  if (error.response?.status === 401) {
  }
  throw error;
})