import React, {useState} from "react";
import {PostType} from "../types/Post";
import {SingleComment} from "../types/SingleComment";

interface Props {
  loading: boolean;
  error: Error | null;
  onSubmit: (message: string) => Promise<PostType | SingleComment | void>;
  initialValue?: string;
  autoFocus?: boolean;
}

export const CommentForm: React.FC<Props> = ({
  loading,
  autoFocus = false,
  onSubmit,
  initialValue = "",
}) => {
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await onSubmit(message);
      setMessage("");
    } catch (err) {
      throw new Error('Error: Missing data');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='comment-form-row'>
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='message-input'
        />
        <button
          className='btn'
          disabled={loading}
          type='submit'
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
    </form>
  )
}