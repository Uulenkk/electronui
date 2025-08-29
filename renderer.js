const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("textInput");
const messagesDiv = document.getElementById("messages");

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  const reply = await window.api.callAI(text);
  addMessage(reply, "ai");
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendBtn.click();
});
