import {User} from "./User";

export interface SingleComment {
  id: string,
  user: User,
  message: string,
  postId: string,
  parentId: string | null,
  createdAt: Date,
  children: SingleComment[] | null,
}