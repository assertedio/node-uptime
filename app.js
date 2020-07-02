const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.all('/echo', (req, res) => res.json({
  method: req.method,
  body: req.body || null,
  query: Object.keys(req.query).length > 0 ? req.query : null,
}));

app.listen(port, () => console.log(`node-uptime app listening at http://localhost:${port}`));
