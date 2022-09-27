const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper


const router = express.Router();

router.post('/pi', wrapper(async (req, res) => {

}))

module.exports = router;