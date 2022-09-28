const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper
const { AuthService } = require('../../services/auth');
const auth = new AuthService();

const router = express.Router();

router.post('/api/login', wrapper(async (req, res) => {
    const userDto = req.body;
    const status = auth.SignIn(userDto)
        .then((a) => {
            console.log(a);
        })
    if (status) {
        req.session.isAuth = true;
    }
    return res.json({ status: status })
}))

module.exports = router;