import { SingleComment } from "./SingleComment";

export interface Post {
  id: string,
  title: string,
  body: string,
  comments: SingleComment[]
}