import React from "react";
import {usePost} from "../contexts/PostContext";
import {CommentsList} from "./CommentsList";

export const Post: React.FC = () => {
  const { post, rootComments } = usePost();
  return (
    <>
      <h1>{post?.title}</h1>
      <article>{post?.body}</article>
      <h3 className={"comments-title"}>Comments</h3>
      <section>
        {rootComments !== null && rootComments.length > 0 && (
          <div>
            <CommentsList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}