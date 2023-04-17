const { Schema, model } = require("mongoose");

const mongoose_delete = require("mongoose-delete");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      default: "user",
      // type: ["user", "admin", "master"],
      // default: ["user"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = model("users", UserSchema);
