/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/postgresDB.js');
// const db = require('../database/db.js');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/', (req, res) => {
  const productId = req.query.ID || 48;
  db.getAllItemInfo(productId, (err, itemInfo) => {
    if (err) {
      console.log('error getting info from db');
      res.send(err);
    }
    console.log(itemInfo);
    res.send(itemInfo);
  });
  // res.end();
});

app.get('/items', (req, res) => {
  console.log('items request received');
  const productId = req.query.ID || 48;
  console.log(productId);
  db.getAllItemInfo(productId, (err, itemInfo) => {
    if (err) {
      console.log('we got an error');
    }
    console.log('sending itemInfo to server');
    res.send(itemInfo);
  });
  // res.end();
});

app.listen(PORT, () => {
  console.log(`yippie-kay-yay, now listening on port ${PORT}`);
});
