import express from "express";
import { header, body, validationResult } from "express-validator";
import { wrapper } from "../../utils/wrapper.js"; // async wrapper
import { AuthService } from "../../services/auth.js";

const authService = new AuthService();
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
    const state = await authService.SignIn(compareUserDto);
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
    const state = await authService.SignUp(createUserDto);
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
    const state = await authService.CheckImei(checkImeiDto);
    return res.json({ state });
  })
);

router.put(
  "/password",
  body("password").notEmpty(),
  //header("session.isAuth").exists(),
  wrapper(async (req, res) => {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const changePasswordDto = { session: req.session, newPassword: req.body.password };
    const state = await authService.ChangePassword(changePasswordDto);
    return state;
  })
);

router.delete(
  "/logout",
  wrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const logoutUserDto = { session: req.session }
    await authService.SignOut(logoutUserDto);
    return res.sendStatus(200).end();
  })
)

export { router as authRouter };
