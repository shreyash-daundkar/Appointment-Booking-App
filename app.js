const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./util/database');
const userRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use('/appointment', userRouter);

// database.sync()
//  .then(() => app.listen(4000))
//  .catch((err) => console.log(err));

 app.listen(4000)