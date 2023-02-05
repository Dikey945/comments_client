import React from "react";
import {usePost} from "../contexts/PostContext";
import {CommentsList} from "./CommentsList";
import {CommentForm} from "./CommentForm";
import {useAsyncFn} from "../hooks/useAsync";
import {createComment} from "../services/comments";
import {PostType} from "../types/Post";
import {useAuth} from "../contexts/AuthContext";


export const Post: React.FC = () => {
  const { post, rootComments, createLocalComment } = usePost();
  const { user } = useAuth();
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);

  const onCommentCreate = async (message: string): Promise<PostType | void> => {
    return createCommentFn({ postId: post?.id, message, userId: user?.id }).then(
      createLocalComment
    )
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
          onSubmit= {onCommentCreate}
        />
        {rootComments && rootComments.length && (
          <div className="mt-4">
            <CommentsList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}