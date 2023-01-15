import React from "react";
import {getPosts} from "../services/posts";
import {PostType} from "../types/Post";
import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";

export const PostList: React.FC = () => {
  const { loading, error, value: posts} = useAsync(getPosts)
  const typedPosts = posts as unknown as PostType[];

  if (loading) {
    return <h1>Loading</h1>
  }
  if (error) {
    return <h1 className="error-msg">{error}</h1>
  }


  if (typedPosts !== undefined) {
    return (
      <>
        {
          typedPosts.map((post: PostType)=> {
            return (
              <h1 key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h1>
            )
          })
        }
      </>
    )
  }

  return(
    <h1>No posts</h1>
  )
}