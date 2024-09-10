const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "static")));

const ChatUser = require("./ChatUser");

const wsExpress = require("express-ws")(app);
app.ws("/chat/:roomName", function (ws, req, next) {
  try {
    const user = new ChatUser(ws.send.bind(ws), req.params.roomName);

    ws.on("message", function (data) {
      try {
        user.handleMessage(data);
      } catch (err) {
        console.error(err);
      }
    });

    ws.on("close", function () {
      try {
        user.handleClose();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/chat/room=:roomName", function (req, res, next) {
  res.sendFile(`${__dirname}/chat.html`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/join-chat", (req, res) => {
  res.sendFile(path.join(__dirname, "join.html"));
});

app.get("/create-chat", (req, res) => {
  res.sendFile(path.join(__dirname, "create.html"));
})

app.get("/js/:script", (req, res) => {
  res.sendFile(path.join(__dirname, `static/js/${req.params.script}.js`));
});

app.get("/css/:css", (req, res) => {
  res.sendFile(path.join(__dirname, `static/css/${req.params.css}.css`));
});

module.exports = app;
