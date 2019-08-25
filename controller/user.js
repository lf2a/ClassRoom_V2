const sequelize = require('sequelize');

const config = require('../database/config');
const user = require('../models/User');
const {
  Random
} = require('../util/random');

const conn = new sequelize(config);
const User = user(conn, sequelize);

module.exports = {

  SignUp(req, res) {

    const insert = {
      ID_User: Random(20),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    conn.sync()

      .then(async () => {
        const data = await User.create(insert)

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
          data
        });

      });
  },

  Delete(req, res) {

    conn.sync()
      .then(async () => {

        const ID_User = req.headers.id_user

        await User.destroy({
            where: {
              ID_User,
              password: req.headers.password
            }
          })

          .then((e) => {
            res.json({
              status: {
                code: 200,
                message: "OK"
              },
              res
            });
          })

          .catch((err) => {
            res.json({
              status: {
                code: 500,
                message: "Server Error"
              },
              ID_User,
              err
            });
          });

      });
  },

  Update(req, res, next) {
    conn.sync()

    User.update({
        name: req.body.name,
        email: req.body.email
      }, {
        where: {
          ID_User: req.headers.id_user,
          password: req.headers.password
        }
      })

      .then(res => {
        res.json({
          status: {
            code: 200,
            message: "OK"
          },
          res
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
}