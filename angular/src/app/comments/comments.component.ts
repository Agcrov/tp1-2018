import { Component, OnInit } from '@angular/core';
import {faReply, faEdit, faPaperPlane, faTimes, faThumbsUp as fasThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import {CommentsService} from "../comments.service";
import { Comment } from "../comment";
import * as moment from 'moment';
import {AuthService} from "../auth.service";
import {User} from "../user";
import {Reply} from "../reply";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  movieId: string;
  comments: Comment[];
  userComment = new  Comment();
  userReply = new Reply();
  userLogged: boolean;
  currentUser = new User();
  repliesInputs = {};
  repliesEditInputs = {};
  commentEditInputs = {};

  faPaperPlane =faPaperPlane;
  faReply = faReply;
  faEdit = faEdit;
  faThumbsUp = faThumbsUp;
  fasThumbsUp = fasThumbsUp;
  faTrashAlt = faTrashAlt;
  faTimes = faTimes;

  clearArrays(){
    this.repliesInputs = {};
    this.commentEditInputs = {};
    this.repliesEditInputs = {};
    this.userComment = new Comment();
    this.userReply = new Reply();
  }
  constructor(private commentsService: CommentsService, private authService: AuthService, private _activeRoute: ActivatedRoute) {
    this.userLogged = this.authService.validateToken;
    if (this.userLogged){
      let user = localStorage.getItem('user');
      this.currentUser = JSON.parse(user) as User;
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe( res =>{
      this.userLogged = res;
      if (this.userLogged){
        let user = localStorage.getItem('user');
        this.currentUser = JSON.parse(user) as User;
      }
    });
    this._activeRoute.params.subscribe(params => {
      const id = params['id'];
      this.movieId = id;
      this.commentsService.getCommentsByMovie(id).subscribe(res =>{
        this.comments = res.comments;
      });
    });

  }
  getTimeFromNow(date: string): string {
    let commentDate = moment(date);
    let time = commentDate.fromNow();
    if (time.indexOf('day')!=-1) {
      return commentDate.format('DD-MM-YYYY');
    }else {
      return time;
    }
    // let time = commentDate.diff(moment.now(),'hours');
    // if (-time >= 24 ){
    //   return commentDate.format('DD-MM-YYYY');
    // } else {
    //   return commentDate.fromNow();
    // }
    // // let time = commentDate.diff(moment.now(),'hours');
    // if (-time >= 24 ){
    //   return commentDate.format('DD-MM-YYYY');
    // } else {
    //   return commentDate.fromNow();
    // }
  }

  onCommentSubmit(){
    if (this.userLogged){
      this.userComment.author = this.currentUser;
      this.userComment.movie_id = this.movieId;
      if (this.userComment.author && this.userComment.content){
        this.commentsService.addComment(this.userComment).subscribe(res=>{
          if(res.success){
            this.userComment = new Comment();
            //  reload the comments
            this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
              this.comments = res.comments;
              console.log(this.comments);
            });
          }
        });
      }
    } else console.log('Log in please');
  }
  onReplySubmit(comment: Comment){
    if (this.userLogged){
      this.userReply.author = this.currentUser;
      if (this.userReply.author && this.userReply.content){
        this.commentsService.addReply(this.userReply, comment).subscribe(res=>{
          if(res.success){
            this.userReply = new Reply();
            //  reload the comments
            this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
              this.comments = res.comments;
            });
          }
        });
      }
    } else console.log('Log in please');
  }
  onCommentEdit(comment: Comment){
    if (this.userLogged) {
      this.commentsService.editComment(comment).subscribe(res =>{
        if(res.success){
          //  reload the comments
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }else console.log('comment not edited');
      });
    }
  }
  onReplyEdit(reply: Reply){
    if (this.userLogged) {
      this.commentsService.editReply(reply).subscribe(res =>{
        if(res.success){
          //  reload the comments
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }else console.log('reply not edited');
      });
    }
  }
  onCommentDelete(comment: Comment){
    if (comment._id){
      this.commentsService.deleteComment(this.currentUser._id,comment._id).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        } else console.log('Error while deleting');
      });
    } else console.log('Comment undefined');
  }
  onReplyDelete(reply: Reply){
    if (reply._id){
      this.commentsService.deleteReply(this.currentUser._id,reply._id).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        } else console.log('Error while deleting');
      });
    } else console.log('Reply undefined');
  }
  addCommentLike(comment: Comment){
    let currentUserId = this.currentUser._id.toString();
    if(comment.likes.indexOf(currentUserId)==-1){
      comment.likes.push(currentUserId);
      this.commentsService.editComment(comment).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }
      })
    }
  }
  removeCommentLike(comment: Comment){
    let userIdIndex = comment.likes.indexOf(this.currentUser._id.toString());
    if(userIdIndex!==-1){
      comment.likes.splice(userIdIndex, 1);
      this.commentsService.editComment(comment).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }
      })
    }
  }
  addReplyLike(reply: Reply){
    let currentUserId = this.currentUser._id.toString();
    if(reply.likes.indexOf(currentUserId)==-1){
      reply.likes.push(currentUserId);
      this.commentsService.editReply(reply).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }
      })
    }
  }
  removeReplyLike(reply: Reply){
    let userIdIndex = reply.likes.indexOf(this.currentUser._id.toString());
    if(userIdIndex!==-1){
      reply.likes.splice(userIdIndex,1);
      this.commentsService.editReply(reply).subscribe(res =>{
        if (res.success){
          this.commentsService.getCommentsByMovie(this.movieId).subscribe( res => {
            this.comments = res.comments;
          });
        }
      })
    }
  }
}
