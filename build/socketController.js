"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var socketController = function socketController(socket) {
  var broadcast = function broadcast(event, data) {
    return socket.broadcast.emit(event, data);
  };

  socket.on(_events["default"].LOGIN, function (_ref) {
    var name = _ref.name;
    socket.name = name;
    broadcast(_events["default"].newUser, {
      name: name
    });
  });
  socket.on("disconnect", function () {
    broadcast(_events["default"].LOGOUT, {
      name: socket.name
    });
  });
  socket.on(_events["default"].sendMsg, function (_ref2) {
    var msg = _ref2.msg;
    broadcast(_events["default"].newMsg, {
      name: socket.name,
      msg: msg
    });
  });
};

var _default = socketController;
exports["default"] = _default;