import {
  logoutHandle,
  newMsgHendle,
  newUserHandle,
  sendNotification,
} from "./render";
import events from "./events";

const chat = document.querySelector(".chat"),
  form = document.getElementById("chat-form"),
  input = form.querySelector("input:first-child"),
  submit = form.querySelector("input:last-child");

let socket = null;

export const getSocket = () => socket;
const setSocket = (initSocket) => (socket = initSocket);

const login = (name) => {
  const initSocket = io("/");
  initSocket.emit(events.LOGIN, { name });
  setSocket(initSocket);
  initSocket.on(events.newUser, newUserHandle);
  initSocket.on(events.LOGOUT, logoutHandle);
  initSocket.on(events.newMsg, newMsgHendle);

  chat.classList.remove("loggedOut");
  chat.classList.add("loggedIn");
  input.removeAttribute("disabled");
  submit.removeAttribute("disabled");
  sendNotification("채팅방에 입장하였습니다.");
};

const getName = () => {
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input:first-child");
    const { value: name } = input;
    if (!name) {
      return;
    }
    login(name);
    input.value = "";
  });
};

const init = () => {
  getName();
};

init();
