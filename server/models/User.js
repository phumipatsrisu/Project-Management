const { default: mongoose } = require("mongoose");
const moongoose = require("moongoose");

const UserSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
