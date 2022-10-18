import express from "express";
import { body, validationResult } from 'express-validator';
import wrapper from "../../utils/wrapper.js"; // async wrapper
import AuthService from "../../services/auth.js";

const auth = new AuthService();
const router = express.Router();

router.post('/login',
    body('id').notEmpty().isEmail(),
    body('password').notEmpty(),
    wrapper(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }
        const compareUserDto = { id: req.body.id, password: req.body.password };
        const state = await auth.SignIn(compareUserDto)
        req.session.isAuth = state ? true : false
        return res.json({ state })
    }))

router.post('/register',
    body('id').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('age').notEmpty().isInt(),
    body('imei').notEmpty().isAlphanumeric(),
    wrapper(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }
        const createUserDto = { id: req.body.id, password: req.body.password, name: req.body.name, age: req.body.age, imei: req.body.imei };
        const state = await auth.SignUp(createUserDto)
        return res.json({ state })
    }))

router.post('/imei',
    body('imei').notEmpty().isAlphanumeric(),
    wrapper(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
        }
        const checkImeiDto = { imei: req.body.imei };
        const state = await auth.CheckImei(checkImeiDto);
        return res.json({ state })

    }))

export default router
