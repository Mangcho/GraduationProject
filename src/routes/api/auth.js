const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper
const { AuthService } = require('../../services/auth');
const auth = new AuthService();

const router = express.Router();

router.post('/login', wrapper(async (req, res) => {
    const userDto = { id: req.body.id, password: req.body.password };
    const state = await auth.SignIn(userDto)
    state ? (req.session.isAuth = true) : ""
    return res.json({ state: state })
}))

module.exports = router;