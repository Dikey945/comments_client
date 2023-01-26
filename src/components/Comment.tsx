import React, {useState} from "react";
import {SingleComment} from "../types/SingleComment";
import {IconBtn} from "./IconBtn";
import {FaEdit, FaHeart, FaReply, FaTrash} from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import classNames from "classnames";
import {CommentsList} from "./CommentsList";
import {CommentForm} from "./CommentForm";
import {useAsyncFn} from "../hooks/useAsync";
import {createComment, deleteComment, updateComment} from "../services/comments";


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

  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
  } = usePost();
  const childComments: SingleComment[] | null = getReplies(id);
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const onCommentReply = async (message: string) => {
    const createdComment: SingleComment = await createCommentFn.execute({
      message,
      postId: post?.id,
      parentId: id })
    setIsReplying(false);
    createLocalComment(await createdComment);
  }

  const onCommentUpdate = async (message: string) => {
    const updatedComment: SingleComment = await updateCommentFn.execute({
      message,
      postId: post?.id,
      id })
    setIsEditing(false);
    updateLocalComment(id, message);
    return updatedComment;
  }

  const onCommentDelete = async () => {
    const deletedComment: SingleComment = await deleteCommentFn.execute({
      postId: post?.id,
      id })
    deleteLocalComment(id);
    return deletedComment;
  }

  return (
    <>
      <div className="comment mt-1">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
          {dateFormatter.format(Date.parse(`${createdAt}`))}
        </span>
        </div>
        {isEditing
          ? <CommentForm
              autoFocus
              initialValue={message}
              onSubmit={onCommentUpdate}
              loading={updateCommentFn.loading}
              error={updateCommentFn.error}
          />
          : <div className="message">
              {message}
            </div>
        }

        <div className="footer">
          <IconBtn Icon={FaHeart} aria-label='Like'>
            2
          </IconBtn>

          <IconBtn
            Icon={FaReply}
            aria-label={isReplying ? 'Cancel reply' : 'Reply'}
            onClick={() => setIsReplying(prev => !prev)}
            isActive={isReplying}
          />

          <IconBtn
            Icon={FaEdit}
            aria-label={isEditing ? 'Cancel edit' : 'edit'}
            onClick={() => setIsEditing(prev => !prev)}
            isActive={isEditing}
          />

          <IconBtn
            Icon={FaTrash}
            aria-label='Delete'
            color='danger'
            onClick={onCommentDelete}
          />
        </div>
      </div>

      {isReplying && (
        <div className='mt-1 ml-3'>
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}

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