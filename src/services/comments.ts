import {makeRequests} from "./makeRequests";

type createOptions = {
  message: string,
  postId: string,
  parentId: string,
  id: string,
}

export const createComment = async ({ message, postId, parentId }: createOptions) => {
  console.log(postId)
  const sallyId  = "c0ad6b0d-93ac-47f1-b92a-f6b3f374d81a"
  return makeRequests(`posts/${postId}/comment`, {
    method: 'POST',
    data: {
      message,
      parentId,
      postId,
      userId: sallyId,
    }
  })
}
export const updateComment = async ({ message, postId, id}: createOptions) => {
  console.log(postId)
  const sallyId  = "c0ad6b0d-93ac-47f1-b92a-f6b3f374d81a"
  return makeRequests(`posts/${postId}/comment/${id}`, {
    method: 'PUT',
    data: {
      message,
      userId: sallyId,
    }
  })
}
