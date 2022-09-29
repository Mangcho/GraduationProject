const express = require('express');

const wrapper = require('./../../utils/wrapper'); // async Wrapper
const { AuthService } = require('../../services/auth');
const auth = new AuthService();

const router = express.Router();

router.post('/api/login', wrapper(async (req, res) => {
    const userDto = { id: req.body.id, password: req.body.password };
    const status = auth.SignIn(userDto)
        .then((result) => {
            if (result) {
                req.session.isAuth = true;
            }
            return res.json({ status: result })
        })

}))

module.exports = router;