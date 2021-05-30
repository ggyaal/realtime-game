const log = document.querySelector(".chat-log");
const ul = document.getElementById("chat-ul");

const renderMsg = (text, self, name) => {
  const li = document.createElement("li");
  const span1 = document.createElement("div");
  const span2 = document.createElement("div");
  span1.className = ".chat-message__name=data.name";
  span2.className = ".chat-message__message=data.message";
  li.className = self ? "chat-message own" : "chat-message";
  span1.innerText = name || null;
  span2.innerText = text;
  li.appendChild(span1);
  li.appendChild(span2);
  ul.appendChild(li);
  log.scrollTop = log.scrollHeight;
};

const fireNotification = (text) => {
  const li = document.createElement("li");
  li.className = "chat-notification";
  li.innerText = text;
  ul.appendChild(li);
  log.scrollTop = log.scrollHeight;
};

export const newUserHandle = ({ name }) => {
  fireNotification(`${name}님이 들어왔습니다.`);
};
export const logoutHandle = ({ name }) => {
  fireNotification(`${name}님은 떠났습니다.`);
};

export const newMsgHendle = ({ name, msg }) => {
  renderMsg(msg, false, name);
};

export const sendNotification = (text) => fireNotification(text);

export const sendMsg = (text, self, name) => renderMsg(text, self, name);
