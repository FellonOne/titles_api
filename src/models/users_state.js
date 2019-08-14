const mongoose = require("../database/mongo");

const { Schema } = mongoose;

const UsersState = new Schema(
  {
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
      required: true,
      default: 0
    },
    group_points: {
      type: Number,
      required: true,
      default: 0
    },
    structure_points: { type: Number,  default: 0 },
    personal_bonus: { type: Number, default: 0 },
    level_bonus: { type: Number, default: 0 },
    step_bonus: { type: Number,  default: 0 },
    director_bonus: { type: Number,default: 0 },
    salary: { type: Number,  default: 0 },
    count_tm: { type: Number, default: 0 },
    count_rd: { type: Number,  default: 0 },
    count_gd: { type: Number, default: 0 },
    year_month: {
      type: Number,
      required: true
    },
    qualification: {
      type: Boolean,
      default: false
    },
    titles_id: {
      type: Number,
      default: 1
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

UsersState.set("toJSON", { virtuals: true });

module.exports = mongoose.model("UsersState", UsersState);
