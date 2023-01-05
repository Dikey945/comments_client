import axios from "axios";

const REACT_APP_SERVER_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: REACT_APP_SERVER_URL
})


export const makeRequests = (url: string, option: any) => {
  return api(url, option)
    .then(res => res.data)
    .catch(error => Promise.reject(error.response.data.message))
}