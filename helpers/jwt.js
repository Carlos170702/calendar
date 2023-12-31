const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.word_secret_JWT,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("could not generate token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
