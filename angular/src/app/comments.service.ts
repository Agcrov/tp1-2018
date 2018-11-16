import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Comment} from "./comment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reply} from "./reply";

interface Response {
  success: boolean;
  message: string;
}
interface Comments extends Response {
  comments: Comment[];
}
interface PostComment extends Response{
  comment: Comment;
}
interface PostReply extends Response{
  reply: Reply;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private urlComments = 'http://localhost:8080/comments/';
  private urlReplies = 'http://localhost:8080/replies/';

  constructor(private authService: AuthService, private  httpService: HttpClient) { }

  getComments(): Observable<Comments>{
    return this.httpService.get<Comments>(this.urlComments ,httpOptions);
  }
  getCommentsByMovie(movie_id: string): Observable<Comments>{
    return this.httpService.get<Comments>(`${this.urlComments}movies/${movie_id}?replies=true` ,httpOptions);
  }

  addComment(comment: Comment): Observable<PostComment> {
    if (comment){
      let body = {
        author:comment.author._id,
        content:comment.content,
        movie_id: comment.movie_id
      };
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.localToken
      });
      let options = {
        headers: httpHeaders
      };
      return this.httpService.post<PostComment>(`${this.urlComments}add`,body,options);
    } else {
      console.log('comment undefined')
    }
  }
  addReply(reply: Reply, comment: Comment): Observable<PostReply> {
    if (comment && reply){
      let body = {
        author:reply.author._id,
        content:reply.content,
        replies_to:comment._id
      };
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.localToken
      });
      let options = {
        headers: httpHeaders
      };
      return this.httpService.post<PostReply>(`${this.urlReplies}add`,body,options);
    } else {
      console.log('reply undefined')
    }
  }

  deleteComment(userId: string, commentId:string): Observable<Response>{
    if (userId && commentId){
        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.authService.localToken
        });
        let options = {
          headers: httpHeaders
        };
        return this.httpService.delete<Response>(`${this.urlComments}delete/${commentId}?authorId=${userId}`,options);
    } else console.log('bad request');
  }
  deleteReply(userId: string, replyId:string): Observable<Response>{
    if (userId && replyId){
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.localToken
      });
      let options = {
        headers: httpHeaders
      };
      return this.httpService.delete<Response>(`${this.urlReplies}delete/${replyId}?authorId=${userId}`,options);
    } else console.log('bad request');
  }

  editComment(comment: Comment): Observable<Response>{
    if (comment){
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.localToken
      });
      let options = {
        headers: httpHeaders
      };
      return this.httpService.put<Response>(`${this.urlComments}edit`,{comment},options);
    } else console.log('bad request');
  }
  editReply(reply: Reply): Observable<Response>{
    if (reply){
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authService.localToken
      });
      let options = {
        headers: httpHeaders
      };
      return this.httpService.put<Response>(`${this.urlReplies}edit`,reply,options);
    } else console.log('bad request');
  }
}



