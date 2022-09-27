const express = require('express');

const wrapper = require('./utils/wrapper.js'); // async Wrapper
const AuthService = require('../services/auth')

const router = express.Router();

router.post('/api/login', wrapper(async (req, res) => {
    const userDto = req.body;
    const status = AuthService.Signin(userDto);
    if(status){
        req.session.auth = true;
    }
    return res.json({status:status})
}))

module.exports = router;