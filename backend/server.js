/** @format */

import express from "express";
import mongoose from "mongoose";
import Messages from "./model/dbMessages.js";
import User from "./model/User.js";
import Cors from "cors";
import Pusher from "pusher";
// App Config
const app = express();

const connection_url =
  "mongodb+srv://kiros:1234@cluster0.cku3kxr.mongodb.net/chatbotDB";
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1701706",
  key: "d26dc308b340e5117a7f",
  secret: "30a51b7623ad20bd8ee1",
  cluster: "eu",
  useTLS: true,
});

var corsOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
};

// Middleware
app.use(express.json());
app.use(Cors(corsOptions.headers));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
// DB Config
mongoose.connect(connection_url);
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagingmessages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});
// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));
app.post("/messages/new", async (req, res) => {
  const dbMessage = req.body;
  try {
    const data = await Messages.create(dbMessage);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/users/new", async (req, res) => {
  const dbUsers = req.body;
  try {
    const data = await User.create(dbUsers);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/users/sync", async (req, res) => {
  try {
    const data = await User.find();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
