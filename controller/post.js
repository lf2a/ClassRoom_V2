const sequelize = require('sequelize');

const Post = require('../models/Post');
const {
  Random
} = require('../util/random');

const config = require('../database/config');

const conn = new sequelize(config);
const post = Post(conn, sequelize);

module.exports = {
  Create(req, res, next) {
    const id_post = Random(20);

    const insert = {
      ID_Post: id_post,
      title: req.body.title,
      subject: req.body.subject,
      content: req.body.content,
      ID_Room_FK: req.headers.id_room,
      ID_User_FK: req.headers.id_user
    };

    conn.sync()
      .then(async () => {
        const data = await post.create(insert)

          .catch((err) => {
            res.json({
              status: {
                code: 400,
                message: "Bad Request"
              },
              // err: err.errors[0].message,
              mysql: err.original
            })
          });

        res.json({
          status: {
            code: 200,
            message: "OK"
          },
          data
        });
      });
  },

  Update(req, res, next) {
    conn.sync()

    post.update({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content
      }, {
        where: {
          ID_Post: req.headers.id_post,
          ID_User_FK: req.headers.id_user
        }
      })

      .then(r => {
        res.json({
          status: {
            code: 200,
            message: "OK"
          },
          r
        })
      })

      .catch((err) => {
        res.json({
          status: {
            code: 400,
            message: "Bad Request"
          }
        });
      });
  },

  Delete(req, res, next) {
    conn.sync()
      .then(async () => {

        const ID_Post = req.headers.id_post

        await post.destroy({
            where: {
              ID_Post,
              ID_User_FK: req.headers.id_user
            }
          })

          .then(e => {
            res.json({
              status: {
                code: 200,
                message: "OK"
              },
              e
            });
          })

          .catch((err) => {
            res.json({
              status: {
                code: 500,
                message: "Server Error"
              }
            });
          });

      });
  },

  GetAll(req, res, next) {
    conn.sync()

      .then(async () => {
        await post.findAll({
            where: {
              ID_Room_FK: req.headers.id_room
            }
          })

          .then(posts => {
            res.json({
              status: {
                code: 200,
                message: "OK"
              },
              posts
            })
          })
      })
  },

  Get(req, res, next) {
    conn.sync()

      .then(async () => {
        await post.findAll({
            where: {
              ID_Post: req.headers.id_post
            }
          })

          .then(post => {
            res.json({
              status: {
                code: 200,
                message: "OK"
              },
              post
            })
          })
      })
  }
};