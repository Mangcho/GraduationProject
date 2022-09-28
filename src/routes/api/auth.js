const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper
const { AuthService } = require('../../services/auth');
const auth = new AuthService();

const router = express.Router();

router.post('/api/login', wrapper(async (req, res) => {
    const userDto = { id: req.body.id, password: req.body.password };
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