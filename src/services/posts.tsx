import {makeRequests} from "./makeRequests";
import {accessTokenService} from "./accessTokenService";


export const getPosts = () => {
  const accessToken = accessTokenService.get()
  console.log('getPosts called')
  return makeRequests('/posts', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const getPostById = (id: string | undefined) => {
  return makeRequests(`/posts/${id}`, {})
}

