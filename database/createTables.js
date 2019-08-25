const sequelize = require('sequelize');

const config = require('./config');

const conn = new sequelize(config);

const User = require('../models/User');
const Room = require('../models/Room')
const Member = require('../models/Member');
const Post = require('../models/Post');
const Attachment = require('../models/Attachment');
const Comment = require('../models/Comment');
const Answer = require('../models/Answer');
const Remminder = require('../models/Reminder');
const Task = require('../models/Task');
const Question = require('../models/Question');
const QuestionAnswer = require('../models/QuestionAnswer');

const user = User(conn, sequelize);
Room(conn, sequelize);
Member(conn, sequelize);
Post(conn, sequelize);
Attachment(conn, sequelize);
Comment(conn, sequelize);
Answer(conn, sequelize);
Remminder(conn, sequelize);
Task(conn, sequelize);
Question(conn, sequelize);
QuestionAnswer(conn, sequelize);


conn.sync()
  .then(async () => {
    await user.create({
      ID_User: '0',
      name: '0',
      email: '0',
      password: '0'
    });

    await user.destroy({
      where: {
        ID_User: '0'
      }
    })

    console.log('\n╔═══════════════════╗');
    console.log('║  Created  Tables  ║');
    console.log('╚═══════════════════╝\n');

    process.exit(0);
  })
  .catch((err) => {
    if (err.original.errno === 1049) {
      console.log('╔════════════════════════════════════════════════════════════════════════════════════════════════════════════╗')
      console.log('║ You need to create the database   ¯\\_(ツ)_/¯                                                               ║');
      console.log('║ Execute: "CREATE SCHEMA IF NOT EXISTS `classroom` DEFAULT CHARACTER SET utf8;" without quotes              ║');
      console.log('╚════════════════════════════════════════════════════════════════════════════════════════════════════════════╝')
    }
  })