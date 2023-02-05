import {makeRequests} from "./makeRequests";

type createOptions = {
  message: string,
  postId: string,
  parentId: string,
  id: string,
  userId: string,
}

export const createComment = async ({ message, postId, parentId, userId}: createOptions) => {
  console.log(postId)
  return makeRequests(`posts/${postId}/comment`, {
    method: 'POST',
    data: {
      message,
      parentId,
      postId,
      userId,
    }
  })
}
export const updateComment = async ({ message, postId, id, userId}: createOptions) => {
  return makeRequests(`posts/${postId}/comment/${id}`, {
    method: 'PUT',
    data: {
      message,
      userId,
    }
  })
}

export const deleteComment = ({ postId, id }: createOptions)  => {
  return makeRequests(`posts/${postId}/comment/${id}`, {
    method: "DELETE",
  })
}

