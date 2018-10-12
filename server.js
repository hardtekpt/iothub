const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
var jwt = require("jsonwebtoken");
const keys = require("./config/keys");

// import routes
const users = require("./routes/api/users");
const notes = require("./routes/api/notes");
const settings = require("./routes/api/settings");
const weather = require("./routes/api/weather");
//const assistant = require("./routes/api/assistant");

// import socket.io router
const websocketUtils = require("./routes/socket");

//const blynkapi = require("./blynk/blynk");

// define our app using express
const app = express();

const server = http.Server(app);
const io = socket(server);

// socket.io connection
io.use(function(socket, next) {
  const token = socket.handshake.query.token.split(" ");
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(token[1], keys.secretOrKey, function(err, decoded) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", socket => {
  console.log("Connected to Socket - " + socket.id);
  websocketUtils.router(socket);
});

// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //  res.io = skt;
  next();
});

// Logger middleware
app.use(logger("dev"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("=> MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/notes", notes);
app.use("/api/settings", settings);
app.use("/api/weather", weather);
//app.use("/api/assistant", assistant);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`=> Server running on port ${port}`));
