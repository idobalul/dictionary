const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8080;

const { getWord } = require('./controllers/dictionary');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/:word', getWord);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
