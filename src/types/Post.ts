import { SingleComment } from "./SingleComment";

export interface Post {
  id: number,
  title: string,
  body: string,
  comments: SingleComment[]
}