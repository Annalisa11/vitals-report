const express = require('express');
const {
  getGlucoseScore,
  getHistory,
  getVitals,
  openAi,
  guess,
  setGuessesNumber,
  getGuesses,
} = require('../controllers/contentController');

const router = express.Router();

router.get('/vitals', getVitals);
router.get('/history', getHistory);
router.get('/glucose-score', getGlucoseScore);
router.post('/openai', openAi);
router.post('/guess', guess);
router.get('/guesses', getGuesses);
router.post('/admin/update-guesses', setGuessesNumber);

module.exports = router;
