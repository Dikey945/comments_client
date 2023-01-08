import React from "react";
import {usePost} from "../contexts/PostContext";
import {CommentsList} from "./CommentsList";
import {CommentForm} from "./CommentForm";
import {useAsyncFn} from "../hooks/useAsync";
import {createComment} from "../services/comments";

export const Post: React.FC = () => {
  const { post, rootComments } = usePost();
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);

  const postId = post?.id;
  console.log(postId);

  const onCommentCreate = (message: string) => {
    if (post && message) {
      return createCommentFn({ message, postId})
    }

  }
  return (
    <>
      <h1>{post?.title}</h1>
      <article>{post?.body}</article>
      <h3 className={"comments-title"}>Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments !== null && rootComments.length > 0 && (
          <div>
            <CommentsList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}