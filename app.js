const bodyParser = require('body-parser');
const express = require('express');
const Users = require('./src/usersService');

const users = new Users();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', async (req, res) => {
  res.json({ data: await users.list() });
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  res.json({ data: await users.create(name, email) });
});

app.get('/users/:id', async (req, res) => {
  res.json({ data: await users.get(req.params.id) });
});

app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  res.json({ data: await users.update(req.params.id, name, email) });
});

app.delete('/users/:id', async (req, res) => {
  await users.remove(req.params.id);
  res.json({ data: null  });
});

app.listen(port, () => console.log(`node-uptime app listening at http://localhost:${port}`));
