const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8080;

const POSRouter = require('./routers/part-of-speech');

const { getWord, getWordWithPOS } = require('./controllers/dictionary');

const app = express();

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

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
