/** @format */

import mongoose from "mongoose";
const messagingSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export default mongoose.model("messagingmessages", messagingSchema);
