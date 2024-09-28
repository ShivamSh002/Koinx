const express = require('express');
const router = express.Router();
const multer = require('multer');
const tradeController = require('../controllers/tradeController');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), tradeController.uploadCSV);

module.exports = router;
