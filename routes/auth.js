/*
 * Routes for user
 * host + /api/auth/
 */
const { Router } = require("express");
const {
  registerUser,
  loginUSer,
  revalidateToken,
} = require("../controller/auth.controller");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/register",
  [
    // middlewares
    check("name", "name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    check("password", "Password must be longer than 5 characters").isLength({
      min: 5,
    }),
    validateFields,
  ],
  registerUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("password", "password is required").not().isEmpty(),
    check("password", "Password must be longer than 5 characters").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUSer
);

router.get("/renew", [validateJwt], revalidateToken);

module.exports = router;
