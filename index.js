const express = require('express');
const cors = require('cors');
const sequelize = require('sequelize');

const routes = require('./routes');
const config = require('./database/config');

const app = express();

const conn = new sequelize(config)
conn.authenticate()
  .then(() => {
    console.log('Connected');
  }).catch((err) => {
    console.log('╔═════════════════════════════╗');
    console.log(`║     ERROOOOOO      (⊙_☉)    ║`);
    console.log('╚═════════════════════════════╝');
    console.log(`✖ Error: ${err}\n`);
    process.exit(-1);
  })

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('╔═════════════════════════════╗');
  console.log('║  ╔═╗╦═╗                     ║');
  console.log('║  ║  ╠╦╝  Server is running  ║');
  console.log('║  ╚═╝╩╚═                     ║');
  console.log('╚═════════════════════════════╝');
})