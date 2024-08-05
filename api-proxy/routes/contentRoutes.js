const express = require('express');
const {
  getGlucoseScore,
  getHistory,
  getVitals,
  openAi,
  guess,
} = require('../controllers/contentController');

const router = express.Router();

router.get('/', getVitals);
router.get('/history', getHistory);
router.get('/glucose-score', getGlucoseScore);
router.post('/openai', openAi);
router.post('/guess', guess);

module.exports = router;
