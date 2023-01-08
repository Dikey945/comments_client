import React, {useState} from "react";
import {SingleComment} from "../types/SingleComment";
import {IconBtn} from "./IconBtn";
import {FaEdit, FaHeart, FaReply, FaTrash} from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import classNames from "classnames";
import {CommentsList} from "./CommentsList";


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

  const {getReplies, post} = usePost();
  // @ts-ignore
  const childComments: SingleComment[] | null = getReplies(id);
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);

  return (
    <>
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
          <IconBtn Icon={FaHeart} aria-label='Like'>
            2
          </IconBtn>

          <IconBtn Icon={FaReply} aria-label='reply' />

          <IconBtn Icon={FaEdit} aria-label='Edit' />

          <IconBtn Icon={FaTrash} aria-label='Delete' color='danger'/>
        </div>
      </div>

      {childComments && childComments.length > 0 && (
        <>
          <div className={classNames("nested-comments-stack",
            { 'hide': areChildrenVisible }
          )}>
            <button
              className={'collapse-line'}
              aria-label={'Hide Replies'}
              onClick={() => {setAreChildrenVisible(true)}}
            />
            <div className={'nested-comments'}>
              <CommentsList comments={childComments} />
            </div>
          </div>
          <button className={classNames('btn mt-1',
            { 'hide': !areChildrenVisible })}
            onClick={() => {setAreChildrenVisible(false)}}
          >
            Show Replies
          </button>
        </>
      )}
    </>

  )
}