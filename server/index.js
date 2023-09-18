const express = require('express');
const axios = require('axios');
const app = express();

const port = 3001;

app.use(express.json());
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', async (req, res) => {
    res.send('Chuck Norris Server');
});

app.get('/categories', async (req, res) => {
    const response = await axios({
      url: 'https://api.chucknorris.io/jokes/categories',
      method: 'get',
    });
    res.send(response.data);
});

app.get('/random', async (req, res) => {
    const response = await axios({
      url: 'https://api.chucknorris.io/jokes/random',
      method: 'get',
    });
    res.send(response.data);
});

app.get('/category/:category', async (req, res) => {
    const response = await axios({
      url: 'https://api.chucknorris.io/jokes/random?category=' + req.params.category,
      method: 'get',
    });
    res.send(response.data);
});

app.listen(port, () => {
  console.log('Server running at port ' + port);
});