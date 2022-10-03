const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper
const { AuthService } = require('../../services/auth');
const auth = new AuthService();

const router = express.Router();

router.post('/login', wrapper(async (req, res) => {
    const createUserDto = { id: req.body.id, password: req.body.password };
    const state = await auth.SignIn(createUserDto)
    req.session.isAuth = state ? true : false
    return res.json({ state: state })
}))

module.exports = router;