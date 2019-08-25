var SequelizeAuto = require('sequelize-auto')
const config = require('./database/config');
var auto = new SequelizeAuto('classroom', 'root', 'root', {
  host: 'localhost',
  port: '3306'
});

auto.run((err) => {
  if (err) throw err;

  console.log('OK! No Problems ;)');
});