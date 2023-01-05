import React from "react";
import {SingleComment} from "../types/SingleComment";


interface Props {
  comment: SingleComment;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export const Comment: React.FC<Props> = ({ comment }) => {
  const {
    id,
    message,
    user,
    createdAt,
  } = comment;

  return (
    <div className="comment">
      <div className="comment__header">
        <span className="comment__author"> {user.name} </span>
        <span className="comment__date">
          {dateFormatter.format(Date.parse(`${createdAt}`))}
        </span>
      </div>

      <div className="comment__message">
        {message}
      </div>

      <div className="comment__footer">

      </div>
    </div>
  )
}