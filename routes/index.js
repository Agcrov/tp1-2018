var express = require('express');
var router = express.Router();

const users = require('./users');
const comments = require('./comments');
const replies = require('./replies');

router.use('/users', users);
router.use('/comments', comments);
router.use('/replies', replies);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

module.exports = router;
