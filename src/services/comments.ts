import {makeRequests} from "./makeRequests";

type createOptions = {
  message: string,
  postId: string,
  parentId: string,
}

export const createComment = async ({ message, postId, parentId }: createOptions) => {
  console.log(postId)
  return makeRequests(`post/${postId}/comment`, {
    method: 'POST',
    data: {message, parentId}
  })
}