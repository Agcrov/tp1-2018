const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    movie_id: { type: String, required: true},
    content: { type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }]
},{timestamps:true});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.getAll = function (callback){
    Comment.find({}).sort({createdAt: -1}).populate('author','-password')
        .populate({path:'replies',populate:{path:'author',select:'-password'}})
        .then(callback);
};
module.exports.getCommentById = function (id,callback) {
    Comment.findById(id).populate('author','-password').then(callback);
};

module.exports.addComment = function (comment, callback) {
    comment.save(callback);
};
module.exports.addReply = function (reply, callback) {
    var id = reply.replies_to;
    Comment.findById(id, (err, comment) =>{
        if (err) throw err;
        comment.replies.push(reply);
        comment.save(callback);
    });
};
module.exports.removeReply = function (reply, callback) {
    const id = reply.replies_to;
    Comment.findById(id, (err, comment) =>{
        if (err) throw err;
        const index = comment.replies.indexOf(reply._id.toString());
        comment.replies.splice(index,1);
        comment.save(callback);
    });
};
module.exports.getCommentWithReplies = function (id, callback) {
    Comment.findById(id).populate('author','-password')
        .populate({path:'replies',populate:{path:'author',select:'-password'}})
        .then(callback);
};
module.exports.editComment = function (editedComment, callback) {
    let comment = {};
    if (editedComment.content) comment.content = editedComment.content;
    if (editedComment.likes) comment.likes = editedComment.likes;
    const query = { _id: editedComment._id };
    Comment.updateOne(query, comment, callback);
};
module.exports.deleteComment = function (id, callback) {
    Comment.deleteOne({ _id: id }, callback);
};

module.exports.getCommentByMovieWithReplies = function (id, callback) {
    Comment.find({movie_id: id}).populate('author','-password')
        .populate({path:'replies',populate:{path:'author',select:'-password'}})
        .then(callback);
};
module.exports.getCommentByMovieId = function (id,callback) {
    Comment.find({movie_id: id}).populate('author','-password').then(callback);
};

