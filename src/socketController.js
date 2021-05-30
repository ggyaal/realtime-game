import events from "./events";

const socketController = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  socket.on(events.LOGIN, ({ name }) => {
    socket.name = name;
    broadcast(events.newUser, { name });
  });

  socket.on("disconnect", () => {
    broadcast(events.LOGOUT, { name: socket.name });
  });

  socket.on(events.sendMsg, ({ msg }) => {
    broadcast(events.newMsg, { name: socket.name, msg });
  });
};

export default socketController;
