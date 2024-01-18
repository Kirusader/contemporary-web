/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  email: String,
  password: String,
});

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});
export default mongoose.model("User", UserSchema);
