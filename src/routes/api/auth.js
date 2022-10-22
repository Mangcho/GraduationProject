import express from "express";
import { header, body, validationResult } from "express-validator";
import { wrapper } from "../../utils/wrapper.js"; // async wrapper
import { AuthService } from "../../services/auth.js";

const auth = new AuthService();
const router = express.Router();

router.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const compareUserDto = { email: req.body.email, password: req.body.password, session: req.session };
    const state = await auth.SignIn(compareUserDto);
    return res.json({ state });
  })
);

router.post(
  "/register",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  body("name").notEmpty(),
  body("age").notEmpty().isInt(),
  body("imei").notEmpty().isAlphanumeric(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const createUserDto = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      age: req.body.age,
      imei: req.body.imei,
    };
    const state = await auth.SignUp(createUserDto);
    return res.json({ state });
  })
);

router.post(
  "/imei",
  body("imei").notEmpty().isAlphanumeric(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const checkImeiDto = { imei: req.body.imei };
    const state = await auth.CheckImei(checkImeiDto);
    return res.json({ state });
  })
);

router.put(
  "/password",
  body("password").notEmpty(),
  header("session.isAuth").exists(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const changePasswordDto = { id: req.session.isAuth, password: req.body.password };
    const state = await auth.ChangePassword(changePasswordDto);
  })
);

router.delete(
  "/logout",
  header("session.isAuth").exists(),
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const logoutUserDto = { session: req.session, sid: req.sessionID }
    await auth.SignOut(logoutUserDto);
    return res.sendStatus(200).end();
  })
)

export { router as authRouter };
