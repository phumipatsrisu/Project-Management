const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Don't have token" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token Invalid" });
  }
};
