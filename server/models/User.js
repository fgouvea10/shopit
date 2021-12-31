const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name must be provided"],
    maxlength: [30, "User name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "User email must be provided"],
    unique: true,
    validate: [validator.isEmail, "User email must be valid"],
  },
  password: {
    type: String,
    required: [true, "User password must be provided"],
    minlength: [6, "User password must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
