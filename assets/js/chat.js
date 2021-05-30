import events from "./events";
import { sendMsg } from "./render";
import { getSocket } from "./socket";

const form = document.getElementById("chat-form"),
  input = form.querySelector("input:first-child");

const submitHandle = (e) => {
  e.preventDefault();
  const { value: msg } = input;
  if (!msg) return;
  getSocket().emit(events.sendMsg, { msg });
  sendMsg(msg, true);
  input.value = "";
};

const init = () => {
  form.addEventListener("submit", submitHandle);
};

init();
