const router = require('express').Router();
const { getRandomWordByPOS } = require('../controllers/part-of-speech');

router.get('/:part', getRandomWordByPOS);

module.exports = router;
