const client = require('prom-client');
const express = require('express');
const bodyParser = require('body-parser');

const register = new client.Registry();

// default node process metrics
// client.collectDefaultMetrics({ register });

register.setDefaultLabels({
  app: 'demo'
});

const price = new client.Gauge({
  name: 'demo_price',
  help: 'some token price in type'
});

// DO NOT FORGET THIS LINE!
register.registerMetric(price);

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  register
    .metrics()
    .then(result => {
      res.end(result);
    })
    .catch(ex => {
      res.status(500).end(ex);
    })
});

app.post('/price', (req, res) => {
  price.set(Number.parseInt(req.body.price, 10));
  res.sendStatus(202);
});

app.listen(6080);