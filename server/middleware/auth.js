const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).json({ message: "Don't have token" });
    }

    const decode = jwt.verify(token, "mySecretKey123");
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token Invalid" });
  }
};
