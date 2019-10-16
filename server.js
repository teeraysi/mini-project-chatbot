const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

app.get('/healthcheck', (req, res) => res.sendStatus(200));
app.post('/webhook', (req, res) => {
  res.sendStatus(200)
});

app.listen(port, function () {
  console.log(`${'\u2705'}  Server starting http://localhost:${port}`);
});
