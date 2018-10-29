var express = require('express');
var router = express.Router();
const passport = require('passport');
const Reply = require('../models/reply');
const Comment = require('../models/comment');

router.post('/add', passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    if (req.user._id.toString() === req.body.author){
        //Checking body parameters are defined
        if(req.body.author && req.body.content && req.body.replies_to){
            let reply = new Reply({
                author: req.body.author,
                content: req.body.content,
                replies_to: req.body.replies_to
            });
            Reply.addReply(reply, (err, reply) =>{
                if(err){
                    res.json({success: false, message: 'Fail to store reply', error: err});
                } else {
                    res.json({success: true, message: 'Reply stored.',reply: reply});
                }
            });
        }else {res.sendStatus(400)}
    }else {res.sendStatus(401)}

});
router.put('/edit',passport.authenticate('jwt', {session:false}),(req, res, next)=>{
    //Checking that the user authenticated is the same one of the request author
    // if (req.user._id.toString() === req.body.author._id) {
        //Checking body parameters are defined
        if (req.body.likes && req.body.content ) {
            Reply.editReply(req.body, (err, response)=>{
                if (err){
                    res.json({success: false, message: `Fail trying to edit reply.`, error: err});
                } else {
                    if (response.nModified === 0){
                        res.sendStatus(404);
                    } else {
                        res.json({success: true, message:`Reply edited.`});
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
    if (id && authorId){
        //Checking that the user authenticated is the same one of the request author
        if (req.user._id.toString() === authorId) {
            //Checking body parameters are defined
            if (id) {
                Reply.getReplyById(id, (err, reply) => {
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        Comment.removeReply(reply, (err, comment)=>{
                            if (err){
                                res.sendStatus(400);
                            } else {
                                if (comment.replies.indexOf(reply._id.toString())===-1){
                                    Reply.deleteReply(id, (err, response) => {
                                        if (err){
                                            res.json({success: false, message: `Fail trying to delete reply.`, error: err});
                                        } else {
                                            if (response.n === 0){
                                                res.sendStatus(404);
                                            } else {
                                                res.json({success: true, message:`Reply deleted.`});
                                            }
                                        }
                                    })
                                } else res.sendStatus(404);
                            }
                        })
                    }
                });

            } else res.sendStatus(400);
        }else res.sendStatus(401);
    } else res.sendStatus(400);
});

module.exports = router;
