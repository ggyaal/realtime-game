"use strict";

var _path = require("path");

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socketController = _interopRequireDefault(require("./socketController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var PORT = process.env.PORT || 4000;
var app = (0, _express["default"])();
console.log(process.env.PORT);
app.set("view engine", "pug");
app.set("views", (0, _path.join)(__dirname, "views"));
app.use(_express["default"]["static"]((0, _path.join)(__dirname, "static")));
app.get("/", function (req, res) {
  return res.render("home");
});
var server = app.listen(PORT, function () {
  return console.log("Server is running: http://localhost:".concat(PORT));
});
var io = (0, _socket["default"])(server);
io.on("connection", function (socket) {
  return (0, _socketController["default"])(socket);
});