const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 4000;

const channel_access_token = 'ADjhL97lHtwrhweoFXwe66FozB8Nda9A+4PXDzOsLEOiz8MWZbiMpYAWrMiZ+u9XYshId3diBUb9+aOCPKqKmFOL8lKuf3LnylKS+deWftNXwm1GxUoVOkKEsCZdvXx2vBn6RVbGJpsy43QbtWYi/AdB04t89/1O/w1cDnyilFU=';

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// app.get('/healthcheck', (req, res) => res.sendStatus(200));

// Line Webhook 
app.post('/webhook', (req, res) => {

  let reply_token = req.body.events[0].replyToken;
  const msg = req.body.events[0].message.text;
  
  reply(res, reply_token, msg);

  res.sendStatus(200);
});

app.listen(port, function () {
  console.log(`${'\u2705'}  Server starting http://localhost:${port}`);
});

function reply(res, reply_token, msg) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + channel_access_token
  };

  const body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: 'text',
        text: 'Echo: ' + msg
      }
    ]
  });

  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);    
  });

}
