const express = require('express');
const path = require('path');

const router = express.Router();

const getTest = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/build/index.html'));
}

router.get('/', getTest);

module.exports = router;