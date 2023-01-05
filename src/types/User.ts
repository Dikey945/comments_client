import {SingleComment} from "./SingleComment";

export interface User {
  id: string,
  name: string,
  comments: SingleComment[]
}