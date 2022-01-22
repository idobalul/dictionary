const db = require('../db');

const POS = ['adv.', 'n.', 'v.', 'prep.', 'conj.', 'interj.', 'pron.', 'a.'];

exports.getWord = async (req, res) => {
  try {
    const { word } = req.params;
    const params = {
      TableName: 'dictionary',
      KeyConditionExpression: `word = :w`,
      ExpressionAttributeValues: {
        ':w': word.toUpperCase(),
      },
    };

    const response = await db.query(params).promise();
    if (response.Items.length === 0) {
      res.status(404).send(`Could not find word ${word}`);
      return;
    }
    res.send(response.Items);
  } catch (error) {
    console.log(error);
    res.status(405).send(`Could not query. Error: ${error}`);
  }
};

exports.getWordWithPOS = async (req, res) => {
  try {
    const { word, partOfSpeech } = req.params;
    if (!POS.includes(req.params.partOfSpeech)) {
      throw new Error('Invalid part of speech');
    }
    const params = {
      TableName: 'dictionary',
      KeyConditionExpression: `word = :w and pos = :p`,
      ExpressionAttributeValues: {
        ':w': word.toUpperCase(),
        ':p': partOfSpeech,
      },
    };

    const response = await db.query(params).promise();
    if (response.Items.length === 0) {
      res.status(404).send(`Could not find word ${word} with part of speech ${partOfSpeech}`);
      return;
    }
    res.send(response.Items);
  } catch (error) {
    console.log(error.message);
    if (error.message === 'Invalid part of speech') {
      res.status(400).send(error.message);
      return;
    }
    res.status(500).send('Oops, something went wrong');
  }
};
