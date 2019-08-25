const sequelize = require('sequelize');
var jwt = require('jsonwebtoken');

const config = require('../database/config');
const user = require('../models/User');
const secret = require('../util/key');

const conn = new sequelize(config);
const User = user(conn, sequelize);

module.exports = {
  Login(req, res, next) {

    conn.sync()
      .then(async () => {
        await User.findAll({
            where: {
              email: req.headers.email
            }
          })

          .then((user) => {
            if (user.length === 0) {
              res.json({
                status: {
                  code: 404,
                  message: "Not Found"
                }
              })
            } else {
              if (user[0].password === req.headers.password) {

                const {
                  ID_User,
                  name,
                  email,
                  IsAdmin,
                  IsProfessor
                } = user[0];

                const key = secret.Secret();

                var token = jwt.sign({
                  ID_User
                }, key, {
                  expiresIn: 300
                });

                res.json({
                  status: {
                    code: 200,
                    message: "OK"
                  },
                  token: token,
                  data: {
                    ID_User,
                    name,
                    email,
                    IsAdmin,
                    IsProfessor
                  }
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
          });
      });
  }
}