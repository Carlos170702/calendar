const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const UsusarioModel = require("../models/Ususario.model");
const { generateJWT } = require("../helpers/jwt");

const registerUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // get one register
    let user = await UsusarioModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
      });
    }

    // encript password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    // save user
    user = new UsusarioModel({ ...req.body, password: hash });
    await user.save();

    // generate tokem
    const token = await generateJWT(user.name, user.id);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message:
        "Sign-up is not possible.Please communicate with the administrator",
    });
  }
};

const loginUSer = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await UsusarioModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Email is not registered",
      });
    }

    // confirm password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "Password is not valid",
      });
    }

    // generate tokem
    const token = await generateJWT(user.name, user.id);

    res.json({
      ok: true,
      message: "Password is valid",
      name: user.name,
      uid: user.id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message:
        "Sign-in is not possible.Please communicate with the administrator",
    });
  }
};

const revalidateToken = async (req = request, res = response) => {
  const name = req.name;
  const uid = req.uid;

  // generate new access token
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid: name,
    name: uid,
    token,
  });
};

module.exports = {
  registerUser,
  loginUSer,
  revalidateToken,
};
