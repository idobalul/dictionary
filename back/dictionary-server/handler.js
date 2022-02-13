const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

const POSRouter = require('./routers/part-of-speech');

const { getWord, getWordWithPOS } = require('./controllers/dictionary');

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve('./build')));

app.get([
  '/',
  (req, res) => {
    res.sendFile(path.resolve('./build/index.html'));
  },
]);

app.use('/part-of-speech', POSRouter);

app.get('/:word', getWord);
app.get('/:word/:partOfSpeech', getWordWithPOS);

app.use((req, res, next) =>
  res.status(404).json({
    error: 'Not Found',
  })
);

module.exports.handler = serverless(app);
