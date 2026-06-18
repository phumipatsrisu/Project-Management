const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token invalid" });
  }
};
