import { SingleComment } from "./SingleComment";

export interface PostType {
  id: string,
  title: string,
  body: string,
  comments: SingleComment[]
}