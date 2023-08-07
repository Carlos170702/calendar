const { request, response, json } = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Token is required",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.word_secret_JWT);

    req.name = name;
    req.uid = uid;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: "Token not valid",
    });
  }

  next();
};

module.exports = {
  validateJwt,
};
