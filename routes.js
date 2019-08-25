const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

const secret = require('./util/key');

const User = require('./controller/user');
const Auth = require('./controller/authentication');
const Room = require('./controller/room');
const Post = require('./controller/post');
const Member = require('./controller/member');

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token']

  if (!token) return res.json({
    status: {
      code: 401,
      message: "Unauthorized"
    },
    auth: false,
    message: 'No token provided'
  })

  jwt.verify(token, secret.Secret(), (err, decoded) => {
    if (err) return res.json({
      status: {
        code: 500,
        message: "Internal Server Error"
      },
      auth: false,
      message: 'Failed to authenticate token'
    });

    req.userId = decoded.id;
    next()
  })
}

/*  USER AREA  */
router.post('/user', User.SignUp)
router.delete('/user', verifyJWT, User.Delete)
router.put('/user', verifyJWT, User.Update)
/*  USER AREA  */

/*  AUTH AREA  */
router.post('/login', Auth.Login)
/*  AUTH AREA  */

/*  ROOM AREA  */
router.post('/room', verifyJWT, Room.Create)
router.delete('/room', verifyJWT, Room.Delete)
router.get('/room', verifyJWT, Room.Get)
router.put('/room', verifyJWT, Room.Update)
/*  ROOM AREA  */

/*  POST AREA  */
router.post('/post', verifyJWT, Post.Create)
router.put('/post', verifyJWT, Post.Update)
router.delete('/post', verifyJWT, Post.Delete)
router.get('/posts', verifyJWT, Post.GetAll)
router.get('/post', verifyJWT, Post.Get)
/*  POST AREA  */

/*  MEMBER AREA  */
router.post('/member', verifyJWT, Member.Add)
router.delete('/member', verifyJWT, Member.Delete)
/*  MEMBER AREA  */

module.exports = router;