import {makeRequests} from "./makeRequests";

export const getPosts = () => {
  return makeRequests('/posts', {})
}

export const getPostById = (id: string | undefined) => {
  return makeRequests(`/posts/${id}`, {})
}

