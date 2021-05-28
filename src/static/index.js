const form = document.querySelector("#form"),
  input = document.querySelector("input");

const socket = io("/");

socket.on("hello", () => console.log("hello too !"));

const init = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { value } = input;
    socket.emit("sendMessage", { message: value });
    input.value = "";
  });
};

init();
