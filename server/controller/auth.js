const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExit = await User.findOne({ name, email });

    if (userExit) {
      return res.status(400).json({ message: "Username มีคนใช้แล้ว" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({ name, email, password: hashedPassword }).save();
    res.status(200).json({ message: "Register Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ name, email });

    if (!user) {
      return res.status(400).json({ message: "User or Email Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const payload = {
      user: {
        name: user.name,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, "mySecretKey123", { expiresIn: "1d" });
    res.status(200).json({ message: "login success", payload, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
