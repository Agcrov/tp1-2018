import {Comment} from "./comment";
import {User} from "./user";

export class Reply {
  _id: string;
  author: User;
  content: string;
  likes: string[];
  replies_to: Comment;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this._id = undefined;
    this.author = undefined;
    this.content = undefined;
    this.likes = undefined;
    this.replies_to = undefined;
  }

  validateContent(): boolean {
    return this.content.length <= 250;
  }
}

