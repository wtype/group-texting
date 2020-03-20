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

const directory = new Datastore('directory.db');
directory.loadDatabase();

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

app.get('/directory', (req, res) => {
  directory
    .find({})
    .sort({ created: -1 })
    .exec((err, data) => {
      if (err) {
        res.json({
          error: 'Nothing in the directory! 😿',
        });
        res.end();
        return;
      }
      res.json(data);
    });
});

app.get('/texts', (req, res) => {
  db.find({})
    .sort({ created: -1 })
    .exec((err, data) => {
      if (err) {
        res.json({
          error: 'Nothing in the text history! 😿',
        });
        res.end();
        return;
      }
      res.json(data);
    });
});

app.delete('/delete', (req, res) => {
  const { id } = req.query;
  if (id) {
    directory.remove({ _id: id });
    res.json({
      message: 'Successfully removed',
    });
  } else {
    res.status(404).json({
      error: 'Entry not found',
    });
  }
});

app.use(
  rateLimit({
    windowMs: 30e3,
    max: 3,
  })
);

function isValidText(info) {
  return (
    info.message &&
    info.message.toString().trim() !== '' &&
    info.members &&
    info.members.length > 0 &&
    info.members.length < 50
  );
}

function isValidMember(info) {
  return (
    info.name &&
    info.name.toString().trim() !== '' &&
    info.phone &&
    info.phone.toString().trim() !== ''
  );
}

app.post('/send', (req, res) => {
  if (isValidText(req.body)) {
    const text = {
      message: filter.clean(req.body.message.toString()),
      members: req.body.members,
      dateSent: new Date().toLocaleString(),
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
      .catch(err => console.log(err.message, err));
  } else {
    res.status(422).json({
      message: 'Please provide valid text content and members',
    });
  }
});

app.post('/directory', (req, res) => {
  if (isValidMember(req.body)) {
    const member = {
      name: filter.clean(req.body.name.toString().toLowerCase()),
      phone: `+1${req.body.phone}`,
      dateAdded: new Date(),
      addedToText: false,
    };
    directory.insert(member);
    res.json(member);
  } else {
    res.status(422).json({
      message: 'Please provide valid member information',
    });
  }
});

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
