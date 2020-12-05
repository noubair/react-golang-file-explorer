const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const url = require('url');

const app = express();



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.json({}));

//https://stackoverflow.com/questions/10435407/proxy-with-express-js
app.post('/*', (req, res) => {
  request.post(
    url.resolve('http://localhost:8080/' , req.path.replace(/\/$/, "")),
    { json: req.body },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(response);
      }
    }
  );
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`listening on ${PORT}`));