const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const awsMiddleware = require('aws-serverless-express/middleware');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(awsMiddleware.eventContext());

app.use('/', routes);

app.use(function (err, req, res, next) {
  if (err.status) {
    res.status(err.status).send(err.errorDto());
  } else {
    console.error(err);
    res.status(500).send({
      status: 500,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
  next(req, res, next);
});

module.exports = app;
