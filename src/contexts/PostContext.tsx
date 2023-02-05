import React, {useContext, useEffect, useMemo, useState} from "react";
import {useAsync} from "../hooks/useAsync";
import { getPostById } from "../services/posts";
import {useParams} from "react-router-dom";
import {PostType} from "../types/Post";
import {SingleComment} from "../types/SingleComment";

interface PostContextType {
  post: PostType | null;
  getReplies: (parentId: string) => SingleComment[] | null;
  rootComments: SingleComment[] | null;
  createLocalComment: (comment: SingleComment) => void;
  updateLocalComment: (id: string, message: string) => void;
  deleteLocalComment: (id: string) => void;
}

interface Props {
  children: React.ReactNode;
}

export interface Group {
  [key: string]: SingleComment[];
}

interface asyncParams {
  loading: boolean;
  error: any;
  value: PostType | undefined;
}
const PostContext = React.createContext({} as PostContextType)

export const usePost = () => {

  return useContext(PostContext);
}

export const PostProvider: React.FC<Props> = ({ children }) => {
  const { id } = useParams();
  const { loading, error, value: post }: asyncParams
    = useAsync(() => getPostById(id), {initialLoading: false,
    dependencies: [id]})
  const typedPost = post as unknown as PostType;
  const [comments, setComments] = useState<SingleComment[]>([])

  useEffect(() => {
    if (!post || post.comments == null) return
    setComments(post.comments)
  }, [post, id])



  const commentsByParentId: Group = useMemo(() => {
    if (!comments || !Array.isArray(comments)) {
      return {};
    }
    const group: Group = {}
    comments.forEach((comment) => {
      if (comment.parentId === null) {
        group["null"] ||= []
        group["null"].push(comment)
      } else {
        group[comment.parentId] ||= []
        group[comment.parentId].push(comment)
      }
    })

    return group;
  }, [comments])



  const getReplies: (parentId: string) => SingleComment[] | null = (parentId: string): SingleComment[] => (
    commentsByParentId[String(parentId)]
  )
  const createLocalComment = (comment: SingleComment) => {
    setComments((prevComments) => [comment, ...prevComments])
  }

  const updateLocalComment = (id: string, message: string) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, message }
        } else {
          return comment
        }
      })
    })
  }

  const deleteLocalComment = (id: string) => {
    setComments(prevComments => {
      return prevComments.filter(comment => comment.id !== id)
    })
  }

  return (
    <PostContext.Provider value={{
      post: { ...typedPost},
      getReplies,
      createLocalComment,
      updateLocalComment,
      deleteLocalComment,
      rootComments: commentsByParentId["null"],
    }}>
      {loading ? <h1>Loading</h1> : error ? <h1 className="error-msg">{error}</h1> : children}
    </PostContext.Provider>
  )
};