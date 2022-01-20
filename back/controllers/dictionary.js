const db = require('../db');

exports.getWord = async (req, res) => {
  try {
    // const { word } = req.params;
    // console.log(word);
    const params = {
      TableName: 'dictionary',
      KeyConditionExpression: `word = :w`,
      ExpressionAttributeValues: {
        ':w': req.params.word.toUpperCase(),
      },
    };

    const response = await db.query(params).promise();
    res.send(response.Items);
  } catch (error) {
    console.log(error);
    res.status(405).send(`Could not query. Error: ${error}`);
  }
};
