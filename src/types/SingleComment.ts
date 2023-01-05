import {User} from "./User";

export interface SingleComment {
  id: number,
  user: User,
  message: string,
  postId: string,
  parentId: string,
  createdAt: Date,
  children: SingleComment[],
}