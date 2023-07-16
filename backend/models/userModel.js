const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    bio: {
      type: String,
      required: [true, 'Please add a bio'],
    },
    offeredSkill: {
      type: String,
      required: [true, 'Please add a Skill'],
    },
    portfolio: {
      type: String,
      required: [true, 'Please add your portfolio URL'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
