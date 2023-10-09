const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

database.sync().then(() => app.listen(4000));