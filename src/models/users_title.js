const mongoose = require("../database/mongo");

const { Schema } = mongoose;

const UsersTitle = new Schema({
  users_id: {
    type: Number,
    required: true,
    unique: true
  },
  parent_id: {
    type: Number,
    required: true
  },
  personal_points: {
    type: Number,
    required: true
  },
  year_month: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("UsersTitle", UsersTitle);
