const sequelize = require('sequelize');

const User = require('../models/User');
const Post = require('../models/Post');
const Member = require('../models/Member');

const config = require('../database/config');

const conn = new sequelize(config);
const user = User(conn, sequelize);
const member = Member(conn, sequelize);

module.exports = {
  Add(req, res, next) {

    conn.sync()
      .then(async () => {
        const target_user = await user.findAll({
          where: {
            email: req.body.email
          }
        })

        if (target_user.length === 0) {
          res.json({
            status: 404,
            message: "Not Found"
          })
        } else {
          const logged_user = await member.findAll({
            where: {
              ID_User_FK: req.headers.id_user
            }
          })

          if (logged_user[0].dataValues.IsAdmin === "y") {
            await member.create({
                ID_Room_FK: req.headers.id_room,
                ID_User_FK: target_user[0].dataValues.ID_User
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
          } else {
            res.json({
              status: {
                code: 401,
                message: "Unauthorized"
              }
            })
          }
        }
      })
  },

  Delete(req, res, next) {

    conn.sync()
      .then(async () => {
        const target_user = await user.findAll({
          where: {
            email: req.body.email
          }
        })

        if (target_user.length === 0) {
          res.json({
            status: {
              code: 404,
              message: "Not Found"
            }
          })
        } else {
          const logged_user = await member.findAll({
            where: {
              ID_User_FK: req.headers.id_user,
              ID_Room_FK: req.headers.id_room
            }
          })

          if (logged_user[0].dataValues.IsAdmin === "y") {
            await member.destroy({
                where: {
                  ID_User_FK: target_user[0].dataValues.ID_User,
                  ID_Room_FK: req.headers.id_room
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

          } else {
            res.json({
              status: {
                code: 401,
                message: "Unauthorized"
              }
            })
          }
        }
      })
  }
};