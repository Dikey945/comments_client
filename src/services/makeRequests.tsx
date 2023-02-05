import axios from "axios";

const REACT_APP_SERVER_URL = 'http://localhost:5050'

export function createClient () {
  return axios.create({
    baseURL: REACT_APP_SERVER_URL,
    withCredentials: true
  })
}

export const api = createClient()


export const makeRequests = (url: string, option: any) => {
  return api(url, option)
    .then(res => res.data)
    .catch(error => Promise.reject(error.response.data.message))
}