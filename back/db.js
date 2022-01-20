require('dotenv').config();
const AWS = require('aws-sdk');

const awsConfig = {
  region: 'eu-central-1',
  endpoint: 'http://dynamodb.eu-central-1.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);

const ddbClient = new AWS.DynamoDB.DocumentClient();
console.log('Connected to DynamoDb');

module.exports = ddbClient;
