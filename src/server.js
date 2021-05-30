require("dotenv").config();
import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import socketController from "./socketController";

const PORT = process.env.PORT || 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}`)
);

const io = socketIO(server);

io.on("connection", (socket) => socketController(socket));
