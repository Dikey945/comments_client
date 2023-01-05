import React, {useContext, useMemo} from "react";
import {useAsync} from "../hooks/useAsync";
import { getPostById } from "../services/posts";
import {useParams} from "react-router-dom";
import {Post} from "../types/Post";
import {SingleComment} from "../types/SingleComment";

interface PostContextType {
  post: Post | null;
  getReplies: (parentId: string) => void;
  rootComments: SingleComment[] | null;
}

interface Props {
  children: React.ReactNode;
}

interface Group {
  [key: string]: SingleComment[];
}

const Context = React.createContext({} as PostContextType)

export const usePost = () => {
  return useContext(Context);
}

export const PostProvider: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  const { loading, error, value: post } = useAsync(() => getPostById(id), [id])
  const typedPost = post as unknown as Post;

  const commentsByParentId = useMemo(() => {
    if (typedPost?.comments === null) {
      return {};
    }
    const group: Group = {}
    typedPost?.comments.forEach((comment) => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })

    return group;
  }, [typedPost])

  const getReplies = (parentId: string | null) => {
    return commentsByParentId[String(parentId)];
  }

  return (
    <Context.Provider value={{
      post: { ...(post as unknown as Post) },
      getReplies,
      rootComments: commentsByParentId['null'],
    }}>
      {loading ? <h1>Loading</h1> : error ? <h1 className="error-msg">{error}</h1> : children}
    </Context.Provider>
  )
};