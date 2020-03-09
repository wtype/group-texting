const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Filter = require('bad-words');
const Datastore = require('nedb');

const port = process.env.PORT || 9090;
const app = express();
const filter = new Filter();

const db = new Datastore('texts.db');
db.loadDatabase();

app.use(cors());
app.use(express.json({ limit: '2kb' }));

require('dotenv').config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
  res.json({
    Welcome: '🕊',
  });
});

app.use(
  rateLimit({
    windowMs: 30e3,
    max: 3,
  })
);

function isValid(info) {
  return (
    info.message &&
    info.message.toString().trim() !== '' &&
    info.members &&
    info.members.length > 0 &&
    info.members.length < 50
  );
}

app.post('/send', (req, res) => {
  if (isValid(req.body)) {
    const text = {
      message: filter.clean(req.body.message.toString()),
      members: req.body.members,
    };

    let numbers = [];

    text.members.forEach(member => {
      numbers.push(member.phone);
    });

    Promise.all(
      numbers.map(number =>
        client.messages.create({
          body: text.message,
          from: process.env.TWILIONUM,
          to: number,
        })
      )
    )
      .then(() => {
        db.insert(text);
        console.log(text.message, 'messages sent to', text.members);
        numbers = [];
        res.status(200).json({
          success: 'Successfully sent the message!',
        });
      })
      .catch(err => console.log(err));
  } else {
    res.status(422).json({
      message: 'Please provide valid text content and members',
    });
  }
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
