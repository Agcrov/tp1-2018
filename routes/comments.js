var express = require('express');
var router = express.Router();
const passport = require('passport');
const Comment = require('../models/comment');
const Reply = require('../models/reply');

router.get('/',(req, res, next) =>{
   Comment.getAll((comments,err)=>{
       if(comments){
           res.json({success: true, message: 'Comments fetched.',comments: comments});
       } else {
           res.json({success: false, message: 'Error trying to fetch comments.',error: err});
       }
   });
});
router.post('/add', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author){
        //Checking body parameters are defined
        if(req.body.author && req.body.content && req.body.movie_id){
            let comment = new Comment({
                author: req.body.author,
                content: req.body.content,
                movie_id: req.body.movie_id
            });
            Comment.addComment(comment, (err, comment) =>{
                if(err){
                    res.json({success: false, message: 'Fail to store comment', error: err});
                } else {
                    res.json({success: true, message: 'Comment stored.',comment: comment});
                }
            });
        }else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }

});
router.get('/:id',(req, res, next)=>{
    let id = req.params.id;
    let replies = req.query.replies;
    if (id && replies){
        if (replies === 'true'){
            Comment.getCommentWithReplies(id, (comment, err)=>{
                if (comment === null){
                    res.json({success: false, message: `Fail trying to fetch comment and the corresponding replies.`, error: err});
                } else {
                    res.json({success: true, message:`Comment w/replies fetched.`, comment: comment});
                }
            });
        } else {
            Comment.getCommentById(id,(comment, err)=>{
                if (comment === null){
                    res.json({success: false, message: `Fail trying to fetch comment.`, error: err});
                } else {
                    res.json({success: true, message:`Comment fetched.`, comment: comment});
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});
router.put('/edit',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    // if (req.user._id.toString() === req.body.comment.author._id) {
        //Checking body parameters are defined
        if (req.body.comment.likes && req.body.comment.content ) {
            Comment.editComment(req.body.comment, (err, response)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to edit comment.`, error: err});
                } else {
                    if (response.nModified === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Comment edited.`});
                    }
                }
            })
        }else {
            res.sendStatus(400);
        }
    // }else {
    //     res.sendStatus(401);
    // }
});
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    let id = req.params.id;
    let authorId = req.query.authorId;
    //Checking body parameters are defined
    if (id && authorId){
        //Checking that the user authenticated is the same one of the request author
        if (req.user._id.toString() === authorId) {
            Comment.getCommentWithReplies(id, (comment, err) =>{
                if (err) throw err;
                if (comment !== null){
                    if (comment.replies.length > 0){
                        comment.replies.forEach(reply =>{
                            Reply.deleteReply(reply._id, (err, response)=>{
                                if (err){
                                    res.json({success: false, message:`Fail trying to delete reply.`,error:err});
                                } else {
                                    if (response.n === 0){
                                        res.sendStatus(404);
                                    }
                                }
                            });
                        });
                        Comment.deleteComment(id, (err, response) => {
                            if (err){
                                res.json({success: false, message: `Fail trying to delete comment.`, error: err});
                            } else {
                                if (response.n === 0){
                                    res.sendStatus(404);
                                } else {
                                    res.json({success: true, message:`Comment deleted.`});
                                }
                            }
                        })
                    }else {
                        Comment.deleteComment(id, (err, response) => {
                            if (err){
                                res.json({success: false, message: `Fail trying to delete comment.`, error: err});
                            } else {
                                if (response.n === 0){
                                    res.sendStatus(404);
                                } else {
                                    res.json({success: true, message:`Comment deleted.`});
                                }
                            }
                        })
                    }
                } else res.sendStatus(404);
            });
        }else res.sendStatus(401);
    } else res.sendStatus(400)
});

router.get('/movies/:movieId',(req, res, next)=>{
    let movieId = req.params.movieId;
    let replies = req.query.replies;
    if (movieId && replies){
        if (replies === 'true'){
            Comment.getCommentByMovieWithReplies(movieId, (comments, err)=>{
                if (comments === null){
                    res.json({success: false, message: `Fail trying to fetch comment and the corresponding replies.`, error: err});
                } else {
                    res.json({success: true, message:`Comment w/replies fetched.`, comments: comments});
                }
            });
        } else {
            Comment.getCommentByMovieId(movieId,(comments, err)=>{
                if (comments === null){
                    res.json({success: false, message: `Fail trying to fetch comment.`, error: err});
                } else {
                    res.json({success: true, message:`Comment fetched.`, comments: comments});
                }
            });
        }
    } else {
        res.sendStatus(400);
    }
});
module.exports = router;
