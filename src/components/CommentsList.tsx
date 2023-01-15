import React from "react";
import {SingleComment} from "../types/SingleComment";
import {Comment} from "./Comment";

interface Props {
  comments: SingleComment[];
}

export const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <div className="comment-stack">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}