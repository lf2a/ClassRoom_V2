const sequelize = require('sequelize')

const Room = require('../models/Room')
const Member = require('../models/Member')
const {
  Random
} = require('../util/random')

const config = require('../database/config')

const conn = new sequelize(config)
const room = Room(conn, sequelize)
const member = Member(conn, sequelize)

module.exports = {
  Create(req, res, next) {

    const id_room = Random(20);

    const insert = {
      ID_Room: id_room,
      name: req.body.name,
      description: req.body.description
    };

    conn.sync()
      .then(async () => {
        const room_ = await room.create(insert)

        const member_ = await member.create({
            ID_User_FK: req.headers.id_user,
            ID_Room_FK: id_room,
            IsAdmin: "y"
          })

          .catch((err) => {
            res.json({
              status: {
                code: 400,
                message: "Bad Request"
              },
              err: err.errors[0].message,
              mysql: err.original
            })
          });

        res.json({
          status: {
            code: 200,
            message: "OK"
          },
          room_,
          member_
        });

      });
  },

  Delete(req, res, next) {
    conn.sync()
      .then(async () => {

        await member.destroy({
          where: {
            ID_Room_FK: req.headers.id_room,
            ID_User_FK: req.headers.id_user
          }
        })

        await room.destroy({
            where: {
              ID_Room: req.headers.id_room
            }
          })

          .then(r => {
            res.json({
              status: {
                code: 200,
                message: "OK"
              },
              r
            });
          })

          .catch((err) => {
            res.json({
              status: {
                code: 500,
                message: "Server Error"
              },
              ID_Room: req.headers.id_room
            });
          });

      });
  },

  Update(req, res, next) {
    conn.sync()

      .then(async () => {

        await member.findAll({
            where: {
              ID_User_FK: req.headers.id_user,
              ID_Room_FK: req.headers.id_room
            }
          })
          .then(async (data) => {
            if (data[0].dataValues.IsAdmin !== "y") {
              res.json({
                status: {
                  code: 401,
                  message: "Unauthorized"
                }
              })
            } else {
              await room.update({
                  name: req.body.name,
                  description: req.body.description
                }, {
                  where: {
                    ID_Room: req.headers.id_room
                  }
                })

                .then(r => {
                  r = r[0]
                  res.json({
                    status: {
                      code: 200,
                      message: "OK"
                    },
                    r
                  })
                })
            }
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

  Get(req, res, next) {

    conn.query(`SELECT Member.ID_User_FK as id_user, Member.IsAdmin as isadmin, Room.ID_Room as id_room , Room.name, Room.description FROM Member INNER JOIN Room
     ON Member.ID_Room_FK = Room.ID_Room WHERE Member.ID_User_FK = '${req.headers.id_user}';`, {
        type: sequelize.QueryTypes.SELECT
      })

      .then(data => {
        res.json({
          status: {
            code: 200,
            message: "OK"
          },
          data,
        })
      })
  }
};