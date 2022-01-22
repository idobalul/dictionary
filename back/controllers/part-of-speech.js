const db = require('../db');

const POS = {
  noun: 'n.',
  pronoun: 'pron',
  verb: 'v.',
  adjective: 'a.',
  adverb: 'adv',
  preposition: 'prep.',
  conjunction: 'conj',
  interjection: 'interj',
};

exports.getRandomWordByPOS = async (req, res) => {
  try {
    let { part } = req.params;
    let { letter } = req.query;
    let params;

    if (!part || !POS[part]) {
      res.status(400).send('Invalid or missing parameter "part"');
      return;
    }

    if (Object.keys(POS).includes(part)) {
      part = POS[part];
    }

    if (!Object.values(POS).includes(part)) {
      res.status(400).send('Invalid or missing parameter "part"');
      return;
    }

    if (!letter || letter.length > 1 || letter.match(/[0-9]/g)) {
      letter = '';
      params = {
        TableName: 'dictionary',
        FilterExpression: 'pos=:p',
        ExpressionAttributeValues: {
          ':p': part,
        },
        Limit: 100,
      };
    } else {
      params = {
        TableName: 'dictionary',
        FilterExpression: 'pos=:p and begins_with (word , :letter)',
        ExpressionAttributeValues: {
          ':letter': letter.toUpperCase(),
          ':p': part,
        },
        Limit: 100,
      };
    }

    const response = await db.scan(params).promise();
    if (response.Items.length === 0) {
      res.status(404).send(`Could not find words with part of speech ${part}`);
      return;
    }

    const randomNumber = Math.floor(Math.random() * response.Items.length);

    res.send(response.Items[randomNumber]);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Oops, something went wrong. Error: ${error}`);
  }
};
