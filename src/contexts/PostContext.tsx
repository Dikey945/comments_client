import React, {useContext, useEffect, useMemo, useState} from "react";
import {useAsync} from "../hooks/useAsync";
import { getPostById } from "../services/posts";
import {useParams} from "react-router-dom";
import {PostType} from "../types/Post";
import {SingleComment} from "../types/SingleComment";

interface PostContextType {
  post: PostType | null;
  getReplies: (parentId: string) => void;
  rootComments: SingleComment[] | null;
  createLocalComment: (comment: SingleComment) => void;
}

interface Props {
  children: React.ReactNode;
}

export interface Group {
  [key: string]: SingleComment[];
}

const Context = React.createContext({} as PostContextType)

export const usePost = () => {
  return useContext(Context);
}

interface asyncParams {
  loading: boolean;
  error: undefined;
  value: PostType | undefined;
}

export const PostProvider: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  const { loading, error, value: post }: asyncParams = useAsync(() => getPostById(id), [id])
  const typedPost = post as unknown as PostType;
  const [comments, setComments] = useState<SingleComment[]>([])

  useEffect(() => {
    if (post?.comments == null) return
    setComments(post?.comments)
  }, [post?.comments])



  const commentsByParentId: Group = useMemo(() => {
    if (comments === null) {
      return {};
    }
    const group: Group = {}
    comments && comments.forEach((comment) => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })

    return group;
  }, [comments])


  const getReplies: (parentId: string) => SingleComment[] = (parentId: string): SingleComment[] => {
    return commentsByParentId[String(parentId)];
  }
  const createLocalComment = (comment: SingleComment) => {
    setComments((prevComments) => [comment, ...prevComments])
  }

  return (
    <Context.Provider value={{

      post: { ...typedPost},
      getReplies,
      createLocalComment,
      rootComments: commentsByParentId['null'],
    }}>
      {loading ? <h1>Loading</h1> : error ? <h1 className="error-msg">{error}</h1> : children}
    </Context.Provider>
  )
};