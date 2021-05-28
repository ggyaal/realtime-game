import { join } from "path";
import express from "express";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}`)
);

const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) =>
    console.log(`DATA: ${JSON.stringify(data)}`)
  );
});