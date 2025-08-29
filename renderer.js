const messagesDiv = document.getElementById("messages");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  div.style.alignSelf = who === "user" ? "flex-end" : "flex-start";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function fakeAIResponse(userText) {
  ө
  return new Promise((resolve) => {
    setTimeout(() => resolve("AI: " + userText), 500);
  });
}

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  const reply = await fakeAIResponse(text);
  addMessage(reply, "ai");
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
