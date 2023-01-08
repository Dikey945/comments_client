import React, {useState} from "react";

interface Props {
  loading: boolean;
  error: string | undefined;
  onSubmit: (message: string) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
}

export const CommentForm: React.FC<Props> = ({
  loading,
  error,
  autoFocus = false,
  onSubmit,
  initialValue = "",
}) => {
  const [message, setMessage] = useState(initialValue);
  console.log(`Error: ${error}`);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(""));
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
      <div className='error-msg'>{error}</div>
    </form>
  )
}